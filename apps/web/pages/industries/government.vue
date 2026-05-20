<script setup lang="ts">
useSeoMeta({
    title: 'Government',
    description: 'Government agencies use Davion when cross-departmental data has to stay within the perimeter — and decisions have to be defensible at audit. Sovereign AI for public-service delivery, fraud, critical infrastructure, and oversight.',
    ogTitle: 'Davion · Government',
    ogDescription: 'Sovereign AI for public-service delivery, benefit-fraud detection, critical infrastructure, and procurement oversight. Audit by design.',
})

const problemAreas = [
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
]

const solutions = [
    { name: 'Cross-agency entity resolution', body: 'Resolve a person, organisation, or event across departmental systems under explicit access policy. No bulk centralisation.' },
    { name: 'Benefits fraud detection', body: 'Network and anomaly analysis across benefit claims, with explainable evidence and citizen-rights-respecting workflow.' },
    { name: 'Critical infrastructure monitoring', body: 'IT/OT threat detection across nationally critical operators, deployable air-gapped under continuity-of-government posture.' },
    { name: 'Procurement intelligence', body: 'Irregularity detection across tenders, suppliers, and contracts with lineage from line item to audit log.' },
    { name: 'FOIA & transparency support', body: 'Document review, redaction, and response-package generation with the lineage to defend the decision in court.' },
    { name: 'Service-demand forecasting', body: 'Citizen-services demand forecasting against demographic, seasonal, and policy-shift inputs.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Industries · Government" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-5xl">
                Government agencies use Davion when cross-departmental data has to stay within the perimeter — and decisions have to be defensible at audit<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Citizen data, classified records, and inter-ministerial exchange are governed by law that does not permit a vendor-cloud round-trip. Davion deploys inside the agency perimeter — air-gapped, on-prem, or in a sovereign cloud bound by contract — so the data stays under the agency's governance and every decision traces back to the source, the policy, and the version of the model that produced it.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                <NuxtLink to="/trust"><CommonButton variant="outline" icon="base:arrow">Deployment matrix</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Where Davion delivers" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Four mission domains. One sovereign platform<span class="text-primary-text">.</span>
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
                    AlpOS applied to government<span class="text-primary-text">.</span>
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
                        An irregularity rarely sits inside a single agency<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        It surfaces as a shared director across two suppliers, a procurement award uncorrelated with apparent capacity, a benefits claim cross-referenced with an employment record in another ministry, a tax filing that doesn't match a customs movement. AlpOS resolves the entity under explicit policy across agency systems and proposes the case with cited evidence. The inspector reads the case. The decision stays with the inspector.
                    </p>
                    <p class="text-b1 text-drygray-100 font-medium mt-6 max-w-2xl">
                        Earlier irregularity detection. Defensible inter-agency cooperation. Audit lineage from raw record to final ruling.
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-white rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default mb-4">AlpOS layers in play</p>
                        <ul class="space-y-2 text-b1 text-drygray-100">
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ingest — tax, customs, procurement, benefits, public registry</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ontology — citizens, organisations, contracts, events</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Analyze — network analysis, anomaly scoring, link discovery</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Decide — inspector copilot, evidence chain, policy check</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Act — case file, inter-agency tasking, audit log</li>
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
                        Decisions defensible at audit and in court<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Engagements with public agencies are scoped to your residency, classification, and procurement frameworks. Reference architectures and proofs of concept are tailored to your operating environment.
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
