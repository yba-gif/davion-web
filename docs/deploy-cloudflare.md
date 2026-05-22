# Davion, Cloudflare Pages + Neon Postgres deploy guide

**Status:** v1 (2026-05-21). First production deploy. davion.com.tr already lives on Cloudflare DNS; this guide wires the Nuxt 3 SSR + Postgres backend to Cloudflare Pages and Neon.

**Total time:** ~90 minutes if everything goes smoothly. Most of that is Neon signup + DB migration + first build.

---

## What this gets you

| Surface | Where it runs |
|---|---|
| Nuxt 3 SSR + all `/api/*` endpoints | Cloudflare Pages Functions (Workers runtime), `nodejs_compat` flag on |
| Postgres (blog, engagement_intake, analytics, settings) | Neon serverless Postgres |
| Static assets (images, CSS, JS bundles) | Cloudflare Pages edge network |
| `davion.com.tr` DNS + SSL + WAF | Cloudflare DNS (already configured) |

Cost: Neon free tier (10 GB storage, no idle limits for projects <190h/mo) + Cloudflare Pages free tier (500 builds/mo, unlimited bandwidth). **€0 / month** to launch.

---

## Step 1, Provision Neon

1. Sign up at https://neon.tech with your `yba-gif` GitHub.
2. **Create project** named `davion`. Pick the Frankfurt or Helsinki region (closest to Zurich / Istanbul + sovereign-EU coherent).
3. After provisioning, copy the **connection string**. It looks like:
   ```
   postgresql://neondb_owner:XXX@ep-something-12345678-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Save it somewhere safe, you'll paste it into Cloudflare Pages env vars in Step 4.

---

## Step 2, Migrate the local dev DB to Neon

Your local `davion` database has 6 newsroom posts, settings, and any engagement test rows. Move them now.

```bash
# Dump the local schema + data
pg_dump --no-owner --no-acl \
  postgresql://bek@localhost:5432/davion \
  > /tmp/davion-snapshot.sql

# Push to Neon (substitute your Neon connection string)
psql "postgresql://neondb_owner:...@ep-...neon.tech/neondb?sslmode=require" \
  < /tmp/davion-snapshot.sql
```

If `pg_dump` complains about extensions, edit `/tmp/davion-snapshot.sql` and remove any `CREATE EXTENSION` lines for `plpgsql` (Neon has it pre-installed).

Verify:
```bash
psql "postgresql://...neon.tech/neondb?sslmode=require" \
  -c "SELECT COUNT(*) FROM blog_posts; SELECT COUNT(*) FROM engagement_intake;"
```
You should see 6 blog posts + however many engagement_intake rows you have.

---

## Step 3, Create the Cloudflare Pages project

1. https://dash.cloudflare.com → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorise Cloudflare to access `yba-gif/davion-web`.
3. Pick the repo. Branch: `rebrand/davion` (or `main` once you merge).
4. **Build configuration**:
   - Framework preset: **Nuxt.js**
   - Build command: `cd apps/web && pnpm install --frozen-lockfile && pnpm build:cloudflare`
     - The `build:cloudflare` script sets `NITRO_PRESET=cloudflare-pages` + `NUXT_DEPLOY_TARGET=cloudflare` so the Neon driver kicks in.
   - Build output directory: `apps/web/dist`
   - Root directory: `/` (the repo root, not `apps/web`)
   - Node version: **20** (use the `.nvmrc` at the repo root, or set `NODE_VERSION=20` env var)
5. **Don't deploy yet**, env vars first (Step 4).

---

## Step 4, Set environment variables in Cloudflare Pages

In the Pages project: **Settings → Environment variables** → **Production**.

| Variable | Value | Notes |
|---|---|---|
| `DATABASE_URL` | The Neon connection string from Step 1 | Don't quote it. |
| `IP_HASH_SALT` | A random 32-char string | Generate via `openssl rand -hex 16`. Used for engagement-intake IP hashing. |
| `SCHEDULING_URL` | (optional) Cal.com / Calendly URL | When set, P0.U3 SchedulingEmbed activates. |
| `SCHEDULING_EMAIL` | (optional, default `briefings@davion.com`) | Override the engagement intake email if you want. |
| `DEMO_EMBED_URL` | (optional) Loom / Vimeo URL | When set, P2.U5 DemoEmbed activates on AlpOS. |
| `NODE_VERSION` | `20` | Belt-and-braces; the `.nvmrc` already sets this. |

Hit **Save**.

---

## Step 5, Enable `nodejs_compat`

In the Pages project: **Settings → Functions → Compatibility flags**.

- **Production**: add `nodejs_compat` (and set the compatibility date to `2024-11-01` or later).
- **Preview**: same.

`nodejs_compat` is needed because:
- `engagement-form` POST endpoint uses `node:crypto` for IP hashing.
- Drizzle's `neon-http` adapter expects Web Fetch + a few Node compatibility shims.
- `@nuxt/image` IPX uses Buffer internally.

Save.

---

## Step 6, First deploy

Back in **Deployments**, click **Retry deployment** (or push a new commit). The build runs:

1. `pnpm install --frozen-lockfile`, installs deps.
2. `pnpm build:cloudflare`, runs Nuxt build with the Cloudflare preset. Output lands in `apps/web/dist`.
3. Cloudflare Pages uploads static assets + worker bundle.

If the build fails, check:
- **Build log shows "TCP not supported"**: the Neon driver isn't being picked. Confirm `NITRO_PRESET=cloudflare-pages` is in the build command (it's in `build:cloudflare`, but if you override the build command, set it manually).
- **"Cannot find module postgres"**: the build is trying to bundle the Node TCP driver. The `isEdgeRuntime()` check in `server/utils/db.ts` should prevent that. Force it with `NUXT_DEPLOY_TARGET=cloudflare`.
- **"Module not found: pg-native"**: this is a `pg` dep; safe to ignore (Workers bundling reports it as a warning).

When successful, you get a URL like `davion-web.pages.dev`. Visit it. Confirm:
- Home renders.
- `/api/health` returns `{ ok: true }`.
- `/company/newsroom` lists the 6 posts (proves Neon connection works).
- Submit the engagement form → ticket code returned, row in Neon DB.

---

## Step 7, Wire `davion.com.tr` → Pages

In the Pages project: **Custom domains** → **Set up a custom domain**.

1. Enter `davion.com.tr` (apex / root domain).
2. Cloudflare detects the domain is on the same account, prompts to add a CNAME flattening record automatically. Confirm.
3. Wait ~1 minute. SSL provisions automatically (Cloudflare Universal SSL).
4. Test: `curl -I https://davion.com.tr/`, should return HTTP 200.

