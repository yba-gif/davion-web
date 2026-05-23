<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
// Copy moved to pages.capabilities.audio.* in P4.10b.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.capabilities.audio.meta.title'),
    description: () => t('pages.capabilities.audio.meta.description'),
    ogTitle: () => t('pages.capabilities.audio.meta.ogTitle'),
    ogDescription: () => t('pages.capabilities.audio.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.capabilities.audio.eyebrow'),
    headline: t('pages.capabilities.audio.headline'),
    body: t('pages.capabilities.audio.body'),

    whatItDoes: [
        t('pages.capabilities.audio.wid1'),
        t('pages.capabilities.audio.wid2'),
        t('pages.capabilities.audio.wid3'),
        t('pages.capabilities.audio.wid4'),
    ],

    howItWorksTitle: t('pages.capabilities.audio.hiwTitle'),
    howItWorks: [
        { n: '01', title: t('pages.capabilities.audio.hiw1Title'), body: t('pages.capabilities.audio.hiw1Body') },
        { n: '02', title: t('pages.capabilities.audio.hiw2Title'), body: t('pages.capabilities.audio.hiw2Body') },
        { n: '03', title: t('pages.capabilities.audio.hiw3Title'), body: t('pages.capabilities.audio.hiw3Body') },
        { n: '04', title: t('pages.capabilities.audio.hiw4Title'), body: t('pages.capabilities.audio.hiw4Body') },
    ],

    whenToUse: [
        t('pages.capabilities.audio.wtu1'),
        t('pages.capabilities.audio.wtu2'),
        t('pages.capabilities.audio.wtu3'),
        t('pages.capabilities.audio.wtu4'),
    ],

    industries: [
        { name: t('pages.industries.index.list.fsName'),  slug: 'financial-services' },
        { name: t('pages.industries.index.list.defName'), slug: 'defense-intelligence' },
        { name: t('pages.industries.index.list.govName'), slug: 'government' },
        { name: t('pages.industries.index.list.lsName'),  slug: 'life-sciences' },
    ],

    ctaHeadline: t('pages.capabilities.audio.ctaHeadline'),
}))
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
