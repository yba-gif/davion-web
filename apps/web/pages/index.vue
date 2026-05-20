<script setup lang="ts">
// Davion home — base1 visual language with the design moves restored:
// spiral hero, black Sectors marquee, real Newsroom showcase, frosted-spiral CTA.

useSeoMeta({
    description: 'Sovereign AI and data platform for organisations that turn data into decisions — across financial services, energy, life sciences, manufacturing, government, and critical industries.',
    ogTitle: 'Davion',
    ogDescription: 'Sovereign AI and data platform — used across business and government.',
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

function formatDate(d: string | null) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
}

const solutions = [
    {
        name: 'AlpOS',
        label: 'Platform · Flagship',
        body: 'The sovereign AI platform underneath every Davion solution. Ingest, ontology, analytics, AI, decisioning, action — governed end to end.',
        to: '/solutions/alpos',
        icon: 'base:chart-square',
    },
    {
        name: 'Cybersecurity',
        label: 'Solution',
        body: 'Defensive intelligence for environments that cannot fail. Detection through pattern, anomaly, and graph analysis — inside your perimeter.',
        to: '/solutions/cybersecurity',
        icon: 'base:verified',
    },
    {
        name: 'Digital Transformation',
        label: 'Solution',
        body: 'From siloed data to a single governed source of truth — phased from POC to industrial deployment, without losing the institution.',
        to: '/solutions/digital-transformation',
        icon: 'base:chart-2',
    },
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

const sectors = ['Financial Services', 'Energy', 'Manufacturing', 'Life Sciences', 'Retail', 'Government', 'Critical Infrastructure', 'Defense & Intelligence']
const promises = ['Agentic AI', 'Sovereign data', 'Modular by design', 'Auditable', 'On-premise', 'Operator-owned', 'Decision-ready']
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- 1. Mission hero — base1's original SectionHero structure with Davion copy/route -->
        <SectionHero />

        <!-- 1.5. "We're on the AI journey with" strip (placeholder treatment — names withheld) -->
        <TrustedByStrip />

        <!-- 2. Solutions triad — AlpOS, Cybersecurity, Digital Transformation -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                <div class="max-w-3xl">
                    <CommonSup title="Solutions" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        The platform<span class="text-primary">.</span> And the solutions built on it<span class="text-primary">.</span>
                    </h2>
                </div>
                <p class="text-b2 text-drygray-default max-w-md">
                    AlpOS is the constant. Cybersecurity and Digital Transformation are how it's applied — same sovereignty, same audit, same spine.
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <FeatureCard
                    v-for="s in solutions"
                    :key="s.name"
                    :title="s.name"
                    :description="s.body"
                    :icon="s.icon"
                    :href="s.to"
                />
            </div>
        </section>

        <!-- 3. AlpOS teaser -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <CommonSup title="Flagship · AlpOS" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        The sovereign AI platform underneath every Davion solution<span class="text-primary">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        AlpOS unifies data, ontology, analytics, and agentic AI in one modular platform — ingest to act, governed end to end. Digital Transformation, Cybersecurity, and OSINT are how it is applied.
                    </p>
                    <div class="mt-8">
                        <NuxtLink to="/solutions/alpos"><CommonButton variant="primary" icon="base:arrow">Explore AlpOS</CommonButton></NuxtLink>
                    </div>
                </div>
                <div class="lg:col-span-5">
                    <!-- AlpOS console preview — 3-slide carousel (Ontology / Ingest / Decide) -->
                    <AlposConsole />
                </div>
            </div>
        </section>

        <!-- 4. Intelligence cycle -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="max-w-2xl mb-10 md:mb-14">
                <CommonSup title="The AI cycle" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Data → Meaning → Decision → Action<span class="text-primary">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    Every Davion deployment runs the same sovereign cycle — from raw data to operational action. The platform stays constant; the surface adapts to the use case.
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
                    Run where you require — only where you require<span class="text-primary">.</span>
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

        <!-- 6. Sectors marquee — black interlude, dual-row scrolling, edge gradient fades -->
        <section class="relative rounded-3xl bg-black overflow-hidden">
            <div class="relative grid lg:grid-cols-12 gap-10 items-center px-6 md:px-12 lg:px-16 py-16 md:py-20">
                <div class="lg:col-span-4">
                    <CommonSup title="Industries" />
                    <h2 class="font-degular font-bold text-white mt-4 text-[36px] md:text-[44px] lg:text-[48px] leading-[1.02] tracking-tight">
                        For every business<span class="text-primary">.</span><br>For every government<span class="text-primary">.</span>
                    </h2>
                    <p class="text-b2 text-white/60 mt-6 max-w-sm">
                        Davion deploys across financial services, energy, manufacturing, life sciences, retail, government, critical infrastructure, and defense — wherever data has to become decisions you can defend.
                    </p>
                    <div class="mt-8">
                        <NuxtLink to="/industries"><CommonButton variant="outline" size="xs" icon="base:arrow" class="!border-white/30 !text-white hover:!border-primary hover:!text-primary">Explore industries</CommonButton></NuxtLink>
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

        <!-- 7. Newsroom showcase — Featured (HorizontalBlogCard) + Grid (BlogCard) -->
        <section v-if="featuredPost" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                <div>
                    <CommonSup title="Newsroom" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        Dispatches from the work<span class="text-primary">.</span>
                    </h2>
                </div>
                <NuxtLink to="/company/newsroom">
                    <CommonButton variant="outline" size="xs" icon="base:arrow">All dispatches</CommonButton>
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
                    :image="post.featuredImage || '/icon.svg'"
                    :author="post.author"
                    :read-time="post.readTime || ''"
                    :date="formatDate(post.publishedAt)"
                    :title="post.title"
                    :excerpt="post.excerpt || ''"
                    :slug="`/company/newsroom/${post.slug}`"
                />
            </div>
        </section>

        <!-- 8. Consultative CTA — frosted-spiral backdrop, massive 3-line headline -->
        <section class="relative rounded-3xl bg-azure overflow-hidden">
            <img
                src="/section_background.png"
                alt=""
                loading="lazy"
                decoding="async"
                class="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.8] lg:scale-[2] lg:translate-x-48 lg:-translate-y-24 select-none"
            >
            <div class="relative w-full flex flex-col items-center text-center py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-16 backdrop-blur-[80px] bg-gradient-to-b from-azure/30 to-azure/10">
                <CommonSup title="Engage" />
                <h2 class="font-degular font-bold text-drygray-100 mt-6 leading-[0.92] tracking-[-0.02em]">
                    <span class="block text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px]">Your data<span class="text-primary">.</span></span>
                    <span class="block text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px]">Your AI<span class="text-primary">.</span></span>
                    <span class="block text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px]">Your decisions<span class="text-primary">.</span></span>
                </h2>
                <p class="text-b2 text-drygray-100 mt-10 max-w-xl font-medium">
                    Briefings are consultative and tailored. Bring your data architecture, your constraints, and your operational reality. We will bring the right people from our side.
                </p>
                <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Request a briefing</CommonButton></NuxtLink>
                    <a href="mailto:briefings@davion.com"><CommonButton variant="outline" icon="base:arrow">briefings@davion.com</CommonButton></a>
                </div>
            </div>
        </section>
    </div>
</template>
