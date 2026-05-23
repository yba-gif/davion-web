<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
// Copy moved to pages.capabilities.video.* in P4.10b.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.capabilities.video.meta.title'),
    description: () => t('pages.capabilities.video.meta.description'),
    ogTitle: () => t('pages.capabilities.video.meta.ogTitle'),
    ogDescription: () => t('pages.capabilities.video.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.capabilities.video.eyebrow'),
    headline: t('pages.capabilities.video.headline'),
    body: t('pages.capabilities.video.body'),

    whatItDoes: [
        t('pages.capabilities.video.wid1'),
        t('pages.capabilities.video.wid2'),
        t('pages.capabilities.video.wid3'),
        t('pages.capabilities.video.wid4'),
    ],

    howItWorksTitle: t('pages.capabilities.video.hiwTitle'),
    howItWorks: [
        { n: '01', title: t('pages.capabilities.video.hiw1Title'), body: t('pages.capabilities.video.hiw1Body') },
        { n: '02', title: t('pages.capabilities.video.hiw2Title'), body: t('pages.capabilities.video.hiw2Body') },
        { n: '03', title: t('pages.capabilities.video.hiw3Title'), body: t('pages.capabilities.video.hiw3Body') },
        { n: '04', title: t('pages.capabilities.video.hiw4Title'), body: t('pages.capabilities.video.hiw4Body') },
    ],

    whenToUse: [
        t('pages.capabilities.video.wtu1'),
        t('pages.capabilities.video.wtu2'),
        t('pages.capabilities.video.wtu3'),
        t('pages.capabilities.video.wtu4'),
    ],

    industries: [
        { name: t('pages.industries.index.list.defName'),    slug: 'defense-intelligence' },
        { name: t('pages.industries.index.list.govName'),    slug: 'government' },
        { name: t('pages.industries.index.list.mfgName'),    slug: 'manufacturing' },
        { name: t('pages.industries.index.list.energyName'), slug: 'energy' },
    ],

    ctaHeadline: t('pages.capabilities.video.ctaHeadline'),
}))
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
