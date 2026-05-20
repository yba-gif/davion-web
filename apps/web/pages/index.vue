<script setup lang="ts">
// Davion home — gravity layer (build sequence step 3).
// Mission hero, Innovate/Secure/Perform triad, AlpOS teaser, intelligence-cycle stepper,
// sovereignty strip, sectors band, Newsroom slot, consultative CTA.

useSeoMeta({
    description: 'Sovereign software for the decisions institutions cannot afford to get wrong. Davion builds the platforms used by defense, intelligence, critical infrastructure, and the public sector.',
    ogTitle: 'Davion',
    ogDescription: 'Sovereign software for data intelligence and artificial intelligence.',
})
useHead({
    title: 'Davion',
    titleTemplate: '%s',
})

const pillars = [
    { n: '01', verb: 'Innovate', body: 'Move from fragmented data and opaque models to a single governed source of truth — and to AI you can defend.' },
    { n: '02', verb: 'Secure', body: 'Deploy under your jurisdiction, your access controls, your audit. Nothing leaves. Everything is auditable.' },
    { n: '03', verb: 'Perform', body: 'From signal to action in minutes, not weeks. The decision cycle is the architecture — not a series of integrations.' },
]

const cycle = [
    { n: '01', title: 'Data', body: 'Pull every relevant signal through a single governed pipeline.' },
    { n: '02', title: 'Meaning', body: 'Model it as entities, events, and relationships in your ontology.' },
    { n: '03', title: 'Decision', body: 'Reason against the ontology with AI that cites its sources.' },
    { n: '04', title: 'Action', body: 'Embed the decision into operators and systems of record.' },
]

const sectors = ['Defense', 'Intelligence', 'Critical infrastructure', 'Government', 'Financial services', 'Energy']

const sovereignty = [
    { name: 'On-premise', label: 'Your hardware. Your network.' },
    { name: 'Air-gapped', label: 'Disconnected operation, signed updates.' },
    { name: 'Sovereign cloud', label: 'Your provider, your region, bound by contract.' },
]
</script>

