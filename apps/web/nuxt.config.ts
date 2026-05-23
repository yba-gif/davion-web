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
        format: ['webp', 'png', 'jpg'],
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
        },
    },
})
