<script setup lang="ts">
// Refactored to <IndustryLayout> in P1.U7; copy moved to
// pages.industries.def.* in P4.9b. Defense-specific overrides:
// - Hero CTAs: "Connect confidentially" + "Deployment matrix"
// - problemAreasTitle override (4 mission domains, not "Four problem areas")
// - Engage CTAs: "Connect confidentially" + "Trust & deployment"
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.industries.def.meta.title'),
    description: () => t('pages.industries.def.meta.description'),
    ogTitle: () => t('pages.industries.def.meta.ogTitle'),
    ogDescription: () => t('pages.industries.def.meta.ogDescription'),
})

const data = computed(() => ({
    eyebrow: t('pages.industries.def.eyebrow'),
    headline: t('pages.industries.def.headline'),
    body: t('pages.industries.def.body'),

    primaryCta:   { label: t('pages.industries.def.primaryCtaLabel'),   to: '/contact' },
    secondaryCta: { label: t('pages.industries.def.secondaryCtaLabel'), to: '/trust' },

    problemAreasTitle: t('pages.industries.def.problemAreasTitle'),
    problemAreas: [
        { title: t('pages.industries.def.pa1Title'), bullets: [t('pages.industries.def.pa1b1'), t('pages.industries.def.pa1b2'), t('pages.industries.def.pa1b3'), t('pages.industries.def.pa1b4')] },
        { title: t('pages.industries.def.pa2Title'), bullets: [t('pages.industries.def.pa2b1'), t('pages.industries.def.pa2b2'), t('pages.industries.def.pa2b3'), t('pages.industries.def.pa2b4')] },
        { title: t('pages.industries.def.pa3Title'), bullets: [t('pages.industries.def.pa3b1'), t('pages.industries.def.pa3b2'), t('pages.industries.def.pa3b3'), t('pages.industries.def.pa3b4')] },
        { title: t('pages.industries.def.pa4Title'), bullets: [t('pages.industries.def.pa4b1'), t('pages.industries.def.pa4b2'), t('pages.industries.def.pa4b3'), t('pages.industries.def.pa4b4')] },
    ],

    solutionsTitle: t('pages.industries.def.solutionsTitle'),
    solutions: [
        { name: t('pages.industries.def.s1Name'), body: t('pages.industries.def.s1Body') },
        { name: t('pages.industries.def.s2Name'), body: t('pages.industries.def.s2Body') },
        { name: t('pages.industries.def.s3Name'), body: t('pages.industries.def.s3Body') },
        { name: t('pages.industries.def.s4Name'), body: t('pages.industries.def.s4Body') },
        { name: t('pages.industries.def.s5Name'), body: t('pages.industries.def.s5Body') },
        { name: t('pages.industries.def.s6Name'), body: t('pages.industries.def.s6Body') },
    ],

    storyHeadline: t('pages.industries.def.storyHeadline'),
    storyBody: t('pages.industries.def.storyBody'),
    storyOutcome: t('pages.industries.def.storyOutcome'),
    storyLayers: [
        t('pages.industries.def.sl1'),
        t('pages.industries.def.sl2'),
        t('pages.industries.def.sl3'),
        t('pages.industries.def.sl4'),
        t('pages.industries.def.sl5'),
    ],

    ctaHeadline: t('pages.industries.def.ctaHeadline'),
    ctaBody: t('pages.industries.def.ctaBody'),
    ctaPrimary:   { label: t('pages.industries.def.ctaPrimaryLabel'),   to: '/contact' },
    ctaSecondary: { label: t('pages.industries.def.ctaSecondaryLabel'), to: '/trust' },
}))
</script>

<template>
    <IndustryLayout :data="data" />
</template>
