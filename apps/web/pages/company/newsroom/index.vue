<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.newsroom.meta.title'),
    description: () => t('pages.newsroom.meta.description'),
    ogTitle: () => t('pages.newsroom.meta.ogTitle'),
    ogDescription: () => t('pages.newsroom.meta.ogDescription'),
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
// too; we fetch all and filter on the client so chip clicks are instant. Labels
// resolve through pages.newsroom.categories.* so /tr and /de render in-language.
const categories = [
    { slug: 'all',          labelKey: 'all' },
    { slug: 'announcement', labelKey: 'announcements' },
    { slug: 'insight',      labelKey: 'insight' },
    { slug: 'technical',    labelKey: 'technical' },
    { slug: 'recognition',  labelKey: 'recognition' },
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

// Category label for posts (singular form), used in card chips.
function categoryLabel(slug: string) {
    if (slug === 'announcement') return t('pages.newsroom.categories.announcement')
    if (slug === 'insight')      return t('pages.newsroom.categories.insight')
    if (slug === 'technical')    return t('pages.newsroom.categories.technical')
    if (slug === 'recognition')  return t('pages.newsroom.categories.recognition')
    return slug
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.newsroom.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                {{ $t('pages.newsroom.hero.headline') }}<DotAccent />
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.newsroom.hero.body') }}
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
                    {{ $t(`pages.newsroom.categories.${c.labelKey}`) }}
                    <span class="ml-1.5 text-[11px] opacity-60">{{ categoryCount(c.slug) }}</span>
                </button>
            </div>
        </section>

        <!-- Loading state (P1.U2) -->
        <section v-if="pending" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup :title="$t('pages.newsroom.loadingSup')" />
            <h2 class="sr-only">{{ $t('pages.newsroom.loadingSr') }}</h2>
            <div class="mt-10">
                <SkeletonBlock variant="card" :count="3" />
            </div>
        </section>

        <!-- Featured dispatch -->
        <section v-else-if="featured" class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup :title="$t('pages.newsroom.featuredSup')" />
            <NuxtLink :to="localePath(`/company/newsroom/${featured.slug}`)" class="block mt-6 group">
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                    <div class="lg:col-span-7">
                        <NuxtImg
                            v-if="featured.featuredImage"
                            :src="featured.featuredImage"
                            :alt="featured.title"
                            loading="lazy"
                            class="w-full aspect-[16/10] object-cover rounded-2xl"
                        />
                        <div v-else class="w-full aspect-[16/10] bg-white rounded-2xl flex items-center justify-center">
                            <NuxtImg src="/logo-64.png" alt="" width="64" height="64" loading="lazy" class="size-16 opacity-50" />
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
                            {{ $t('pages.newsroom.readDispatchCta') }}
                            <span aria-hidden="true">→</span>
                        </p>
                    </div>
                </div>
            </NuxtLink>
        </section>

        <!-- Index -->
        <section v-if="rest.length" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup :title="$t('pages.newsroom.allSup')" />
            <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink
                    v-for="post in rest"
                    :key="post.id"
                    :to="localePath(`/company/newsroom/${post.slug}`)"
                    class="bg-whitesmoke-100 hover:bg-whitesmoke-200 rounded-2xl p-6 transition-colors block group card-hover"
                >
                    <NuxtImg
                        v-if="post.featuredImage"
                        :src="post.featuredImage"
                        :alt="post.title"
                        loading="lazy"
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

        <!-- Empty state (filter narrows to zero), uses shared EmptyState pattern (P2.U6). -->
        <EmptyState
            v-if="!pending && !posts.length"
            variant="soft"
            :eyebrow="$t('pages.newsroom.emptyEyebrow')"
            :headline="$t('pages.newsroom.emptyHeadline')"
            :body="$t('pages.newsroom.emptyBody')"
        >
            <button type="button" class="text-[13px] font-medium px-5 py-3 rounded-full border border-drygray-100 bg-drygray-100 text-white min-h-[44px]" @click="activeCategory = 'all'">
                {{ $t('pages.newsroom.showAllBtn') }}
            </button>
            <template #extra>
                <a href="mailto:press@davion.com"><CommonButton variant="outline" size="xs" icon="base:arrow">press{{ '@' }}davion.com</CommonButton></a>
            </template>
        </EmptyState>

        <!-- Press kit / media contact block -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.newsroom.pressSup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        {{ $t('pages.newsroom.pressHeadline') }}<DotAccent />
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.newsroom.pressBody') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <a href="mailto:press@davion.com"><CommonButton variant="primary" icon="base:arrow">press{{ '@' }}davion.com</CommonButton></a>
                </div>
            </div>
        </section>
    </div>
</template>
