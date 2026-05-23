<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
// Copy moved to pages.capabilities.geo.* in P4.10b.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.capabilities.geo.meta.title'),
    description: () => t('pages.capabilities.geo.meta.description'),
    ogTitle: () => t('pages.capabilities.geo.meta.ogTitle'),
    ogDescription: () => t('pages.capabilities.geo.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.capabilities.geo.eyebrow'),
    headline: t('pages.capabilities.geo.headline'),
    body: t('pages.capabilities.geo.body'),

    whatItDoes: [
        t('pages.capabilities.geo.wid1'),
        t('pages.capabilities.geo.wid2'),
        t('pages.capabilities.geo.wid3'),
        t('pages.capabilities.geo.wid4'),
    ],

    howItWorksTitle: t('pages.capabilities.geo.hiwTitle'),
    howItWorks: [
        { n: '01', title: t('pages.capabilities.geo.hiw1Title'), body: t('pages.capabilities.geo.hiw1Body') },
        { n: '02', title: t('pages.capabilities.geo.hiw2Title'), body: t('pages.capabilities.geo.hiw2Body') },
        { n: '03', title: t('pages.capabilities.geo.hiw3Title'), body: t('pages.capabilities.geo.hiw3Body') },
        { n: '04', title: t('pages.capabilities.geo.hiw4Title'), body: t('pages.capabilities.geo.hiw4Body') },
    ],

    whenToUse: [
        t('pages.capabilities.geo.wtu1'),
        t('pages.capabilities.geo.wtu2'),
        t('pages.capabilities.geo.wtu3'),
        t('pages.capabilities.geo.wtu4'),
    ],

    industries: [
        { name: t('pages.industries.index.list.defName'),    slug: 'defense-intelligence' },
        { name: t('pages.industries.index.list.energyName'), slug: 'energy' },
        { name: t('pages.industries.index.list.govName'),    slug: 'government' },
        { name: t('pages.industries.index.list.mfgName'),    slug: 'manufacturing' },
    ],

    ctaHeadline: t('pages.capabilities.geo.ctaHeadline'),
}))
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
