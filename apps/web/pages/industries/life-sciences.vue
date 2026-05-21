<script setup lang="ts">
// Refactored to <IndustryLayout> in P1.U7.
useSeoMeta({
    title: 'Life Sciences',
    description: 'Life sciences teams use Davion when discovery, trial, and post-market signals can\'t leave the regulatory envelope. Sovereign AI with audit-grade lineage end to end.',
    ogTitle: 'Davion · Life Sciences',
    ogDescription: 'Sovereign AI across R&D, clinical operations, pharmacovigilance, and process. Audit-ready for regulators by design.',
})

const data = {
    eyebrow: 'Industries · Life Sciences',
    headline: 'Life sciences teams use Davion when discovery, trial, and post-market data can\'t leave the regulatory envelope',
    body: 'Patient identifiers, omics, clinical observations, and post-market safety signals are regulated end to end. Davion deploys inside your perimeter so the data stays under your governance, and every derived insight points back to the source it was made on, the policy it applied, and the version of the model that produced it.',

    problemAreas: [
        {
            title: 'Discovery & target intelligence',
            bullets: [
                'Literature and patent mining across millions of documents',
                'Target identification with explainable evidence chains',
                'Cross-modal integration (omics, imaging, lab, EHR cohorts)',
                'Hypothesis generation with provenance to source',
            ],
        },
        {
            title: 'Clinical operations',
            bullets: [
                'Site identification and enrollment forecasting',
                'Protocol-feasibility analysis against real-world data',
                'Risk-based monitoring with anomaly detection on site data',
                'Trial-amendment impact assessment across endpoints',
            ],
        },
        {
            title: 'Regulatory, safety & pharmacovigilance',
            bullets: [
                'Adverse-event signal detection across post-market sources',
                'Causality assessment with cited evidence',
                'Regulatory submission support with full audit trail',
                'Post-authorisation safety study (PASS) analytics',
            ],
        },
        {
            title: 'Manufacturing & quality',
            bullets: [
                'Process analytical technology (PAT) integration',
                'Deviation detection and root-cause across batch records',
                'Continued process verification (CPV) analytics',
                'GxP-grade lineage from raw material to released batch',
            ],
        },
    ],

    solutionsTitle: 'AlpOS applied to life sciences',
    solutions: [
        { name: 'Target intelligence', body: 'Multi-source literature, patent, and omics mining with evidence chains an MSL can defend in a scientific review.' },
        { name: 'Trial enrollment intelligence', body: 'Site identification and enrollment forecasting against real-world data, with feasibility scoring per protocol amendment.' },
        { name: 'Pharmacovigilance', body: 'Adverse-event signal detection across post-market sources with causality assessment and full source-to-signal lineage.' },
        { name: 'Risk-based monitoring', body: 'Anomaly detection on site-level data with operator copilots for monitor-visit prioritisation.' },
        { name: 'GxP process analytics', body: 'Continued process verification and deviation root-cause analytics on batch records, with GxP-grade lineage.' },
        { name: 'Regulatory submission', body: 'Submission narratives and supporting tables generated against curated source data, with full traceability.' },
    ],

    storyHeadline: 'Adverse signals don\'t arrive labelled',
    storyBody: 'They surface as a cluster of case reports across markets, a drift in social listening, a co-occurrence pattern in real-world data, a quiet shift in a periodic safety update report that earlier filtering would have missed. AlpOS fuses the sources into one ontology and proposes the signal, with causality assessment, source provenance, and the evidence chain a regulator will read. The safety officer reviews the case. The decision stays with the safety officer.',
    storyOutcome: 'Earlier signal detection. Defensible causality. Reproducible lineage from raw source to regulator submission.',
    storyLayers: [
        'Ingest: case reports, RWD, literature, social, PSUR',
        'Ontology: products, populations, events, regions',
        'Analyze: signal scoring, disproportionality, RWD cohort',
        'Decide: causality copilot, evidence chain, sign-off',
        'Act: submission packet, audit log, follow-up tasking',
    ],

    ctaHeadline: 'Defend the science the regulator will read',
    ctaBody: 'Briefings are scoped to your regulatory envelope, bring your data, your authorities, and the decisions you need to defend at submission and audit.',
}
</script>

<template>
    <IndustryLayout :data="data" />
</template>
