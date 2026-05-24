// /sitemap.xml — search-engine discovery for all 35 routes × 3 locales.
//
// Hand-rolled rather than via @nuxtjs/sitemap to avoid adding a new dep
// (would require regenerating pnpm-lock + a docker build re-pin). The
// routes list below mirrors the pages/ directory. When you add a new
// page, add it here. A future P3 item is to auto-generate this from the
// Nuxt pages manifest at build time.
//
// Newsroom posts: live in Postgres, slugs are dynamic. We fetch them at
// request time and inject into the sitemap. Cached by P0.1 routeRules
// so the hit is sub-100ms once warm.

interface BlogSlug { slug: string, publishedAt: string | null, updatedAt: string | null }

// Static routes. Listed in priority order (homepage first, legal last).
const staticRoutes = [
    '/',
    '/solutions',
    '/solutions/alpos',
    '/solutions/cybersecurity',
    '/solutions/digital-transformation',
    '/solutions/osint',
    '/industries',
    '/industries/financial-services',
    '/industries/energy',
    '/industries/defense-intelligence',
    '/industries/manufacturing',
    '/industries/life-sciences',
    '/industries/government',
    '/capabilities',
    '/capabilities/rag',
    '/capabilities/geospatial',
    '/capabilities/video-intelligence',
    '/capabilities/audio-analysis',
    '/capabilities/translation',
    '/capabilities/data-acquisition',
    '/trust',
    '/contact',
    '/press',
    '/status',
    '/company/about',
    '/company/careers',
    '/company/newsroom',
    // /company/events and /venture are intentionally omitted while they're
    // empty-state placeholders (per P0.6 audit decision).
    '/legal/privacy',
    '/legal/terms',
    '/legal/cookies',
    '/legal/responsible-ai',
]

const locales = ['', '/tr', '/de'] as const

export default defineEventHandler(async (event) => {
    const baseUrl = 'https://davion.com.tr'

    // Try to pull newsroom slugs. If the API errors (DB down, etc.), we still
    // serve the static portion of the sitemap — degrading gracefully is better
    // than 500ing on a discovery URL.
    let blogSlugs: BlogSlug[] = []
    try {
        const res = await $fetch<{ success: boolean, data: BlogSlug[] }>('/api/blog', { query: { limit: 100 } })
        if (res?.success && Array.isArray(res.data)) {
            blogSlugs = res.data
        }
    }
    catch {
        // Sitemap continues without newsroom URLs.
    }

    const urls: Array<{ loc: string, lastmod?: string }> = []

    // Static routes × 3 locales = 90 URLs.
    for (const loc of locales) {
        for (const route of staticRoutes) {
            urls.push({ loc: `${baseUrl}${loc}${route === '/' ? '' : route}` || baseUrl })
        }
    }

    // Newsroom posts × 3 locales (slug shared; content currently English-only
    // but the per-locale URL serves the same content under each prefix).
    for (const loc of locales) {
        for (const post of blogSlugs) {
            const lastmod = post.updatedAt || post.publishedAt
            urls.push({
                loc: `${baseUrl}${loc}/company/newsroom/${post.slug}`,
                lastmod: lastmod ? new Date(lastmod).toISOString().split('T')[0] : undefined,
            })
        }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`

    setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
    // Cache the sitemap itself for an hour at the edge — bots re-poll
    // periodically, no need to regenerate per request.
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')
    return xml
})
