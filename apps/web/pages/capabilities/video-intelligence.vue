<script setup lang="ts">
useSeoMeta({
    title: 'Video intelligence',
    description: 'Detect, classify, and make searchable hours of video across cameras, devices, and archives — inside your perimeter, with chain-of-custody preserved.',
    ogTitle: 'Davion · Video intelligence',
    ogDescription: 'Video at the speed of investigation. Object, scene, and event detection across archives with chain-of-custody intact.',
})

const whatItDoes = [
    'Detects objects, scenes, and events across recorded and live video streams.',
    'Indexes video so analysts search by content, not just timestamp.',
    'Preserves chain-of-custody from frame to case file.',
    'Runs entirely on operator hardware — body cameras, CCTV, ISR feeds, archive.',
]
const howItWorks = [
    { n: '01', title: 'Ingest', body: 'Live streams and archives flow in through standard protocols (RTSP, NDI, file). Metadata travels with the frame.' },
    { n: '02', title: 'Detect', body: 'Object detection, scene classification, OCR, and face / plate / vehicle recognition where policy permits.' },
    { n: '03', title: 'Index', body: 'Every detection becomes a searchable entity in the ontology. Analysts query by content, not by minute.' },
    { n: '04', title: 'Cite', body: 'Every result returns the frame, the source, and the chain-of-custody log. Court-admissible by design.' },
]
const whenToUse = [
    'Public safety operators reviewing hours of body-camera footage after an incident',
    'Defense and intelligence analysts searching ISR archives for tactical change',
    'Manufacturing quality teams diagnosing visual defects across production lines',
    'Critical-infrastructure operators monitoring CCTV against unauthorised access patterns',
]
const industries = [
    { name: 'Defense & Intelligence', slug: 'defense-intelligence' },
    { name: 'Government', slug: 'government' },
    { name: 'Manufacturing', slug: 'manufacturing' },
    { name: 'Energy', slug: 'energy' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Capability · Video intelligence" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-5xl">
                Video at the speed of investigation<span class="text-primary-text">.</span> Chain-of-custody intact<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                AlpOS Video Intelligence detects, classifies, and indexes hours of video so analysts search by content — not by timestamp. Runs against your cameras and your archives, inside your perimeter, with the lineage to defend the result in court.
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
                    Ingest · Detect · Index · Cite<span class="text-primary-text">.</span>
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
                Where video intelligence earns its keep<span class="text-primary-text">.</span>
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
                        Investigations at the speed of frames<span class="text-primary-text">.</span>
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
