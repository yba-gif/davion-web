<script setup lang="ts">
useSeoMeta({
    title: 'AI Capabilities',
    description: 'The AI capabilities bundled in AlpOS — RAG, geospatial, video, audio, translation, and data acquisition — all run inside your perimeter.',
    ogTitle: 'Davion · Capabilities',
    ogDescription: 'Six AI capabilities, one sovereign platform. Bundled with AlpOS, governed end to end, run where you require.',
})

const capabilities = [
    { slug: 'rag', name: 'RAG over your ontology', body: 'Retrieval-augmented generation grounded in your domain model — not the open web.' },
    { slug: 'geospatial', name: 'Geospatial analytics', body: 'Map, ground, and reason over location-aware data at operational scale.' },
    { slug: 'video-intelligence', name: 'Video intelligence', body: 'Detect, classify, and search across video corpora — inside your perimeter.' },
    { slug: 'audio-analysis', name: 'Audio analysis & transcription', body: 'Speaker, sentiment, and semantic structure from audio at scale.' },
    { slug: 'translation', name: 'Machine translation', body: '60+ languages, with provenance, run inside your perimeter.' },
    { slug: 'data-acquisition', name: 'Data acquisition & preparation', body: 'Connectors, ETL, enrichment, and governance from source to ontology.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Platform · AI Capabilities" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                AI capabilities, governed at the layer above<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                AlpOS bundles a stack of AI capabilities that operate inside your perimeter — grounded against your ontology, audited end to end, run where you require.
            </p>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="cap in capabilities" :key="cap.slug" :to="`/capabilities/${cap.slug}`" class="bg-white hover:bg-whitesmoke-100 rounded-2xl p-7 transition-colors block group">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Capability</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 group-hover:text-primary-text transition-colors leading-tight">{{ cap.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ cap.body }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-5 inline-flex items-center gap-2 transition-colors text-[13px] font-medium">
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
                        Bundle the capabilities you need<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        AlpOS lets you turn on what you need, when you need it — modular by design, sovereign by default.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
