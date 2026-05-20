<script setup lang="ts">
// Davion footer — sitemap + brand.
const year = new Date().getFullYear()

const cols = [
    {
        title: 'Solutions',
        links: [
            { label: 'AlpOS', to: '/solutions/alpos' },
            { label: 'Digital Transformation', to: '/solutions/digital-transformation' },
            { label: 'Cybersecurity', to: '/solutions/cybersecurity' },
            { label: 'OSINT', to: '/solutions/osint' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', to: '/company/about' },
            { label: 'Newsroom', to: '/company/newsroom' },
            { label: 'Careers', to: '/company/careers' },
            { label: 'Events', to: '/company/events' },
        ],
    },
    {
        title: 'Platform',
        links: [
            { label: 'Industries', to: '/industries' },
            { label: 'Trust & Sovereignty', to: '/trust' },
            { label: 'Venture', to: '/venture' },
            { label: 'Contact', to: '/contact' },
        ],
    },
]
</script>

<template>
    <footer class="bg-ink-50/60 border-t border-ink-200 mt-24">
        <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <div class="grid lg:grid-cols-12 gap-12 lg:gap-16">
                <div class="lg:col-span-3">
                    <div class="flex items-center gap-3">
                        <NuxtImg src="/icon.svg" alt="" width="20" height="20" class="h-5 w-5" />
                        <span class="font-display font-semibold text-bone-bright text-lg tracking-display-tight">Davion</span>
                    </div>
                    <p class="text-body-s mt-4 max-w-md">
                        Sovereign software for data intelligence and artificial intelligence. Innovate. Secure. Perform.
                    </p>
                </div>
                <div v-for="col in cols" :key="col.title" class="lg:col-span-3">
                    <p class="text-eyebrow mb-5">{{ col.title }}</p>
                    <ul class="space-y-3">
                        <li v-for="l in col.links" :key="l.to">
                            <NuxtLink :to="l.to" class="text-body-s !text-bone hover:!text-signal transition-colors duration-davion-hover">
                                {{ l.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-ink-200 mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p class="text-label">© {{ year }} Davion. All rights reserved.</p>
                <p class="text-label">Sovereign by design.</p>
            </div>
        </div>
    </footer>
</template>
