<script setup lang="ts">
useSeoMeta({
    title: 'Energy',
    description: 'Energy operators use Davion when grid decisions can\'t wait for the cloud. Sovereign AI across upstream, midstream, transmission, and distribution — telemetry stays in your perimeter.',
    ogTitle: 'Davion · Energy',
    ogDescription: 'Sovereign AI for grid, generation, and trading. Telemetry stays in your perimeter; decisions stay defensible.',
})

const problemAreas = [
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
]

const solutions = [
    { name: 'Predictive maintenance', body: 'Failure prediction on critical rotating assets and HV equipment, with explainable drivers and recommended actions.' },
    { name: 'Grid anomaly detection', body: 'Real-time anomaly detection across SCADA, PMU, and EMS telemetry — surfacing weak signals ahead of consensus.' },
    { name: 'Demand & generation forecasting', body: 'Forecasting across wind, solar, hydro, and demand, with confidence intervals operators can defend in a control-room review.' },
    { name: 'OT threat detection', body: 'Detection on protocol-layer anomalies inside the control network, without sending telemetry to a vendor cloud.' },
    { name: 'Trading & exposure intelligence', body: 'Position, exposure, and counterparty analytics with the same ontology operations and risk teams use.' },
    { name: 'Regulatory reporting', body: 'Audit-ready reports against REMIT, EMIR, and local regimes, with lineage from raw telemetry to filed value.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero — Move A from voice doc -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Industries · Energy" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-5xl">
                Energy operators use Davion when grid decisions can't wait for the cloud<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Across upstream, midstream, transmission, and distribution, operational telemetry is too sensitive, too regulated, and too fast-moving to round-trip through a vendor cloud. Davion deploys inside your perimeter — air-gapped, on-prem, or in a sovereign cloud bound by contract — so the platform runs where the work runs.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" icon="base:arrow">See AlpOS</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- Where Davion delivers — 4 problem areas -->
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

        <!-- AlpOS applied — 6 solution cards -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Solutions" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    AlpOS applied to energy<span class="text-primary-text">.</span>
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

        <!-- Where it lands — concrete story -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <CommonSup title="Where it lands" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        A transformer doesn't fail in a single moment<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        It fails over weeks of dissolved-gas drift, partial-discharge harmonics, thermal cycling, and load asymmetry — signals that live in different systems, sampled at different rates, owned by different teams. AlpOS fuses them into one ontology and surfaces the weak pattern before the failure mode locks in. The operator sees the case, the lineage, and the recommended action. The decision stays with the operator.
                    </p>
                    <p class="text-b1 text-drygray-100 font-medium mt-6 max-w-2xl">
                        Earlier intervention. Lower asset-stranding risk. Audit-grade lineage from sensor reading to maintenance order.
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-white rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default mb-4">AlpOS layers in play</p>
                        <ul class="space-y-2 text-b1 text-drygray-100">
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ingest — DGA, PD, thermal, SCADA, work-order history</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ontology — assets, components, events, crew capacity</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Analyze — failure-mode clustering, anomaly scoring</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Decide — case workflow, operator copilot, evidence</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Act — maintenance order, regulatory log, lineage</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Run the platform where the grid runs<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Briefings are scoped to your environment — bring your asset register, your regulators, and the operational decisions you need to defend.
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
