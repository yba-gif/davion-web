<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
// Copy moved to pages.capabilities.translation.* in P4.10b.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.capabilities.translation.meta.title'),
    description: () => t('pages.capabilities.translation.meta.description'),
    ogTitle: () => t('pages.capabilities.translation.meta.ogTitle'),
    ogDescription: () => t('pages.capabilities.translation.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.capabilities.translation.eyebrow'),
    headline: t('pages.capabilities.translation.headline'),
    body: t('pages.capabilities.translation.body'),

    whatItDoes: [
        t('pages.capabilities.translation.wid1'),
        t('pages.capabilities.translation.wid2'),
        t('pages.capabilities.translation.wid3'),
        t('pages.capabilities.translation.wid4'),
    ],

    howItWorksTitle: t('pages.capabilities.translation.hiwTitle'),
    howItWorks: [
        { n: '01', title: t('pages.capabilities.translation.hiw1Title'), body: t('pages.capabilities.translation.hiw1Body') },
        { n: '02', title: t('pages.capabilities.translation.hiw2Title'), body: t('pages.capabilities.translation.hiw2Body') },
        { n: '03', title: t('pages.capabilities.translation.hiw3Title'), body: t('pages.capabilities.translation.hiw3Body') },
        { n: '04', title: t('pages.capabilities.translation.hiw4Title'), body: t('pages.capabilities.translation.hiw4Body') },
    ],

    whenToUse: [
        t('pages.capabilities.translation.wtu1'),
        t('pages.capabilities.translation.wtu2'),
        t('pages.capabilities.translation.wtu3'),
        t('pages.capabilities.translation.wtu4'),
    ],

    industries: [
        { name: t('pages.industries.index.list.defName'), slug: 'defense-intelligence' },
        { name: t('pages.industries.index.list.govName'), slug: 'government' },
        { name: t('pages.industries.index.list.lsName'),  slug: 'life-sciences' },
        { name: t('pages.industries.index.list.fsName'),  slug: 'financial-services' },
    ],

    ctaHeadline: t('pages.capabilities.translation.ctaHeadline'),
}))
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
