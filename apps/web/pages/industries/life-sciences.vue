<script setup lang="ts">
useSeoMeta({
    title: 'Life Sciences',
    description: 'Life sciences teams use Davion when discovery, trial, and post-market signals can\'t leave the regulatory envelope. Sovereign AI with audit-grade lineage end to end.',
    ogTitle: 'Davion · Life Sciences',
    ogDescription: 'Sovereign AI across R&D, clinical operations, pharmacovigilance, and process. Audit-ready for regulators by design.',
})

const problemAreas = [
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
]

const solutions = [
    { name: 'Target intelligence', body: 'Multi-source literature, patent, and omics mining with evidence chains an MSL can defend in a scientific review.' },
    { name: 'Trial enrollment intelligence', body: 'Site identification and enrollment forecasting against real-world data, with feasibility scoring per protocol amendment.' },
    { name: 'Pharmacovigilance', body: 'Adverse-event signal detection across post-market sources with causality assessment and full source-to-signal lineage.' },
    { name: 'Risk-based monitoring', body: 'Anomaly detection on site-level data with operator copilots for monitor-visit prioritisation.' },
    { name: 'GxP process analytics', body: 'Continued process verification and deviation root-cause analytics on batch records, with GxP-grade lineage.' },
    { name: 'Regulatory submission', body: 'Submission narratives and supporting tables generated against curated source data, with full traceability.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Industries · Life Sciences" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-5xl">
                Life sciences teams use Davion when discovery, trial, and post-market data can't leave the regulatory envelope<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Patient identifiers, omics, clinical observations, and post-market safety signals are regulated end to end. Davion deploys inside your perimeter so the data stays under your governance — and every derived insight points back to the source it was made on, the policy it applied, and the version of the model that produced it.
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
                    AlpOS applied to life sciences<span class="text-primary-text">.</span>
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
                        Adverse signals don't arrive labelled<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        They surface as a cluster of case reports across markets, a drift in social listening, a co-occurrence pattern in real-world data, a quiet shift in a periodic safety update report that earlier filtering would have missed. AlpOS fuses the sources into one ontology and proposes the signal — with causality assessment, source provenance, and the evidence chain a regulator will read. The safety officer reviews the case. The decision stays with the safety officer.
                    </p>
                    <p class="text-b1 text-drygray-100 font-medium mt-6 max-w-2xl">
                        Earlier signal detection. Defensible causality. Reproducible lineage from raw source to regulator submission.
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-white rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default mb-4">AlpOS layers in play</p>
                        <ul class="space-y-2 text-b1 text-drygray-100">
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ingest — case reports, RWD, literature, social, PSUR</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ontology — products, populations, events, regions</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Analyze — signal scoring, disproportionality, RWD cohort</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Decide — causality copilot, evidence chain, sign-off</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Act — submission packet, audit log, follow-up tasking</li>
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
                        Defend the science the regulator will read<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Briefings are scoped to your regulatory envelope — bring your data, your authorities, and the decisions you need to defend at submission and audit.
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
