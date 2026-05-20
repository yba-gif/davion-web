<script setup lang="ts">
useSeoMeta({
    title: 'Industries',
    description: 'Davion deployments by sector: Financial Services, Energy, Manufacturing, Life Sciences, Government, Defense & Intelligence.',
})

const industries = [
    { slug: 'financial-services', name: 'Financial Services', body: 'Market & risk intelligence, compliance, client engagement, and operational resilience — under regulator-grade audit.' },
    { slug: 'energy', name: 'Energy', body: 'Operational intelligence from upstream to grid; the same spine deployed across shifting regulatory perimeters.' },
    { slug: 'manufacturing', name: 'Manufacturing', body: 'Asset health, supply-chain visibility, anomaly response, and quality at scale — telemetry stays in your perimeter.' },
    { slug: 'life-sciences', name: 'Life Sciences', body: 'Discovery acceleration, clinical operations, and trial intelligence with regulatory traceability by design.' },
    { slug: 'government', name: 'Government', body: 'Cross-agency integration of data that has historically refused to integrate; sovereign AI that respects classification.' },
    { slug: 'defense-intelligence', name: 'Defense & Intelligence', body: 'Decision support under classification and air-gap; mission cycle compressed with traceable outputs.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Industries" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Sovereign AI across the institutions that run the world<span class="text-primary">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion is deployed across financial services, energy, manufacturing, life sciences, government, and defense — wherever data has to become decisions that can be defended.
            </p>
        </section>

        <TrustedByStrip />

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="industry in industries" :key="industry.slug" :to="`/industries/${industry.slug}`" class="bg-whitesmoke-100 hover:bg-whitesmoke-200 rounded-2xl p-8 transition-colors block group">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">Industry</p>
                    <p class="text-h2 font-degular font-bold text-drygray-100 mt-3 group-hover:text-primary transition-colors leading-tight">{{ industry.name }}</p>
                    <p class="text-b1 text-drygray-default mt-4">{{ industry.body }}</p>
                    <p class="text-drygray-100 group-hover:text-primary mt-6 inline-flex items-center gap-2 transition-colors font-medium">
                        Explore
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Talk to your sector lead<span class="text-primary">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Per-sector engagements are led by operators who have lived the mission, not just sold to it.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
