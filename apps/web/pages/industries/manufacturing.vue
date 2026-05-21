<script setup lang="ts">
// Refactored to <IndustryLayout> in P1.U7.
useSeoMeta({
    title: 'Manufacturing',
    description: 'Manufacturers use Davion when production decisions can\'t wait for the cloud. Sovereign AI across plant, fleet, and supply chain, telemetry stays in your perimeter.',
    ogTitle: 'Davion · Manufacturing',
    ogDescription: 'Sovereign AI for plant operations, quality, supply visibility, and OT cybersecurity. Decisions stay defensible; telemetry stays inside.',
})

const data = {
    eyebrow: 'Industries · Manufacturing',
    headline: 'Manufacturers use Davion when production decisions can\'t wait for the cloud',
    body: 'Across plant operations, quality, supply, and OT cybersecurity, production telemetry is too sensitive, too fast-moving, and too operationally critical to round-trip through a vendor cloud. Davion deploys inside your perimeter, on-prem, air-gapped, or in a sovereign cloud bound by contract, so the platform runs where the line runs.',

    problemAreas: [
        {
            title: 'Plant operations & asset health',
            bullets: [
                'Predictive maintenance on rotating, electrical, and hydraulic assets',
                'Sensor-fusion across vibration, thermal, acoustic, and electrical signatures',
                'Operator copilot for line stoppage, dispatch, and root-cause analysis',
                'Capacity planning against operational risk and crew availability',
            ],
        },
        {
            title: 'Quality & defect intelligence',
            bullets: [
                'Defect classification across visual, dimensional, and process telemetry',
                'Root-cause traceability from raw material lot to finished product',
                'Process-window optimization with explainable drivers',
                'Customer-complaint correlation to upstream process data',
            ],
        },
        {
            title: 'Supply chain & material flow',
            bullets: [
                'Tier-N supplier risk and disruption signals',
                'Inbound material traceability with lot-level lineage',
                'Demand forecasting against logistics, weather, and geopolitical inputs',
                'Inventory optimization against service levels and working capital',
            ],
        },
        {
            title: 'Industrial cybersecurity',
            bullets: [
                'IT/OT signal fusion across enterprise and control networks',
                'Threat detection on protocol-layer anomalies (Modbus, OPC UA, PROFINET)',
                'Vendor-access and contractor-risk analytics',
                'Incident reconstruction with full lineage from raw packet to decision',
            ],
        },
    ],

    solutionsTitle: 'AlpOS applied to manufacturing',
    solutions: [
        { name: 'Predictive maintenance', body: 'Failure prediction on critical assets, with explainable drivers and recommended actions inside the operator\'s workflow.' },
        { name: 'Quality intelligence', body: 'Defect classification and root-cause analysis across visual, dimensional, and process telemetry, lot-level lineage end to end.' },
        { name: 'Process optimization', body: 'Process-window analytics that surface the relationship between operating parameters and downstream yield, scrap, and energy.' },
        { name: 'Supply visibility', body: 'Tier-N supplier risk and disruption signals fused with internal demand and inventory data.' },
        { name: 'OT threat detection', body: 'Detection on control-network anomalies, without sending operational telemetry to a vendor cloud.' },
        { name: 'Energy & sustainability', body: 'Plant-level energy intensity, emissions, and waste analytics with audit-ready reporting against regulatory regimes.' },
    ],

    storyHeadline: 'A defect rarely starts on the line it\'s caught on',
    storyBody: 'It starts upstream, in a raw-material lot, an operator changeover, a torque-tool drift, a humidity excursion in the staging bay. AlpOS fuses the signals into one ontology and surfaces the upstream cause before scrap propagates downstream. The operator sees the case, the lineage, and the recommended intervention. The decision stays with the operator.',
    storyOutcome: 'Earlier containment. Lower scrap. Audit-grade lineage from raw lot to finished unit.',
    storyLayers: [
        'Ingest, MES, SCADA, vision, lab, supplier feeds',
        'Ontology: products, lots, lines, shifts, defects',
        'Analyze: defect clustering, root-cause inference',
        'Decide: case workflow, quality copilot, evidence',
        'Act: containment order, lot-level traceability log',
    ],

    ctaHeadline: 'Run the platform where the line runs',
    ctaBody: 'Briefings are scoped to your environment, bring your plant data, your regulators, and the operational decisions you need to defend.',
}
</script>

<template>
    <IndustryLayout :data="data" />
</template>
