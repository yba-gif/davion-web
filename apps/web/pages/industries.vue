<script setup lang="ts">
useSeoMeta({
    title: 'Industries',
    description: 'Davion deployments by sector: Defense, Intelligence, Government, Critical Infrastructure, Financial Services, Energy.',
})

const sectors = [
    { n: '01', name: 'Defense & Intelligence', mission: 'Decision support under classification and air-gap. Faster cycles between collection and action, with traceability that survives the after-action review.', layers: ['Ingest', 'Ontology', 'Analyze', 'Decide'], outcomes: 'Mission planning, signals fusion, operational decisioning — inside the perimeter.' },
    { n: '02', name: 'Government', mission: 'Cross-agency integration of data that has historically refused to integrate. Sovereign AI that respects classification, residency, and citizen-data law.', layers: ['Ingest', 'Ontology', 'Decide', 'Act'], outcomes: 'Public-sector decisioning at population scale, with audit by design.' },
    { n: '03', name: 'Critical Infrastructure', mission: 'Operational continuity and anomaly detection across energy, water, transport, and telecoms. The decision cycle is the resilience strategy.', layers: ['Ingest', 'Analyze', 'Decide', 'Act'], outcomes: 'Faster anomaly response, defensible runbooks, and post-incident review without losing the institution.' },
    { n: '04', name: 'Financial Services', mission: 'Fraud, AML / CFT, conduct, and market integrity. The platform regulators want to see, embedded in the cycles operators actually run.', layers: ['Ingest', 'Ontology', 'Analyze', 'Decide'], outcomes: 'Regulator-grade auditability, fewer false positives, faster case adjudication.' },
    { n: '05', name: 'Energy', mission: 'Operational intelligence from upstream through grid. The same spine, deployed sovereignly across rapidly shifting regulatory perimeters.', layers: ['Ingest', 'Ontology', 'Analyze', 'Act'], outcomes: 'Asset performance and operational decisioning, governed across the lifecycle.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Industries" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Mission-led, sector by sector.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Buyers identify by mission, not feature. Davion engagements start with the decision the institution has to be right about — and work backwards into the platform.
            </p>
        </section>

        <section class="bg-aliceblue rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div class="bg-white rounded-2xl divide-y divide-drygray-200">
                <div v-for="sector in sectors" :key="sector.n" class="grid lg:grid-cols-12 gap-6 lg:gap-10 px-6 md:px-8 py-8 md:py-10">
                    <div class="lg:col-span-3">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">Sector {{ sector.n }}</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2">{{ sector.name }}</p>
                    </div>
                    <div class="lg:col-span-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">Mission</p>
                        <p class="text-b2 text-drygray-100 mt-2">{{ sector.mission }}</p>
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default mt-6">Outcomes</p>
                        <p class="text-b2 text-drygray-default mt-2">{{ sector.outcomes }}</p>
                    </div>
                    <div class="lg:col-span-3">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">AlpOS layers</p>
                        <ul class="mt-3 space-y-2">
                            <li v-for="l in sector.layers" :key="l" class="text-b1 text-drygray-100 flex items-center gap-3">
                                <span class="text-primary" aria-hidden="true">·</span>
                                {{ l }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mt-8">
                <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" size="xs" icon="base:arrow">Explore AlpOS</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Talk to your sector lead.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Per-sector engagements are led by operators who have lived the mission, not just sold to it.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Request a briefing</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
