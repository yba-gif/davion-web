<script setup lang="ts">
// Davion home — base1 visual language (rounded pastel sections, CommonSup/CommonButton/FeatureCard,
// Switzer body + Degular Display), Davion content + IA.
useSeoMeta({
    description: 'Sovereign software for the decisions institutions cannot afford to get wrong. Davion builds the platforms used by defense, intelligence, critical infrastructure, and the public sector.',
    ogTitle: 'Davion',
    ogDescription: 'Sovereign software for data intelligence and artificial intelligence.',
})
useHead({ title: 'Davion', titleTemplate: '%s' })

const pillars = [
    { verb: 'Innovate', body: 'Move from fragmented data and opaque models to a single governed source of truth — and to AI you can defend.', icon: 'base:chart-square' },
    { verb: 'Secure', body: 'Deploy under your jurisdiction, your access controls, your audit. Nothing leaves. Everything is auditable.', icon: 'base:status-verified' },
    { verb: 'Perform', body: 'From signal to action in minutes, not weeks. The decision cycle is the architecture — not a series of integrations.', icon: 'base:chart-2' },
]

const cycle = [
    { n: '01', title: 'Data', body: 'Pull every relevant signal through a single governed pipeline.' },
    { n: '02', title: 'Meaning', body: 'Model it as entities, events, and relationships in your ontology.' },
    { n: '03', title: 'Decision', body: 'Reason against the ontology with AI that cites its sources.' },
    { n: '04', title: 'Action', body: 'Embed the decision into operators and systems of record.' },
]

const sovereignty = [
    { name: 'On-premise', body: 'Your hardware. Your network.' },
    { name: 'Air-gapped', body: 'Disconnected operation, signed updates.' },
    { name: 'Sovereign cloud', body: 'Your provider, your region, bound by contract.' },
]

