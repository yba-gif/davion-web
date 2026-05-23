<script setup lang="ts">
// Refactored to <IndustryLayout> in P1.U7. Copy moved to
// pages.industries.ls.* in P4.9d.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.industries.ls.meta.title'),
    description: () => t('pages.industries.ls.meta.description'),
    ogTitle: () => t('pages.industries.ls.meta.ogTitle'),
    ogDescription: () => t('pages.industries.ls.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.industries.ls.eyebrow'),
    headline: t('pages.industries.ls.headline'),
    body: t('pages.industries.ls.body'),

    problemAreas: [
        { title: t('pages.industries.ls.pa1Title'), bullets: [t('pages.industries.ls.pa1b1'), t('pages.industries.ls.pa1b2'), t('pages.industries.ls.pa1b3'), t('pages.industries.ls.pa1b4')] },
        { title: t('pages.industries.ls.pa2Title'), bullets: [t('pages.industries.ls.pa2b1'), t('pages.industries.ls.pa2b2'), t('pages.industries.ls.pa2b3'), t('pages.industries.ls.pa2b4')] },
        { title: t('pages.industries.ls.pa3Title'), bullets: [t('pages.industries.ls.pa3b1'), t('pages.industries.ls.pa3b2'), t('pages.industries.ls.pa3b3'), t('pages.industries.ls.pa3b4')] },
        { title: t('pages.industries.ls.pa4Title'), bullets: [t('pages.industries.ls.pa4b1'), t('pages.industries.ls.pa4b2'), t('pages.industries.ls.pa4b3'), t('pages.industries.ls.pa4b4')] },
    ],

    solutionsTitle: t('pages.industries.ls.solutionsTitle'),
    solutions: [
        { name: t('pages.industries.ls.s1Name'), body: t('pages.industries.ls.s1Body') },
        { name: t('pages.industries.ls.s2Name'), body: t('pages.industries.ls.s2Body') },
        { name: t('pages.industries.ls.s3Name'), body: t('pages.industries.ls.s3Body') },
        { name: t('pages.industries.ls.s4Name'), body: t('pages.industries.ls.s4Body') },
        { name: t('pages.industries.ls.s5Name'), body: t('pages.industries.ls.s5Body') },
        { name: t('pages.industries.ls.s6Name'), body: t('pages.industries.ls.s6Body') },
    ],

    storyHeadline: t('pages.industries.ls.storyHeadline'),
    storyBody: t('pages.industries.ls.storyBody'),
    storyOutcome: t('pages.industries.ls.storyOutcome'),
    storyLayers: [
        t('pages.industries.ls.sl1'),
        t('pages.industries.ls.sl2'),
        t('pages.industries.ls.sl3'),
        t('pages.industries.ls.sl4'),
        t('pages.industries.ls.sl5'),
    ],

    ctaHeadline: t('pages.industries.ls.ctaHeadline'),
    ctaBody: t('pages.industries.ls.ctaBody'),
}))
</script>

<template>
    <IndustryLayout :data="data" />
</template>
