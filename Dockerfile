# syntax=docker/dockerfile:1
#
# Davion web, production image for Hetzner (or any vanilla Linux host).
#
# Multi-stage: deps -> build -> runner. The final image is ~150 MB and
# only contains the Nuxt server output plus a pinned Node 22 runtime.
# No pnpm, no source, no devDependencies in the runtime layer.
#
# Replaces the contractor-era multi-target Dockerfile (web + admin
# + postgres-client). We use Neon for postgres and the admin app
# isn't deployed here, so the runtime image is much leaner.
#
# Build:
#   docker build -t davion-web .
#
# Run:
#   docker run --rm -p 3000:3000 \
#     -e DATABASE_URL=postgresql://... \
#     -e IP_HASH_SALT=... \
#     davion-web
#
# Or via docker compose (recommended): see docker-compose.yml at repo root.

FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate

# --- Stage 1: install workspace deps ---
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY apps/admin/package.json ./apps/admin/
COPY packages/database/package.json ./packages/database/
RUN pnpm install --frozen-lockfile --prefer-offline

# --- Stage 2: build ---
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/database/node_modules ./packages/database/node_modules

# Source.
COPY pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps/web ./apps/web

# Build with the default node-server Nitro preset. NUXT_DEPLOY_TARGET is
# left unset so the nuxt.config.ts conditional skips NuxtHub (which only
# makes sense on Cloudflare).
ENV NODE_ENV=production
RUN pnpm --filter web build

# --- Stage 3: minimal runtime ---
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache tini wget \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nuxt -u 1001 -G nodejs

# Nitro's node-server preset produces a self-contained .output directory
# with its own node_modules. Copy just that.
COPY --from=build --chown=nuxt:nodejs /app/apps/web/.output ./

USER nuxt
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
EXPOSE 3000

# tini PID 1 so SIGTERM cleanly stops Node on `docker stop`.
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server/index.mjs"]