const sectors = ['Defense', 'Intelligence', 'Critical infrastructure', 'Government', 'Financial services', 'Energy']
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- 1. Mission hero — text-left composition with base1's signature spiral motif on the right -->
        <section class="bg-aliceblue rounded-3xl overflow-hidden relative">
            <!-- Hairline grid baseline (instrument-grade detail under the composition) -->
            <div
                class="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
                aria-hidden="true"
                style="background-image: linear-gradient(to right, currentColor 1px, transparent 1px); background-size: 80px 80px; color: #212121;"
            />
            <div class="relative grid lg:grid-cols-2 lg:items-stretch">
                <div class="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 lg:py-32 xl:py-36">
                    <CommonSup title="Sovereign software" />
                    <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.02] sm:text-[56px] md:text-[64px] lg:text-[72px] xl:text-[84px] lg:leading-[0.95] tracking-[-0.02em]">
                        The platforms institutions decide on.
                    </h1>
                    <p class="text-b2 text-drygray-default mt-8 max-w-md">
                        Davion builds sovereign software for data intelligence and AI — used by defense, intelligence, critical infrastructure, regulated industry, and the public sector to turn data into meaning and decisions into action, all under their full control.
                    </p>
                    <div class="mt-10 flex flex-wrap items-center gap-3">
                        <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Request a briefing</CommonButton></NuxtLink>
                        <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" icon="base:arrow">Explore AlpOS</CommonButton></NuxtLink>
                    </div>
                </div>
                <div class="relative h-[360px] sm:h-[480px] lg:h-auto lg:min-h-[640px] overflow-hidden">
                    <img
                        src="/section_background.png"
                        alt=""
                        loading="eager"
                        decoding="async"
                        class="absolute inset-0 w-full h-full object-cover object-center select-none"
                    >
                    <!-- Mono annotation, bottom-right — editorial, instrument-grade -->
                    <div class="absolute bottom-5 right-5 lg:bottom-7 lg:right-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-drygray-100/55 backdrop-blur-sm bg-white/30 px-2.5 py-1 rounded-full">
                        AlpOS · Ontology
                    </div>
                </div>
            </div>
        </section>

        <!-- 2. Innovate / Secure / Perform triad -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                <div class="max-w-2xl">
                    <CommonSup title="Promise" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        Innovate. Secure. Perform.
                    </h2>
                </div>
                <p class="text-b2 text-drygray-default max-w-md">
                    Three verbs. Not slogans — they are the order in which institutions adopt sovereign software, and the order in which it has to deliver.
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <FeatureCard v-for="p in pillars" :key="p.verb" :title="p.verb" :description="p.body" :icon="p.icon" />
            </div>
        </section>

        <!-- 3. AlpOS teaser -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <CommonSup title="Flagship · AlpOS" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        The operating system underneath every Davion solution.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        AlpOS is the sovereign platform — ingest, ontology, analytics, AI, decisioning, action — that Digital Transformation, Cybersecurity, and OSINT are all built on. One spine, governed end to end.
                    </p>
                    <div class="mt-8">
                        <NuxtLink to="/solutions/alpos"><CommonButton variant="primary" icon="base:arrow">Explore AlpOS</CommonButton></NuxtLink>
                    </div>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-whitesmoke-100 rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default mb-4">Spine</p>
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="px-3 py-2 bg-white border border-drygray-200 rounded-lg text-[13px] font-medium text-drygray-100">Ingest</span>
                            <span class="text-primary text-lg" aria-hidden="true">→</span>
                            <span class="px-3 py-2 bg-white border border-drygray-200 rounded-lg text-[13px] font-medium text-drygray-100">Ontology</span>
                            <span class="text-primary text-lg" aria-hidden="true">→</span>
                            <span class="px-3 py-2 bg-white border border-drygray-200 rounded-lg text-[13px] font-medium text-drygray-100">Analyze</span>
                            <span class="text-primary text-lg" aria-hidden="true">→</span>
                            <span class="px-3 py-2 bg-white border border-drygray-200 rounded-lg text-[13px] font-medium text-drygray-100">Decide</span>
                            <span class="text-primary text-lg" aria-hidden="true">→</span>
                            <span class="px-3 py-2 bg-white border border-drygray-200 rounded-lg text-[13px] font-medium text-drygray-100">Act</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. Intelligence cycle -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="max-w-2xl mb-10 md:mb-14">
                <CommonSup title="The cycle" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Data → Meaning → Decision → Action.
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    Every Davion deployment runs the same sovereign decision cycle. The platform stays constant; the surface adapts to the mission.
                </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="step in cycle" :key="step.n" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">Step {{ step.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ step.title }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ step.body }}</p>
                </div>
            </div>
        </section>

        <!-- 5. Sovereignty strip -->
        <section class="bg-aliceblue rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup title="Sovereign by design" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Run where you require — only where you require.
                </h2>
            </div>
            <div class="grid sm:grid-cols-3 gap-4">
                <div v-for="m in sovereignty" :key="m.name" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">Mode</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ m.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ m.body }}</p>
                </div>
            </div>
            <div class="mt-8">
                <NuxtLink to="/trust"><CommonButton variant="outline" size="xs" icon="base:arrow">Trust &amp; Sovereignty</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- 6. Sectors -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup title="Sectors" />
            <div class="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-[22px] md:text-[28px] font-degular font-bold text-drygray-100">
                <span v-for="(s, i) in sectors" :key="s" class="flex items-baseline gap-3">
                    <span class="text-primary text-[13px] font-switzer font-semibold">{{ String(i + 1).padStart(2, '0') }}</span>
                    {{ s }}
                </span>
            </div>
        </section>

        <!-- 7. Consultative CTA -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] lg:text-[64px] tracking-tight">
                        Tell us what you're trying to decide.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Briefings are consultative and tailored. Bring your data architecture, your constraints, and your operational reality. We will bring the right people from our side.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Request a briefing</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
