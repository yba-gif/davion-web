<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
// Copy moved to pages.capabilities.data.* in P4.10b.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.capabilities.data.meta.title'),
    description: () => t('pages.capabilities.data.meta.description'),
    ogTitle: () => t('pages.capabilities.data.meta.ogTitle'),
    ogDescription: () => t('pages.capabilities.data.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.capabilities.data.eyebrow'),
    headline: t('pages.capabilities.data.headline'),
    body: t('pages.capabilities.data.body'),

    whatItDoes: [
        t('pages.capabilities.data.wid1'),
        t('pages.capabilities.data.wid2'),
        t('pages.capabilities.data.wid3'),
        t('pages.capabilities.data.wid4'),
    ],

    howItWorksTitle: t('pages.capabilities.data.hiwTitle'),
    howItWorks: [
        { n: '01', title: t('pages.capabilities.data.hiw1Title'), body: t('pages.capabilities.data.hiw1Body') },
        { n: '02', title: t('pages.capabilities.data.hiw2Title'), body: t('pages.capabilities.data.hiw2Body') },
        { n: '03', title: t('pages.capabilities.data.hiw3Title'), body: t('pages.capabilities.data.hiw3Body') },
        { n: '04', title: t('pages.capabilities.data.hiw4Title'), body: t('pages.capabilities.data.hiw4Body') },
    ],

    whenToUse: [
        t('pages.capabilities.data.wtu1'),
        t('pages.capabilities.data.wtu2'),
        t('pages.capabilities.data.wtu3'),
        t('pages.capabilities.data.wtu4'),
    ],

    industries: [
        { name: t('pages.industries.index.list.fsName'),  slug: 'financial-services' },
        { name: t('pages.industries.index.list.mfgName'), slug: 'manufacturing' },
        { name: t('pages.industries.index.list.govName'), slug: 'government' },
        { name: t('pages.industries.index.list.lsName'),  slug: 'life-sciences' },
    ],

    ctaHeadline: t('pages.capabilities.data.ctaHeadline'),
}))
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
