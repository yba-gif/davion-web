<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
useSeoMeta({
    title: 'Data acquisition & preparation',
    description: 'Connectors, ETL, enrichment, and governance from source to ontology — the foundation of every AlpOS deployment. Lineage on every record.',
    ogTitle: 'Davion · Data acquisition',
    ogDescription: 'Every signal through one governed pipeline. Connectors, ETL, enrichment, and lineage from source to ontology.',
})

const data = {
    eyebrow: 'Capability · Data acquisition',
    headline: 'Every signal through one governed pipeline',
    body: 'Data acquisition is Layer 01 of the AlpOS spine — what every other layer reasons against. Connectors, transforms, enrichment, and policy enforcement, with lineage tracked from source row to ontology entity.',

    whatItDoes: [
        'Pulls structured, unstructured, real-time, and archival data through one governed pipeline.',
        'Records lineage from source row to ontology entity — every transformation, every actor.',
        'Applies PII-aware transforms and policy enforcement at ingest time.',
        'Native connectors for the systems institutions actually run (SAP, Oracle, Snowflake, MES, SCADA, Salesforce, ServiceNow, S3, message queues — and the long tail).',
    ],

    howItWorksTitle: 'Connect · Transform · Enrich · Land',
    howItWorks: [
        { n: '01', title: 'Connect', body: 'Native connectors or pro-code SDK for any source. Streaming, batch, or change-data-capture as the source supports.' },
        { n: '02', title: 'Transform', body: 'Low-code or pro-code transforms with PII detection, schema-on-read, and validation against the ontology contract.' },
        { n: '03', title: 'Enrich', body: 'Reference data, geocoding, entity resolution, and per-domain enrichment — all logged in the lineage graph.' },
        { n: '04', title: 'Land', body: 'Records land in the ontology bound to source provenance. Downstream consumers query the ontology, not the source.' },
    ],

    whenToUse: [
        'Stand up a new AlpOS deployment against an institution\'s existing data estate',
        'Integrate a new source into a running ontology without breaking downstream consumers',
        'Apply policy and PII handling at the ingest boundary rather than at consumer time',
        'Maintain regulator-grade lineage from raw source to derived insight',
    ],

    industries: [
        { name: 'Financial Services', slug: 'financial-services' },
        { name: 'Manufacturing', slug: 'manufacturing' },
        { name: 'Government', slug: 'government' },
        { name: 'Life Sciences', slug: 'life-sciences' },
    ],

    ctaHeadline: 'Lineage from raw row to final decision',
}
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
