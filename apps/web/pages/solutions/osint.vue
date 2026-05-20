<script setup lang="ts">
useSeoMeta({
    title: 'OSINT',
    description: 'Sovereign open-source intelligence — multi-source collection, correlation, and synthesis; anonymous, secure, and compliant.',
})

const sources = [
    { name: 'Open web', body: 'Indexed sites, public records, official statements, sectoral databases.' },
    { name: 'Deep + dark', body: 'Forums, marketplaces, and channels not addressable by standard search.' },
    { name: 'Signals', body: 'Public telemetry — leaks, repos, image data, social streams, geospatial.' },
    { name: 'Internal', body: 'Your own corpus, governed and ontology-aligned alongside open sources.' },
]

const engine = [
    { label: 'Correlation', body: 'Cross-source matching with confidence scoring. Identity pivots, alias resolution, timeline reconstruction.' },
    { label: 'Knowledge graphs', body: 'Entities, relationships, and events accumulate into an investigable graph — not a pile of search results.' },
    { label: 'AI co-pilot', body: 'Research, analysis, correlation, synthesis. Every conclusion cites its sources; nothing is asserted without provenance.' },
    { label: 'Compliance', body: 'Collection respects local law and operator policy. Every query and every action is logged.' },
]

const useCases = [
    { audience: 'Public sector', examples: ['Investigations', 'Digital intelligence', 'Counter-disinformation', 'Sanctions enforcement'] },
    { audience: 'Enterprise', examples: ['Fraud · AML / CFT', 'Competitive intelligence', 'Reputation and brand risk', 'Supply-chain exposure'] },
]
</script>

<template>
    <div class="bg-ink text-bone">
        <!-- Hero -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-44 lg:pb-24">
                <p class="text-eyebrow mb-6">Solutions · OSINT</p>
                <h1 class="text-display-l text-bone-bright max-w-4xl">Sovereign open-source intelligence.</h1>
                <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                    Multi-source collection, correlation, and synthesis — anonymous, secure, and compliant — for the public sector and corporate risk. The investigation runs inside your perimeter.
                </p>
                <div class="mt-10">
                    <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                        Request an OSINT demo
                        <span aria-hidden="true">→</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- The problem -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-3"><p class="text-eyebrow">The problem</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-display-m text-bone-bright max-w-4xl">More public information than ever — and less signal than ever.</p>
                        <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                            Investigators have access to more sources than they can read, more dashboards than they can watch, and more AI than they can trust. The work is not collection. It is correlation, synthesis, and defensible conclusion.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sources -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Sources</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Every source. Inside your perimeter.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Davion connects across the surface, the deep, the dark, and your own corpus — without sending the query, the analyst behavior, or the result to a vendor.
                        </p>
                    </div>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200">
                    <div v-for="s in sources" :key="s.name" class="bg-ink p-8">
                        <p class="text-label">Source</p>
                        <p class="text-h3 text-bone-bright mt-3">{{ s.name }}</p>
                        <p class="text-body-s mt-3">{{ s.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Engine -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Engine</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">From collection to conclusion, traceable end to end.</p>
                    </div>
                </div>
                <div class="border-t border-ink-200">
                    <div v-for="e in engine" :key="e.label" class="grid lg:grid-cols-12 gap-6 py-6 border-b border-ink-200">
                        <div class="lg:col-span-3"><p class="text-label">{{ e.label }}</p></div>
                        <p class="lg:col-span-9 text-body text-bone">{{ e.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Use cases (split) -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Use cases</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Two audiences. Same platform.</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-px bg-ink-200">
                    <div v-for="u in useCases" :key="u.audience" class="bg-ink p-8 lg:p-10">
                        <p class="text-eyebrow">{{ u.audience }}</p>
                        <ul class="mt-4 space-y-3">
                            <li v-for="ex in u.examples" :key="ex" class="text-body text-bone flex items-center gap-3">
                                <span class="text-signal">·</span>
                                {{ ex }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section>
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 items-end">
                    <div class="lg:col-span-8">
                        <p class="text-eyebrow mb-6">Engage</p>
                        <p class="text-display-m text-bone-bright">Investigate without exfiltrating.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            Demos are run against your scenarios. We do not need your data — we need your hardest open question.
                        </p>
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                            Request an OSINT demo
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
