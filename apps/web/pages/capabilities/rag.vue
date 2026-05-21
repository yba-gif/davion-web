<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
useSeoMeta({
    title: 'RAG over your ontology',
    description: 'Retrieval-augmented generation grounded in your domain ontology and document corpus, never the open web. Every output cites its source, every retrieval respects access control.',
    ogTitle: 'Davion · RAG over your ontology',
    ogDescription: 'AI that cites its sources. RAG grounded against your governed ontology, inside your perimeter, audit-ready.',
})

const data = {
    eyebrow: 'Capability · RAG',
    headline: 'AI that cites its sources. Grounded in your ontology, not the open web',
    body: 'Retrieval-augmented generation that runs against your governed ontology and document corpus, inside your perimeter, with access control on every retrieval and provenance on every claim.',

    whatItDoes: [
        'Answers analyst questions against your governed document corpus, not the open web.',
        'Cites the exact passage and source for every claim, no unsupported sentences.',
        'Respects per-document and per-cell access control on every retrieval.',
        'Runs entirely inside your perimeter, no third-party API, no leakage.',
    ],

    howItWorksTitle: 'Ground · Retrieve · Reason · Cite',
    howItWorks: [
        { n: '01', title: 'Ground', body: 'Index your governed document corpus into a vector store inside your perimeter. The ontology decides what counts as a source.' },
        { n: '02', title: 'Retrieve', body: 'Every query goes through the access-control layer first. Only passages the user is authorised to see are eligible for retrieval.' },
        { n: '03', title: 'Reason', body: 'The LLM is constrained to reason only over retrieved passages. Sources travel with the answer.' },
        { n: '04', title: 'Cite', body: 'Every claim is rendered with the exact passage and source reference. The analyst can verify, drill in, and audit.' },
    ],

    whenToUse: [
        'Compliance officers answering questions against thousands of regulatory documents',
        'Analysts drafting briefs against classified or proprietary source material',
        'Solutions engineers searching internal documentation and architecture decisions',
        'Field operators querying maintenance manuals, SOPs, and incident histories under audit',
    ],

    industries: [
        { name: 'Financial Services', slug: 'financial-services' },
        { name: 'Defense & Intelligence', slug: 'defense-intelligence' },
        { name: 'Life Sciences', slug: 'life-sciences' },
        { name: 'Government', slug: 'government' },
    ],

    ctaHeadline: 'AI you can defend at audit',
}
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
