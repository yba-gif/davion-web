<script setup lang="ts">
useSeoMeta({
    title: 'Data acquisition & preparation',
    description: 'Connectors, ETL, enrichment, and governance from source to ontology — the foundation of every AlpOS deployment. Lineage on every record.',
    ogTitle: 'Davion · Data acquisition',
    ogDescription: 'Every signal through one governed pipeline. Connectors, ETL, enrichment, and lineage from source to ontology.',
})

const whatItDoes = [
    'Pulls structured, unstructured, real-time, and archival data through one governed pipeline.',
    'Records lineage from source row to ontology entity — every transformation, every actor.',
    'Applies PII-aware transforms and policy enforcement at ingest time.',
    'Native connectors for the systems institutions actually run (SAP, Oracle, Snowflake, MES, SCADA, Salesforce, ServiceNow, S3, message queues — and the long tail).',
]
const howItWorks = [
    { n: '01', title: 'Connect', body: 'Native connectors or pro-code SDK for any source. Streaming, batch, or change-data-capture as the source supports.' },
    { n: '02', title: 'Transform', body: 'Low-code or pro-code transforms with PII detection, schema-on-read, and validation against the ontology contract.' },
    { n: '03', title: 'Enrich', body: 'Reference data, geocoding, entity resolution, and per-domain enrichment — all logged in the lineage graph.' },
    { n: '04', title: 'Land', body: 'Records land in the ontology bound to source provenance. Downstream consumers query the ontology, not the source.' },
]
const whenToUse = [
    'Stand up a new AlpOS deployment against an institution\'s existing data estate',
    'Integrate a new source into a running ontology without breaking downstream consumers',
    'Apply policy and PII handling at the ingest boundary rather than at consumer time',
    'Maintain regulator-grade lineage from raw source to derived insight',
]
const industries = [
    { name: 'Financial Services', slug: 'financial-services' },
    { name: 'Manufacturing', slug: 'manufacturing' },
    { name: 'Government', slug: 'government' },
    { name: 'Life Sciences', slug: 'life-sciences' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Capability · Data acquisition" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-5xl">
                Every signal through one governed pipeline<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Data acquisition is Layer 01 of the AlpOS spine — what every other layer reasons against. Connectors, transforms, enrichment, and policy enforcement, with lineage tracked from source row to ontology entity.
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
                    Connect · Transform · Enrich · Land<span class="text-primary-text">.</span>
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
                Where data acquisition earns its keep<span class="text-primary-text">.</span>
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
                        Lineage from raw row to final decision<span class="text-primary-text">.</span>
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
