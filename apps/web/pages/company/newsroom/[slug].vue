<script setup lang="ts">
// Davion Newsroom article template, also intended to power Events detail.
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string
const { trackBlogRead } = useAnalytics()
const { renderMarkdown } = useMarkdown()

interface Post {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    author: string
    readTime: string | null
    featuredImage: string | null
    publishedAt: string | null
}

const { data, pending, error } = await useFetch<{ success: boolean, data: Post }>(`/api/blog/${slug}`)

if (error.value) {
    throw createError({
        statusCode: error.value.statusCode || 404,
        statusMessage: error.value.statusMessage || 'Dispatch not found',
    })
}

const post = computed<Post | null>(() => data.value?.data ?? null)

// P1.U5: ISO format via shared composables/useFormatDate.ts
const formattedDate = computed(() => formatDate(post.value?.publishedAt))

const renderedContent = computed(() => {
    if (!post.value?.content) return ''
    return renderMarkdown(post.value.content)
})

// Related dispatches, excluding current
const { data: relatedData } = await useFetch<{ success: boolean, data: Post[] }>('/api/blog', { query: { limit: 4 } })
const related = computed<Post[]>(() =>
    (relatedData.value?.data ?? []).filter(p => p.slug !== slug).slice(0, 3),
)

const startTime = Date.now()
onMounted(() => {
    if (post.value) trackBlogRead(post.value.id, post.value.title)
})
onBeforeUnmount(() => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    if (post.value && duration > 5) trackBlogRead(post.value.id, post.value.title, duration)
})

