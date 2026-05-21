<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
useSeoMeta({
    title: 'Audio analysis & transcription',
    description: 'Transcribe, diarise, and extract structure from calls, interviews, and broadcasts, with speaker identification, sentiment, and topic modelling. Inside your perimeter.',
    ogTitle: 'Davion · Audio analysis',
    ogDescription: 'Speaker, sentiment, and semantic structure from audio at scale. Trading floors, contact centres, broadcasts, inside the perimeter.',
})

const data = {
    eyebrow: 'Capability · Audio',
    headline: 'Listen at scale. Audit at the same scale',
    body: 'AlpOS Audio Analysis transcribes, diarises, and extracts structure from calls, interviews, and broadcasts. Speaker identification, sentiment shifts, topic boundaries, and compliance-relevant events become first-class signals in the ontology.',

    whatItDoes: [
        'Transcribes and diarises calls, interviews, and broadcasts at archive scale.',
        'Identifies speakers, sentiment shifts, and topic boundaries.',
        'Surfaces compliance-relevant events: market-abuse phrases, escalation patterns, distress signals.',
        'Runs against your audio infrastructure, no third-party API, no recordings leave the perimeter.',
    ],

    howItWorksTitle: 'Ingest · Transcribe · Structure · Cite',
    howItWorks: [
        { n: '01', title: 'Ingest', body: 'Audio flows in from call recorders, contact-centre platforms, broadcast feeds, or archive stores.' },
        { n: '02', title: 'Transcribe', body: 'Multilingual ASR with diarisation produces speaker-labelled transcripts with timestamps and confidence.' },
        { n: '03', title: 'Structure', body: 'Topic, sentiment, intent, and compliance pattern detection runs over the transcript and audio features.' },
        { n: '04', title: 'Cite', body: 'Every event in the case file points back to the exact audio segment, speaker, and transcript line.' },
    ],

    whenToUse: [
        'Trading-floor surveillance for market-abuse phrases under MAR / MiFID II',
        'Contact-centre quality review across millions of recordings',
        'Defense and intelligence analysis of broadcast and intercept audio',
        'Clinical trial monitoring of patient-call recordings under HIPAA / GDPR',
    ],

    industries: [
        { name: 'Financial Services', slug: 'financial-services' },
        { name: 'Defense & Intelligence', slug: 'defense-intelligence' },
        { name: 'Government', slug: 'government' },
        { name: 'Life Sciences', slug: 'life-sciences' },
    ],

    ctaHeadline: 'Conversations at the scale of archives',
}
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
