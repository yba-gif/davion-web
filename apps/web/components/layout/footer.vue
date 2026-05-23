<script setup lang="ts">
const year = new Date().getFullYear()

// P0.7: footer prunes stub pages (About / Careers / Events / Venture).
// Re-added once content lands per redesign-action-plan §P1–P2.
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
        title: 'Platform',
        links: [
            { label: 'Industries', to: '/industries' },
            { label: 'Trust & Sovereignty', to: '/trust' },
            { label: 'Contact', to: '/contact' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', to: '/company/about' },
            { label: 'Careers', to: '/company/careers' },
            { label: 'Newsroom', to: '/company/newsroom' },
        ],
    },
]
</script>

<template>
    <div class="w-full max-w-7xl mx-auto relative rounded-3xl bg-white overflow-hidden flex flex-col items-stretch justify-start pt-12 px-2 pb-2 box-border gap-8 text-left text-sm text-drygray-100 font-switzer">
        <!-- Sitemap + brand row -->
        <div class="px-8 md:px-12 lg:px-[37px] pb-4">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                <div class="md:max-w-sm">
                    <NuxtLink to="/" class="flex items-center gap-2">
                        <NuxtImg src="/logo-64.png" alt="Davion" width="20" height="20" class="size-5" />
                        <span class="font-degular font-bold text-[18px] text-drygray-100">Davion</span>
                    </NuxtLink>
                    <p class="text-b2 text-drygray-default mt-3 max-w-sm">
                        Davion deploys inside your perimeter. The data does not leave. The decisions are auditable.
                    </p>
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-10 md:gap-14">
                    <div v-for="col in cols" :key="col.title" class="min-w-[140px]">
                        <p class="text-[11px] font-semibold text-drygray-100 uppercase tracking-[0.15em] mb-4">{{ col.title }}</p>
                        <ul class="space-y-3">
                            <li v-for="l in col.links" :key="l.to">
                                <NuxtLink :to="l.to" class="text-b2 text-drygray-default hover:text-primary-text transition-colors">{{ l.label }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Legal bar (P3.4) -->
        <div class="w-full rounded-2xl bg-whitesmoke-100 px-8 md:px-10 py-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-drygray-default font-medium">
            <NuxtLink to="/legal/privacy" class="hover:text-primary-text transition-colors">Privacy</NuxtLink>
            <NuxtLink to="/legal/terms" class="hover:text-primary-text transition-colors">Terms</NuxtLink>
            <NuxtLink to="/legal/cookies" class="hover:text-primary-text transition-colors">Cookies</NuxtLink>
            <NuxtLink to="/legal/responsible-ai" class="hover:text-primary-text transition-colors">Responsible AI</NuxtLink>
            <NuxtLink to="/status" class="hover:text-primary-text transition-colors">Status</NuxtLink>
            <button
                type="button"
                class="hover:text-primary-text transition-colors text-left cursor-pointer"
                aria-label="Open cookie consent settings"
                @click="$nuxt?.callHook?.('cookie-consent:open') || (typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('cookie-consent:open')))"
            >
                Cookie preferences
            </button>
        </div>

        <!-- Copyright bar in whitesmoke rounded inner (base1 footer pattern) -->
        <div class="w-full rounded-2xl bg-whitesmoke-100 px-8 md:px-10 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[13px]">
            <p class="text-drygray-default font-medium">© {{ year }} Davion. All rights reserved.</p>
            <p class="text-drygray-default font-medium">Sovereign by deployment.</p>
        </div>
    </div>
</template>
