<script setup lang="ts">
// P1.U7, Shared layout for /capabilities/* pages.
//
// Same refactor pattern as IndustryLayout, lighter template. 6 capability
// pages each shrink from ~150 lines of inline template to ~30 lines of
// data + a single <CapabilityLayout :data="..." /> call.

interface Cta { label: string; to: string }
interface HowStep { n: string; title: string; body: string }
interface IndustryLink { name: string; slug: string }

interface CapabilityData {
    eyebrow: string
    headline: string
    body: string
    primaryCta?: Cta
    secondaryCta?: Cta

    // §2 What it does
    whatItDoesTitle?: string
    whatItDoes: string[]

    // §3 How it works
    howItWorksTitle: string
    howItWorks: HowStep[]

    // §4 When to use it
    whenToUseTitle?: string
    whenToUse: string[]

    // §5 Industries
    industriesTitle?: string
    industries: IndustryLink[]

    // §6 CTA
    ctaEyebrow?: string
    ctaHeadline: string
    ctaPrimary?: Cta
    ctaSecondary?: Cta
}

const props = defineProps<{ data: CapabilityData }>()

const { t } = useI18n()
const localePath = useLocalePath()

// Defaults route through pages.capabilities.shared.* so scaffolding renders
// in-language. Per-page data props can override. CTAs pass raw paths; the
// template wraps them with localePath().
const primaryCta = computed<Cta>(() => props.data.primaryCta ?? { label: t('pages.capabilities.shared.heroPrimaryCtaDefault'), to: '/contact' })
const secondaryCta = computed<Cta>(() => props.data.secondaryCta ?? { label: t('pages.capabilities.shared.heroSecondaryCtaDefault'), to: '/solutions/alpos' })
const whatItDoesTitle = computed(() => props.data.whatItDoesTitle ?? t('pages.capabilities.shared.whatItDoesTitleDefault'))
const whenToUseTitle = computed(() => props.data.whenToUseTitle ?? t('pages.capabilities.shared.whenToUseTitleDefault'))
const industriesTitle = computed(() => props.data.industriesTitle ?? t('pages.capabilities.shared.industriesTitleDefault'))
const ctaEyebrow = computed(() => props.data.ctaEyebrow ?? t('pages.capabilities.shared.ctaEyebrow'))
const ctaPrimary = computed<Cta>(() => props.data.ctaPrimary ?? { label: t('pages.capabilities.shared.ctaPrimaryDefault'), to: '/contact' })
const ctaSecondary = computed<Cta>(() => props.data.ctaSecondary ?? { label: t('pages.capabilities.shared.ctaSecondaryDefault'), to: '/contact' })

