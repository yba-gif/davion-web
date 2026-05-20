<script setup lang="ts">
useSeoMeta({
    title: 'Digital Transformation',
    description: 'Modernization with sovereignty intact — from siloed data to a single governed source of truth, phased from POC to industrial deployment.',
})

const phases = [
    { n: '01', name: 'Discover', body: 'Audit the data, the workflows, and the operational reality. Identify the single highest-value decision to govern first.' },
    { n: '02', name: 'POC', body: 'Stand up AlpOS against the proof-of-concept dataset. Demonstrate the ingest-to-act spine end to end, inside the sovereign perimeter.' },
    { n: '03', name: 'Industrialize', body: 'Expand from POC to operational deployment. Connect remaining sources, formalize the ontology, embed decisions into workflows of record.' },
    { n: '04', name: 'Enable', body: 'Train operators, hand off ownership, and instrument the platform for ongoing change. The work continues — without the contractor.' },
]

const layers = [
    { name: 'Ingest', body: 'Bring fragmented data into a single governed pipeline; lineage tracked from source.' },
    { name: 'Ontology', body: 'Establish the shared vocabulary across the institution — analysts, engineers, operators reason against the same model.' },
    { name: 'Decide', body: 'Replace report-and-meeting cycles with operator-grade decisioning, with AI that cites its sources.' },
    { name: 'Act', body: 'Write decisions back to the systems of record the institution already runs.' },
]

const outcomes = [
    { label: 'Time to insight', body: 'Decisions in days, not quarterly reviews. The platform absorbs the speed gap legacy stacks create.' },
    { label: 'Governance', body: 'Every decision is traceable. Modernization arrives with audit, not at its expense.' },
    { label: 'Operator ownership', body: 'The institution owns the platform after deployment — not a vendor relationship in perpetuity.' },
]
</script>

<template>
    <div class="bg-ink text-bone">
        <!-- Hero -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-44 lg:pb-24">
                <p class="text-eyebrow mb-6">Solutions · Digital Transformation</p>
                <h1 class="text-display-l text-bone-bright max-w-4xl">From siloed data to a single governed source of truth.</h1>
                <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                    Modernization for institutions that cannot trade governance for speed — and cannot afford to keep paying for both. AlpOS becomes the backbone, phased from proof-of-concept to industrial deployment.
                </p>
                <div class="mt-10">
                    <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                        Talk to our team
                        <span aria-hidden="true">→</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- The problem -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-3"><p class="text-eyebrow">The problem</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-display-m text-bone-bright max-w-4xl">Legacy stacks were not designed to be governed.</p>
                        <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                            Decades of point tools, fragmented schemas, and migrations-deferred have left institutions with data they cannot trust, models they cannot defend, and decisions that arrive too late. Modernization is not a cosmetic exercise. It is a sovereign one.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Phased journey -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Phased journey</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">From POC to industrial deployment, without losing the institution.</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200">
                    <div v-for="phase in phases" :key="phase.n" class="bg-ink p-8">
                        <p class="text-eyebrow">Phase {{ phase.n }}</p>
                        <p class="text-h3 text-bone-bright mt-3">{{ phase.name }}</p>
                        <p class="text-body-s mt-3">{{ phase.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- AlpOS layers used -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Underneath</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">The AlpOS layers that carry the work.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Digital Transformation engagements lean on the full ingest-to-act spine, but the weight of the work falls on these four.
                        </p>
                    </div>
                </div>
                <div class="border-t border-ink-200">
                    <div v-for="layer in layers" :key="layer.name" class="grid lg:grid-cols-12 gap-6 py-6 border-b border-ink-200">
                        <div class="lg:col-span-3"><p class="text-label">{{ layer.name }}</p></div>
                        <p class="lg:col-span-9 text-body text-bone">{{ layer.body }}</p>
                    </div>
                </div>
                <div class="mt-8">
                    <NuxtLink to="/solutions/alpos" class="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors duration-davion-hover">
                        Explore AlpOS
                        <span aria-hidden="true">→</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Outcomes -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Outcomes</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">What the institution gets.</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="o in outcomes" :key="o.label" class="border-t border-signal pt-6">
                        <p class="text-eyebrow">{{ o.label }}</p>
                        <p class="text-body-l text-bone mt-4">{{ o.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section>
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 items-end">
                    <div class="lg:col-span-8">
                        <p class="text-eyebrow mb-6">Engage</p>
                        <p class="text-display-m text-bone-bright">Modernize without trading governance for speed.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            Briefings start with the highest-value decision in your institution today — and work backwards from there.
                        </p>
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                            Talk to our team
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
