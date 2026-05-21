<script setup lang="ts">
useSeoMeta({
    title: 'Newsroom',
    description: 'Announcements, insight, and technical notes from the Davion team.',
    ogTitle: 'Davion · Newsroom',
    ogDescription: 'Dispatches from the work — announcements, insight, and technical notes.',
})

interface Post {
    id: string
    title: string
    slug: string
    excerpt: string | null
    author: string
    readTime: string | null
    category: string
    featuredImage: string | null
    publishedAt: string | null
    createdAt: string | null
}

// P2.7: client-side category filter chips. Server supports `?category=` filtering
// too; we fetch all and filter on the client so chip clicks are instant.
const categories = [
    { slug: 'all', label: 'All' },
    { slug: 'announcement', label: 'Announcements' },
    { slug: 'insight', label: 'Insight' },
    { slug: 'technical', label: 'Technical' },
    { slug: 'recognition', label: 'Recognition' },
] as const

const activeCategory = ref<string>('all')

const { data, pending } = await useFetch<{ success: boolean, data: Post[] }>('/api/blog', {
    default: () => ({ success: true, data: [] }),
    query: { limit: 50 },
})

const allPosts = computed<Post[]>(() => data.value?.data ?? [])
const posts = computed<Post[]>(() =>
    activeCategory.value === 'all'
        ? allPosts.value
        : allPosts.value.filter(p => p.category === activeCategory.value),
)
const featured = computed<Post | null>(() => posts.value[0] ?? null)
const rest = computed<Post[]>(() => posts.value.slice(1))

const categoryCount = (slug: string) => {
    if (slug === 'all') return allPosts.value.length
    return allPosts.value.filter(p => p.category === slug).length
}

function categoryLabel(slug: string) {
    if (slug === 'announcement') return 'Announcement'
    if (slug === 'insight') return 'Insight'
    if (slug === 'technical') return 'Technical'
    if (slug === 'recognition') return 'Recognition'
    return slug
}

// P1.U5: formatDate auto-imported from composables/useFormatDate.ts.
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Company · Newsroom" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Dispatches from the work<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Announcements, insight, and technical notes from the Davion team.
            </p>

            <!-- Category chips -->
            <div class="mt-10 flex flex-wrap gap-2">
                <button
                    v-for="c in categories"
                    :key="c.slug"
                    type="button"
                    class="text-[13px] font-medium px-5 py-3 rounded-full border transition-colors min-h-[44px]"
                    :class="activeCategory === c.slug
                        ? 'bg-drygray-100 text-white border-drygray-100'
                        : 'bg-white text-drygray-100 border-drygray-200 hover:border-drygray-100'"
                    :aria-pressed="activeCategory === c.slug"
                    @click="activeCategory = c.slug"
                >
                    {{ c.label }}
                    <span class="ml-1.5 text-[11px] opacity-60">{{ categoryCount(c.slug) }}</span>
                </button>
            </div>
        </section>

        <!-- Loading state (P1.U2) -->
        <section v-if="pending" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Loading" />
            <h2 class="sr-only">Loading dispatches</h2>
            <div class="mt-10">
                <SkeletonBlock variant="card" :count="3" />
            </div>
        </section>

        <!-- Featured dispatch -->
        <section v-else-if="featured" class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup title="Featured" />
            <NuxtLink :to="`/company/newsroom/${featured.slug}`" class="block mt-6 group">
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                    <div class="lg:col-span-7">
                        <NuxtImg
                            v-if="featured.featuredImage"
                            :src="featured.featuredImage"
                            :alt="featured.title"
                            class="w-full aspect-[16/10] object-cover rounded-2xl"
                        />
                        <div v-else class="w-full aspect-[16/10] bg-white rounded-2xl flex items-center justify-center">
                            <NuxtImg src="/icon.svg" alt="" width="64" height="64" class="size-16 opacity-50" />
                        </div>
                    </div>
                    <div class="lg:col-span-5">
                        <div class="flex items-center gap-3 text-[12px] font-mono uppercase tracking-[0.15em] text-primary-text mb-3">
                            <span>{{ categoryLabel(featured.category) }}</span>
                        </div>
                        <div class="flex items-center gap-3 text-[13px] text-drygray-default font-medium mb-4">
                            <span>{{ formatDate(featured.publishedAt) }}</span>
                            <template v-if="featured.readTime">
                                <span aria-hidden="true">·</span>
                                <span>{{ featured.readTime }}</span>
                            </template>
                        </div>
                        <h2 class="font-degular font-bold text-drygray-100 text-[28px] md:text-[40px] lg:text-[44px] leading-[1.05] tracking-tight group-hover:text-primary-text transition-colors">
                            {{ featured.title }}
                        </h2>
                        <p v-if="featured.excerpt" class="text-b2 text-drygray-default mt-4">{{ featured.excerpt }}</p>
                        <p class="text-drygray-100 group-hover:text-primary-text mt-6 inline-flex items-center gap-2 transition-colors font-medium">
                            Read dispatch
                            <span aria-hidden="true">→</span>
                        </p>
                    </div>
                </div>
            </NuxtLink>
        </section>

        <!-- Index -->
        <section v-if="rest.length" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="All dispatches" />
            <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink
                    v-for="post in rest"
                    :key="post.id"
                    :to="`/company/newsroom/${post.slug}`"
                    class="bg-whitesmoke-100 hover:bg-whitesmoke-200 rounded-2xl p-6 transition-colors block group card-hover"
                >
                    <NuxtImg
                        v-if="post.featuredImage"
                        :src="post.featuredImage"
                        :alt="post.title"
                        class="w-full aspect-[16/10] object-cover rounded-xl mb-5"
                    />
                    <p class="text-[11px] font-mono uppercase tracking-[0.15em] text-primary-text mb-2">{{ categoryLabel(post.category) }}</p>
                    <div class="flex items-center gap-3 text-[12px] text-drygray-default font-medium mb-3">
                        <span>{{ formatDate(post.publishedAt) }}</span>
                        <template v-if="post.readTime">
                            <span aria-hidden="true">·</span>
                            <span>{{ post.readTime }}</span>
                        </template>
                    </div>
                    <p class="text-h3 font-degular font-bold text-drygray-100 group-hover:text-primary-text transition-colors leading-tight">
                        {{ post.title }}
                    </p>
                    <p v-if="post.excerpt" class="text-b1 text-drygray-default mt-3 line-clamp-3">{{ post.excerpt }}</p>
                </NuxtLink>
            </div>
        </section>

        <!-- Empty state (filter narrows to zero) -->
        <section v-if="!pending && !posts.length" class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Nothing yet" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05] max-w-3xl">
                Nothing in this category yet<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                The other categories have content. Switch the filter, or write us at the press desk for what you were looking for.
            </p>
            <div class="mt-8 flex gap-3 flex-wrap">
                <button type="button" class="text-[13px] font-medium px-4 py-2 rounded-full border border-drygray-100 bg-drygray-100 text-white" @click="activeCategory = 'all'">
                    Show all
                </button>
                <a href="mailto:press@davion.com"><CommonButton variant="outline" size="xs" icon="base:arrow">press@davion.com</CommonButton></a>
            </div>
        </section>

        <!-- Press kit / media contact block -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Press kit · Media contact" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        For journalists and analysts<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Logos, executive bios, fact sheets, and briefing memos available on request. Embargoed material handled with discretion. Routing through the press desk.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <a href="mailto:press@davion.com"><CommonButton variant="primary" icon="base:arrow">press@davion.com</CommonButton></a>
                </div>
            </div>
        </section>
    </div>
</template>
