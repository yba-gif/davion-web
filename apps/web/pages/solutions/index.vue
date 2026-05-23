<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.solutions.index.meta.title'),
    description: () => t('pages.solutions.index.meta.description'),
    ogTitle: () => t('pages.solutions.index.meta.ogTitle'),
    ogDescription: () => t('pages.solutions.index.meta.ogDescription'),
})

// Solutions list. `bodyKey` resolves under pages.solutions.index.items.* so
// the localiser only has to translate copy, not the slug/order/structure.
const solutions = [
    { slug: 'alpos',                  labelKey: 'pages.solutions.index.items.alposLabel',    name: 'AlpOS',                  bodyKey: 'pages.solutions.index.items.alposBody' },
    { slug: 'digital-transformation', labelKey: 'pages.solutions.index.items.solutionLabel', nameKey: 'subnav.solutions.digital',         bodyKey: 'pages.solutions.index.items.digitalBody' },
    { slug: 'cybersecurity',          labelKey: 'pages.solutions.index.items.solutionLabel', nameKey: 'subnav.solutions.cybersecurity',   bodyKey: 'pages.solutions.index.items.cyberBody' },
    { slug: 'osint',                  labelKey: 'pages.solutions.index.items.solutionLabel', nameKey: 'subnav.solutions.osint',           bodyKey: 'pages.solutions.index.items.osintBody' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.solutions.index.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                {{ $t('pages.solutions.index.hero.headline') }}
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.solutions.index.hero.body') }}
            </p>
        </section>

        <!-- Stack diagram -->
        <section class="bg-whitesmoke-100 rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup :title="$t('pages.solutions.index.stack.sup')" />
            <div class="mt-8 bg-white rounded-2xl p-4 sm:p-6 lg:p-8">
                <div class="grid grid-cols-3 gap-3 mb-3">
                    <div class="bg-azure rounded-xl p-5 text-center">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ $t('pages.solutions.index.stack.solutionLabel') }}</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 text-[22px] sm:text-[28px] leading-tight">{{ $t('subnav.solutions.digital') }}</p>
                    </div>
                    <div class="bg-azure rounded-xl p-5 text-center">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ $t('pages.solutions.index.stack.solutionLabel') }}</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 text-[22px] sm:text-[28px] leading-tight">{{ $t('subnav.solutions.cybersecurity') }}</p>
                    </div>
                    <div class="bg-azure rounded-xl p-5 text-center">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ $t('pages.solutions.index.stack.solutionLabel') }}</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 text-[22px] sm:text-[28px] leading-tight">{{ $t('subnav.solutions.osint') }}</p>
                    </div>
                </div>
                <div class="bg-honeydew rounded-xl p-8 text-center border-t-4 border-primary">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.solutions.index.stack.platformLabel') }}</p>
                    <p class="font-degular font-bold text-drygray-100 mt-2 text-[44px] md:text-[56px] leading-[1]">AlpOS</p>
                    <p class="text-b1 text-drygray-default mt-3 max-w-2xl mx-auto">
                        {{ $t('pages.solutions.index.stack.body') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Solution cards -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid sm:grid-cols-2 gap-4">
                <NuxtLink
                    v-for="s in solutions"
                    :key="s.slug"
                    :to="localePath(`/solutions/${s.slug}`)"
                    class="bg-whitesmoke-100 card-hover hover:bg-whitesmoke-200 rounded-2xl p-8 transition-colors block group"
                >
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(s.labelKey) }}</p>
                    <p class="text-h2 font-degular font-bold text-drygray-100 mt-3">{{ s.name ?? $t(s.nameKey) }}</p>
                    <p class="text-b2 text-drygray-default mt-4">{{ $t(s.bodyKey) }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-6 inline-flex items-center gap-2 transition-colors font-medium">
                        {{ $t('pages.solutions.index.items.explore') }}
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <!-- Deployment + Industries -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-2 gap-10 lg:gap-14">
                <div>
                    <CommonSup :title="$t('pages.solutions.index.deployment.sup')" />
                    <h2 class="text-h2 font-degular font-bold text-drygray-100 mt-4">{{ $t('pages.solutions.index.deployment.headline') }}</h2>
                    <p class="text-b2 text-drygray-default mt-4">
                        {{ $t('pages.solutions.index.deployment.body') }}
                    </p>
                    <div class="mt-6">
                        <NuxtLink :to="localePath('/trust')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.solutions.index.deployment.cta') }}</CommonButton></NuxtLink>
                    </div>
                </div>
                <div>
                    <CommonSup :title="$t('pages.solutions.index.industries.sup')" />
                    <h2 class="text-h2 font-degular font-bold text-drygray-100 mt-4">{{ $t('pages.solutions.index.industries.headline') }}</h2>
                    <p class="text-b2 text-drygray-default mt-4">
                        {{ $t('pages.solutions.index.industries.body') }}
                    </p>
                    <div class="mt-6">
                        <NuxtLink :to="localePath('/industries')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.solutions.index.industries.cta') }}</CommonButton></NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.solutions.index.engage.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        {{ $t('pages.solutions.index.engage.headline') }}
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.solutions.index.engage.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink :to="localePath('/solutions/alpos')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.solutions.index.engage.cta') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
