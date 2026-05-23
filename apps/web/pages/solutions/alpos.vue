<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.solutions.alpos.meta.title'),
    description: () => t('pages.solutions.alpos.meta.description'),
    ogTitle: () => t('pages.solutions.alpos.meta.ogTitle'),
    ogDescription: () => t('pages.solutions.alpos.meta.ogDescription'),
})

// Layer data — only the structural shape lives in JS; copy comes from i18n.
const layers = [
    { n: '01', key: 'l1', specifics: ['s1', 's2', 's3', 's4'] },
    { n: '02', key: 'l2', specifics: ['s1', 's2', 's3', 's4'] },
    { n: '03', key: 'l3', specifics: ['s1', 's2', 's3', 's4'] },
    { n: '04', key: 'l4', specifics: ['s1', 's2', 's3', 's4', 's5'] },
    { n: '05', key: 'l5', specifics: ['s1', 's2', 's3', 's4', 's5'] },
] as const

const fieldStories = ['s1', 's2', 's3'] as const

const deploymentModes = [
    { name: 'm1Name', body: 'm1Body' },
    { name: 'm2Name', body: 'm2Body' },
    { name: 'm3Name', body: 'm3Body' },
    { name: 'm4Name', body: 'm4Body' },
] as const

const capabilities = [
    { g: 'r1g', i: 'r1i' }, { g: 'r2g', i: 'r2i' }, { g: 'r3g', i: 'r3i' }, { g: 'r4g', i: 'r4i' },
    { g: 'r5g', i: 'r5i' }, { g: 'r6g', i: 'r6i' }, { g: 'r7g', i: 'r7i' }, { g: 'r8g', i: 'r8i' },
] as const

const aiCapabilities = [
    { nameKey: 'rag',         bodyKey: 'ragBody',         slug: 'rag' },
    { nameKey: 'geo',         bodyKey: 'geoBody',         slug: 'geospatial' },
    { nameKey: 'video',       bodyKey: 'videoBody',       slug: 'video-intelligence' },
    { nameKey: 'audio',       bodyKey: 'audioBody',       slug: 'audio-analysis' },
    { nameKey: 'translation', bodyKey: 'translationBody', slug: 'translation' },
    { nameKey: 'data',        bodyKey: 'dataBody',        slug: 'data-acquisition' },
] as const

const outcomes = [
    { label: 'speedLabel',   body: 'speedBody' },
    { label: 'defenseLabel', body: 'defenseBody' },
    { label: 'trustLabel',   body: 'trustBody' },
] as const

const industriesServed = [
    { nameKey: 'fs',     slug: 'financial-services' },
    { nameKey: 'energy', slug: 'energy' },
    { nameKey: 'mfg',    slug: 'manufacturing' },
    { nameKey: 'ls',     slug: 'life-sciences' },
    { nameKey: 'gov',    slug: 'government' },
    { nameKey: 'def',    slug: 'defense-intelligence' },
] as const

