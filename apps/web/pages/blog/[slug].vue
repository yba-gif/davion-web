<script setup lang="ts">
import { CommonButton, CommonSup } from '#components'

const route = useRoute()
const slug = route.params.slug as string
const { trackBlogRead } = useAnalytics()
const { renderMarkdown } = useMarkdown()

const { data: post, pending, error } = await useFetch(`/api/blog/${slug}`)

if (error.value) {
    throw createError({
        statusCode: error.value.statusCode || 404,
        statusMessage: error.value.statusMessage || 'Blog post not found',
    })
}

const formattedDate = computed(() => {
    if (!post.value?.data?.publishedAt)
        return ''
    return new Date(post.value.data.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    })
})

const renderedContent = computed(() => {
    if (!post.value?.data?.content) return ''
    return renderMarkdown(post.value.data.content)
})

const startTime = Date.now()
onMounted(() => {
    if (post.value?.data) {
        trackBlogRead(post.value.data.id, post.value.data.title)
    }
})

onBeforeUnmount(() => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    if (post.value?.data && duration > 5) {
        trackBlogRead(post.value.data.id, post.value.data.title, duration)
    }
})

useSeoMeta({
    title: post.value?.data?.title || 'Blog Post',
    description: post.value?.data?.excerpt || '',
    ogTitle: post.value?.data?.title || 'Blog Post',
    ogDescription: post.value?.data?.excerpt || '',
    ogImage: post.value?.data?.featuredImage || '/cover.jpg',
})
</script>

<template>
    <div class="min-h-screen bg-whitesmoke-100">
        <div v-if="pending" class="flex items-center justify-center min-h-[60vh]">
            <div class="text-drygray-100">
                Loading...
            </div>
        </div>

        <article v-else-if="post?.data">
            <!-- Hero Section -->
            <section class="w-full bg-azure py-24 max-[980px]:py-16 px-6">
                <div class="container mx-auto max-w-4xl">
                    <div class="text-center">
                        <!-- Meta Info -->
                        <div class="flex items-center justify-center gap-6 mb-8 text-drygray-100/70">
                            <CommonSup
                                :title="`By ${post.data.author}`"
                                color="#60e576"
                                vertical
                                class="text-sm"
                            />
                            <span class="text-sm font-medium">{{ post.data.readTime }}</span>
                            <span class="text-sm font-medium">{{ formattedDate }}</span>
                        </div>

                        <!-- Title -->
                        <h1 class="text-6xl max-[980px]:text-4xl max-[640px]:text-3xl font-degular font-semibold text-drygray-100 tracking-[-0.5px] leading-[100%] mb-8">
                            {{ post.data.title }}
                        </h1>

                        <!-- Excerpt -->
                        <p class="text-xl max-[980px]:text-lg text-drygray-100/80 font-medium leading-[150%] max-w-3xl mx-auto">
                            {{ post.data.excerpt }}
                        </p>
                    </div>
                </div>
            </section>

            <!-- Featured Image -->
            <div v-if="post.data.featuredImage" class="w-full px-6 -mt-12">
                <div class="container mx-auto max-w-4xl">
                    <NuxtImg
                        :src="post.data.featuredImage"
                        :alt="post.data.title"
                        class="w-full h-[400px] max-[980px]:h-[300px] object-cover rounded-xl shadow-sm"
                    />
                </div>
            </div>

            <!-- Content Section -->
            <div class="container mx-auto max-w-4xl px-6 py-20 max-[980px]:py-16">
                <div
                    class="prose prose-sm max-w-none text-drygray-100 font-switzer"
                    v-html="renderedContent"
                />

                <!-- Back Navigation -->
                <div class="mt-12 pt-8 border-t border-drygray-100/10 text-center">
                    <NuxtLink to="/" class="inline-block">
                        <CommonButton variant="outline" size="sm">
                            <span class="flex items-center gap-2">
                                <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                                Back to Home
                            </span>
                        </CommonButton>
                    </NuxtLink>
                </div>
            </div>
        </article>
    </div>
</template>

<style scoped>
.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
    @apply font-degular font-semibold tracking-[-0.5px] text-drygray-100;
}

.prose :deep(h1) {
    @apply text-3xl mb-6 mt-0 max-[980px]:text-2xl max-[640px]:text-xl leading-[120%];
}

.prose :deep(h2) {
    @apply text-2xl mb-5 mt-12 max-[980px]:text-xl max-[640px]:text-lg leading-[125%];
}

.prose :deep(h3) {
    @apply text-xl mb-4 mt-10 max-[980px]:text-lg max-[640px]:text-base leading-[130%];
}

.prose :deep(h4) {
    @apply text-lg mb-3 mt-8 max-[980px]:text-base max-[640px]:text-sm leading-[135%];
}

.prose :deep(p) {
    @apply text-drygray-100 leading-[180%] mb-6 text-base max-[980px]:text-base max-[640px]:text-sm;
}

.prose :deep(ul),
.prose :deep(ol) {
    @apply my-6 pl-6 max-[640px]:pl-4;
}

.prose :deep(li) {
    @apply mb-3 text-drygray-100 text-base max-[980px]:text-base max-[640px]:text-sm leading-[180%];
}

.prose :deep(li::marker) {
    @apply text-primary;
}

.prose :deep(blockquote) {
    @apply border-l-4 border-primary pl-6 my-8 italic text-drygray-100/80 bg-azure/10 py-4 rounded-r-lg text-base max-[980px]:text-sm leading-[170%];
}

.prose :deep(pre) {
    @apply bg-drygray-100/5 rounded-lg p-4 overflow-x-auto my-6 border border-drygray-100/10;
}

.prose :deep(code) {
    @apply bg-drygray-100/10 px-2 py-1 rounded-md text-sm font-mono;
}

.prose :deep(pre code) {
    @apply bg-transparent px-0 py-0 text-sm;
}

.prose :deep(a) {
    @apply text-primary hover:text-primary/80 transition-colors font-medium underline decoration-primary/30 hover:decoration-primary underline-offset-4;
}

.prose :deep(img) {
    @apply rounded-xl my-8 shadow-sm w-full;
}

.prose :deep(hr) {
    @apply border-drygray-100/20 my-12 border-t-2;
}

.prose :deep(table) {
    @apply w-full my-8 bg-white/50 rounded-lg overflow-hidden border border-drygray-100/10;
}

.prose :deep(th) {
    @apply text-left font-semibold p-3 border-b border-drygray-100/20 bg-azure/10 text-sm;
}

.prose :deep(td) {
    @apply p-3 border-b border-drygray-100/10 text-sm;
}

.prose :deep(strong) {
    @apply font-semibold text-drygray-100;
}

.prose :deep(em) {
    @apply italic text-drygray-100/90;
}

/* Blog yazı formatına özel stil geliştirmeleri */
.prose :deep(p:first-of-type) {
    @apply text-lg max-[980px]:text-base font-medium leading-[180%] mt-0;
}

.prose :deep(p + p) {
    @apply mt-4;
}
</style>
