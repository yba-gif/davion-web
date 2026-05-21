<script setup lang="ts">
useSeoMeta({
    title: 'OSINT',
    description: 'Sovereign open-source intelligence, multi-source collection, correlation, and synthesis; anonymous, secure, and compliant.',
    ogTitle: 'Davion · OSINT',
    ogDescription: 'Multilingual open-source intelligence with provenance. Collection, correlation, and brief generation inside your perimeter.',
})

const sources = [
    { name: 'Open web', body: 'Indexed sites, public records, official statements, sectoral databases.' },
    { name: 'Deep + dark', body: 'Forums, marketplaces, and channels not addressable by standard search.' },
    { name: 'Signals', body: 'Public telemetry, leaks, repos, image data, social streams, geospatial.' },
    { name: 'Internal', body: 'Your own corpus, governed and ontology-aligned alongside open sources.' },
]

const engine = [
    { label: 'Correlation', body: 'Cross-source matching with confidence scoring. Identity pivots, alias resolution, timeline reconstruction.' },
    { label: 'Knowledge graphs', body: 'Entities, relationships, and events accumulate into an investigable graph, not a pile of search results.' },
    { label: 'AI co-pilot', body: 'Research, analysis, correlation, synthesis. Every conclusion cites its sources; nothing is asserted without provenance.' },
    { label: 'Compliance', body: 'Collection respects local law and operator policy. Every query and every action is logged.' },
]

const useCases = [
    { audience: 'Public sector', examples: ['Investigations', 'Digital intelligence', 'Counter-disinformation', 'Sanctions enforcement'] },
    { audience: 'Enterprise', examples: ['Fraud · AML / CFT', 'Competitive intelligence', 'Reputation and brand risk', 'Supply-chain exposure'] },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Solutions · OSINT" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Sovereign open-source intelligence.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Multi-source collection, correlation, and synthesis, anonymous, secure, and compliant, for the public sector and corporate risk. The investigation runs inside your perimeter.
            </p>
            <div class="mt-10">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <CommonSup title="The problem" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[36px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight max-w-4xl">
                More public information than ever, and less signal than ever.
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                Investigators have access to more sources than they can read, more dashboards than they can watch, and more AI than they can trust. The work is not collection. It is correlation, synthesis, and defensible conclusion.
            </p>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup title="Sources" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Every source. Inside your perimeter.
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    Davion connects across the surface, the deep, the dark, and your own corpus, without sending the query, the analyst behavior, or the result to a vendor.
                </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="s in sources" :key="s.name" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Source</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ s.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ s.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Engine" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    From collection to conclusion, traceable end to end.
                </h2>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl divide-y divide-drygray-200">
                <div v-for="e in engine" :key="e.label" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ e.label }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ e.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Use cases" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Two audiences. Same platform.
                </h2>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <div v-for="u in useCases" :key="u.audience" class="bg-white rounded-2xl p-8">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ u.audience }}</p>
                    <ul class="mt-4 space-y-3">
                        <li v-for="ex in u.examples" :key="ex" class="text-b2 text-drygray-100 flex items-center gap-3">
                            <span class="text-primary-text" aria-hidden="true">·</span>
                            {{ ex }}
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Investigate without exfiltrating.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Demos are run against your scenarios. We do not need your data, we need your hardest open question.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
