<script setup lang="ts">
useSeoMeta({
    title: 'Industries',
    description: 'Davion deployments by sector: Defense, Intelligence, Government, Critical Infrastructure, Financial Services, Energy.',
})

const sectors = [
    {
        n: '01',
        name: 'Defense & Intelligence',
        mission: 'Decision support under classification and air-gap. Faster cycles between collection and action, with traceability that survives the after-action review.',
        layers: ['Ingest', 'Ontology', 'Analyze', 'Decide'],
        outcomes: 'Mission planning, signals fusion, operational decisioning — inside the perimeter.',
    },
    {
        n: '02',
        name: 'Government',
        mission: 'Cross-agency integration of data that has historically refused to integrate. Sovereign AI that respects classification, residency, and citizen-data law.',
        layers: ['Ingest', 'Ontology', 'Decide', 'Act'],
        outcomes: 'Public-sector decisioning at population scale, with audit by design.',
    },
    {
        n: '03',
        name: 'Critical Infrastructure',
        mission: 'Operational continuity and anomaly detection across energy, water, transport, and telecoms. The decision cycle is the resilience strategy.',
        layers: ['Ingest', 'Analyze', 'Decide', 'Act'],
        outcomes: 'Faster anomaly response, defensible runbooks, and post-incident review without losing the institution.',
    },
    {
        n: '04',
        name: 'Financial Services',
        mission: 'Fraud, AML / CFT, conduct, and market integrity. The platform regulators want to see, embedded in the cycles operators actually run.',
        layers: ['Ingest', 'Ontology', 'Analyze', 'Decide'],
        outcomes: 'Regulator-grade auditability, fewer false positives, faster case adjudication.',
    },
    {
        n: '05',
        name: 'Energy',
        mission: 'Operational intelligence from upstream through grid. The same spine, deployed sovereignly across rapidly shifting regulatory perimeters.',
        layers: ['Ingest', 'Ontology', 'Analyze', 'Act'],
        outcomes: 'Asset performance and operational decisioning, governed across the lifecycle.',
    },
]
</script>

<template>
    <div class="bg-ink text-bone">
        <!-- Hero -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-44 lg:pb-24">
                <p class="text-eyebrow mb-6">Industries</p>
                <h1 class="text-display-l text-bone-bright max-w-4xl">Mission-led, sector by sector.</h1>
                <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                    Buyers identify by mission, not feature. Davion engagements start with the decision the institution has to be right about — and work backwards into the platform.
                </p>
            </div>
        </section>

        <!-- Sector deep-dives -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="space-y-16">
                    <div v-for="sector in sectors" :key="sector.n" class="grid lg:grid-cols-12 gap-12 pt-12 border-t border-ink-200 first:border-t-0 first:pt-0">
                        <div class="lg:col-span-3">
                            <p class="text-eyebrow">Sector {{ sector.n }}</p>
                            <p class="text-h2 text-bone-bright mt-3">{{ sector.name }}</p>
                        </div>
                        <div class="lg:col-span-6">
                            <p class="text-eyebrow">Mission</p>
                            <p class="text-body-l text-bone mt-3">{{ sector.mission }}</p>
                            <p class="text-eyebrow mt-8">Outcomes</p>
                            <p class="text-body text-steel-light mt-3">{{ sector.outcomes }}</p>
                        </div>
                        <div class="lg:col-span-3">
                            <p class="text-eyebrow">AlpOS layers</p>
                            <ul class="mt-3 space-y-2">
                                <li v-for="l in sector.layers" :key="l" class="text-label flex items-center gap-3">
                                    <span class="text-signal">·</span>
                                    {{ l }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="mt-12">
                    <NuxtLink to="/solutions/alpos" class="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors duration-davion-hover">
                        Explore AlpOS
                        <span aria-hidden="true">→</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section>
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 items-end">
                    <div class="lg:col-span-8">
                        <p class="text-eyebrow mb-6">Engage</p>
                        <p class="text-display-m text-bone-bright">Talk to your sector lead.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            Per-sector engagements are led by operators who have lived the mission, not just sold to it.
                        </p>
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                            Request a briefing
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
