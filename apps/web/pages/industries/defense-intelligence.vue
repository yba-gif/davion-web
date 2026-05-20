<script setup lang="ts">
useSeoMeta({
    title: 'Defense & Intelligence',
    description: 'Defense and intelligence organisations use Davion when decisions run on classified data that cannot leave the perimeter. Air-gapped sovereign AI with audit-grade lineage.',
    ogTitle: 'Davion · Defense & Intelligence',
    ogDescription: 'Air-gapped sovereign AI for mission planning, signals fusion, and OSINT. Decisions stay inside the perimeter.',
})

const problemAreas = [
    {
        title: 'Mission planning & decision support',
        bullets: [
            'Multi-source intelligence fusion under classification',
            'Course-of-action analysis with cited evidence',
            'Commander\'s copilot — proposes, never decides',
            'After-action lineage from raw source to recommendation',
        ],
    },
    {
        title: 'OSINT & all-source analysis',
        bullets: [
            'Continuous collection across public web, social, and adversary media',
            'Cross-lingual processing in 60+ languages with provenance',
            'Entity resolution across aliases, accounts, and behaviours',
            'Analyst brief generation with full source trail',
        ],
    },
    {
        title: 'Signals & sensor fusion',
        bullets: [
            'Geospatial, video, audio, and SIGINT fused into one ontology',
            'Anomaly detection on patterns of life and tactical change',
            'Cross-sensor confirmation before alerting',
            'Air-gappable from the edge to the operations centre',
        ],
    },
    {
        title: 'Insider risk & counterintelligence',
        bullets: [
            'Behavioural and access-pattern analytics inside the enclave',
            'Cell-level access controls and per-decision audit',
            'Investigation workflow with chain-of-custody preservation',
            'Adversary-aware threat models on internal systems',
        ],
    },
]

const solutions = [
    { name: 'All-source fusion', body: 'Geospatial, signals, OSINT, and HUMINT into one ontology — with classification handling and per-source provenance.' },
    { name: 'Analyst copilot', body: 'Drafts briefs, surfaces weak signals, and cites every source. Never decides; the analyst owns the call.' },
    { name: 'OSINT collection', body: 'Continuous, multilingual collection with adversary-aware bias controls and provenance to original source.' },
    { name: 'Pattern-of-life', body: 'Cross-sensor pattern detection with anomaly scoring, suitable for both tactical and counter-intelligence missions.' },
    { name: 'Mission planning', body: 'Course-of-action analysis with explainable drivers and weighted constraints — auditable end to end.' },
    { name: 'Air-gap deployment', body: 'Designed to run disconnected. Updates are signed, logged, and reviewable inside the perimeter.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero — Move A from voice doc -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Industries · Defense &amp; Intelligence" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-5xl">
                Defense and intelligence organisations use Davion when decisions run on data that cannot leave the perimeter<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Air-gapped sovereign AI for mission planning, all-source fusion, and OSINT. The data, the weights, and the audit log stay inside the enclave. Every decision is traceable to the sources it was made on; every model run is reproducible. Davion proposes; the commander, analyst, or operator decides.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Connect confidentially</CommonButton></NuxtLink>
                <NuxtLink to="/trust"><CommonButton variant="outline" icon="base:arrow">Deployment matrix</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- Where Davion delivers — 4 problem areas -->
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

        <!-- AlpOS applied — 6 solution cards -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Solutions" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    AlpOS applied to defense and intelligence<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="s in solutions" :key="s.name" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Capability</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 leading-tight">{{ s.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ s.body }}</p>
                </div>
            </div>
            <div class="mt-8">
                <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" size="xs" icon="base:arrow">Explore AlpOS</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- Where it lands — concrete story (no operational specifics that imply real deployments) -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <CommonSup title="Where it lands" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        An indicator rarely arrives on a single channel<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        It surfaces as a fragment of geospatial change, a shift in adversary media, a movement in commercial telemetry, a quiet day on a channel that is rarely quiet. AlpOS fuses the fragments into one ontology, weighs them against the analyst's evidentiary standard, and proposes the brief. The analyst reads the proposal. The analyst sees the lineage. The analyst makes the call.
                    </p>
                    <p class="text-b1 text-drygray-100 font-medium mt-6 max-w-2xl">
                        Earlier indication. Defensible attribution. Reproducible reasoning that survives an after-action review.
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-white rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default mb-4">AlpOS layers in play</p>
                        <ul class="space-y-2 text-b1 text-drygray-100">
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ingest — geospatial, SIGINT, OSINT, HUMINT, internal</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Ontology — entities, locations, events, capabilities</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Analyze — pattern-of-life, anomaly, cross-source confirm</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Decide — analyst copilot, evidence, classification</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Act — brief generation, dissemination, audit log</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Engage — confidential CTA -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Briefings on this side of the air-gap<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Engagements with defense and intelligence organisations begin under non-disclosure. Reference architectures, demos, and proof-of-concept proposals are tailored to your classification regime.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Connect confidentially</CommonButton></NuxtLink>
                    <NuxtLink to="/trust"><CommonButton variant="outline" icon="base:arrow">Trust &amp; deployment</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
