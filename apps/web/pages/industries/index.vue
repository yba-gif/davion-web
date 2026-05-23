<script setup lang="ts">
useSeoMeta({
    title: 'Industries',
    description: 'Davion deployments by sector: Financial Services, Energy, Defense & Intelligence, Manufacturing, Life Sciences, Government, six sovereign-AI playbooks built on AlpOS.',
    ogTitle: 'Davion · Industries',
    ogDescription: 'Sovereign AI across the institutions that run the world. Six industry playbooks built on AlpOS.',
})

// Industries hub, P2.1 promoted Manufacturing, Life Sciences, and Government
// out of stub status. All 6 industries now have real depth playbooks. The
// `coming: true` treatment was used as a temporary honesty mechanism in P1 and
// is now retired.
const industries = [
    { slug: 'financial-services', name: 'Financial Services', body: 'AML, market & risk intelligence, surveillance, client engagement, fraud, and operational resilience, regulator-grade lineage.' },
    { slug: 'energy', name: 'Energy', body: 'Grid, generation, asset reliability, and OT-side cyber, telemetry stays in your perimeter.' },
    { slug: 'defense-intelligence', name: 'Defense & Intelligence', body: 'Air-gapped sovereign AI for mission planning, all-source fusion, and OSINT. Decisions stay inside the enclave.' },
    { slug: 'manufacturing', name: 'Manufacturing', body: 'Plant operations, quality, supply visibility, and industrial cybersecurity, production telemetry stays inside.' },
    { slug: 'life-sciences', name: 'Life Sciences', body: 'Discovery, clinical operations, pharmacovigilance, and GxP process intelligence, audit-ready for regulators by design.' },
    { slug: 'government', name: 'Government', body: 'Cross-agency entity resolution, benefits fraud, critical infrastructure, and procurement oversight, citizen-data law respected by design.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup title="Industries" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Sovereign AI across the institutions that run the world<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion is deployed across financial services, energy, manufacturing, life sciences, government, and defense, wherever data has to become decisions that can be defended.
            </p>
        </section>

        <!-- TrustedByStrip removed (P0.1), see action plan; slot reserved for real proof. -->

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink
                    v-for="industry in industries"
                    :key="industry.slug"
                    :to="`/industries/${industry.slug}`"
                    class="bg-whitesmoke-100 card-hover hover:bg-whitesmoke-200 rounded-2xl p-8 transition-colors block group"
                >
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Industry</p>
                    <p class="text-h2 font-degular font-bold text-drygray-100 mt-3 group-hover:text-primary-text transition-colors leading-tight">{{ industry.name }}</p>
                    <p class="text-b1 text-drygray-default mt-4">{{ industry.body }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-6 inline-flex items-center gap-2 transition-colors font-medium">
                        Read the playbook
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Engagements are led by operators<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Davion routes each engagement to people who have lived the mission, not just sold to it.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
