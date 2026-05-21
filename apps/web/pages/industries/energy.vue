<script setup lang="ts">
// Refactored to <IndustryLayout> in P1.U7.
useSeoMeta({
    title: 'Energy',
    description: 'Energy operators use Davion when grid decisions can\'t wait for the cloud. Sovereign AI across upstream, midstream, transmission, and distribution, telemetry stays in your perimeter.',
    ogTitle: 'Davion · Energy',
    ogDescription: 'Sovereign AI for grid, generation, and trading. Telemetry stays in your perimeter; decisions stay defensible.',
})

const data = {
    eyebrow: 'Industries · Energy',
    headline: 'Energy operators use Davion when grid decisions can\'t wait for the cloud',
    body: 'Across upstream, midstream, transmission, and distribution, operational telemetry is too sensitive, too regulated, and too fast-moving to round-trip through a vendor cloud. Davion deploys inside your perimeter, air-gapped, on-prem, or in a sovereign cloud bound by contract, so the platform runs where the work runs.',

    problemAreas: [
        {
            title: 'Grid & generation operations',
            bullets: [
                'Anomaly detection across SCADA, PMU, and EMS telemetry',
                'Real-time topology and contingency analysis',
                'Demand and load forecasting with explainable drivers',
                'Operator copilot for switching, dispatch, and outage response',
            ],
        },
        {
            title: 'Asset reliability & maintenance',
            bullets: [
                'Predictive maintenance on rotating equipment, transformers, and turbines',
                'Failure-mode clustering across fleets and vintages',
                'Sensor-fusion across vibration, thermal, acoustic, and electrical signatures',
                'Maintenance scheduling against operational risk and crew availability',
            ],
        },
        {
            title: 'Trading, risk & forecasting',
            bullets: [
                'Multi-source forecasting (wind, solar, hydrology, demand, prices)',
                'Position, exposure, and counterparty risk in one ontology',
                'Scenario testing against weather, outage, and regulatory shocks',
                'Audit-ready reporting against REMIT, EMIR, and local regimes',
            ],
        },
        {
            title: 'Cyber-physical security & resilience',
            bullets: [
                'IT/OT signal fusion across enterprise and control networks',
                'Threat detection on protocol-layer anomalies (Modbus, IEC 61850, DNP3)',
                'Insider-risk and contractor-access analytics',
                'Incident reconstruction with full lineage from raw packet to decision',
            ],
        },
    ],

    solutionsTitle: 'AlpOS applied to energy',
    solutions: [
        { name: 'Predictive maintenance', body: 'Failure prediction on critical rotating assets and HV equipment, with explainable drivers and recommended actions.' },
        { name: 'Grid anomaly detection', body: 'Real-time anomaly detection across SCADA, PMU, and EMS telemetry, surfacing weak signals ahead of consensus.' },
        { name: 'Demand & generation forecasting', body: 'Forecasting across wind, solar, hydro, and demand, with confidence intervals operators can defend in a control-room review.' },
        { name: 'OT threat detection', body: 'Detection on protocol-layer anomalies inside the control network, without sending telemetry to a vendor cloud.' },
        { name: 'Trading & exposure intelligence', body: 'Position, exposure, and counterparty analytics with the same ontology operations and risk teams use.' },
        { name: 'Regulatory reporting', body: 'Audit-ready reports against REMIT, EMIR, and local regimes, with lineage from raw telemetry to filed value.' },
    ],

    storyHeadline: 'A transformer doesn\'t fail in a single moment',
    storyBody: 'It fails over weeks of dissolved-gas drift, partial-discharge harmonics, thermal cycling, and load asymmetry, signals that live in different systems, sampled at different rates, owned by different teams. AlpOS fuses them into one ontology and surfaces the weak pattern before the failure mode locks in. The operator sees the case, the lineage, and the recommended action. The decision stays with the operator.',
    storyOutcome: 'Earlier intervention. Lower asset-stranding risk. Audit-grade lineage from sensor reading to maintenance order.',
    storyLayers: [
        'Ingest, DGA, PD, thermal, SCADA, work-order history',
        'Ontology: assets, components, events, crew capacity',
        'Analyze: failure-mode clustering, anomaly scoring',
        'Decide: case workflow, operator copilot, evidence',
        'Act: maintenance order, regulatory log, lineage',
    ],

    ctaHeadline: 'Run the platform where the grid runs',
    ctaBody: 'Briefings are scoped to your environment, bring your asset register, your regulators, and the operational decisions you need to defend.',
}
</script>

<template>
    <IndustryLayout :data="data" />
</template>
