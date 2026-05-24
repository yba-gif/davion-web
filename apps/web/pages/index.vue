<script setup lang="ts">
// Davion home, base1 visual language with the design moves restored:
// spiral hero, black Sectors marquee, real Newsroom showcase, frosted-spiral CTA.

const { t } = useI18n()
const localePath = useLocalePath()

// Home meta aligned to the P0.3 hero (Variant A, clarity-first).
// Description tracks the active locale so the meta tags reflect the
// language the visitor is viewing.
useSeoMeta({
    description: () => t('hero.body'),
    ogTitle: () => `Davion, ${t('hero.headline')}`,
    ogDescription: () => t('hero.body'),
})
useHead({ title: 'Davion', titleTemplate: '%s' })

interface Post {
    id: string
    title: string
    slug: string
    excerpt: string | null
    author: string
    readTime: string | null
    featuredImage: string | null
    publishedAt: string | null
    createdAt: string | null
}

const { data: blogData } = await useFetch<{ success: boolean, data: Post[] }>('/api/blog', {
    default: () => ({ success: true, data: [] }),
    query: { limit: 5 },
})
const posts = computed<Post[]>(() => blogData.value?.data ?? [])
const featuredPost = computed<Post | null>(() => posts.value[0] ?? null)
const gridPosts = computed<Post[]>(() => posts.value.slice(1, 3))

// P1.U5: formatDate is auto-imported from composables/useFormatDate.ts, // shared ISO-format util. Previous inline `en-US` short-month formatter retired.

// All arrays carry i18n keys; template resolves with $t() so content
// tracks the active locale.
const solutions = [
    { nameKey: 'subnav.solutions.alpos',         labelKey: 'home.solutions.alposLabel',   bodyKey: 'home.solutions.alposBody',   to: '/solutions/alpos',                  icon: 'base:chart-square' },
    { nameKey: 'subnav.solutions.cybersecurity', labelKey: 'home.solutions.cyberLabel',   bodyKey: 'home.solutions.cyberBody',   to: '/solutions/cybersecurity',          icon: 'base:verified' },
    { nameKey: 'subnav.solutions.digital',       labelKey: 'home.solutions.digitalLabel', bodyKey: 'home.solutions.digitalBody', to: '/solutions/digital-transformation', icon: 'base:chart-2' },
] as const

const cycle = [
    { n: '01', titleKey: 'home.cycle.steps.01.title', bodyKey: 'home.cycle.steps.01.body' },
    { n: '02', titleKey: 'home.cycle.steps.02.title', bodyKey: 'home.cycle.steps.02.body' },
    { n: '03', titleKey: 'home.cycle.steps.03.title', bodyKey: 'home.cycle.steps.03.body' },
    { n: '04', titleKey: 'home.cycle.steps.04.title', bodyKey: 'home.cycle.steps.04.body' },
] as const

const sovereignty = [
    { nameKey: 'home.sovereignty.modes.onprem.name',    bodyKey: 'home.sovereignty.modes.onprem.body' },
    { nameKey: 'home.sovereignty.modes.airgapped.name', bodyKey: 'home.sovereignty.modes.airgapped.body' },
    { nameKey: 'home.sovereignty.modes.cloud.name',     bodyKey: 'home.sovereignty.modes.cloud.body' },
] as const