<template>
    <div class="bg-ink text-bone">
        <!-- 1. Mission hero -->
        <section class="relative border-b border-ink-200">
            <div
                class="absolute inset-0 pointer-events-none opacity-[0.035]"
                aria-hidden="true"
                style="background-image: linear-gradient(var(--davion-bone) 1px, transparent 1px), linear-gradient(90deg, var(--davion-bone) 1px, transparent 1px); background-size: 64px 64px;"
            />
            <div class="relative mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-48 lg:pb-32">
                <p class="text-eyebrow mb-6">Davion · Sovereign software</p>
                <h1 class="text-display-xl text-bone-bright max-w-5xl">
                    The platforms institutions decide on.
                </h1>
                <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                    Davion builds sovereign software for data intelligence and AI — used by defense, intelligence, critical infrastructure, regulated industry, and the public sector to turn data into meaning and decisions into action, all under their full control.
                </p>
                <div class="mt-10 flex flex-wrap items-center gap-6">
                    <NuxtLink
                        to="/contact"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover"
                    >
                        Request a briefing
                        <span aria-hidden="true">→</span>
                    </NuxtLink>
                    <NuxtLink
                        to="/solutions/alpos"
                        class="text-bone hover:text-signal transition-colors duration-davion-hover inline-flex items-center gap-2"
                    >
                        Explore AlpOS
                        <span aria-hidden="true">→</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- 2. Innovate · Secure · Perform triad -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Promise</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Innovate. Secure. Perform.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Three verbs. They are not slogans — they are the order in which institutions adopt sovereign software, and the order in which it has to deliver.
                        </p>
                    </div>
                </div>
                <div class="grid md:grid-cols-3 gap-px bg-ink-200">
                    <div v-for="p in pillars" :key="p.verb" class="bg-ink p-8 lg:p-10">
                        <p class="text-label">{{ p.n }}</p>
                        <p class="text-h2 text-bone-bright mt-3">{{ p.verb }}</p>
                        <p class="text-body text-steel-light mt-4">{{ p.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. AlpOS teaser -->
        <section class="border-b border-ink-200 bg-ink-50/40">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 items-end">
                    <div class="lg:col-span-7">
                        <p class="text-eyebrow mb-6">Flagship · AlpOS</p>
                        <p class="text-display-m text-bone-bright">The operating system underneath every Davion solution.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            AlpOS is the sovereign platform — ingest, ontology, analytics, AI, decisioning, action — that Digital Transformation, Cybersecurity, and OSINT are all built on. One spine, governed end to end.
                        </p>
                        <div class="mt-8">
                            <NuxtLink to="/solutions/alpos" class="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors duration-davion-hover">
                                Explore AlpOS
                                <span aria-hidden="true">→</span>
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="lg:col-span-5">
                        <div class="border border-ink-200 rounded-sm p-6 bg-ink">
                            <p class="text-eyebrow mb-4">Spine</p>
                            <div class="flex items-center gap-1 text-label flex-wrap">
                                <span class="px-3 py-2 bg-ink-50 border border-ink-200">Ingest</span>
                                <span class="text-signal">→</span>
                                <span class="px-3 py-2 bg-ink-50 border border-ink-200">Ontology</span>
                                <span class="text-signal">→</span>
                                <span class="px-3 py-2 bg-ink-50 border border-ink-200">Analyze</span>
                                <span class="text-signal">→</span>
                                <span class="px-3 py-2 bg-ink-50 border border-ink-200">Decide</span>
                                <span class="text-signal">→</span>
                                <span class="px-3 py-2 bg-ink-50 border border-ink-200">Act</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. Intelligence-cycle stepper -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">The cycle</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Data → Meaning → Decision → Action.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Every Davion deployment runs the same sovereign decision cycle. The platform stays constant; the surface adapts to the mission.
                        </p>
                    </div>
                </div>
                <div class="grid md:grid-cols-4 gap-px bg-ink-200">
                    <div v-for="step in cycle" :key="step.n" class="bg-ink p-8 lg:p-10">
                        <p class="text-eyebrow">Step {{ step.n }}</p>
                        <p class="text-h3 text-bone-bright mt-3">{{ step.title }}</p>
                        <p class="text-body-s mt-3">{{ step.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. Sovereignty strip -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Sovereign by design</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Run where you require — only where you require.</p>
                        <div class="mt-10 grid sm:grid-cols-3 gap-px bg-ink-200">
                            <div v-for="m in sovereignty" :key="m.name" class="bg-ink p-6">
                                <p class="text-label">{{ m.label }}</p>
                                <p class="text-h3 text-bone-bright mt-2">{{ m.name }}</p>
                            </div>
                        </div>
                        <div class="mt-8">
                            <NuxtLink to="/trust" class="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors duration-davion-hover">
                                Trust &amp; Sovereignty
                                <span aria-hidden="true">→</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 6. Sectors band -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
                <p class="text-eyebrow mb-6">Sectors</p>
                <div class="flex flex-wrap gap-x-10 gap-y-3 text-body-l text-bone-bright">
                    <span v-for="(s, i) in sectors" :key="s" class="flex items-center gap-3">
                        <span class="text-steel font-mono text-sm font-normal">{{ String(i + 1).padStart(2, '0') }}</span>
                        {{ s }}
                    </span>
                </div>
            </div>
        </section>

        <!-- 7. Newsroom (empty state until content) -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 items-end mb-12">
                    <div class="lg:col-span-9">
                        <p class="text-eyebrow mb-6">Newsroom</p>
                        <p class="text-h1 text-bone-bright">Dispatches from the work.</p>
                    </div>
                    <div class="lg:col-span-3 lg:text-right">
                        <NuxtLink to="/company/newsroom" class="text-bone hover:text-signal transition-colors duration-davion-hover inline-flex items-center gap-2">
                            All dispatches
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
                <div class="border-t border-ink-200 pt-10">
                    <p class="text-body-s">The Newsroom opens with our first dispatch shortly.</p>
                </div>
            </div>
        </section>

        <!-- 8. Consultative CTA -->
        <section>
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 items-end">
                    <div class="lg:col-span-8">
                        <p class="text-eyebrow mb-6">Engage</p>
                        <p class="text-display-m text-bone-bright">Tell us what you're trying to decide.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            Briefings are consultative and tailored. Bring your data architecture, your constraints, and your operational reality. We will bring the right people from our side.
                        </p>
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                            Request a briefing
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
