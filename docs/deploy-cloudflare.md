# Davion, Cloudflare Workers + Neon Postgres deploy guide

**Status:** v2 (2026-05-22). Targets Cloudflare's new Workers + Static Assets path (deployed via `wrangler deploy`), not the legacy Pages Functions path. davion.com.tr already lives on Cloudflare DNS; this guide wires the Nuxt 3 SSR + Postgres backend to a Cloudflare Worker and Neon.

**Total time:** ~60 minutes if everything goes smoothly. Most of that is Neon signup + DB migration + first build.

---

## What this gets you

| Surface | Where it runs |
|---|---|
| Nuxt 3 SSR + all `/api/*` endpoints | Cloudflare Worker (Nitro `cloudflare_module` preset), `nodejs_compat` flag on |
| Postgres (blog, engagement_intake, analytics, settings) | Neon serverless Postgres |
| Static assets (images, CSS, JS bundles) | Cloudflare Workers Static Assets at the edge |
| `davion.com.tr` DNS + SSL + WAF | Cloudflare DNS (already configured) |

Cost: Neon free tier (10 GB, no idle limits for projects under 190h/mo) + Cloudflare Workers free tier (100,000 requests/day, unlimited bandwidth). **€0 / month** to launch.

---

## Step 1, Provision Neon (DONE if you already ran `neonctl init`)

1. Sign up at https://neon.tech with your `yba-gif` GitHub.
2. **Create project** named `davion`. Pick Frankfurt or Helsinki for EU/sovereign coherence (the default us-east-1 works too if speed matters more than data residency right now).
3. After provisioning, copy the **connection string**. Looks like:
   ```
   postgresql://neondb_owner:XXX@ep-something-12345678-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Save it somewhere safe, you paste it into the Worker secrets in Step 4.

---

## Step 2, Migrate the local dev DB to Neon

Your local `davion` database has the seeded newsroom posts, settings, and any engagement test rows. Move them now.

```bash
# Dump the local schema + data
pg_dump --no-owner --no-acl --clean --if-exists \
  postgresql://bek@localhost:5432/davion \
  > /tmp/davion-snapshot.sql

# Push to Neon (substitute your real Neon connection string)
export NEON_URL='postgresql://neondb_owner:...@ep-...neon.tech/neondb?sslmode=require'
psql "$NEON_URL" --quiet -v ON_ERROR_STOP=1 < /tmp/davion-snapshot.sql

# Verify
psql "$NEON_URL" -tA -c "
  SELECT 'blog_posts:        ' || COUNT(*) FROM blog_posts UNION ALL
  SELECT 'engagement_intake: ' || COUNT(*) FROM engagement_intake;
