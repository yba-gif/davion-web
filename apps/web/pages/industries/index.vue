<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.industries.index.meta.title'),
    description: () => t('pages.industries.index.meta.description'),
    ogTitle: () => t('pages.industries.index.meta.ogTitle'),
    ogDescription: () => t('pages.industries.index.meta.ogDescription'),
})

// Industry catalog — only slugs + i18n key suffixes here; copy comes from i18n.
const industries = [
    { slug: 'financial-services',  nameKey: 'fsName',     bodyKey: 'fsBody' },
    { slug: 'energy',              nameKey: 'energyName', bodyKey: 'energyBody' },
    { slug: 'defense-intelligence', nameKey: 'defName',   bodyKey: 'defBody' },
    { slug: 'manufacturing',       nameKey: 'mfgName',    bodyKey: 'mfgBody' },
    { slug: 'life-sciences',       nameKey: 'lsName',     bodyKey: 'lsBody' },
    { slug: 'government',          nameKey: 'govName',    bodyKey: 'govBody' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.industries.index.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                {{ $t('pages.industries.index.hero.headline') }}<DotAccent />
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.industries.index.hero.body') }}
            </p>
        </section>

        <!-- TrustedByStrip removed (P0.1), see action plan; slot reserved for real proof. -->

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink
                    v-for="industry in industries"
                    :key="industry.slug"
                    :to="localePath(`/industries/${industry.slug}`)"
                    class="bg-whitesmoke-100 card-hover hover:bg-whitesmoke-200 rounded-2xl p-8 transition-colors block group"
                >
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.industries.index.list.industryLabel') }}</p>
                    <p class="text-h2 font-degular font-bold text-drygray-100 mt-3 group-hover:text-primary-text transition-colors leading-tight">{{ $t(`pages.industries.index.list.${industry.nameKey}`) }}</p>
                    <p class="text-b1 text-drygray-default mt-4">{{ $t(`pages.industries.index.list.${industry.bodyKey}`) }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-6 inline-flex items-center gap-2 transition-colors font-medium">
                        {{ $t('pages.industries.index.list.playbookCta') }}
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.industries.index.engage.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        {{ $t('pages.industries.index.engage.headline') }}<DotAccent />
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.industries.index.engage.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.industries.index.engage.cta') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
