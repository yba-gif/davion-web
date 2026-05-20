<script setup lang="ts">
useSeoMeta({
    title: 'Manufacturing',
    description: 'Manufacturers use Davion when production decisions can\'t wait for the cloud. Sovereign AI across plant, fleet, and supply chain — telemetry stays in your perimeter.',
    ogTitle: 'Davion · Manufacturing',
    ogDescription: 'Sovereign AI for plant operations, quality, supply visibility, and OT cybersecurity. Decisions stay defensible; telemetry stays inside.',
})

const problemAreas = [
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
]

const solutions = [
    { name: 'Predictive maintenance', body: 'Failure prediction on critical assets, with explainable drivers and recommended actions inside the operator\'s workflow.' },
    { name: 'Quality intelligence', body: 'Defect classification and root-cause analysis across visual, dimensional, and process telemetry — lot-level lineage end to end.' },
    { name: 'Process optimization', body: 'Process-window analytics that surface the relationship between operating parameters and downstream yield, scrap, and energy.' },
    { name: 'Supply visibility', body: 'Tier-N supplier risk and disruption signals fused with internal demand and inventory data.' },
    { name: 'OT threat detection', body: 'Detection on control-network anomalies, without sending operational telemetry to a vendor cloud.' },
    { name: 'Energy & sustainability', body: 'Plant-level energy intensity, emissions, and waste analytics with audit-ready reporting against regulatory regimes.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Industries · Manufacturing" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-5xl">
                Manufacturers use Davion when production decisions can't wait for the cloud<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Across plant operations, quality, supply, and OT cybersecurity, production telemetry is too sensitive, too fast-moving, and too operationally critical to round-trip through a vendor cloud. Davion deploys inside your perimeter — on-prem, air-gapped, or in a sovereign cloud bound by contract — so the platform runs where the line runs.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" icon="base:arrow">See AlpOS</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Where Davion delivers" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Four problem areas. One sovereign platform<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <div v-for="area in problemAreas" :key="area.title" class="bg-white rounded-2xl p-7">
                    <p class="text-h3 font-degular font-bold text-drygray-100 leading-tight">{{ area.title }}</p>
                    <ul class="mt-4 space-y-2 text-b1 text-drygray-default">
                        <li v-for="b in area.bullets" :key="b" class="flex items-start gap-3">
                            <span class="text-primary-text mt-1.5" aria-hidden="true">·</span>
                            <span>{{ b }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Solutions" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    AlpOS applied to manufacturing<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="s in solutions" :key="s.name" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Solution</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 leading-tight">{{ s.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ s.body }}</p>
                </div>
            </div>
            <div class="mt-8">
                <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" size="xs" icon="base:arrow">Explore AlpOS</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <CommonSup title="Where it lands" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        A defect rarely starts on the line it's caught on<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        It starts upstream — in a raw-material lot, an operator changeover, a torque-tool drift, a humidity excursion in the staging bay. AlpOS fuses the signals into one ontology and surfaces the upstream cause before scrap propagates downstream. The operator sees the case, the lineage, and the recommended intervention. The decision stays with the operator.
                    </p>
                    <p class="text-b1 text-drygray-100 font-medium mt-6 max-w-2xl">
                        Earlier containment. Lower scrap. Audit-grade lineage from raw lot to finished unit.
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-white rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default mb-4">AlpOS layers in play</p>
                        <ul class="space-y-2 text-b1 text-drygray-100">
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ingest — MES, SCADA, vision, lab, supplier feeds</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ontology — products, lots, lines, shifts, defects</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Analyze — defect clustering, root-cause inference</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Decide — case workflow, quality copilot, evidence</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Act — containment order, lot-level traceability log</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Run the platform where the line runs<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Briefings are scoped to your environment — bring your plant data, your regulators, and the operational decisions you need to defend.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                    <NuxtLink to="/contact"><CommonButton variant="outline" icon="base:arrow">Speak to an expert</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
