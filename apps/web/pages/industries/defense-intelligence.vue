<script setup lang="ts">
// Refactored to <IndustryLayout> in P1.U7.
useSeoMeta({
    title: 'Defense & Intelligence',
    description: 'Defense and intelligence organisations use Davion when decisions run on classified data that cannot leave the perimeter. Air-gapped sovereign AI with audit-grade lineage.',
    ogTitle: 'Davion · Defense & Intelligence',
    ogDescription: 'Air-gapped sovereign AI for mission planning, signals fusion, and OSINT. Decisions stay inside the perimeter.',
})

const data = {
    eyebrow: 'Industries · Defense & Intelligence',
    headline: 'Defense and intelligence organisations use Davion when decisions run on data that cannot leave the perimeter',
    body: 'Air-gapped sovereign AI for mission planning, all-source fusion, and OSINT. The data, the weights, and the audit log stay inside the enclave. Every decision is traceable to the sources it was made on; every model run is reproducible. Davion proposes; the commander, analyst, or operator decides.',

    // Defense-specific CTAs (Connect confidentially is the canonical CTA for this audience).
    primaryCta: { label: 'Connect confidentially', to: '/contact' },
    secondaryCta: { label: 'Deployment matrix', to: '/trust' },

    problemAreasTitle: 'Four mission domains. One sovereign platform',
    problemAreas: [
        {
            title: 'Mission planning & decision support',
            bullets: [
                'Multi-source intelligence fusion under classification',
                'Course-of-action analysis with cited evidence',
                'Commander\'s copilot — proposes, never decides',
                'After-action lineage from raw source to recommendation',
            ],
        },
        {
            title: 'OSINT & all-source analysis',
            bullets: [
                'Continuous collection across public web, social, and adversary media',
                'Cross-lingual processing in 60+ languages with provenance',
                'Entity resolution across aliases, accounts, and behaviours',
                'Analyst brief generation with full source trail',
            ],
        },
        {
            title: 'Signals & sensor fusion',
            bullets: [
                'Geospatial, video, audio, and SIGINT fused into one ontology',
                'Anomaly detection on patterns of life and tactical change',
                'Cross-sensor confirmation before alerting',
                'Air-gappable from the edge to the operations centre',
            ],
        },
        {
            title: 'Insider risk & counterintelligence',
            bullets: [
                'Behavioural and access-pattern analytics inside the enclave',
                'Cell-level access controls and per-decision audit',
                'Investigation workflow with chain-of-custody preservation',
                'Adversary-aware threat models on internal systems',
            ],
        },
    ],

    solutionsTitle: 'AlpOS applied to defense and intelligence',
    solutions: [
        { name: 'All-source fusion', body: 'Geospatial, signals, OSINT, and HUMINT into one ontology — with classification handling and per-source provenance.' },
        { name: 'Analyst copilot', body: 'Drafts briefs, surfaces weak signals, and cites every source. Never decides; the analyst owns the call.' },
        { name: 'OSINT collection', body: 'Continuous, multilingual collection with adversary-aware bias controls and provenance to original source.' },
        { name: 'Pattern-of-life', body: 'Cross-sensor pattern detection with anomaly scoring, suitable for both tactical and counter-intelligence missions.' },
        { name: 'Mission planning', body: 'Course-of-action analysis with explainable drivers and weighted constraints — auditable end to end.' },
        { name: 'Air-gap deployment', body: 'Designed to run disconnected. Updates are signed, logged, and reviewable inside the perimeter.' },
    ],

    storyHeadline: 'An indicator rarely arrives on a single channel',
    storyBody: 'It surfaces as a fragment of geospatial change, a shift in adversary media, a movement in commercial telemetry, a quiet day on a channel that is rarely quiet. AlpOS fuses the fragments into one ontology, weighs them against the analyst\'s evidentiary standard, and proposes the brief. The analyst reads the proposal. The analyst sees the lineage. The analyst makes the call.',
    storyOutcome: 'Earlier indication. Defensible attribution. Reproducible reasoning that survives an after-action review.',
    storyLayers: [
        'Ingest — geospatial, SIGINT, OSINT, HUMINT, internal',
        'Ontology — entities, locations, events, capabilities',
        'Analyze — pattern-of-life, anomaly, cross-source confirm',
        'Decide — analyst copilot, evidence, classification',
        'Act — brief generation, dissemination, audit log',
    ],

    ctaHeadline: 'Briefings on this side of the air-gap',
    ctaBody: 'Engagements with defense and intelligence organisations begin under non-disclosure. Reference architectures, demos, and proof-of-concept proposals are tailored to your classification regime.',
    ctaPrimary: { label: 'Connect confidentially', to: '/contact' },
    ctaSecondary: { label: 'Trust & deployment', to: '/trust' },
}
</script>

<template>
    <IndustryLayout :data="data" />
</template>
