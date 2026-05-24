<script setup lang="ts">
const year = new Date().getFullYear()
const localePath = useLocalePath()

// P0.7: footer prunes stub pages (About / Careers / Events / Venture).
// Re-added once content lands per redesign-action-plan P1-P2.
// P4.1: labels keyed to i18n; paths resolved via localePath().
const cols = [
    {
        titleKey: 'footer.columns.solutions',
        links: [
            { labelKey: 'subnav.solutions.alpos', to: '/solutions/alpos' },
            { labelKey: 'subnav.solutions.digital', to: '/solutions/digital-transformation' },
            { labelKey: 'subnav.solutions.cybersecurity', to: '/solutions/cybersecurity' },
            { labelKey: 'subnav.solutions.osint', to: '/solutions/osint' },
        ],
    },
    {
        titleKey: 'footer.columns.platform',
        links: [
            { labelKey: 'footer.links.industries', to: '/industries' },
            { labelKey: 'footer.links.trust', to: '/trust' },
            { labelKey: 'footer.links.contact', to: '/contact' },
        ],
    },
    {
        titleKey: 'footer.columns.company',
        links: [
            { labelKey: 'subnav.company.about', to: '/company/about' },
            { labelKey: 'subnav.company.careers', to: '/company/careers' },
            { labelKey: 'subnav.company.newsroom', to: '/company/newsroom' },
        ],
    },
] as const
</script>

<template>
    <div class="w-full max-w-7xl mx-auto relative rounded-3xl bg-white overflow-hidden flex flex-col items-stretch justify-start pt-12 px-2 pb-2 box-border gap-8 text-left text-sm text-drygray-100 font-switzer">
        <!-- Sitemap + brand row -->
        <div class="px-8 md:px-12 lg:px-[37px] pb-4">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                <div class="md:max-w-sm">
                    <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
                        <NuxtImg src="/logo-64.png" alt="Davion" width="20" height="20" class="size-5" loading="lazy" />
                        <span class="font-degular font-bold text-[18px] text-drygray-100">Davion</span>
                    </NuxtLink>
                    <p class="text-b2 text-drygray-default mt-3 max-w-sm">
                        {{ $t('footer.tagline') }}
                    </p>
                </div>
                <div class="flex flex-wrap md:flex-nowrap gap-10 md:gap-14">
                    <div v-for="col in cols" :key="col.titleKey" class="min-w-[140px]">
                        <p class="text-[11px] font-semibold text-drygray-100 uppercase tracking-[0.15em] mb-4">{{ $t(col.titleKey) }}</p>
                        <ul class="space-y-3">
                            <li v-for="l in col.links" :key="l.to">
                                <NuxtLink :to="localePath(l.to)" class="text-b2 text-drygray-default hover:text-primary-text transition-colors">{{ $t(l.labelKey) }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Legal bar (P3.4) -->
        <div class="w-full rounded-2xl bg-whitesmoke-100 px-8 md:px-10 py-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-drygray-default font-medium">
            <NuxtLink :to="localePath('/legal/privacy')" class="hover:text-primary-text transition-colors">{{ $t('footer.legal.privacy') }}</NuxtLink>
            <NuxtLink :to="localePath('/legal/terms')" class="hover:text-primary-text transition-colors">{{ $t('footer.legal.terms') }}</NuxtLink>
            <NuxtLink :to="localePath('/legal/cookies')" class="hover:text-primary-text transition-colors">{{ $t('footer.legal.cookies') }}</NuxtLink>
            <NuxtLink :to="localePath('/legal/responsible-ai')" class="hover:text-primary-text transition-colors">{{ $t('footer.legal.responsibleAi') }}</NuxtLink>
            <NuxtLink :to="localePath('/status')" class="hover:text-primary-text transition-colors">{{ $t('footer.legal.status') }}</NuxtLink>
            <button
                type="button"
                class="hover:text-primary-text transition-colors text-left cursor-pointer"
                :aria-label="$t('footer.legal.cookiePreferences')"
                @click="$nuxt?.callHook?.('cookie-consent:open') || (typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('cookie-consent:open')))"
            >
                {{ $t('footer.legal.cookiePreferences') }}
            </button>
        </div>

        <!-- Copyright bar in whitesmoke rounded inner (base1 footer pattern) -->
        <div class="w-full rounded-2xl bg-whitesmoke-100 px-8 md:px-10 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[13px]">
            <p class="text-drygray-default font-medium">{{ $t('footer.copyright', { year }) }}</p>
            <p class="text-drygray-default font-medium">{{ $t('footer.sovereign') }}</p>
        </div>
    </div>
</template>
