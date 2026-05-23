<script setup lang="ts">
// Refactored to <IndustryLayout> in P1.U7. Copy moved to
// pages.industries.gov.* in P4.9d. Government overrides:
// - secondaryCta to /trust ("Deployment matrix")
// - problemAreasTitle ("Four mission domains. One sovereign platform")
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.industries.gov.meta.title'),
    description: () => t('pages.industries.gov.meta.description'),
    ogTitle: () => t('pages.industries.gov.meta.ogTitle'),
    ogDescription: () => t('pages.industries.gov.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.industries.gov.eyebrow'),
    headline: t('pages.industries.gov.headline'),
    body: t('pages.industries.gov.body'),

    secondaryCta: { label: t('pages.industries.gov.secondaryCtaLabel'), to: '/trust' },

    problemAreasTitle: t('pages.industries.gov.problemAreasTitle'),
    problemAreas: [
        { title: t('pages.industries.gov.pa1Title'), bullets: [t('pages.industries.gov.pa1b1'), t('pages.industries.gov.pa1b2'), t('pages.industries.gov.pa1b3'), t('pages.industries.gov.pa1b4')] },
        { title: t('pages.industries.gov.pa2Title'), bullets: [t('pages.industries.gov.pa2b1'), t('pages.industries.gov.pa2b2'), t('pages.industries.gov.pa2b3'), t('pages.industries.gov.pa2b4')] },
        { title: t('pages.industries.gov.pa3Title'), bullets: [t('pages.industries.gov.pa3b1'), t('pages.industries.gov.pa3b2'), t('pages.industries.gov.pa3b3'), t('pages.industries.gov.pa3b4')] },
        { title: t('pages.industries.gov.pa4Title'), bullets: [t('pages.industries.gov.pa4b1'), t('pages.industries.gov.pa4b2'), t('pages.industries.gov.pa4b3'), t('pages.industries.gov.pa4b4')] },
    ],

    solutionsTitle: t('pages.industries.gov.solutionsTitle'),
    solutions: [
        { name: t('pages.industries.gov.s1Name'), body: t('pages.industries.gov.s1Body') },
        { name: t('pages.industries.gov.s2Name'), body: t('pages.industries.gov.s2Body') },
        { name: t('pages.industries.gov.s3Name'), body: t('pages.industries.gov.s3Body') },
        { name: t('pages.industries.gov.s4Name'), body: t('pages.industries.gov.s4Body') },
        { name: t('pages.industries.gov.s5Name'), body: t('pages.industries.gov.s5Body') },
        { name: t('pages.industries.gov.s6Name'), body: t('pages.industries.gov.s6Body') },
    ],

    storyHeadline: t('pages.industries.gov.storyHeadline'),
    storyBody: t('pages.industries.gov.storyBody'),
    storyOutcome: t('pages.industries.gov.storyOutcome'),
    storyLayers: [
        t('pages.industries.gov.sl1'),
        t('pages.industries.gov.sl2'),
        t('pages.industries.gov.sl3'),
        t('pages.industries.gov.sl4'),
        t('pages.industries.gov.sl5'),
    ],

    ctaHeadline: t('pages.industries.gov.ctaHeadline'),
    ctaBody: t('pages.industries.gov.ctaBody'),
}))
</script>

<template>
    <IndustryLayout :data="data" />
</template>
