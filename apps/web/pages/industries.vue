<script setup lang="ts">
useSeoMeta({ title: 'Industries', description: 'Davion deployments by sector: Defense, Intelligence, Critical Infrastructure, Government, Financial Services, Energy.' })

const sectors = [
    { name: 'Defense & Intelligence', body: 'Mission planning, signals fusion, operational decisioning under air-gap and classification.' },
    { name: 'Government', body: 'Cross-agency data integration, governed AI, and decision support for the public sector.' },
    { name: 'Critical Infrastructure', body: 'Resilience for energy, transport, water, and telecoms — anomaly detection and operational continuity.' },
    { name: 'Financial Services', body: 'Fraud, AML/CFT, conduct, and market integrity — under regulator-grade auditability.' },
    { name: 'Energy', body: 'Operational intelligence across upstream, midstream, downstream, and grid — sovereign deployment.' },
]
</script>

<template>
    <div class="bg-ink text-bone min-h-[calc(100vh-4rem)]">
        <main class="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-44 lg:pb-32">
            <p class="text-eyebrow mb-6">Industries</p>
            <h1 class="text-display-l text-bone-bright max-w-4xl">Mission-led, sector by sector.</h1>
            <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                Davion is deployed wherever decisions must be both fast and defensible. Each sector engagement starts with the mission, not the feature list.
            </p>
            <div class="mt-16 border-t border-ink-200">
                <div v-for="sector in sectors" :key="sector.name" class="grid lg:grid-cols-12 gap-6 py-8 border-b border-ink-200">
                    <div class="lg:col-span-4">
                        <p class="text-h3 text-bone-bright">{{ sector.name }}</p>
                    </div>
                    <p class="lg:col-span-8 text-body text-steel-light">{{ sector.body }}</p>
                </div>
            </div>
            <div class="mt-12 max-w-2xl">
                <p class="text-label">Per-sector deep dives land in a subsequent slice.</p>
            </div>
            <div class="mt-10">
                <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                    Talk to your sector lead
                    <span aria-hidden="true">→</span>
                </NuxtLink>
            </div>
        </main>
    </div>
</template>
