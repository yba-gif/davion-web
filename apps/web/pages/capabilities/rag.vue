<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
// Copy moved to pages.capabilities.rag.* in P4.10b.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.capabilities.rag.meta.title'),
    description: () => t('pages.capabilities.rag.meta.description'),
    ogTitle: () => t('pages.capabilities.rag.meta.ogTitle'),
    ogDescription: () => t('pages.capabilities.rag.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.capabilities.rag.eyebrow'),
    headline: t('pages.capabilities.rag.headline'),
    body: t('pages.capabilities.rag.body'),

    whatItDoes: [
        t('pages.capabilities.rag.wid1'),
        t('pages.capabilities.rag.wid2'),
        t('pages.capabilities.rag.wid3'),
        t('pages.capabilities.rag.wid4'),
    ],

    howItWorksTitle: t('pages.capabilities.rag.hiwTitle'),
    howItWorks: [
        { n: '01', title: t('pages.capabilities.rag.hiw1Title'), body: t('pages.capabilities.rag.hiw1Body') },
        { n: '02', title: t('pages.capabilities.rag.hiw2Title'), body: t('pages.capabilities.rag.hiw2Body') },
        { n: '03', title: t('pages.capabilities.rag.hiw3Title'), body: t('pages.capabilities.rag.hiw3Body') },
        { n: '04', title: t('pages.capabilities.rag.hiw4Title'), body: t('pages.capabilities.rag.hiw4Body') },
    ],

    whenToUse: [
        t('pages.capabilities.rag.wtu1'),
        t('pages.capabilities.rag.wtu2'),
        t('pages.capabilities.rag.wtu3'),
        t('pages.capabilities.rag.wtu4'),
    ],

    // Industry names route through pages.industries.index.list.* (already
    // translated in waves 5*). Avoids duplicating the same industry names.
    industries: [
        { name: t('pages.industries.index.list.fsName'),  slug: 'financial-services' },
        { name: t('pages.industries.index.list.defName'), slug: 'defense-intelligence' },
        { name: t('pages.industries.index.list.lsName'),  slug: 'life-sciences' },
        { name: t('pages.industries.index.list.govName'), slug: 'government' },
    ],

    ctaHeadline: t('pages.capabilities.rag.ctaHeadline'),
}))
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