// Match IndustryLayout: split headlines on ". " so each segment gets a green dot accent.
function splitHeadlineSegments(h: string): string[] {
    return h.split(/\.\s+/).filter(Boolean)
}
const heroSegments = computed(() => splitHeadlineSegments(props.data.headline))
const whatItDoesSegments = computed(() => splitHeadlineSegments(whatItDoesTitle.value))
const howItWorksSegments = computed(() => splitHeadlineSegments(props.data.howItWorksTitle))
const whenToUseSegments = computed(() => splitHeadlineSegments(whenToUseTitle.value))
const industriesSegments = computed(() => splitHeadlineSegments(industriesTitle.value))
const ctaSegments = computed(() => splitHeadlineSegments(props.data.ctaHeadline))
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- §1 Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="data.eyebrow" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-5xl">
                <template v-for="(seg, i) in heroSegments" :key="i"><span>{{ i > 0 ? " " : "" }}{{ seg }}</span><span class="text-primary-text">.</span></template>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">{{ data.body }}</p>
            <div class="mt-10 flex flex-wrap gap-3">
                <NuxtLink :to="localePath(primaryCta.to)"><CommonButton variant="primary" icon="base:arrow">{{ primaryCta.label }}</CommonButton></NuxtLink>
                <NuxtLink :to="localePath(secondaryCta.to)"><CommonButton variant="outline" icon="base:arrow">{{ secondaryCta.label }}</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- §2 What it does -->
        <section v-reveal class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10">
                <div class="lg:col-span-4">
                    <CommonSup :title="$t('pages.capabilities.shared.whatItDoesEyebrow')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        <template v-for="(seg, i) in whatItDoesSegments" :key="i"><span>{{ i > 0 ? " " : "" }}{{ seg }}</span><span class="text-primary-text">.</span></template>
                    </h2>
                </div>
                <ul class="lg:col-span-8 space-y-3">
                    <li v-for="b in data.whatItDoes" :key="b" class="bg-white rounded-2xl p-5 flex items-start gap-4">
                        <span class="text-primary-text mt-1.5 text-lg" aria-hidden="true">·</span>
                        <span class="text-b1 text-drygray-100">{{ b }}</span>
                    </li>
                </ul>
            </div>
        </section>

        <!-- §3 How it works -->
        <section v-reveal class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="mb-10 md:mb-14 max-w-3xl">
                <CommonSup :title="$t('pages.capabilities.shared.howItWorksEyebrow')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                    <template v-for="(seg, i) in howItWorksSegments" :key="i"><span>{{ i > 0 ? " " : "" }}{{ seg }}</span><span class="text-primary-text">.</span></template>
                </h2>
            </div>
            <ol class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <li v-for="s in data.howItWorks" :key="s.n" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.capabilities.shared.stepLabel') }} {{ s.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 leading-tight">{{ s.title }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ s.body }}</p>
                </li>
            </ol>
        </section>

        <!-- §4 When to use it -->
        <section v-reveal class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10">
                <div class="lg:col-span-5">
                    <CommonSup :title="$t('pages.capabilities.shared.whenToUseEyebrow')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        <template v-for="(seg, i) in whenToUseSegments" :key="i"><span>{{ i > 0 ? " " : "" }}{{ seg }}</span><span class="text-primary-text">.</span></template>
                    </h2>
                </div>
                <ul class="lg:col-span-7 space-y-3">
                    <li v-for="u in data.whenToUse" :key="u" class="text-b1 text-drygray-100 flex items-start gap-3 bg-white rounded-2xl p-5">
                        <span class="text-primary-text mt-1.5" aria-hidden="true">·</span>
                        <span>{{ u }}</span>
                    </li>
                </ul>
            </div>
        </section>

        <!-- §5 Industries leaning on this -->
        <section v-reveal class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup :title="$t('pages.capabilities.shared.industriesEyebrow')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                <template v-for="(seg, i) in industriesSegments" :key="i"><span>{{ i > 0 ? " " : "" }}{{ seg }}</span><span class="text-primary-text">.</span></template>
            </h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                <NuxtLink v-for="i in data.industries" :key="i.slug" :to="localePath(`/industries/${i.slug}`)" class="bg-whitesmoke-100 card-hover hover:bg-whitesmoke-200 rounded-2xl p-5 transition-colors block group">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.capabilities.shared.industryLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 group-hover:text-primary-text transition-colors leading-tight">{{ i.name }}</p>
                </NuxtLink>
            </div>
        </section>

        <!-- §6 CTA -->
        <section v-reveal class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="ctaEyebrow" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        <template v-for="(seg, i) in ctaSegments" :key="i"><span>{{ i > 0 ? " " : "" }}{{ seg }}</span><span class="text-primary-text">.</span></template>
                    </h2>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <NuxtLink :to="localePath(ctaPrimary.to)"><CommonButton variant="primary" icon="base:arrow">{{ ctaPrimary.label }}</CommonButton></NuxtLink>
                    <NuxtLink :to="localePath(ctaSecondary.to)"><CommonButton variant="outline" icon="base:arrow">{{ ctaSecondary.label }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
