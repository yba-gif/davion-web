# Davion, Hetzner deploy guide

**Status:** v1 (2026-05-23). Replaces the Cloudflare Workers deploy path. Cloudflare Workers + NuxtHub + `@nuxtjs/i18n` had unresolved route-registration issues at the Workers runtime layer (locale routes didn't activate). Hetzner gives us a vanilla Node 22 server where Nuxt + i18n works without runtime caveats.

**Total time:** ~45 minutes for a fresh box; ~5 minutes per redeploy.

---

## What changes vs the Cloudflare setup

| Surface | Before (Cloudflare) | After (Hetzner) |
|---|---|---|
| Nuxt SSR + `/api/*` | Cloudflare Worker (NuxtHub) | Docker container on Hetzner CX21, Node 22 |
| Static assets | Cloudflare Static Assets binding | Served by Nuxt's node-server preset, fronted by Caddy with gzip/zstd + cache headers |
| Postgres | Neon (us-east-1) | Same Neon, no change |
| TLS | Cloudflare Universal SSL | Caddy + Let's Encrypt on the box; Cloudflare proxied in front |
| DNS | Cloudflare | Same Cloudflare zone, A record now points at Hetzner IP |
| Auto-deploy | git push -> Cloudflare CI builds | git push -> SSH + `./deploy.sh` (or GitHub Actions, future) |

Cost delta: Cloudflare Workers free → Hetzner CX21 (€5.83/mo, 4 vCPU, 8 GB RAM, 80 GB SSD, Falkenstein DE).

---

## Step 1, Provision a Hetzner Cloud server

1. https://hetzner.cloud → **New project** "Davion" if you don't have one.
2. **Add server**:
   - Location: **Falkenstein (fsn1)** or **Helsinki (hel1)**. Both EU, both align with the sovereign-AI positioning.
   - Image: **Ubuntu 24.04 LTS**.
   - Type: **CX21** (€5.83/mo) is the sensible default. CX11 (€4.15/mo) works but only has 2 GB RAM; the Nuxt build process can spike there. CX22 is fine too.
   - SSH key: add yours. (Settings → Security → SSH keys, paste `~/.ssh/id_ed25519.pub`.)
   - Name: `davion-web-1`.
   - Skip firewalls + backups for now (backups are €1/mo extra if you want them later).
3. Hit **Create & Buy now**. ~30 seconds.
4. Note the **public IPv4** address. You'll point Cloudflare DNS at it in step 6.

---

## Step 2, Harden the box (5 minutes)

SSH in:
```bash
ssh root@<HETZNER_IP>
```

Update + install essentials + non-root user:
```bash
apt-get update && apt-get upgrade -y
apt-get install -y ca-certificates curl gnupg ufw fail2ban

# Non-root deploy user.
adduser --disabled-password --gecos "" davion
usermod -aG sudo davion
mkdir -p /home/davion/.ssh
cp ~/.ssh/authorized_keys /home/davion/.ssh/
chown -R davion:davion /home/davion/.ssh
chmod 700 /home/davion/.ssh && chmod 600 /home/davion/.ssh/authorized_keys

# Firewall: SSH + HTTP + HTTPS only.
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Disable root SSH + password auth.
sed -i 's/^#*PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd
```

Log out, log back in as `davion`:
```bash
ssh davion@<HETZNER_IP>
```

---

## Step 3, Install Docker

```bash
# Docker Engine + Compose plugin (official repo, not Docker Desktop).
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Let davion run docker without sudo.
sudo usermod -aG docker davion
```

Log out + back in so the group change takes effect. Verify:
```bash
docker run --rm hello-world
```

---

## Step 4, Clone the repo

```bash
mkdir -p ~/apps && cd ~/apps
git clone https://github.com/yba-gif/davion-web.git
cd davion-web
git checkout rebrand/davion
```

---

## Step 5, Configure secrets

Create `.env` next to `docker-compose.yml`:
```bash
cat > .env <<'EOF'
# Required
DATABASE_URL=postgresql://neondb_owner:...@ep-...neon.tech/neondb?sslmode=require
IP_HASH_SALT=<output of `openssl rand -hex 16`>

# Optional, leave empty if not used
SCHEDULING_URL=
SCHEDULING_EMAIL=briefings@davion.com
DEMO_EMBED_URL=
EOF
chmod 600 .env
```

The Neon connection string is the same one we've been using on Cloudflare. (You'll want to rotate the Neon password at some point; once Hetzner is the source of truth, it's clean to do.)

Edit `Caddyfile` and replace `ops@davion.com` with a real address for Let's Encrypt expiry notices.

---

## Step 6, Point DNS at Hetzner

In the Cloudflare dashboard for `davion.com.tr`:

1. **DNS → Records**.
2. **Delete** any existing A/AAAA records pointing at Cloudflare Workers (the Workers Custom Domain wiring).
3. **Add** an A record:
   - Type: `A`
   - Name: `@`
   - IPv4 address: `<HETZNER_IP>`
   - Proxy status: **Proxied** (orange cloud). This keeps Cloudflare's DDoS + WAF in front; the origin IP isn't exposed.
   - TTL: Auto.
4. Repeat for `www`:
   - Type: `A`
   - Name: `www`
   - IPv4 address: `<HETZNER_IP>`
   - Proxied.
5. **SSL/TLS → Overview**: set encryption mode to **Full (strict)**. This makes Cloudflare verify the cert Caddy presents; Caddy issues a real Let's Encrypt cert at the origin.

DNS propagates inside Cloudflare's edge in seconds. Your local resolver may cache the old answer for a few minutes (same negative-cache trap we hit before).

---

## Step 7, Boot the stack

Still on the Hetzner box, in `~/apps/davion-web`:
```bash
docker compose up -d --build
```

First build is ~3 to 5 minutes (Node 22 base layer + pnpm install + Nuxt build). Subsequent rebuilds are fast (Docker caches layers).

Watch the logs:
```bash
docker compose logs -f
```

You'll see Caddy provision a Let's Encrypt cert (~30 seconds) and the Nuxt server listening on `0.0.0.0:3000`.

---

## Step 8, Smoke test

From your laptop:
```bash
curl -I https://davion.com.tr/
curl https://davion.com.tr/api/health
curl -I https://davion.com.tr/tr
curl -I https://davion.com.tr/de
```

Expected:
- `/` returns `HTTP/2 200`, `x-powered-by: Nuxt`.
- `/api/health` returns `{"status":"ok",...}`.
- `/tr` and `/de` return `HTTP/2 200` (the i18n module activates the locale routes now that we're on Node, not Workers).

In a real browser:
- https://davion.com.tr/ → Davion home in English (default).
- Click the **EN ▾** switcher in the header → pick **Türkçe** → URL becomes `/tr`, content switches.
- Reload → cookie remembers the choice.
- https://davion.com.tr/de/contact → form in German.

---

## Day 2 operations

### Deploy a new commit

From the Hetzner box:
```bash
cd ~/apps/davion-web
git pull
docker compose up -d --build
```

The build runs in seconds for code-only changes (no `pnpm install` needed). Caddy stays up; only the web container rebuilds.

### View logs

```bash
docker compose logs -f web        # Nuxt server
docker compose logs -f caddy      # Caddy + TLS issuance
```

### Restart, stop, full clean

```bash
docker compose restart            # restart all services
docker compose stop               # stop all, keep volumes
docker compose down               # stop + remove containers
docker compose down -v            # also nuke Caddy data (cert state). Avoid unless reissuing certs.
```

### Database migrations

Drizzle migrations run from your laptop against Neon, same as before:
```bash
cd packages/database
pnpm db:generate
psql "$NEON_URL" < drizzle/NNNN_<name>.sql
```

### Update the OS

Hetzner Ubuntu auto-installs security updates via unattended-upgrades. For minor releases:
```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo reboot   # if kernel updated
```

---

## What still lives elsewhere

- **DNS, WAF, DDoS protection**: still Cloudflare (zone unchanged).
- **Postgres**: still Neon. Consider migrating to a Hetzner Postgres + automatic backups later if you want full sovereignty.
- **Object storage** (logos, OG, hero image): currently served by Nuxt out of `apps/web/public/`. Fine as-is. If you ever ship large assets (PDFs, datasheets), add an S3-compatible bucket and switch.
- **Email**: not deployed yet. When you wire engagement-form notifications, use a transactional service (Postmark, Resend) or self-host with Postfix + DKIM.

---

## Rollback to Cloudflare (if needed)

The Cloudflare deploy path is preserved. Two changes to revert:

1. **Reactivate NuxtHub**: build with `NUXT_DEPLOY_TARGET=cloudflare` (the `apps/web/package.json` script `build:cloudflare` already does this).
2. **DNS**: point `@` and `www` back at the Cloudflare Workers Custom Domain. The Worker `davion-web.yusuf-bba.workers.dev` is still deployed; the Custom Domain wiring is what changed in step 6.

The i18n module is the only thing that won't work on Cloudflare without further investigation; revert it on the Cloudflare path if needed, or invest in fixing the route-registration issue at the Workers layer.

---

## Decision-readiness checklist

- [ ] Hetzner Cloud account active, payment on file.
- [ ] CX21 server provisioned in fsn1 or hel1.
- [ ] SSH key wired, can connect as the `davion` user.
- [ ] Docker + Compose installed.
- [ ] `.env` with real `DATABASE_URL` and `IP_HASH_SALT`.
- [ ] Cloudflare DNS A records updated to Hetzner IP, proxied.
- [ ] Cloudflare SSL/TLS mode set to **Full (strict)**.
- [ ] `docker compose up -d --build` succeeded.
- [ ] Production smoke test passed (home, /api/health, /tr, /de, contact form).
