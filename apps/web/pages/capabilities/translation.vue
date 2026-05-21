<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
useSeoMeta({
    title: 'Machine translation',
    description: 'High-quality translation across 60+ languages, run entirely inside your perimeter, with provenance for every translation and access control on every source.',
    ogTitle: 'Davion · Machine translation',
    ogDescription: 'Translation that respects your perimeter. 60+ languages, no third-party API, provenance for every translation.',
})

const data = {
    eyebrow: 'Capability · Translation',
    headline: 'Translation that respects your perimeter',
    body: 'AlpOS Translation runs 60+ language pairs inside your perimeter, text, documents, audio transcripts, with provenance for every passage and access control on every source. No third-party API. No cross-border transit.',

    whatItDoes: [
        'Translates text, documents, and transcribed audio across 60+ language pairs.',
        'Preserves layout, formatting, and embedded metadata through the translation.',
        'Records source-to-target provenance for every passage, every sentence.',
        'Runs entirely on operator hardware, no third-party API, no cross-border data transit.',
    ],

    howItWorksTitle: 'Detect · Translate · Preserve · Cite',
    howItWorks: [
        { n: '01', title: 'Detect', body: 'Source language identified at document, paragraph, or sentence granularity. Mixed-language documents handled natively.' },
        { n: '02', title: 'Translate', body: 'Domain-tuned models with terminology and glossary support. Confidence scores per segment.' },
        { n: '03', title: 'Preserve', body: 'Layout, tables, embedded images, document structure, and metadata flow through intact.' },
        { n: '04', title: 'Cite', body: 'Every translated passage links back to the source segment with model version and timestamp.' },
    ],

    whenToUse: [
        'Defense and intelligence analysts processing adversary media and intercept material',
        'Multinational compliance teams reviewing regulatory filings across jurisdictions',
        'Pharmacovigilance teams ingesting adverse-event reports from international sources',
        'Government agencies translating citizen-facing communications under accessibility law',
    ],

    industries: [
        { name: 'Defense & Intelligence', slug: 'defense-intelligence' },
        { name: 'Government', slug: 'government' },
        { name: 'Life Sciences', slug: 'life-sciences' },
        { name: 'Financial Services', slug: 'financial-services' },
    ],

    ctaHeadline: 'Multilingual without the cross-border round-trip',
}
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
