<script setup lang="ts">
// Industry depth page, refactored to <IndustryLayout> in P1.U7.
// Copy moved to pages.industries.mfg.* in P4.9c.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.industries.mfg.meta.title'),
    description: () => t('pages.industries.mfg.meta.description'),
    ogTitle: () => t('pages.industries.mfg.meta.ogTitle'),
    ogDescription: () => t('pages.industries.mfg.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.industries.mfg.eyebrow'),
    headline: t('pages.industries.mfg.headline'),
    body: t('pages.industries.mfg.body'),

    problemAreas: [
        { title: t('pages.industries.mfg.pa1Title'), bullets: [t('pages.industries.mfg.pa1b1'), t('pages.industries.mfg.pa1b2'), t('pages.industries.mfg.pa1b3'), t('pages.industries.mfg.pa1b4')] },
        { title: t('pages.industries.mfg.pa2Title'), bullets: [t('pages.industries.mfg.pa2b1'), t('pages.industries.mfg.pa2b2'), t('pages.industries.mfg.pa2b3'), t('pages.industries.mfg.pa2b4')] },
        { title: t('pages.industries.mfg.pa3Title'), bullets: [t('pages.industries.mfg.pa3b1'), t('pages.industries.mfg.pa3b2'), t('pages.industries.mfg.pa3b3'), t('pages.industries.mfg.pa3b4')] },
        { title: t('pages.industries.mfg.pa4Title'), bullets: [t('pages.industries.mfg.pa4b1'), t('pages.industries.mfg.pa4b2'), t('pages.industries.mfg.pa4b3'), t('pages.industries.mfg.pa4b4')] },
    ],

    solutionsTitle: t('pages.industries.mfg.solutionsTitle'),
    solutions: [
        { name: t('pages.industries.mfg.s1Name'), body: t('pages.industries.mfg.s1Body') },
        { name: t('pages.industries.mfg.s2Name'), body: t('pages.industries.mfg.s2Body') },
        { name: t('pages.industries.mfg.s3Name'), body: t('pages.industries.mfg.s3Body') },
        { name: t('pages.industries.mfg.s4Name'), body: t('pages.industries.mfg.s4Body') },
        { name: t('pages.industries.mfg.s5Name'), body: t('pages.industries.mfg.s5Body') },
        { name: t('pages.industries.mfg.s6Name'), body: t('pages.industries.mfg.s6Body') },
    ],

    storyHeadline: t('pages.industries.mfg.storyHeadline'),
    storyBody: t('pages.industries.mfg.storyBody'),
    storyOutcome: t('pages.industries.mfg.storyOutcome'),
    storyLayers: [
        t('pages.industries.mfg.sl1'),
        t('pages.industries.mfg.sl2'),
        t('pages.industries.mfg.sl3'),
        t('pages.industries.mfg.sl4'),
        t('pages.industries.mfg.sl5'),
    ],

    ctaHeadline: t('pages.industries.mfg.ctaHeadline'),
    ctaBody: t('pages.industries.mfg.ctaBody'),
}))
</script>

<template>
    <IndustryLayout :data="data" />
</template>
