// Deploy target detection. NUXT_DEPLOY_TARGET=cloudflare is set by the
// Cloudflare build script; everything else (Hetzner Docker, local dev,
// `pnpm dev`) builds for a vanilla Node runtime and skips NuxtHub +
// Cloudflare-specific config.
const isCloudflare = process.env.NUXT_DEPLOY_TARGET === 'cloudflare'

export default defineNuxtConfig({
    devtools: { enabled: true },

    runtimeConfig: {
        databaseUrl: process.env.DATABASE_URL,
        minioEndpoint: process.env.MINIO_ENDPOINT,
        minioPort: process.env.MINIO_PORT,
        minioAccessKey: process.env.MINIO_ACCESS_KEY,
        minioSecretKey: process.env.MINIO_SECRET_KEY,
        minioUseSSL: process.env.MINIO_USE_SSL,
        public: {
            apiBase: '/api',
            minioPublicUrl: process.env.MINIO_PUBLIC_URL,
            // P0.U3: scheduling URL. Replaced via SCHEDULING_URL env var once a
            // Cal.com / Calendly link is provisioned. Until then, the contact
            // page renders a fallback message + mailto.
            schedulingUrl: process.env.SCHEDULING_URL || '',
            schedulingEmail: process.env.SCHEDULING_EMAIL || 'briefings@davion.com',
            // P2.U5: Loom (or other) demo video URL. Iframe activates on AlpOS when
            // set; honest fallback otherwise. Use the embed-friendly Loom share URL,
            // e.g. https://www.loom.com/embed/<id>
            demoEmbedUrl: process.env.DEMO_EMBED_URL || '',
            demoLength: process.env.DEMO_LENGTH || '90 seconds',
        },
    },

    css: ['~/assets/css/main.css'],

    modules: [
        '@nuxt/image',
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        // NuxtHub configures Nitro for Cloudflare Workers. Skip on Hetzner
        // (or any non-Cloudflare deploy) so we don't load Cloudflare-
        // specific bindings (env.ASSETS, NuxtHub remote services, etc.)
        // that don't exist outside the Workers runtime.
        ...(isCloudflare ? ['@nuxthub/core' as const] : []),
        '@nuxtjs/i18n',
    ] as string[],

    // P4.1: Trilingual site (English / Turkish / German). English is the
    // default and lives at the bare apex (davion.com.tr/about); other
    // locales get prefixed (/tr/about, /de/about). First-visit browser
    // language detection happens only on the root path, then a cookie
    // (davion_lang) remembers the pick. Manual switch from the header
    // always wins.
    //
    // Cloudflare Workers + NuxtHub specifics:
    // - lazy: false bundles all three locale files into the worker. The
    //   dynamic-import path of `lazy: true` doesn't reliably resolve
    //   under the Workers runtime + NuxtHub's nitro preset, and the
    //   delta in bundle size for three small JSON files is negligible.
    // - bundle.optimizeTranslationDirective: false disables the build
    //   step that tries to rewrite <i18n-t> at compile time, which is
    //   another path that uses eval-ish features Workers can't run.
    // - compilation.strictMessage: false keeps the message format
    //   permissive so we can carry brand HTML (<strong>, <em>) inside
    //   translated strings on the about page.
    i18n: {
        locales: [
            { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
            { code: 'tr', language: 'tr-TR', name: 'Türkçe', file: 'tr.json' },
            { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
        ],
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        lazy: false,
        langDir: 'locales/',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'davion_lang',
            redirectOn: 'root',
            fallbackLocale: 'en',
        },
        bundle: {
            optimizeTranslationDirective: false,
        },
        compilation: {
            strictMessage: false,
        },
    },

    image: {
        dir: 'public',
        quality: 90,
        // P3.6 (2026-05-25): AVIF added at the front of the format ladder.
        // @nuxt/image runs IPX content negotiation: the browser's Accept
        // header is matched against this list in order, so AVIF-capable
        // clients (Chrome 85+, Safari 16.4+, Firefox 113+ — ~95% of 2026
        // traffic) get the smaller variant; older browsers fall through to
        // webp → png/jpg. Build-time cost: one more IPX pass per source
        // image; payoff: ~25–35% smaller hero + content images.
        format: ['avif', 'webp', 'png', 'jpg'],
    },

    components: {
        global: true,
        dirs: ['~/components'],
    },

    tailwindcss: {
        configPath: './tailwind.config.ts',
    },
    icon: {
        customCollections: [
            {
                prefix: 'base',
                dir: './assets/icons',
            },
        ],
    },

    ssr: true,

    // P3.6: Cloudflare Workers target.
    // NuxtHub (above) selects the right Nitro preset automatically when
    // building on Cloudflare. Locally `pnpm dev` falls through to the
    // default Node preset; the NITRO_PRESET env var is still honored as
    // an escape hatch if someone needs to force a specific preset.
    //
    // Rollup externals: postgres-js pulls in `cloudflare:sockets` from its
    // CF polyfill stub; @neondatabase/serverless and a few others can hit
    // the other cloudflare:* runtime built-ins. The Workers runtime
    // provides each at execution time, so we just need Rollup to leave
    // the import statements alone instead of trying to bundle them.
    nitro: {
        preset: process.env.NITRO_PRESET || undefined,
        rollupConfig: {
            external: [
                'cloudflare:sockets',
                'cloudflare:workers',
                'cloudflare:email',
            ],
        },
        // P2.2 (2026-05-25 audit): prerender static-content pages at build time.
        // Routes listed in `routeRules` with `prerender: true` get crawled at
        // build and emitted as static HTML under `.output/public/`. crawlLinks
        // follows internal <NuxtLink>s during prerendering so the locale-prefix
        // variants (/tr/solutions/alpos, /de/industries/energy, …) are
        // automatically discovered without enumerating each one here.
        //
        // Only home + newsroom stay SSR (they pull DB data). Everything else
        // serves as a static file from disk — TTFB target <20ms.
        prerender: {
            crawlLinks: true,
            failOnError: false,
            // Entry points the crawler starts from. Each one yields its full
            // page tree via internal links.
            routes: [
                '/sitemap.xml',
                '/robots.txt',
            ],
            // Routes we never want to prerender even if discovered via crawl —
            // home + newsroom (dynamic content), api endpoints, IPX image
            // pipeline, every error / 404 fallback.
            ignore: [
                '/',
                '/tr',
                '/de',
                '/company/newsroom',
                '/company/newsroom/**',
                '/tr/company/newsroom',
                '/tr/company/newsroom/**',
                '/de/company/newsroom',
                '/de/company/newsroom/**',
                '/api/**',
                '/_ipx/**',
                '/_nuxt/**',
            ],
        },
    },

    // P0.1 (2026-05-24 audit): cache the two Postgres-backed endpoints that
    // gate home-page SSR. Before this, every home pageview blocked on two
    // sequential Neon round-trips (Hetzner Falkenstein → us-east-1) for a
    // 1.12s origin TTFB. After: 5min cache on settings (changes ~once a
    // quarter), 60s cache + stale-while-revalidate on newsroom (acceptable
    // staleness for marketing-site posts).
    //
    // P2.2: routeRules-driven prerender for the static-content pages. Nuxt
    // discovers the routes via the page tree + locale variants; for each
    // matched route it pre-renders the HTML at build time. Serving cost on
    // the box drops from "spin up SSR per request" to "read file from disk."
    routeRules: {
        '/api/settings': { cache: { maxAge: 60 * 5 } },
        '/api/blog':     { cache: { maxAge: 60, swr: true } },
        // Per-post detail also hits Postgres on every SSR. Short TTL because
        // editorial corrections to a published post should propagate fast.
        '/api/blog/**':  { cache: { maxAge: 60, swr: true } },

        // Static-content pages — prerender at build time. The locale prefixes
        // (tr/, de/) get the same treatment via crawlLinks (set in nitro
        // config above).
        '/solutions':       { prerender: true },
        '/solutions/**':    { prerender: true },
        '/industries':      { prerender: true },
        '/industries/**':   { prerender: true },
        '/capabilities':    { prerender: true },
        '/capabilities/**': { prerender: true },
        '/legal/**':        { prerender: true },
        '/trust':           { prerender: true },
        '/venture':         { prerender: true },
        '/status':          { prerender: true },
        '/press':           { prerender: true },
        '/contact':         { prerender: true },
        '/company/about':   { prerender: true },
        '/company/careers': { prerender: true },
        '/company/events':  { prerender: true },
    },

    build: {
        transpile: ['@base1/database', 'swiper'],
    },

    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
        head: {
            title: 'Davion',
            titleTemplate: '%s · Davion',
            meta: [
                // P0.3: meta + OG aligned to the home hero. Headline reuses the same
                // copy as pages.hero.headline so the meta you see in 'View Source' on /
                // matches what the visible H1 says. Update this whenever the hero
                // changes — these strings get baked into the SSR renderer at build
                // time (they're the fallback, useSeoMeta in pages/index.vue overrides
                // at runtime but the initial HTML response carries these by default).
                { name: 'description', content: 'Decision infrastructure for data that can\'t leave. The platform banks, ministries, and energy operators use when decisions must be defensible, auditable, and made on data that never enters a public cloud.' },
                // QW.6: theme-color now matches the brand green (was #0A0B0F, unrelated dark).
                { name: 'theme-color', content: '#60E576' },

                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: 'Davion, Decision infrastructure for data that can\'t leave' },
                { name: 'twitter:description', content: 'The platform banks, ministries, and energy operators use when decisions must be defensible, auditable, and made on data that never enters a public cloud.' },
                { name: 'twitter:image', content: '/og-cover.png' },

                // Open Graph (P1.6: default OG card lives at /og-cover.png, placeholder
                // until P2.3 identity refresh; per-page cards via Satori land in P2.)
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'Davion, Decision infrastructure for data that can\'t leave' },
                { property: 'og:description', content: 'The platform banks, ministries, and energy operators use when decisions must be defensible, auditable, and made on data that never enters a public cloud.' },
                { property: 'og:image', content: '/og-cover.png' },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },
                { property: 'og:image:alt', content: 'Davion, Decision infrastructure for data that can\'t leave.' },
                { property: 'og:site_name', content: 'Davion' },
            ],
            link: [
                // Favicon set. Multiple sizes so browsers pick the best fit:
                //   32px for tab favicon, 192px for Android home-screen, 180px
                //   apple-touch-icon for iOS. All generated from the master
                //   1000x1000 source via `pnpm build:logo`.
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo-32.png' },
                { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/logo-192.png' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                // P0.6: preload the LCP hero image (WebP, 1600w variant) to ensure
                // the spiral lands in the LCP budget on first paint.
                { rel: 'preload', as: 'image', href: '/section_background-1600.webp', type: 'image/webp', fetchpriority: 'high' },
            ],
            // P0.7 (2026-05-24 audit): JSON-LD structured data. Two nodes in one
            // graph: Organization (the company itself) + WebSite (the site, with
            // potentialAction so Google can render a sitelink-searchbox in SERP).
            // Validates via Google Rich Results Test → expect "Organization
            // detected, WebSite detected, no errors".
            //
            // Why inline (not @nuxtjs/schema-org module): single-config, no new
            // dep, no lockfile churn, no per-page overhead. When the proof
            // system (P3.1) ships, switch to @nuxtjs/schema-org for per-page
            // Article / Service / Person nodes.
            script: [
                {
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            {
                                '@type': 'Organization',
                                '@id': 'https://davion.com.tr/#organization',
                                'name': 'Davion',
                                'url': 'https://davion.com.tr/',
                                'logo': {
                                    '@type': 'ImageObject',
                                    'url': 'https://davion.com.tr/logo-512.png',
                                    'width': 512,
                                    'height': 512,
                                },
                                'description': 'Decision infrastructure for data that can\'t leave. Sovereign platform for institutions whose data and decisions must stay inside their perimeter.',
                                'sameAs': [
                                    // Add LinkedIn, X/Twitter, GitHub when the brand
                                    // accounts are claimed. Empty array also valid.
                                ],
                            },
                            {
                                '@type': 'WebSite',
                                '@id': 'https://davion.com.tr/#website',
                                'url': 'https://davion.com.tr/',
                                'name': 'Davion',
                                'description': 'Decision infrastructure for data that can\'t leave.',
                                'publisher': { '@id': 'https://davion.com.tr/#organization' },
                                'inLanguage': ['en', 'tr', 'de'],
                            },
                        ],
                    }),
                },
            ],
        },
    },
})
