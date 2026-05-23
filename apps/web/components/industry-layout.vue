<script setup lang="ts">
// P1.U7, Shared layout for /industries/* pages.
//
// Before: each of 6 industry pages inlined ~150 lines of structurally
// identical template with capability-specific content. Total ~900 lines
// of duplicated structure. A template change touched 6 files.
//
// After: each page is a ~50-line <script setup> data object + a
// <IndustryLayout :data="..." /> call. Total ~300 lines + one shared
// template. Net code reduction: ~66%. Template change touches 1 file.
//
// Contract designed to make the FS page (the original reference) and
// the 5 follow-ons all expressible with the same shape, with sensible
// defaults for the labels we want consistent across industries.

interface Cta {
    label: string
    to: string
}
interface ProblemArea {
    title: string
    bullets: string[]
}
interface Solution {
    name: string
    body: string
}
interface IndustryData {
    eyebrow: string
    headline: string
    body: string
    primaryCta?: Cta
    secondaryCta?: Cta

    // §2 Problem areas
    problemAreasEyebrow?: string
    problemAreasTitle?: string
    problemAreas: ProblemArea[]

    // §3 Solutions
    solutionsTitle: string
    solutions: Solution[]
    alposCta?: Cta

    // §4 "Where it lands" story
    storyEyebrow?: string
    storyHeadline: string
    storyBody: string
    storyOutcome?: string
    storyLayers: string[]

    // §5 Engage CTA
    ctaEyebrow?: string
    ctaHeadline: string
    ctaBody: string
    ctaPrimary?: Cta
    ctaSecondary?: Cta
}

const props = defineProps<{ data: IndustryData }>()

// Defaults, keep the FS template as the canonical source of truth for labels.
const primaryCta = computed<Cta>(() => props.data.primaryCta ?? { label: 'Book a demo', to: '/contact' })
const secondaryCta = computed<Cta>(() => props.data.secondaryCta ?? { label: 'See AlpOS', to: '/solutions/alpos' })
const problemAreasEyebrow = computed(() => props.data.problemAreasEyebrow ?? 'Where Davion delivers')
const problemAreasTitle = computed(() => props.data.problemAreasTitle ?? 'Four problem areas. One sovereign platform')
const alposCta = computed<Cta>(() => props.data.alposCta ?? { label: 'Explore AlpOS', to: '/solutions/alpos' })
const storyEyebrow = computed(() => props.data.storyEyebrow ?? 'Where it lands')
const ctaEyebrow = computed(() => props.data.ctaEyebrow ?? 'Engage')
const ctaPrimary = computed<Cta>(() => props.data.ctaPrimary ?? { label: 'Book a demo', to: '/contact' })
const ctaSecondary = computed<Cta>(() => props.data.ctaSecondary ?? { label: 'Speak to an expert', to: '/contact' })

// Split a headline on ". " boundaries so each declarative segment gets a green
// dot accent (Davion punctuation signature per docs/brand-voice.md §5 rule 7).
// "Banks use Davion when X, and Y" → one segment, one trailing dot.
// "Sovereignty isn't a feature. It's where the work happens" → two segments, two dots.
function splitHeadlineSegments(h: string): string[] {
    return h.split(/\.\s+/).filter(Boolean)
}
const heroSegments = computed(() => splitHeadlineSegments(props.data.headline))
const storySegments = computed(() => splitHeadlineSegments(props.data.storyHeadline))
const ctaSegments = computed(() => splitHeadlineSegments(props.data.ctaHeadline))
const problemAreasSegments = computed(() => splitHeadlineSegments(problemAreasTitle.value))
const solutionsSegments = computed(() => splitHeadlineSegments(props.data.solutionsTitle))
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- §1 Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="data.eyebrow" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-5xl">
                <template v-for="(seg, i) in heroSegments" :key="i"
                    ><span>{{ i > 0 ? ' ' : '' }}{{ seg }}</span><span class="text-primary-text">.</span></template>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">{{ data.body }}</p>
            <div class="mt-10 flex flex-wrap gap-3">
                <NuxtLink :to="primaryCta.to"><CommonButton variant="primary" icon="base:arrow">{{ primaryCta.label }}</CommonButton></NuxtLink>
                <NuxtLink :to="secondaryCta.to"><CommonButton variant="outline" icon="base:arrow">{{ secondaryCta.label }}</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- §2 Problem areas -->
        <section v-reveal class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="problemAreasEyebrow" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    <template v-for="(seg, i) in problemAreasSegments" :key="i"
                        ><span>{{ i > 0 ? ' ' : '' }}{{ seg }}</span><span class="text-primary-text">.</span></template>
                </h2>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <div v-for="area in data.problemAreas" :key="area.title" class="bg-white rounded-2xl p-7">
                    <p class="text-h3 font-degular font-bold text-drygray-100 leading-tight">{{ area.title }}</p>
                    <ul class="mt-4 space-y-2 text-b1 text-drygray-default">
                        <li v-for="b in area.bullets" :key="b" class="flex items-start gap-3">
                            <span class="text-primary-text mt-1.5" aria-hidden="true">·</span>
                            <span>{{ b }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- §3 Solutions -->
        <section v-reveal class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Solutions" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    <template v-for="(seg, i) in solutionsSegments" :key="i"
                        ><span>{{ i > 0 ? ' ' : '' }}{{ seg }}</span><span class="text-primary-text">.</span></template>
                </h2>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="s in data.solutions" :key="s.name" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Solution</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 leading-tight">{{ s.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ s.body }}</p>
                </div>
            </div>
            <div class="mt-8">
                <NuxtLink :to="alposCta.to"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ alposCta.label }}</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- §4 Where it lands -->
        <section v-reveal class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <CommonSup :title="storyEyebrow" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        <template v-for="(seg, i) in storySegments" :key="i"
                            ><span>{{ i > 0 ? ' ' : '' }}{{ seg }}</span><span class="text-primary-text">.</span></template>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">{{ data.storyBody }}</p>
                    <p v-if="data.storyOutcome" class="text-b1 text-drygray-100 font-medium mt-6 max-w-2xl">{{ data.storyOutcome }}</p>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-white rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default mb-4">AlpOS layers in play</p>
                        <ul class="space-y-2 text-b1 text-drygray-100">
                            <li v-for="l in data.storyLayers" :key="l" class="flex items-center gap-3">
                                <span class="text-primary-text" aria-hidden="true">·</span> {{ l }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- §5 Engage CTA -->
        <section v-reveal class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="ctaEyebrow" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        <template v-for="(seg, i) in ctaSegments" :key="i"
                            ><span>{{ i > 0 ? ' ' : '' }}{{ seg }}</span><span class="text-primary-text">.</span></template>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">{{ data.ctaBody }}</p>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <NuxtLink :to="ctaPrimary.to"><CommonButton variant="primary" icon="base:arrow">{{ ctaPrimary.label }}</CommonButton></NuxtLink>
                    <NuxtLink :to="ctaSecondary.to"><CommonButton variant="outline" icon="base:arrow">{{ ctaSecondary.label }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
