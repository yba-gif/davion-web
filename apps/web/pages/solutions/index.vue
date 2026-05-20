<script setup lang="ts">
// Solutions hub — Platform overview. Frames AlpOS as the OS underneath the three solution layers.
useSeoMeta({
    title: 'Solutions',
    description: 'Davion solutions: AlpOS, Digital Transformation, Cybersecurity, OSINT — built on one sovereign platform.',
})

const solutions = [
    { slug: 'alpos', label: 'Platform · Flagship', name: 'AlpOS', body: 'The sovereign operating system underneath every Davion solution. Ingest, ontology, analytics, AI, decisioning, action.' },
    { slug: 'digital-transformation', label: 'Solution', name: 'Digital Transformation', body: 'From siloed data to a single governed source of truth, phased from POC to industrial deployment.' },
    { slug: 'cybersecurity', label: 'Solution', name: 'Cybersecurity', body: 'Defensive intelligence for environments that cannot fail. Detection through pattern, anomaly, and graph analysis.' },
    { slug: 'osint', label: 'Solution', name: 'OSINT', body: 'Sovereign open-source intelligence — multi-source collection, correlation, and synthesis; anonymous and compliant.' },
]
</script>

<template>
    <div class="bg-ink text-bone">
        <!-- Hero -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-44 lg:pb-24">
                <p class="text-eyebrow mb-6">Solutions</p>
                <h1 class="text-display-l text-bone-bright max-w-4xl">
                    Four solutions. One platform underneath.
                </h1>
                <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                    AlpOS is the operating system. Digital Transformation, Cybersecurity, and OSINT are how it is applied. Same ingest-to-act spine, same sovereignty guarantees, same audit trail.
                </p>
            </div>
        </section>

        <!-- Stack diagram: AlpOS underneath the three solutions -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
                <p class="text-eyebrow mb-6">Stack</p>
                <div class="border border-ink-200 rounded-sm bg-ink-50/40 p-4 sm:p-6 lg:p-8">
                    <div class="grid grid-cols-3 gap-px bg-ink-200 mb-px">
                        <div class="bg-ink p-6 text-center">
                            <p class="text-eyebrow">Solution</p>
                            <p class="text-h3 text-bone-bright mt-2">Digital Transformation</p>
                        </div>
                        <div class="bg-ink p-6 text-center">
                            <p class="text-eyebrow">Solution</p>
                            <p class="text-h3 text-bone-bright mt-2">Cybersecurity</p>
                        </div>
                        <div class="bg-ink p-6 text-center">
                            <p class="text-eyebrow">Solution</p>
                            <p class="text-h3 text-bone-bright mt-2">OSINT</p>
                        </div>
                    </div>
                    <div class="bg-ink-100 p-8 text-center border-t-2 border-signal">
                        <p class="text-eyebrow">Platform</p>
                        <p class="text-display-m text-bone-bright mt-2">AlpOS</p>
                        <p class="text-body-s mt-3 max-w-2xl mx-auto">
                            Ingest · Ontology · Analyze · Decide · Act — inside a sovereign perimeter.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Solution cards -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid sm:grid-cols-2 gap-px bg-ink-200">
                    <NuxtLink
                        v-for="s in solutions"
                        :key="s.slug"
                        :to="`/solutions/${s.slug}`"
                        class="bg-ink p-8 lg:p-10 hover:bg-ink-50 transition-colors duration-davion-hover group"
                    >
                        <p class="text-eyebrow">{{ s.label }}</p>
                        <p class="text-h2 text-bone-bright mt-3">{{ s.name }}</p>
                        <p class="text-body text-steel-light mt-4">{{ s.body }}</p>
                        <p class="text-bone group-hover:text-signal mt-6 inline-flex items-center gap-2 transition-colors duration-davion-hover">
                            Explore
                            <span aria-hidden="true">→</span>
                        </p>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Deployment + Industries supporting strips -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32 space-y-16">
                <div class="grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Deployment</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Every solution. Every deployment mode.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            On-premise, air-gapped, sovereign cloud, or private cloud. The deployment model is yours to choose; the sovereignty guarantees do not change.
                        </p>
                        <div class="mt-8">
                            <NuxtLink to="/trust" class="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors duration-davion-hover">
                                Trust &amp; Sovereignty
                                <span aria-hidden="true">→</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="grid lg:grid-cols-12 gap-12 pt-16 border-t border-ink-200">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Industries</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Buyers identify by mission, not feature.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Davion is deployed in defense, intelligence, critical infrastructure, government, financial services, and energy — wherever decisions must be both fast and defensible.
                        </p>
                        <div class="mt-8">
                            <NuxtLink to="/industries" class="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors duration-davion-hover">
                                Industries
                                <span aria-hidden="true">→</span>
                            </NuxtLink>
                        </div>
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
                        <p class="text-display-m text-bone-bright">Start with AlpOS. Tailor the rest.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            Most engagements begin with an AlpOS briefing tailored to your environment, then expand into the solution layers as the platform proves itself.
                        </p>
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <NuxtLink to="/solutions/alpos" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                            Explore AlpOS
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
