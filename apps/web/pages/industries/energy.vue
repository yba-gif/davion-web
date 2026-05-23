<script setup lang="ts">
// Industry depth page, refactored to <IndustryLayout> in P1.U7.
// Copy moved to pages.industries.energy.* in P4.9c.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.industries.energy.meta.title'),
    description: () => t('pages.industries.energy.meta.description'),
    ogTitle: () => t('pages.industries.energy.meta.ogTitle'),
    ogDescription: () => t('pages.industries.energy.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.industries.energy.eyebrow'),
    headline: t('pages.industries.energy.headline'),
    body: t('pages.industries.energy.body'),

    problemAreas: [
        { title: t('pages.industries.energy.pa1Title'), bullets: [t('pages.industries.energy.pa1b1'), t('pages.industries.energy.pa1b2'), t('pages.industries.energy.pa1b3'), t('pages.industries.energy.pa1b4')] },
        { title: t('pages.industries.energy.pa2Title'), bullets: [t('pages.industries.energy.pa2b1'), t('pages.industries.energy.pa2b2'), t('pages.industries.energy.pa2b3'), t('pages.industries.energy.pa2b4')] },
        { title: t('pages.industries.energy.pa3Title'), bullets: [t('pages.industries.energy.pa3b1'), t('pages.industries.energy.pa3b2'), t('pages.industries.energy.pa3b3'), t('pages.industries.energy.pa3b4')] },
        { title: t('pages.industries.energy.pa4Title'), bullets: [t('pages.industries.energy.pa4b1'), t('pages.industries.energy.pa4b2'), t('pages.industries.energy.pa4b3'), t('pages.industries.energy.pa4b4')] },
    ],

    solutionsTitle: t('pages.industries.energy.solutionsTitle'),
    solutions: [
        { name: t('pages.industries.energy.s1Name'), body: t('pages.industries.energy.s1Body') },
        { name: t('pages.industries.energy.s2Name'), body: t('pages.industries.energy.s2Body') },
        { name: t('pages.industries.energy.s3Name'), body: t('pages.industries.energy.s3Body') },
        { name: t('pages.industries.energy.s4Name'), body: t('pages.industries.energy.s4Body') },
        { name: t('pages.industries.energy.s5Name'), body: t('pages.industries.energy.s5Body') },
        { name: t('pages.industries.energy.s6Name'), body: t('pages.industries.energy.s6Body') },
    ],

    storyHeadline: t('pages.industries.energy.storyHeadline'),
    storyBody: t('pages.industries.energy.storyBody'),
    storyOutcome: t('pages.industries.energy.storyOutcome'),
    storyLayers: [
        t('pages.industries.energy.sl1'),
        t('pages.industries.energy.sl2'),
        t('pages.industries.energy.sl3'),
        t('pages.industries.energy.sl4'),
        t('pages.industries.energy.sl5'),
    ],

    ctaHeadline: t('pages.industries.energy.ctaHeadline'),
    ctaBody: t('pages.industries.energy.ctaBody'),
}))
</script>

<template>
    <IndustryLayout :data="data" />
</template>
