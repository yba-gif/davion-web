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
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
        head: {
            title: 'Davion',
            titleTemplate: '%s · Davion',
            meta: [
                { name: 'description', content: 'Sovereign software for data intelligence and artificial intelligence. Innovate. Secure. Perform.' },
                { name: 'theme-color', content: '#0A0B0F' },

                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: 'Davion' },
                { name: 'twitter:description', content: 'Sovereign software for data intelligence and artificial intelligence.' },

                // Open Graph
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'Davion' },
                { property: 'og:description', content: 'Sovereign software for data intelligence and artificial intelligence.' },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
            ],
        },
    },
})