"
```

Optional sanity check: confirm the edge driver can talk to Neon over HTTP (the same code path the Worker uses at runtime):

```bash
cd packages/database
NEON_URL='postgresql://...' pnpm db:test:neon
```

---

## Step 3, Choose your deploy mechanism

You have two equivalent paths. Pick one.

### A. Git-connected (auto-deploy on push), recommended

1. https://dash.cloudflare.com → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorise Cloudflare to access `yba-gif/davion-web`. Pick it.
3. **Production branch:** `rebrand/davion` (or `main` once you merge).
4. **Build configuration:**
   - Framework preset: **Nuxt.js** (Cloudflare may also offer "Nuxt (Workers)", pick that one if shown).
   - Build command: `cd apps/web && pnpm install --frozen-lockfile && pnpm build:cloudflare`
   - Build output directory: `apps/web/.output`
   - Root directory: `/` (repo root, not `apps/web`)
   - **Deploy command** (the one Cloudflare shows by default): `cd apps/web && npx wrangler deploy`
5. **Don't deploy yet**, finish secrets + flags first.

### B. Manual deploy from your laptop

```bash
cd apps/web
pnpm install
pnpm build:cloudflare       # NITRO_PRESET=cloudflare_module nuxt build
npx wrangler login          # one-time, opens browser
npx wrangler deploy         # uses ./wrangler.toml
```

You still need to configure secrets + custom domain in the dashboard. Use this path if you want one-off deploys before the Git integration is set up.

---

## Step 4, Set secrets and env vars

Open the Worker in the dashboard: **Workers & Pages → davion-web → Settings → Variables and Secrets**.

| Type | Name | Value |
|---|---|---|
| **Secret** | `DATABASE_URL` | Your Neon connection string from Step 1. |
| **Secret** | `IP_HASH_SALT` | A random 32-char string. Generate via `openssl rand -hex 16`. Used for engagement-intake IP hashing. |
| Plain | `SCHEDULING_URL` | (optional) Cal.com / Calendly URL. When set, the home/contact SchedulingEmbed iframe activates. |
| Plain | `SCHEDULING_EMAIL` | (optional, defaults to `briefings@davion.com`) |
| Plain | `DEMO_EMBED_URL` | (optional) Loom / Vimeo URL. When set, the AlpOS demo embed activates. |

Use **Secret** for `DATABASE_URL` and `IP_HASH_SALT` (encrypted at rest, masked in the UI). Plain text for the optional scheduling/demo URLs.

CLI alternative for secrets:
```bash
cd apps/web
echo "postgresql://neondb_owner:...@neon.tech/neondb?sslmode=require" | npx wrangler secret put DATABASE_URL
openssl rand -hex 16 | npx wrangler secret put IP_HASH_SALT
```

---

## Step 5, Compatibility flags

In the Worker: **Settings → Compatibility → Compatibility flags**.

- Add `nodejs_compat`.
- Set Compatibility date to `2024-11-01` or later.
- Apply for both Production and Preview environments.

`nodejs_compat` is required because:
- The engagement-form intake uses `node:crypto` for IP hashing.
- Drizzle's `neon-http` adapter expects a few Node compatibility shims.
- @nuxt/image / IPX uses Buffer internally.

---

## Step 6, First deploy

If you used path **A** (Git-connected): trigger a deploy from the dashboard ("Retry deployment" or push any commit to the branch). The build runs:
1. `pnpm install --frozen-lockfile`
2. `pnpm build:cloudflare`, Nuxt builds with NITRO_PRESET=cloudflare_module. Output lands in `.output/server/index.mjs` + `.output/public/`.
3. Cloudflare runs `npx wrangler deploy`, which uses `apps/web/wrangler.toml` to register the Worker and bind the assets.

If you used path **B** (manual): the `npx wrangler deploy` you ran already pushed it.

If the build fails, common fixes:
- **"Cannot find preset cloudflare_module"**, the build is using an old Nitro version. Confirm `nuxt` and `nitropack` are recent (Nuxt ≥ 3.17, Nitro ≥ 2.10).
- **"Module not found: pg-native"**, safe to ignore (warning, not error).
- **Worker bundle too large (>1 MiB on free tier)**, increase via the paid plan or trim deps. Davion's bundle should sit well under the limit.

When successful, the Worker is live at `davion-web.<your-subdomain>.workers.dev`. Visit. Confirm:
- Home renders.
- `/api/health` returns `{ ok: true }`.
- `/company/newsroom` lists the migrated posts (proves Neon connection works).
- Submit the engagement form, ticket code returned, row in Neon.

---

## Step 7, Wire `davion.com.tr`

In the Worker: **Settings → Domains & Routes → Add → Custom domain**.

1. Enter `davion.com.tr` (apex / root).
2. Cloudflare detects the domain is on the same account and offers to wire it automatically. Confirm.
3. Wait ~1 minute. SSL provisions automatically (Cloudflare Universal SSL).
4. Test:
   ```bash
   curl -I https://davion.com.tr/
   ```
   Should return HTTP 200.

Also add `www.davion.com.tr` if you want the www variant.

---

## Step 8, Smoke test in production

Walk these paths in a real browser:
- `/`, hero, spiral, nav, footer.
- `/solutions/alpos`, long page, right-rail TOC, demo embed fallback, console carousel.
- `/industries/financial-services`, depth page.
- `/company/newsroom`, filter chips, real posts.
- `/contact`, engagement form. Submit a test entry, confirm row in Neon.
- `/legal/privacy`, accessible.
- Mobile (iPhone), hero spiral crop fits.

Then clean up the test submission:
```bash
psql "$NEON_URL" -c "DELETE FROM engagement_intake WHERE email = 'your-test-email';"
```

---

## Operational notes

**Logs.** `npx wrangler tail` from `apps/web/` for live streaming, or open the Worker dashboard → Logs.

**Rollback.** Workers keeps every version. Workers dashboard → Deployments → pick a past version → Rollback. Instant.

**Database migrations.** When the schema changes, generate a Drizzle migration and apply manually to Neon:
```bash
cd packages/database
pnpm db:generate              # creates drizzle/NNNN_<name>.sql
psql "$NEON_URL" < drizzle/NNNN_<name>.sql
```
Automate in CI later; Cloudflare does not run migrations for you.

**Status page (P3.3).** Once live, swap the static status page for real per-component data. Better Stack or Statuspage.io are easiest; or build a custom one against Cloudflare Analytics API + the engagement_intake table.

**Email notifications.** When a new engagement_intake lands, send a notification. Cloudflare Email Workers, Resend, or Postmark all work. Wire a post-insert hook in `server/api/engagement/intake.post.ts`.

**Cookie consent + analytics.** The cookie banner already gates analytics. No extra Cloudflare setup needed; if you want server-side analytics, add Cloudflare Web Analytics (cookie-less) via the dashboard.

---

## What this guide doesn't cover

- **Admin app** (`apps/admin`, Kottster). Run on Hetzner or keep local. Connect to the same Neon DB.
- **Image transforms beyond static assets**. Cloudflare Images service or `@nuxt/image` Cloudflare provider.
- **Multi-environment** (staging vs prod). Use `wrangler --env staging` and a `[env.staging]` block in wrangler.toml.

These are P3 backlog items; ship first, polish after.

---

## Decision-readiness checklist

- [x] Neon project created, connection string saved.
- [x] Local DB dumped and restored to Neon (`pnpm db:test:neon` passed).
- [x] `yba-gif/davion-web` GitHub repo created and `rebrand/davion` pushed.
- [x] Cloudflare account has `davion.com.tr` DNS already.
- [ ] You have access to add Workers projects on the Cloudflare account.
- [ ] `IP_HASH_SALT` generated and saved.
- [ ] Optional: `SCHEDULING_URL` and `DEMO_EMBED_URL` provisioned.

Walk Steps 3 to 8 in order. Stop at any step that errors; the failure mode usually has a one-line fix.
