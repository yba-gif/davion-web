<script setup lang="ts">
useSeoMeta({
    title: 'Financial Services',
    description: 'Banks, insurers, asset managers, and payment providers use Davion when their decisions must be defensible — and made on data that never leaves the bank.',
    ogTitle: 'Davion · Financial Services',
    ogDescription: 'Sovereign AI for AML, surveillance, market intelligence, and resilience. Audit-grade lineage, never out of perimeter.',
})

const problemAreas = [
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
]

const solutions = [
    { name: 'AML / CFT', body: 'Network analysis across entities, accounts, and transactions; from alerts to actionable cases.' },
    { name: 'Market Intelligence', body: 'Multi-source monitoring with weak-signal detection and cross-asset correlation.' },
    { name: 'Regulatory Surveillance', body: 'Voice + communication surveillance with audit-ready reporting and obligation tracking.' },
    { name: 'Client Intelligence', body: 'Unified client view, behavioural analysis, and dynamic segmentation across channels.' },
    { name: 'Fraud Detection', body: 'Cross-source anomaly detection and case management with full lineage.' },
    { name: 'Operational Resilience', body: 'Crisis monitoring, threat detection, and secure inter-perimeter exchange.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero — Move A from voice doc; replaces the generic "Turn data into strategic advantage." -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Industries · Financial Services" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-5xl">
                Banks use Davion when their decisions must be defensible — and made on data that never leaves the bank<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                AML and CFT, market and risk intelligence, regulatory surveillance, client intelligence, fraud, and operational resilience — built on AlpOS and deployed inside the institution's perimeter. The data does not leave. The decisions are reproducible. Every alert points back to the transactions, communications, and counterparties it was made on.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" icon="base:arrow">See AlpOS</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- TrustedByStrip removed (P0.1) — see action plan; slot reserved for real proof. -->

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
                    AlpOS applied to financial services<span class="text-primary-text">.</span>
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
                        Financial crime rarely leaves a single trace<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        AlpOS maps the full network of entities, accounts, transactions, and behavioural signals across sources — surfacing patterns that flat rules and isolated dashboards miss. Investigations move from alerts to actionable cases, with full lineage from raw transaction to operator decision.
                    </p>
                    <p class="text-b1 text-drygray-100 font-medium mt-6 max-w-2xl">
                        Faster case adjudication. Fewer false positives. Audit by design.
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-white rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default mb-4">AlpOS layers in play</p>
                        <ul class="space-y-2 text-b1 text-drygray-100">
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ingest — transactions, KYC, communications, OSINT</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ontology — entities, accounts, beneficial owners, events</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Analyze — graph queries, anomaly detection, scoring</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Decide — case workflow, analyst copilot, evidence</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Act — case management, regulatory reporting</li>
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
                        Defend the decisions your auditors will see<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Briefings are tailored to your environment — bring your data, your regulators, and the decisions you need to defend.
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