Also add `www.davion.com.tr` if you want the www variant (CNAME → davion-web.pages.dev).

---

## Step 8, Smoke test in production

Walk these paths in a real browser:
- `/`, hero, spiral, navigation, footer.
- `/solutions/alpos`, long page, sticky right-rail TOC, demo embed (fallback if no DEMO_EMBED_URL), AlpOS console carousel.
- `/industries/financial-services`, depth page.
- `/company/newsroom`, filter chips work, 6 posts render.
- `/contact`, engagement form. Submit a test entry. Confirm row in Neon.
- `/legal/privacy`, accessible.
- Mobile (iPhone), hero spiral crop fits.

Then:
```bash
psql "postgresql://...neon.tech/neondb?sslmode=require" \
  -c "DELETE FROM engagement_intake WHERE email = 'your-test-email';"
```
Clean up the test submission.

---

## Operational notes

**Logs.** Cloudflare Pages → Deployment → Functions → Real-time logs. Or use `wrangler tail` from the CLI for live tailing. Configure log push to R2 / Datadog at scale.

**Rollback.** Pages keeps every deployment. Click any past deploy → "Rollback to this deployment". Instant.

**Database migrations.** When the schema changes, generate a Drizzle migration and apply it manually to Neon:
```bash
cd packages/database
pnpm db:generate              # creates drizzle/NNNN_<name>.sql
psql "$DATABASE_URL_NEON" < drizzle/NNNN_<name>.sql
```
Automate this in CI later (Cloudflare doesn't run migrations for you).

**Status page (P3.3).** Once production is up, swap the static status page for a real per-component status. Cloudflare doesn't have a built-in status page; Better Stack or Statuspage.io work. Or build one against Cloudflare Analytics API + the engagement_intake table.

**Cookie consent + analytics (P3.5).** The cookie banner already respects opt-in. Server-side analytics in `useAnalytics` only fires after consent. No extra Cloudflare setup needed.

**Custom OG image generation.** Per-page OG cards via Satori (P2 backlog) work in Workers, Satori has zero Node deps. When you implement, mount as an edge endpoint at `/api/og/[slug]`.

---

## What this guide doesn't cover

- **Admin app** (`apps/admin`, Kottster), that's a separate deploy (admin tools should not be public). Run on Hetzner or keep local. Connection string to the same Neon DB.
- **Email sending** (engagement-intake notifications to your inbox), Cloudflare Email Workers or Resend / Postmark. Wire a `defineEventHandler` post-insert hook to fire an email when a new submission lands.
- **Image transforms beyond static assets**, Cloudflare Images service or move IPX to `@nuxt/image` Cloudflare provider.

These are P3 backlog items; deploy first, polish after.

---

## Decision-readiness checklist before deploy

- [ ] Neon project created, connection string copied somewhere safe.
- [ ] Local DB dumped and restored to Neon (verify row counts match).
- [ ] `yba-gif/davion-web` GitHub repo created and `rebrand/davion` pushed.
- [ ] Cloudflare account has davion.com.tr DNS already.
- [ ] You have access to add Pages projects on the Cloudflare account.
- [ ] IP_HASH_SALT generated (`openssl rand -hex 16`) and saved.
- [ ] Optional: SCHEDULING_URL provisioned (Cal.com).
- [ ] Optional: DEMO_EMBED_URL provisioned (Loom).

Walk Steps 1–8 in order. Stop at any step that errors; the failure mode usually has a one-line fix.
