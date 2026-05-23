<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.capabilities.index.meta.title'),
    description: () => t('pages.capabilities.index.meta.description'),
    ogTitle: () => t('pages.capabilities.index.meta.ogTitle'),
    ogDescription: () => t('pages.capabilities.index.meta.ogDescription'),
})

const capabilities = [
    { slug: 'rag',                 nameKey: 'ragName',         bodyKey: 'ragBody' },
    { slug: 'geospatial',          nameKey: 'geoName',         bodyKey: 'geoBody' },
    { slug: 'video-intelligence',  nameKey: 'videoName',       bodyKey: 'videoBody' },
    { slug: 'audio-analysis',      nameKey: 'audioName',       bodyKey: 'audioBody' },
    { slug: 'translation',         nameKey: 'translationName', bodyKey: 'translationBody' },
    { slug: 'data-acquisition',    nameKey: 'dataName',        bodyKey: 'dataBody' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.capabilities.index.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                {{ $t('pages.capabilities.index.hero.headline') }}<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.capabilities.index.hero.body') }}
            </p>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="cap in capabilities" :key="cap.slug" :to="localePath(`/capabilities/${cap.slug}`)" class="bg-white hover:bg-whitesmoke-100 rounded-2xl p-7 transition-colors block group">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.capabilities.index.list.capabilityLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 group-hover:text-primary-text transition-colors leading-tight">{{ $t(`pages.capabilities.index.list.${cap.nameKey}`) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(`pages.capabilities.index.list.${cap.bodyKey}`) }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-5 inline-flex items-center gap-2 transition-colors text-[13px] font-medium">
                        {{ $t('pages.capabilities.index.list.exploreLabel') }}
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.capabilities.index.engage.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        {{ $t('pages.capabilities.index.engage.headline') }}<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.capabilities.index.engage.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.capabilities.index.engage.cta') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
