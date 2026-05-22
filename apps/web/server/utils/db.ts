// Single db handle for the Nuxt server. Picks driver based on deploy target:
//
//   - Local dev / Hetzner VPS / Docker: postgres-js (TCP).
//   - Cloudflare Pages / Workers: Neon HTTP driver.
//
// The build sets NITRO_PRESET=cloudflare-pages (or NUXT_DEPLOY_TARGET=cloudflare)
// to choose. At runtime we re-check via navigator.userAgent so the right
// driver is picked even if the build-time flag was missed.

import { createDatabase, createEdgeDatabase } from '@base1/database'

const config = useRuntimeConfig()

function isEdgeRuntime(): boolean {
    // Cloudflare Workers / Pages: `navigator.userAgent === 'Cloudflare-Workers'`
    // is the canonical detection.
    if (typeof navigator !== 'undefined' && (navigator as { userAgent?: string }).userAgent === 'Cloudflare-Workers') {
        return true
    }
    const preset = process.env.NITRO_PRESET || ''
    const target = process.env.NUXT_DEPLOY_TARGET || ''
    // Matches both 'cloudflare_module' (Workers) and 'cloudflare-pages' (legacy Pages),
    // since both run inside the Workers runtime and need the Neon HTTP driver.
    return preset.startsWith('cloudflare') || target === 'cloudflare'
}

function getDatabaseUrl(): string {
    const envUrl = config.databaseUrl as string | undefined
    let dbUrl = envUrl || process.env.DATABASE_URL || 'postgresql://postgres:prod_secure_password_2025@postgres:5432/base1'

    const isInContainer = process.env.HOSTNAME?.includes('base1')
        || process.env.DOCKER_CONTAINER === 'true'

    if (!isInContainer && (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV)) {
        dbUrl = dbUrl.replace('@postgres:', '@localhost:')
    }

    return dbUrl
}

const url = getDatabaseUrl()
export const db = isEdgeRuntime() ? createEdgeDatabase(url) : createDatabase(url)
