<script setup lang="ts">
// Refactored to <IndustryLayout> in P1.U7.
useSeoMeta({
    title: 'Government',
    description: 'Government agencies use Davion when cross-departmental data has to stay within the perimeter, and decisions have to be defensible at audit. Sovereign AI for public-service delivery, fraud, critical infrastructure, and oversight.',
    ogTitle: 'Davion · Government',
    ogDescription: 'Sovereign AI for public-service delivery, benefit-fraud detection, critical infrastructure, and procurement oversight. Audit by design.',
})

const data = {
    eyebrow: 'Industries · Government',
    headline: 'Government agencies use Davion when cross-departmental data has to stay within the perimeter, and decisions have to be defensible at audit',
    body: 'Citizen data, classified records, and inter-ministerial exchange are governed by law that does not permit a vendor-cloud round-trip. Davion deploys inside the agency perimeter, air-gapped, on-prem, or in a sovereign cloud bound by contract, so the data stays under the agency\'s governance and every decision traces back to the source, the policy, and the version of the model that produced it.',

    secondaryCta: { label: 'Deployment matrix', to: '/trust' },

    problemAreasTitle: 'Four mission domains. One sovereign platform',
    problemAreas: [
        {
            title: 'Cross-agency data integration',
            bullets: [
                'Entity resolution across departmental systems with citizen-data law respected by design',
                'Federated query across ministries without bulk data centralisation',
                'Versioned ontology shared between agencies under explicit policy',
                'Lineage and consent tracking from source system to decision',
            ],
        },
        {
            title: 'Public-service delivery intelligence',
            bullets: [
                'Demand forecasting on welfare, health, and citizen-services queues',
                'Benefit-fraud and improper-payment detection with explainable evidence',
                'Eligibility-decision support with citizen-friendly explanation',
                'Service-experience analytics across channels and demographics',
            ],
        },
        {
            title: 'Critical infrastructure & resilience',
            bullets: [
                'Threat detection across IT/OT for nationally critical operators',
                'Cross-sector dependency analysis (energy ↔ telecoms ↔ transport)',
                'Crisis monitoring with multi-agency operational picture',
                'Continuity-of-government deployment patterns (air-gappable)',
            ],
        },
        {
            title: 'Compliance, oversight & procurement',
            bullets: [
                'Procurement-irregularity detection across tenders, suppliers, contracts',
                'Audit-readiness analytics for inspectors-general and supreme audit institutions',
                'FOIA / transparency-request triage and redaction support',
                'Inter-agency policy compliance monitoring with full audit lineage',
            ],
        },
    ],

    solutionsTitle: 'AlpOS applied to government',
    solutions: [
        { name: 'Cross-agency entity resolution', body: 'Resolve a person, organisation, or event across departmental systems under explicit access policy. No bulk centralisation.' },
        { name: 'Benefits fraud detection', body: 'Network and anomaly analysis across benefit claims, with explainable evidence and citizen-rights-respecting workflow.' },
        { name: 'Critical infrastructure monitoring', body: 'IT/OT threat detection across nationally critical operators, deployable air-gapped under continuity-of-government posture.' },
        { name: 'Procurement intelligence', body: 'Irregularity detection across tenders, suppliers, and contracts with lineage from line item to audit log.' },
        { name: 'FOIA & transparency support', body: 'Document review, redaction, and response-package generation with the lineage to defend the decision in court.' },
        { name: 'Service-demand forecasting', body: 'Citizen-services demand forecasting against demographic, seasonal, and policy-shift inputs.' },
    ],

    storyHeadline: 'An irregularity rarely sits inside a single agency',
    storyBody: 'It surfaces as a shared director across two suppliers, a procurement award uncorrelated with apparent capacity, a benefits claim cross-referenced with an employment record in another ministry, a tax filing that doesn\'t match a customs movement. AlpOS resolves the entity under explicit policy across agency systems and proposes the case with cited evidence. The inspector reads the case. The decision stays with the inspector.',
    storyOutcome: 'Earlier irregularity detection. Defensible inter-agency cooperation. Audit lineage from raw record to final ruling.',
    storyLayers: [
        'Ingest: tax, customs, procurement, benefits, public registry',
        'Ontology: citizens, organisations, contracts, events',
        'Analyze: network analysis, anomaly scoring, link discovery',
        'Decide: inspector copilot, evidence chain, policy check',
        'Act: case file, inter-agency tasking, audit log',
    ],

    ctaHeadline: 'Decisions defensible at audit and in court',
    ctaBody: 'Engagements with public agencies are scoped to your residency, classification, and procurement frameworks. Reference architectures and proofs of concept are tailored to your operating environment.',
}
</script>

<template>
    <IndustryLayout :data="data" />
</template>
