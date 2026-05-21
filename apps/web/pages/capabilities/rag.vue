<script setup lang="ts">
useSeoMeta({
    title: 'RAG over your ontology',
    description: 'Retrieval-augmented generation grounded in your domain ontology and document corpus — never the open web. Every output cites its source, every retrieval respects access control.',
    ogTitle: 'Davion · RAG over your ontology',
    ogDescription: 'AI that cites its sources. RAG grounded against your governed ontology — inside your perimeter, audit-ready.',
})

const whatItDoes = [
    'Answers analyst questions against your governed document corpus, not the open web.',
    'Cites the exact passage and source for every claim — no unsupported sentences.',
    'Respects per-document and per-cell access control on every retrieval.',
    'Runs entirely inside your perimeter — no third-party API, no leakage.',
]
const howItWorks = [
    { n: '01', title: 'Ground', body: 'Index your governed document corpus into a vector store inside your perimeter. The ontology decides what counts as a source.' },
    { n: '02', title: 'Retrieve', body: 'Every query goes through the access-control layer first. Only passages the user is authorised to see are eligible for retrieval.' },
    { n: '03', title: 'Reason', body: 'The LLM is constrained to reason only over retrieved passages. Sources travel with the answer.' },
    { n: '04', title: 'Cite', body: 'Every claim is rendered with the exact passage and source reference. The analyst can verify, drill in, and audit.' },
]
const whenToUse = [
    'Compliance officers answering questions against thousands of regulatory documents',
    'Analysts drafting briefs against classified or proprietary source material',
    'Solutions engineers searching internal documentation and architecture decisions',
    'Field operators querying maintenance manuals, SOPs, and incident histories under audit',
]
const industries = [
    { name: 'Financial Services', slug: 'financial-services' },
    { name: 'Defense & Intelligence', slug: 'defense-intelligence' },
    { name: 'Life Sciences', slug: 'life-sciences' },
    { name: 'Government', slug: 'government' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Capability · RAG" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-5xl">
                AI that cites its sources<span class="text-primary-text">.</span> Grounded in your ontology, not the open web<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Retrieval-augmented generation that runs against your governed ontology and document corpus — inside your perimeter, with access control on every retrieval and provenance on every claim.
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
                    Ground · Retrieve · Reason · Cite<span class="text-primary-text">.</span>
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
                Where RAG earns its keep<span class="text-primary-text">.</span>
            </h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                <NuxtLink v-for="i in industries" :key="i.slug" :to="`/industries/${i.slug}`" class="bg-whitesmoke-100 card-hover hover:bg-whitesmoke-200 rounded-2xl p-5 transition-colors block group">
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
                        AI you can defend at audit<span class="text-primary-text">.</span>
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