// P2.U1: Table of contents — labels resolve under pages.solutions.alpos.toc.*
const tocSections = computed(() => [
    { id: 'problem',           label: t('pages.solutions.alpos.toc.problem') },
    { id: 'architecture',      label: t('pages.solutions.alpos.toc.architecture') },
    { id: 'demo',              label: t('pages.solutions.alpos.toc.demo') },
    { id: 'layers',            label: t('pages.solutions.alpos.toc.layers') },
    { id: 'field',             label: t('pages.solutions.alpos.toc.field') },
    { id: 'sovereign',         label: t('pages.solutions.alpos.toc.sovereign') },
    { id: 'modular',           label: t('pages.solutions.alpos.toc.modular') },
    { id: 'capability-matrix', label: t('pages.solutions.alpos.toc.matrix') },
    { id: 'ai-capabilities',   label: t('pages.solutions.alpos.toc.ai') },
    { id: 'outcomes',          label: t('pages.solutions.alpos.toc.outcomes') },
    { id: 'industries-served', label: t('pages.solutions.alpos.toc.served') },
    { id: 'engage',            label: t('pages.solutions.alpos.toc.engage') },
])
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- 1. Platform hero, pain-first construction -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.solutions.alpos.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-5xl">
                {{ $t('pages.solutions.alpos.hero.headlinePart1') }}<span class="text-primary-text">.</span>{{ $t('pages.solutions.alpos.hero.headlinePart2') }}<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.solutions.alpos.hero.body') }}
            </p>
            <div class="mt-10 flex flex-wrap items-center gap-3">
                <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.solutions.alpos.hero.ctaPrimary') }}</CommonButton></NuxtLink>
                <a href="#architecture"><CommonButton variant="outline" icon="base:arrow">{{ $t('pages.solutions.alpos.hero.ctaSecondary') }}</CommonButton></a>
            </div>
        </section>

        <!-- Mobile-only "Jump to" TOC select. Hidden on lg+ where the right-rail TOC renders. -->
        <div class="lg:hidden">
            <TableOfContents :sections="tocSections" />
        </div>

        <!-- Body sections in a 12-col grid with sticky right-rail TOC on lg+. -->
        <div class="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10 flex flex-col gap-4">
            <div class="flex flex-col gap-4 min-w-0">

        <!-- 2. Problem -->
        <section id="problem" class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24 scroll-mt-20">
            <CommonSup :title="$t('pages.solutions.alpos.problem.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[32px] leading-[1.05] md:text-[44px] md:leading-[1.05] tracking-tight max-w-4xl">
                {{ $t('pages.solutions.alpos.problem.headline') }}<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                {{ $t('pages.solutions.alpos.problem.body') }}
            </p>
        </section>

        <!-- 3. Architecture diagram -->
        <section id="architecture" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24 scroll-mt-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.alpos.architecture.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.alpos.architecture.headlinePart1') }}<span class="text-primary-text">.</span>{{ $t('pages.solutions.alpos.architecture.headlinePart2') }}<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl p-4 sm:p-6 lg:p-10 overflow-x-auto">
                <svg viewBox="0 0 1200 320" class="w-full h-auto min-w-[820px]" role="img" :aria-label="$t('pages.solutions.alpos.architecture.svgAria')">
                    <text x="40" y="38" fill="#60E576" font-family="'Switzer', sans-serif" font-size="11" font-weight="700" letter-spacing="3">{{ $t('pages.solutions.alpos.architecture.perimeter') }}</text>
                    <rect x="20" y="56" width="1160" height="200" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="1" stroke-dasharray="3 4" rx="12"/>
                    <g>
                        <rect x="60" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="150" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">{{ $t('pages.solutions.alpos.architecture.ingest') }}</text>
                        <text x="150" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">{{ $t('pages.solutions.alpos.architecture.dataTag') }}</text>

                        <rect x="270" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="360" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">{{ $t('pages.solutions.alpos.architecture.ontology') }}</text>
                        <text x="360" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">{{ $t('pages.solutions.alpos.architecture.meaningTag') }}</text>

                        <rect x="480" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="570" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">{{ $t('pages.solutions.alpos.architecture.analyze') }}</text>
                        <text x="570" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">{{ $t('pages.solutions.alpos.architecture.insightTag') }}</text>

                        <rect x="690" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="780" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">{{ $t('pages.solutions.alpos.architecture.decide') }}</text>
                        <text x="780" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">{{ $t('pages.solutions.alpos.architecture.decisionTag') }}</text>

                        <rect x="900" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="990" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">{{ $t('pages.solutions.alpos.architecture.act') }}</text>
                        <text x="990" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">{{ $t('pages.solutions.alpos.architecture.actionTag') }}</text>
                    </g>
                    <g stroke="#60E576" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M 244 160 L 266 160" />
                        <path d="M 260 154 L 266 160 L 260 166" />
                        <path d="M 454 160 L 476 160" />
                        <path d="M 470 154 L 476 160 L 470 166" />
                        <path d="M 664 160 L 686 160" />
                        <path d="M 680 154 L 686 160 L 680 166" />
                        <path d="M 874 160 L 896 160" />
                        <path d="M 890 154 L 896 160 L 890 166" />
                    </g>
                    <g font-family="'Switzer', sans-serif" font-size="10" fill="#979797" font-weight="600" letter-spacing="2">
                        <text x="40" y="232">{{ $t('pages.solutions.alpos.architecture.residency') }}</text>
                        <text x="40" y="246">{{ $t('pages.solutions.alpos.architecture.access') }}</text>
                        <text x="1160" y="232" text-anchor="end">{{ $t('pages.solutions.alpos.architecture.audit') }}</text>
                        <text x="1160" y="246" text-anchor="end">{{ $t('pages.solutions.alpos.architecture.leaves') }}</text>
                    </g>
                </svg>
            </div>
        </section>

        <!-- P2.U5: product-demo video embed. Activates once DEMO_EMBED_URL env is set. -->
        <section id="demo" class="scroll-mt-20">
            <DemoEmbed />
        </section>

        <!-- 4. Layer deep-dives -->
        <section id="layers" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24 scroll-mt-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.alpos.layers.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.alpos.layers.headline') }}<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="space-y-10">
                <div v-for="layer in layers" :key="layer.n" class="grid lg:grid-cols-12 gap-8 lg:gap-12 pt-10 border-t border-drygray-200 first:border-t-0 first:pt-0">
                    <div class="lg:col-span-3">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.solutions.alpos.layers.layerLabel') }} {{ layer.n }} · {{ $t(`pages.solutions.alpos.layers.${layer.key}.slug`) }}</p>
                    </div>
                    <div class="lg:col-span-6">
                        <h3 class="text-h3 font-degular font-bold text-drygray-100">{{ $t(`pages.solutions.alpos.layers.${layer.key}.title`) }}</h3>
                        <p class="text-b2 text-drygray-default mt-4">{{ $t(`pages.solutions.alpos.layers.${layer.key}.body`) }}</p>
                    </div>
                    <div class="lg:col-span-3">
                        <ul class="space-y-2 text-b1 text-drygray-default">
                            <li v-for="s in layer.specifics" :key="s" class="flex items-center gap-2">
                                <span class="text-primary-text" aria-hidden="true">·</span> {{ $t(`pages.solutions.alpos.layers.${layer.key}.${s}`) }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. Where it lands, concrete vertical use cases. -->
        <section id="field" class="bg-whitesmoke-100 rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24 scroll-mt-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.alpos.field.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.alpos.field.headline') }}<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    {{ $t('pages.solutions.alpos.field.body') }}
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="storyKey in fieldStories" :key="storyKey" class="bg-white rounded-2xl p-7 flex flex-col">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.solutions.alpos.field.${storyKey}.sector`) }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 leading-tight">{{ $t(`pages.solutions.alpos.field.${storyKey}.problem`) }}</p>
                    <p class="text-b1 text-drygray-default mt-4 flex-1">{{ $t(`pages.solutions.alpos.field.${storyKey}.body`) }}</p>
                    <p class="text-b1 text-drygray-100 font-medium mt-6 pt-4 border-t border-drygray-200">{{ $t(`pages.solutions.alpos.field.${storyKey}.outcome`) }}</p>
                </div>
            </div>
        </section>

        <!-- 6. Sovereign by design -->
        <section id="sovereign" class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24 scroll-mt-20">
            <div class="mb-10 md:mb-14 max-w-3xl">
                <CommonSup :title="$t('pages.solutions.alpos.sovereign.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.alpos.sovereign.headline') }}<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('pages.solutions.alpos.sovereign.body') }}
                </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="mode in deploymentModes" :key="mode.name" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.solutions.alpos.sovereign.modeLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ $t(`pages.solutions.alpos.sovereign.${mode.name}`) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(`pages.solutions.alpos.sovereign.${mode.body}`) }}</p>
                </div>
            </div>
        </section>

        <!-- 7. Modularity -->
        <section id="modular" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20 scroll-mt-20">
            <CommonSup :title="$t('pages.solutions.alpos.modular.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05] max-w-3xl">
                {{ $t('pages.solutions.alpos.modular.headline') }}<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                {{ $t('pages.solutions.alpos.modular.body') }}
            </p>
        </section>

        <!-- 8. Capability matrix -->
        <section id="capability-matrix" class="bg-whitesmoke-100 rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24 scroll-mt-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.alpos.matrix.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.alpos.matrix.headline') }}<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="bg-white rounded-2xl overflow-hidden">
                <table class="w-full text-left">
                    <tbody>
                        <tr v-for="(row, i) in capabilities" :key="row.g" :class="[i % 2 === 1 ? 'bg-whitesmoke-100' : '', 'border-t border-drygray-200 first:border-t-0']">
                            <td class="px-6 py-5 align-top w-1/3 sm:w-1/4">
                                <span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">{{ $t(`pages.solutions.alpos.matrix.${row.g}`) }}</span>
                            </td>
                            <td class="px-6 py-5 text-b2 text-drygray-default">{{ $t(`pages.solutions.alpos.matrix.${row.i}`) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- 9. AI capabilities tiles -->
        <section id="ai-capabilities" class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20 scroll-mt-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.alpos.ai.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.alpos.ai.headline') }}<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    {{ $t('pages.solutions.alpos.ai.body') }}
                </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="cap in aiCapabilities" :key="cap.slug" :to="localePath(`/capabilities/${cap.slug}`)" class="bg-white hover:bg-whitesmoke-100 rounded-2xl p-6 transition-colors group block">
                    <p class="text-h3 font-degular font-bold text-drygray-100 group-hover:text-primary-text transition-colors leading-tight">{{ $t(`pages.solutions.alpos.ai.${cap.nameKey}`) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(`pages.solutions.alpos.ai.${cap.bodyKey}`) }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-5 inline-flex items-center gap-2 transition-colors text-[13px] font-medium">
                        {{ $t('pages.solutions.alpos.ai.explore') }}
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <!-- 10. Outcomes -->
        <section id="outcomes" class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24 scroll-mt-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.alpos.outcomes.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.alpos.outcomes.headline') }}<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="o in outcomes" :key="o.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.solutions.alpos.outcomes.${o.label}`) }}</p>
                    <p class="text-b2 text-drygray-100 mt-4 leading-relaxed">{{ $t(`pages.solutions.alpos.outcomes.${o.body}`) }}</p>
                </div>
            </div>
        </section>

        <!-- 11. Industries we serve -->
        <section id="industries-served" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20 scroll-mt-20">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                <div>
                    <CommonSup :title="$t('pages.solutions.alpos.served.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        {{ $t('pages.solutions.alpos.served.headline') }}<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <NuxtLink :to="localePath('/industries')">
                    <CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.solutions.alpos.served.cta') }}</CommonButton>
                </NuxtLink>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="industry in industriesServed" :key="industry.slug" :to="localePath(`/industries/${industry.slug}`)" class="bg-whitesmoke-100 card-hover hover:bg-whitesmoke-200 rounded-2xl p-6 transition-colors group block">
                    <p class="text-h3 font-degular font-bold text-drygray-100 group-hover:text-primary-text transition-colors leading-tight">{{ $t(`pages.solutions.alpos.served.${industry.nameKey}`) }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-4 inline-flex items-center gap-2 transition-colors text-[13px] font-medium">
                        {{ $t('pages.solutions.alpos.served.detailLabel') }}
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <!-- 12. CTA -->
        <section id="engage" class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24 scroll-mt-20">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.solutions.alpos.engage.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        {{ $t('pages.solutions.alpos.engage.headline') }}<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.solutions.alpos.engage.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.solutions.alpos.engage.ctaPrimary') }}</CommonButton></NuxtLink>
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="outline" icon="base:arrow">{{ $t('pages.solutions.alpos.engage.ctaSecondary') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>

            </div><!-- /body sections wrapper -->

            <!-- Right-rail TOC, sticky on lg+. Hidden on mobile (the inline select handles that). -->
            <aside class="hidden lg:block">
                <TableOfContents :sections="tocSections" />
            </aside>
        </div><!-- /body grid -->
    </div>
</template>
