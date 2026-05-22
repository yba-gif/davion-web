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

    modules: ['@nuxt/image', '@nuxt/icon', '@nuxtjs/tailwindcss', '@nuxthub/core'],

    // P3.6: NuxtHub is the official Cloudflare integration for Nuxt 3. It
    // configures Nitro for the modern Workers + Static Assets path
    // automatically, sidestepping Nitro 2.12's cloudflare-module preset
    // aliasing back to cloudflare-module-legacy (which imports the
    // deprecated __STATIC_CONTENT_MANIFEST global and fails at the
    // Cloudflare API validation step). All hub-* features (database, kv,
    // blob, ai, browser, vectorize) are intentionally left disabled.
    // Davion uses Neon Postgres via drizzle, not NuxtHub's D1 wrapper.
    hub: {},

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
                // P0.3: meta + OG aligned to the new home hero (Variant A, clarity-first).
                { name: 'description', content: 'Sovereign AI for institutions whose data can\'t leave. The platform banks, ministries, and energy operators use when decisions must be defensible, auditable, and made on data that never enters a public cloud.' },
                // QW.6: theme-color now matches the brand green (was #0A0B0F, unrelated dark).
                { name: 'theme-color', content: '#60E576' },

                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: 'Davion, Sovereign AI for institutions whose data can\'t leave' },
                { name: 'twitter:description', content: 'The platform banks, ministries, and energy operators use when decisions must be defensible, auditable, and made on data that never enters a public cloud.' },
                { name: 'twitter:image', content: '/og-cover.png' },

                // Open Graph (P1.6: default OG card lives at /og-cover.png, placeholder
                // until P2.3 identity refresh; per-page cards via Satori land in P2.)
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'Davion, Sovereign AI for institutions whose data can\'t leave' },
                { property: 'og:description', content: 'The platform banks, ministries, and energy operators use when decisions must be defensible, auditable, and made on data that never enters a public cloud.' },
                { property: 'og:image', content: '/og-cover.png' },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },
                { property: 'og:image:alt', content: 'Davion, Sovereign AI for institutions whose data can\'t leave.' },
                { property: 'og:site_name', content: 'Davion' },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
                // P0.6: preload the LCP hero image (WebP, 1600w variant) to ensure
                // the spiral lands in the LCP budget on first paint.
                { rel: 'preload', as: 'image', href: '/section_background-1600.webp', type: 'image/webp', fetchpriority: 'high' },
            ],
        },
    },
})
