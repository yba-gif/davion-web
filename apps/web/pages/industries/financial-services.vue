<script setup lang="ts">
// Industry depth page, refactored to <IndustryLayout> in P1.U7.
// All template structure lives in components/industry-layout.vue.
useSeoMeta({
    title: 'Financial Services',
    description: 'Banks, insurers, asset managers, and payment providers use Davion when their decisions must be defensible, and made on data that never leaves the bank.',
    ogTitle: 'Davion · Financial Services',
    ogDescription: 'Sovereign AI for AML, surveillance, market intelligence, and resilience. Audit-grade lineage, never out of perimeter.',
})

const data = {
    eyebrow: 'Industries · Financial Services',
    headline: 'Banks use Davion when their decisions must be defensible, and made on data that never leaves the bank',
    body: 'AML and CFT, market and risk intelligence, regulatory surveillance, client intelligence, fraud, and operational resilience, built on AlpOS and deployed inside the institution\'s perimeter. The data does not leave. The decisions are reproducible. Every alert points back to the transactions, communications, and counterparties it was made on.',

    problemAreas: [
        {
            title: 'Market & Risk Intelligence',
            bullets: [
                'Multi-source monitoring across news, filings, social, and internal data',
                'Weak-signal detection ahead of consensus',
                'Cross-asset and cross-portfolio correlation',
                'Shared intelligence across investment, trading, and risk teams',
            ],
        },
        {
            title: 'Regulatory Compliance & Surveillance',
            bullets: [
                'Regulatory watch and obligation tracking',
                'Audit-ready data traceability and reporting',
                'Voice and communication surveillance',
                'Anomaly detection across transactions and conduct',
            ],
        },
        {
            title: 'Client & Relationship Intelligence',
            bullets: [
                'Unified client interaction view across channels',
                'Behavioural and semantic analysis',
                'Dynamic segmentation',
                'Insight-driven relationship management',
            ],
        },
        {
            title: 'Secure Data & Operational Resilience',
            bullets: [
                'Secure inter-perimeter data exchange',
                'Fine-grained access control and governance',
                'Threat detection across the digital estate',
                'Crisis monitoring and operational continuity',
            ],
        },
    ],

    solutionsTitle: 'AlpOS applied to financial services',
    solutions: [
        { name: 'AML / CFT', body: 'Network analysis across entities, accounts, and transactions; from alerts to actionable cases.' },
        { name: 'Market Intelligence', body: 'Multi-source monitoring with weak-signal detection and cross-asset correlation.' },
        { name: 'Regulatory Surveillance', body: 'Voice + communication surveillance with audit-ready reporting and obligation tracking.' },
        { name: 'Client Intelligence', body: 'Unified client view, behavioural analysis, and dynamic segmentation across channels.' },
        { name: 'Fraud Detection', body: 'Cross-source anomaly detection and case management with full lineage.' },
        { name: 'Operational Resilience', body: 'Crisis monitoring, threat detection, and secure inter-perimeter exchange.' },
    ],

    storyHeadline: 'Financial crime rarely leaves a single trace',
    storyBody: 'AlpOS maps the full network of entities, accounts, transactions, and behavioural signals across sources, surfacing patterns that flat rules and isolated dashboards miss. Investigations move from alerts to actionable cases, with full lineage from raw transaction to operator decision.',
    storyOutcome: 'Faster case adjudication. Fewer false positives. Audit by design.',
    storyLayers: [
        'Ingest: transactions, KYC, communications, OSINT',
        'Ontology: entities, accounts, beneficial owners, events',
        'Analyze: graph queries, anomaly detection, scoring',
        'Decide: case workflow, analyst copilot, evidence',
        'Act: case management, regulatory reporting',
    ],

    ctaHeadline: 'Defend the decisions your auditors will see',
    ctaBody: 'Briefings are tailored to your environment, bring your data, your regulators, and the decisions you need to defend.',
}
</script>

<template>
    <IndustryLayout :data="data" />
</template>