useSeoMeta({
    title: post.value?.title || t('pages.newsroom.post.sup'),
    description: post.value?.excerpt || '',
    ogTitle: post.value?.title || t('pages.newsroom.post.sup'),
    ogDescription: post.value?.excerpt || '',
    ogImage: post.value?.featuredImage || undefined,
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-if="pending" class="bg-white rounded-3xl px-6 md:px-16 py-32">
            <p class="text-b2 text-drygray-default">{{ $t('pages.newsroom.post.loadingMsg') }}</p>
        </div>

        <template v-else-if="post">
            <!-- Hero -->
            <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
                <CommonSup :title="$t('pages.newsroom.post.sup')" />
                <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[36px] leading-[1.05] md:text-[52px] md:leading-[1.02] lg:text-[72px] tracking-tight max-w-4xl">
                    {{ post.title }}
                </h1>
                <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-drygray-default">
                    <span class="inline-flex items-center gap-2">
                        <span class="text-primary-text" aria-hidden="true">·</span>
                        {{ $t('pages.newsroom.post.byLabel') }} {{ post.author }}
                    </span>
                    <span v-if="formattedDate">{{ formattedDate }}</span>
                    <span v-if="post.readTime">{{ post.readTime }}</span>
                </div>
                <p v-if="post.excerpt" class="mt-6 max-w-3xl text-[17px] md:text-[19px] leading-[1.6] text-drygray-100 font-medium">
                    {{ post.excerpt }}
                </p>
            </section>

            <!-- Featured image (optional) -->
            <section v-if="post.featuredImage" class="bg-white rounded-3xl p-2 md:p-3">
                <NuxtImg
                    :src="post.featuredImage"
                    :alt="post.title"
                    class="w-full aspect-[21/9] object-cover rounded-2xl"
                />
            </section>

            <!-- Article body -->
            <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
                <div class="max-w-3xl mx-auto prose-davion" v-html="renderedContent" />
            </section>

            <!-- Related -->
            <section v-if="related.length" class="bg-whitesmoke-100 rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
                <CommonSup :title="$t('pages.newsroom.post.relatedSup')" />
                <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <NuxtLink
                        v-for="r in related"
                        :key="r.id"
                        :to="localePath(`/company/newsroom/${r.slug}`)"
                        class="bg-white card-hover hover:bg-whitesmoke-200 rounded-2xl p-6 transition-colors block group"
                    >
                        <div class="flex items-center gap-3 text-[12px] text-drygray-default font-medium mb-3">
                            <span>{{ formatDate(r.publishedAt) }}</span>
                            <template v-if="r.readTime">
                                <span aria-hidden="true">·</span>
                                <span>{{ r.readTime }}</span>
                            </template>
                        </div>
                        <p class="text-h3 font-degular font-bold text-drygray-100 group-hover:text-primary-text transition-colors leading-tight">
                            {{ r.title }}
                        </p>
                        <p v-if="r.excerpt" class="text-b1 text-drygray-default mt-3 line-clamp-3">{{ r.excerpt }}</p>
                    </NuxtLink>
                </div>
            </section>

            <!-- Back / CTA -->
            <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
                <div class="grid lg:grid-cols-12 gap-6 items-end">
                    <div class="lg:col-span-8">
                        <CommonSup :title="$t('pages.newsroom.post.moreSup')" />
                        <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[36px] md:leading-[1.1]">
                            {{ $t('pages.newsroom.post.backHeadline') }}<DotAccent />
                        </h2>
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <NuxtLink :to="localePath('/company/newsroom')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.newsroom.post.allCta') }}</CommonButton></NuxtLink>
                    </div>
                </div>
            </section>
        </template>
    </div>
</template>

<style scoped>
.prose-davion :deep(h2),
.prose-davion :deep(h3),
.prose-davion :deep(h4) {
    @apply font-degular font-bold text-drygray-100 tracking-tight;
}
.prose-davion :deep(h2) { @apply text-[28px] md:text-[34px] leading-tight mt-12 mb-5; }
.prose-davion :deep(h3) { @apply text-[22px] md:text-[26px] leading-tight mt-10 mb-4; }
.prose-davion :deep(h4) { @apply text-[18px] md:text-[20px] leading-snug mt-8 mb-3; }
.prose-davion :deep(p) { @apply text-drygray-100 text-[16px] md:text-[17px] leading-[1.75] mb-5; }
.prose-davion :deep(p:first-of-type) { @apply text-[18px] md:text-[19px] leading-[1.7] font-medium mt-0; }
.prose-davion :deep(ul),
.prose-davion :deep(ol) { @apply my-5 pl-6 text-drygray-100; }
.prose-davion :deep(li) { @apply mb-2 leading-[1.7]; }
.prose-davion :deep(li::marker) { @apply text-primary-text; }
.prose-davion :deep(strong) { @apply font-semibold text-drygray-100; }
.prose-davion :deep(em) { @apply italic; }
.prose-davion :deep(blockquote) {
    @apply border-l-4 border-primary pl-6 my-8 italic text-drygray-100/80 bg-whitesmoke-100 py-4 rounded-r-2xl;
}
.prose-davion :deep(a) { @apply text-primary-text hover:text-primary-text/80 underline decoration-primary/30 hover:decoration-primary underline-offset-4 transition-colors; }
.prose-davion :deep(hr) { @apply border-drygray-200 my-10; }
.prose-davion :deep(pre) { @apply bg-whitesmoke-100 rounded-2xl p-5 overflow-x-auto my-6 border border-drygray-200; }
.prose-davion :deep(code) { @apply bg-whitesmoke-100 px-1.5 py-0.5 rounded text-[14px] font-mono; }
.prose-davion :deep(pre code) { @apply bg-transparent p-0; }
.prose-davion :deep(img) { @apply rounded-2xl my-8 w-full; }
.prose-davion :deep(table) { @apply w-full my-8 rounded-2xl overflow-hidden border border-drygray-200; }
.prose-davion :deep(th) { @apply text-left font-semibold p-3 border-b border-drygray-200 bg-whitesmoke-100 text-[12px] uppercase tracking-wider; }
.prose-davion :deep(td) { @apply p-3 border-b border-drygray-200 text-[15px]; }
</style>