// Sectors + promises stay English in the marquee on purpose: they
// function as brand language / visual rhythm, not descriptive copy.
// Translating "Sovereign / Defensible / In-perimeter" loses the
// punch. Keep them as-is across locales.
const sectors = ['Financial Services', 'Energy', 'Manufacturing', 'Life Sciences', 'Retail', 'Government', 'Critical Infrastructure', 'Defense & Intelligence']
const promises = ['Sovereign', 'Defensible', 'In-perimeter', 'Air-gapped', 'On-prem', 'Auditable', 'Decision-ready', 'Operator-owned']
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- 1. Mission hero, base1's original SectionHero structure with Davion copy/route -->
        <SectionHero />

        <!-- 2. Solutions triad, AlpOS, Cybersecurity, Digital Transformation -->
        <section v-reveal class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                <div class="max-w-3xl">
                    <CommonSup :title="$t('home.solutions.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        {{ $t('home.solutions.headline1') }}<DotAccent /> {{ $t('home.solutions.headline2') }}<DotAccent />
                    </h2>
                </div>
                <p class="text-b2 text-drygray-default max-w-md">
                    {{ $t('home.solutions.body') }}
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <FeatureCard
                    v-for="s in solutions"
                    :key="s.nameKey"
                    :title="$t(s.nameKey)"
                    :description="$t(s.bodyKey)"
                    :icon="s.icon"
                    :href="localePath(s.to)"
                />
            </div>
        </section>

        <!-- 3. AlpOS teaser -->
        <section v-reveal class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <CommonSup :title="$t('home.alposTeaser.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        {{ $t('home.alposTeaser.headline') }}<DotAccent />
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('home.alposTeaser.body') }}
                    </p>
                    <div class="mt-8">
                        <NuxtLink :to="localePath('/solutions/alpos')"><CommonButton variant="primary" icon="base:arrow">{{ $t('home.alposTeaser.cta') }}</CommonButton></NuxtLink>
                    </div>
                </div>
                <div class="lg:col-span-5">
                    <!-- AlpOS console preview, 3-slide carousel (Ontology / Ingest / Decide).
                         LazyAlposConsole defers Swiper bundle until the component
                         is needed (it sits below the fold). P2.5 perf. -->
                    <LazyAlposConsole />
                </div>
            </div>
        </section>

        <!-- 4. Intelligence cycle -->
        <section v-reveal class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-2xl mb-10 md:mb-14">
                <CommonSup :title="$t('home.cycle.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    <!-- $tm returns the raw compiled message AST in this build
                         (bundle.optimizeTranslationDirective=false). $rt resolves
                         each AST back to a string — without it the page renders
                         the literal { "t": 0, "b": {...} } object. -->
                    <span v-for="(part, i) in ($tm('home.cycle.headlineParts') as unknown[])" :key="i">
                        <span>{{ $rt(part) }}</span><DotAccent /><template v-if="i < ($tm('home.cycle.headlineParts') as unknown[]).length - 1"> </template>
                    </span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('home.cycle.body') }}
                </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="step in cycle" :key="step.n" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('home.cycle.stepLabel') }} {{ step.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ $t(step.titleKey) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(step.bodyKey) }}</p>
                </div>
            </div>
        </section>

        <!-- 5. Sovereignty strip -->
        <section v-reveal class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup :title="$t('home.sovereignty.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('home.sovereignty.headline') }}<DotAccent />
                </h2>
            </div>
            <div class="grid sm:grid-cols-3 gap-4">
                <div v-for="m in sovereignty" :key="m.nameKey" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('home.sovereignty.modeLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ $t(m.nameKey) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(m.bodyKey) }}</p>
                </div>
            </div>
            <div class="mt-8">
                <NuxtLink :to="localePath('/trust')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('home.sovereignty.cta') }}</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- "What is sovereign AI?" definitional section moved to /company/about
             (the explainer fits better next to the full worldview than next to the
             expert-funnel hero). Landing kept lean. -->

        <!-- 6. Sectors marquee, black interlude, dual-row scrolling, edge gradient fades -->
        <section v-reveal class="relative rounded-3xl bg-black overflow-hidden">
            <div class="relative grid lg:grid-cols-12 gap-10 items-center px-6 md:px-12 lg:px-16 py-12 md:py-20">
                <div class="lg:col-span-4">
                    <CommonSup :title="$t('home.sectors.sup')" />
                    <h2 class="font-degular font-bold text-white mt-4 text-[36px] md:text-[44px] lg:text-[48px] leading-[1.02] tracking-tight">
                        {{ $t('home.sectors.headline1') }}<DotAccent /><br>{{ $t('home.sectors.headline2') }}<DotAccent />
                    </h2>
                    <p class="text-b2 text-white/60 mt-6 max-w-sm">
                        {{ $t('home.sectors.body') }}
                    </p>
                    <div class="mt-8">
                        <NuxtLink :to="localePath('/industries')"><CommonButton variant="outline" size="xs" icon="base:arrow" class="!border-white/30 !text-white hover:!border-primary hover:!text-primary-text">{{ $t('home.sectors.cta') }}</CommonButton></NuxtLink>
                    </div>
                </div>
                <div class="lg:col-span-8 relative space-y-5">
                    <div class="absolute inset-y-0 left-0 w-16 lg:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                    <div class="absolute inset-y-0 right-0 w-16 lg:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
                    <Vue3Marquee :duration="24" clone :pause-on-hover="true">
                        <div v-for="s in sectors" :key="s" class="flex items-center gap-5 mx-6 md:mx-10 whitespace-nowrap">
                            <span class="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                            <span class="text-white text-[40px] md:text-[52px] lg:text-[60px] font-degular font-bold leading-none tracking-[-0.01em]">{{ s }}</span>
                        </div>
                    </Vue3Marquee>
                    <Vue3Marquee :duration="24" clone :pause-on-hover="true" direction="reverse">
                        <div v-for="c in promises" :key="c" class="flex items-center gap-5 mx-6 md:mx-10 whitespace-nowrap">
                            <span class="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                            <span class="text-white/85 text-[40px] md:text-[52px] lg:text-[60px] font-degular font-bold leading-none tracking-[-0.01em]">{{ c }}</span>
                        </div>
                    </Vue3Marquee>
                </div>
            </div>
        </section>

        <!-- 7. Newsroom showcase, Featured (HorizontalBlogCard) + Grid (BlogCard) -->
        <section v-if="featuredPost" v-reveal class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                <div>
                    <CommonSup :title="$t('home.newsroom.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        {{ $t('home.newsroom.headline') }}<DotAccent />
                    </h2>
                </div>
                <NuxtLink :to="localePath('/company/newsroom')">
                    <CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('home.newsroom.viewAll') }}</CommonButton>
                </NuxtLink>
            </div>
            <HorizontalBlogCard
                :image="featuredPost.featuredImage || undefined"
                :author="featuredPost.author"
                :read-time="featuredPost.readTime || ''"
                :date="formatDate(featuredPost.publishedAt)"
                :title="featuredPost.title"
                :excerpt="featuredPost.excerpt || ''"
                :slug="`/company/newsroom/${featuredPost.slug}`"
            />
            <div v-if="gridPosts.length" class="grid sm:grid-cols-2 gap-4 mt-4">
                <BlogCard
                    v-for="(post, i) in gridPosts"
                    :key="post.id"
                    :index="i + 1"
                    :image="post.featuredImage || '/logo-512.png'"
                    :author="post.author"
                    :read-time="post.readTime || ''"
                    :date="formatDate(post.publishedAt)"
                    :title="post.title"
                    :excerpt="post.excerpt || ''"
                    :slug="`/company/newsroom/${post.slug}`"
                />
            </div>
        </section>

        <!-- 7b. Proof / stage statement. P1.3 (2026-05-24 audit): honest stop-gap
             until real customer-logo proof system (P3.1) lands. Sits between
             newsroom showcase and engage CTA so a B2B reader's natural question
             ("show me a customer") gets an honest answer in the same eyeline as
             the engage button. Brand-voiced: no fake logos, no "trusted by"
             collage with stock photos. -->
        <section v-reveal class="bg-whitesmoke-100 rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div class="grid lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('home.proof.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[36px] md:leading-[1.05]">
                        {{ $t('home.proof.headline') }}
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('home.proof.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink :to="localePath('/trust')"><CommonButton variant="outline" icon="base:arrow">{{ $t('home.proof.cta') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>

        <!-- 8. Consultative CTA, frosted-spiral backdrop, massive 3-line headline -->
        <section v-reveal class="relative rounded-3xl bg-azure overflow-hidden">
            <!-- P0.6: WebP srcset replaces the 27 MB PNG fallback. Lazy because below fold. -->
            <img
                src="/section_background-1600.webp"
                srcset="/section_background-480.webp 480w, /section_background-960.webp 960w, /section_background-1600.webp 1600w, /section_background-2400.webp 2400w"
                sizes="(min-width: 1024px) 200vw, 100vw"
                alt=""
                loading="lazy"
                decoding="async"
                class="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.8] lg:scale-[2] lg:translate-x-48 lg:-translate-y-24 select-none"
            >
            <div class="relative w-full flex flex-col items-center text-center py-14 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 backdrop-blur-[80px] bg-gradient-to-b from-azure/30 to-azure/10">
                <CommonSup :title="$t('home.cta.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-6 leading-[0.92] tracking-[-0.02em]">
                    <span class="block text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px]">{{ $t('home.cta.line1') }}<DotAccent /></span>
                    <span class="block text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px]">{{ $t('home.cta.line2') }}<DotAccent /></span>
                    <span class="block text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px]">{{ $t('home.cta.line3') }}<DotAccent /></span>
                </h2>
                <p class="text-b2 text-drygray-100 mt-10 max-w-xl font-medium">
                    {{ $t('home.cta.body') }}
                </p>
                <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('common.bookDemo') }}</CommonButton></NuxtLink>
                    <a href="mailto:briefings@davion.com"><CommonButton variant="outline" icon="base:arrow">briefings@davion.com</CommonButton></a>
                </div>
            </div>
        </section>
    </div>
</template>
