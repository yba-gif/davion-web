<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
useSeoMeta({
    title: 'Video intelligence',
    description: 'Detect, classify, and make searchable hours of video across cameras, devices, and archives, inside your perimeter, with chain-of-custody preserved.',
    ogTitle: 'Davion · Video intelligence',
    ogDescription: 'Video at the speed of investigation. Object, scene, and event detection across archives with chain-of-custody intact.',
})

const data = {
    eyebrow: 'Capability · Video intelligence',
    headline: 'Video at the speed of investigation. Chain-of-custody intact',
    body: 'AlpOS Video Intelligence detects, classifies, and indexes hours of video so analysts search by content, not by timestamp. Runs against your cameras and your archives, inside your perimeter, with the lineage to defend the result in court.',

    whatItDoes: [
        'Detects objects, scenes, and events across recorded and live video streams.',
        'Indexes video so analysts search by content, not just timestamp.',
        'Preserves chain-of-custody from frame to case file.',
        'Runs entirely on operator hardware, body cameras, CCTV, ISR feeds, archive.',
    ],

    howItWorksTitle: 'Ingest · Detect · Index · Cite',
    howItWorks: [
        { n: '01', title: 'Ingest', body: 'Live streams and archives flow in through standard protocols (RTSP, NDI, file). Metadata travels with the frame.' },
        { n: '02', title: 'Detect', body: 'Object detection, scene classification, OCR, and face / plate / vehicle recognition where policy permits.' },
        { n: '03', title: 'Index', body: 'Every detection becomes a searchable entity in the ontology. Analysts query by content, not by minute.' },
        { n: '04', title: 'Cite', body: 'Every result returns the frame, the source, and the chain-of-custody log. Court-admissible by design.' },
    ],

    whenToUse: [
        'Public safety operators reviewing hours of body-camera footage after an incident',
        'Defense and intelligence analysts searching ISR archives for tactical change',
        'Manufacturing quality teams diagnosing visual defects across production lines',
        'Critical-infrastructure operators monitoring CCTV against unauthorised access patterns',
    ],

    industries: [
        { name: 'Defense & Intelligence', slug: 'defense-intelligence' },
        { name: 'Government', slug: 'government' },
        { name: 'Manufacturing', slug: 'manufacturing' },
        { name: 'Energy', slug: 'energy' },
    ],

    ctaHeadline: 'Investigations at the speed of frames',
}
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
