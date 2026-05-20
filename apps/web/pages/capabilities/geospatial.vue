<script setup lang="ts">
useSeoMeta({
    title: 'Geospatial analytics',
    description: 'Map, ground, and reason over location-aware data at operational scale. Assets, events, trajectories — anchored in space, inside your perimeter.',
    ogTitle: 'Davion · Geospatial analytics',
    ogDescription: 'Reasoning over location-aware data — assets, events, trajectories. Inside the perimeter, with raster, vector, and trajectory data fused into one ontology.',
})

const whatItDoes = [
    'Fuses raster, vector, and trajectory data into one location-aware ontology.',
    'Resolves and tracks entities across satellite, aerial, and ground sensors.',
    'Detects anomalies on patterns of life, asset behaviour, and tactical change.',
    'Runs against your tile servers and geo-data infrastructure — no third-party cloud.',
]
const howItWorks = [
    { n: '01', title: 'Ingest', body: 'Raster (satellite / aerial / drone), vector (GIS, OSM, internal), and trajectory (AIS, ADS-B, fleet telemetry) flow into the AlpOS pipeline.' },
    { n: '02', title: 'Ground', body: 'Every observation is geocoded, georeferenced, and bound to the ontology entity it describes.' },
    { n: '03', title: 'Reason', body: 'Graph and statistical methods detect patterns: convergence, dispersion, anomaly against historical baselines.' },
    { n: '04', title: 'Render', body: 'Operators see the case on the map, with the lineage from raw observation to decision.' },
]
const whenToUse = [
    'Grid and pipeline operators monitoring linear assets across thousands of kilometres',
    'Defense and intelligence analysts running pattern-of-life on contested geography',
    'Public-safety operators correlating incident reports with spatial demographics',
    'Maritime and aviation surveillance with multi-sensor trajectory fusion',
]
const industries = [
    { name: 'Defense & Intelligence', slug: 'defense-intelligence' },
    { name: 'Energy', slug: 'energy' },
    { name: 'Government', slug: 'government' },
    { name: 'Manufacturing', slug: 'manufacturing' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Capability · Geospatial" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-5xl">
                Where matters<span class="text-primary-text">.</span> Reason over location-aware data inside your perimeter<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                AlpOS Geospatial fuses raster, vector, and trajectory data — satellites, sensors, GIS — into one location-aware ontology. Anomalies, patterns of life, and tactical change become first-class signals on the operator's map.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" icon="base:arrow">See AlpOS</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10">
                <div class="lg:col-span-4">
                    <CommonSup title="What it does" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        Four guarantees<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <ul class="lg:col-span-8 space-y-3">
                    <li v-for="b in whatItDoes" :key="b" class="bg-white rounded-2xl p-5 flex items-start gap-4">
                        <span class="text-primary-text mt-1.5 text-lg" aria-hidden="true">·</span>
                        <span class="text-b1 text-drygray-100">{{ b }}</span>
                    </li>
                </ul>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14 max-w-3xl">
                <CommonSup title="How it works" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                    Ingest · Ground · Reason · Render<span class="text-primary-text">.</span>
                </h2>
            </div>
            <ol class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <li v-for="s in howItWorks" :key="s.n" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Step {{ s.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 leading-tight">{{ s.title }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ s.body }}</p>
                </li>
            </ol>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10">
                <div class="lg:col-span-5">
                    <CommonSup title="When to use it" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        Patterns we see in production<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <ul class="lg:col-span-7 space-y-3">
                    <li v-for="u in whenToUse" :key="u" class="text-b1 text-drygray-100 flex items-start gap-3 bg-white rounded-2xl p-5">
                        <span class="text-primary-text mt-1.5" aria-hidden="true">·</span>
                        <span>{{ u }}</span>
                    </li>
                </ul>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Industries leaning on this" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                Where geospatial earns its keep<span class="text-primary-text">.</span>
            </h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                <NuxtLink v-for="i in industries" :key="i.slug" :to="`/industries/${i.slug}`" class="bg-whitesmoke-100 hover:bg-whitesmoke-200 rounded-2xl p-5 transition-colors block group">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Industry</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 group-hover:text-primary-text transition-colors leading-tight">{{ i.name }}</p>
                </NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Bring the map. We'll bring the platform<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                    <NuxtLink to="/contact"><CommonButton variant="outline" icon="base:arrow">Speak to an expert</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
