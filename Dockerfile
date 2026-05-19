# syntax=docker/dockerfile:1

# ===================================================================
# Base Stage - Common dependencies and build tools
# ===================================================================
FROM node:20-alpine AS base

# Install system dependencies in single layer
RUN apk add --no-cache \
    postgresql-client \
    curl \
    git \
    dumb-init \
    && npm install -g pnpm@10.13.1 \
    && rm -rf /var/cache/apk/*

# Create application directory
WORKDIR /app

# Copy package manager files for better layer caching
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY turbo.json ./

# Copy package.json files for dependency resolution
COPY apps/web/package.json ./apps/web/
COPY apps/admin/package.json ./apps/admin/
COPY packages/database/package.json ./packages/database/

# Install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile

# Copy source code (this layer changes most frequently)
COPY packages ./packages
COPY apps ./apps
COPY eslint.config.mjs ./

# ===================================================================
# Database Package Build
# ===================================================================
FROM base AS database-build
WORKDIR /app/packages/database
RUN pnpm run db:generate && pnpm run build

# ===================================================================
# Web Application Build
# ===================================================================
FROM base AS web-build
# Copy database artifacts
COPY --from=database-build /app/packages/database ./packages/database
WORKDIR /app/apps/web
RUN pnpm run build

# ===================================================================
# Admin Application Build  
# ===================================================================
FROM base AS admin-build
# Copy database artifacts
COPY --from=database-build /app/packages/database ./packages/database
WORKDIR /app/apps/admin
RUN pnpm run build

# ===================================================================
# Web Production Image - Optimized
# ===================================================================
FROM node:20-alpine AS web

# Install only runtime dependencies
RUN apk add --no-cache \
    curl \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxt -u 1001 -G nodejs

WORKDIR /app

# Copy built application with proper ownership
COPY --from=web-build --chown=nuxt:nodejs /app/apps/web/.output ./

# Copy database package for runtime (if dist exists)
COPY --from=database-build --chown=nuxt:nodejs /app/packages/database ./packages/database

# Copy optimized startup script
COPY --chown=nuxt:nodejs docker/startup.sh ./startup.sh
RUN chmod +x ./startup.sh

USER nuxt

# Environment variables
ENV NODE_ENV=production \
    NITRO_PORT=3000 \
    NITRO_HOST=0.0.0.0

EXPOSE 3000

# Optimized health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

ENTRYPOINT ["dumb-init", "--", "./startup.sh"]
CMD ["node", "server/index.mjs"]

# ===================================================================
# Admin Production Image - Optimized
# ===================================================================
FROM node:20-alpine AS admin

# Install runtime dependencies
RUN apk add --no-cache \
    curl \
    dumb-init \
    && npm install -g pnpm@10.13.1 \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S kottster -u 1001 -G nodejs

WORKDIR /app

# Copy workspace configuration for production dependencies
COPY --chown=kottster:nodejs pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY --chown=kottster:nodejs apps/admin/package.json ./apps/admin/
COPY --chown=kottster:nodejs packages/database/package.json ./packages/database/

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile --filter=admin \
    && rm -rf /root/.npm /root/.pnpm-store

# Copy built application
COPY --from=admin-build --chown=kottster:nodejs /app/apps/admin/dist ./apps/admin/dist
COPY --from=admin-build --chown=kottster:nodejs /app/apps/admin/kottster-app.json ./apps/admin/

# Copy database package for runtime
COPY --from=database-build --chown=kottster:nodejs /app/packages/database ./packages/database

USER kottster
WORKDIR /app/apps/admin

# Environment variables
ENV NODE_ENV=production

EXPOSE 5480 5481

# Optimized health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server/server.cjs"]

# ===================================================================
# Database Migration Image - Optimized
# ===================================================================
FROM node:20-alpine AS db-migrate

# Install dependencies
RUN apk add --no-cache \
    postgresql-client \
    dumb-init \
    && npm install -g pnpm@10.13.1 \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy minimal required files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/database/package.json ./packages/database/

# Install dependencies
RUN pnpm install --frozen-lockfile --filter=database \
    && rm -rf /root/.npm /root/.pnpm-store

# Copy database package
COPY packages/database ./packages/database

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S migrator -u 1001 -G nodejs && \
    chown -R migrator:nodejs /app

USER migrator
WORKDIR /app/packages/database

ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "run", "db:migrate"]

# ===================================================================
# Development Image - Optimized
# ===================================================================
FROM base AS development

# Install development tools
RUN apk add --no-cache \
    bash \
    vim \
    htop \
    && npm install -g nodemon concurrently \
    && rm -rf /var/cache/apk/*

# Create development user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S developer -u 1001 -G nodejs && \
    chown -R developer:nodejs /app

# Environment
ENV NODE_ENV=development

EXPOSE 3000 5480 5481

WORKDIR /app

ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "echo 'Development container ready. Use specific service commands.'"]