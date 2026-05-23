<script setup lang="ts">
// Industry depth page, refactored to <IndustryLayout> in P1.U7.
// Copy moved to pages.industries.fs.* in P4.9b — only structural shape
// (problem-area & solution layout, story layers) stays in JS.
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.industries.fs.meta.title'),
    description: () => t('pages.industries.fs.meta.description'),
    ogTitle: () => t('pages.industries.fs.meta.ogTitle'),
    ogDescription: () => t('pages.industries.fs.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.industries.fs.eyebrow'),
    headline: t('pages.industries.fs.headline'),
    body: t('pages.industries.fs.body'),

    problemAreas: [
        { title: t('pages.industries.fs.pa1Title'), bullets: [t('pages.industries.fs.pa1b1'), t('pages.industries.fs.pa1b2'), t('pages.industries.fs.pa1b3'), t('pages.industries.fs.pa1b4')] },
        { title: t('pages.industries.fs.pa2Title'), bullets: [t('pages.industries.fs.pa2b1'), t('pages.industries.fs.pa2b2'), t('pages.industries.fs.pa2b3'), t('pages.industries.fs.pa2b4')] },
        { title: t('pages.industries.fs.pa3Title'), bullets: [t('pages.industries.fs.pa3b1'), t('pages.industries.fs.pa3b2'), t('pages.industries.fs.pa3b3'), t('pages.industries.fs.pa3b4')] },
        { title: t('pages.industries.fs.pa4Title'), bullets: [t('pages.industries.fs.pa4b1'), t('pages.industries.fs.pa4b2'), t('pages.industries.fs.pa4b3'), t('pages.industries.fs.pa4b4')] },
    ],

    solutionsTitle: t('pages.industries.fs.solutionsTitle'),
    solutions: [
        { name: t('pages.industries.fs.s1Name'), body: t('pages.industries.fs.s1Body') },
        { name: t('pages.industries.fs.s2Name'), body: t('pages.industries.fs.s2Body') },
        { name: t('pages.industries.fs.s3Name'), body: t('pages.industries.fs.s3Body') },
        { name: t('pages.industries.fs.s4Name'), body: t('pages.industries.fs.s4Body') },
        { name: t('pages.industries.fs.s5Name'), body: t('pages.industries.fs.s5Body') },
        { name: t('pages.industries.fs.s6Name'), body: t('pages.industries.fs.s6Body') },
    ],

    storyHeadline: t('pages.industries.fs.storyHeadline'),
    storyBody: t('pages.industries.fs.storyBody'),
    storyOutcome: t('pages.industries.fs.storyOutcome'),
    storyLayers: [
        t('pages.industries.fs.sl1'),
        t('pages.industries.fs.sl2'),
        t('pages.industries.fs.sl3'),
        t('pages.industries.fs.sl4'),
        t('pages.industries.fs.sl5'),
    ],

    ctaHeadline: t('pages.industries.fs.ctaHeadline'),
    ctaBody: t('pages.industries.fs.ctaBody'),
}))
</script>

<template>
    <IndustryLayout :data="data" />
</template>
