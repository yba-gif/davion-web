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
        },
    },

    css: ['~/assets/css/main.css'],

    modules: ['@nuxt/image', '@nuxt/icon', '@nuxtjs/tailwindcss'],

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

    build: {
        transpile: ['@base1/database', 'swiper'],
    },

    app: {
        head: {
            title: 'Base1',
            meta: [
                { name: 'description', content: 'Market Makers. Capital Allocators On-Chain Operators.' },

                // Twitter Card meta tags
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: '@base1' },
                { name: 'twitter:title', content: 'Base1' },
                { name: 'twitter:description', content: 'Market Makers. Capital Allocators On-Chain Operators.' },
                { name: 'twitter:image', content: '/cover.jpg' },

                // Open Graph meta tags (for Telegram and other platforms)
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: 'https://base1.com' },
                { property: 'og:title', content: 'Base1' },
                { property: 'og:description', content: 'Market Makers. Capital Allocators On-Chain Operators.' },
                { property: 'og:image', content: '/cover.jpg' },
            ],
            link: [
                { rel: 'icon', type: 'svg', href: '/icon.svg' },
            ],
        },
    },
})
