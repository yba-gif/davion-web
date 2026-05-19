<script setup lang="ts">
interface BlogPost {
    id: number
    title: string
    slug: string
    excerpt: string
    author: string
    readTime: string
    featuredImage: string | null
    publishedAt: string
    image: string
    date: string
}

const blogs = ref<BlogPost[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
    try {
        console.log('Fetching blog posts...')
        const response = await $fetch<{ success: boolean, data: any[] }>('/api/blog')

        console.log('Blog API response:', response)

        if (response && response.success) {
            blogs.value = response.data.map((post: any) => ({
                ...post,
                image: post.featuredImage || '/placeholder.png',
                date: post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }).replace(/\//g, '.')
                    : new Date(post.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }).replace(/\//g, '.'),
                slug: `/blog/${post.slug}`,
            }))
            console.log('Mapped blogs:', blogs.value)
        }
        else {
            console.error('API response does not indicate success:', response)
            if (!response) {
                error.value = 'Failed to load blog posts - No response from API'
            }
            else if (!response.success) {
                error.value = `Failed to load blog posts - API returned: ${JSON.stringify(response)}`
            }
            else {
                error.value = 'Failed to load blog posts - Unknown API error'
            }
        }
    }
    catch (err) {
        console.error('Failed to fetch blog posts:', err)
        error.value = 'Failed to load blog posts'
    }
    finally {
        isLoading.value = false
    }
})
</script>

<template>
    <section id="blog-section" class="w-full relative rounded-3xl bg-white p-24 max-[1250px]:px-4 box-border text-left text-sm text-drygray-200 font-switzer gap-12 flex flex-col">
        <Motion
            tag="div"
            :initial="{ y: 50, opacity: 0, filter: 'blur(6px)' }"
            :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
            <CommonSup title="Our Blog" />
        </Motion>

        <Motion
            tag="div"
            :initial="{ y: 80, opacity: 0, filter: 'blur(8px)' }"
            :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
            class="text-5xl font-degular text-drygray-100 font-semibold tracking-[-0.5px] leading-[110%]"
        >
            What We're Seeing<span class="text-primary">.</span>
        </Motion>

        <Motion
            tag="div"
            :initial="{ y: 40, opacity: 0, filter: 'blur(4px)' }"
            :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
            class="relative text-drygray-100 text-sm leading-[150%] font-medium font-switzer text-gray text-left inline-block"
        >
            Sharp takes on markets, on-chain trends, and token mechanics.
        </Motion>

        <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>

        <template v-else-if="blogs.length > 0">
            <!-- Desktop: Show horizontal card first, then grid -->
            <Motion
                tag="div"
                :initial="{ y: 60, opacity: 0, filter: 'blur(8px)' }"
                :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
                :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
                class="min-[1251px]:block hidden"
            >
                <Motion
                    tag="div"
                    :initial="{ scale: 0.95, opacity: 0, filter: 'blur(8px)' }"
                    :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
                    :transition="{ duration: 0.6, delay: 0.8, ease: 'easeOut' }"
                >
                    <HorizontalBlogCard
                        v-if="blogs[0]"
                        :image="blogs[0].image"
                        :author="blogs[0].author"
                        :read-time="blogs[0].readTime"
                        :date="blogs[0].date"
                        :title="blogs[0].title"
                        :excerpt="blogs[0].excerpt"
                        :slug="blogs[0].slug"
                        class="mb-8"
                    />
                </Motion>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 auto-rows-fr">
                    <Motion
                        v-for="(blog, index) in blogs.slice(1)"
                        :key="blog.id"
                        tag="div"
                        :initial="{ y: 50, opacity: 0, scale: 0.95, filter: 'blur(8px)', }"
                        :animate="{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', }"
                        :transition="{ duration: 0.6, delay: 1.0 + (index * 0.1), ease: 'easeOut' }"
                        class="h-full"
                    >
                        <BlogCard
                            :image="blog.image"
                            :author="blog.author"
                            :read-time="blog.readTime"
                            :date="blog.date"
                            :title="blog.title"
                            :excerpt="blog.excerpt"
                            :slug="blog.slug"
                            class="h-full"
                        />
                    </Motion>
                </div>
            </Motion>

            <!-- Mobile/Tablet: Show all as normal blog cards -->
            <Motion
                tag="div"
                :initial="{ y: 60, opacity: 0, filter: 'blur(8px)', }"
                :animate="{ y: 0, opacity: 1, filter: 'blur(0px)', }"
                :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
                class="max-[1250px]:block hidden"
            >
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 auto-rows-fr">
                    <Motion
                        v-for="(blog, index) in blogs"
                        :key="blog.id"
                        tag="div"
                        :initial="{ y: 50, opacity: 0, scale: 0.95, filter: 'blur(8px)', }"
                        :animate="{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', }"
                        :transition="{ duration: 0.6, delay: 0.8 + (index * 0.1), ease: 'easeOut' }"
                        class="h-full"
                    >
                        <BlogCard
                            :index="index"
                            :image="blog.image"
                            :author="blog.author"
                            :read-time="blog.readTime"
                            :date="blog.date"
                            :title="blog.title"
                            :excerpt="blog.excerpt"
                            :slug="blog.slug"
                            class="h-full"
                        />
                    </Motion>
                </div>
            </Motion>
        </template>
        <!-- <Motion
            tag="div"
            :initial="{ y: 40, opacity: 0, filter: 'blur(8px)', }"
            :animate="{ y: 0, opacity: 1, filter: 'blur(0px)', }"
            :transition="{ duration: 0.6, delay: 1.4, ease: 'easeOut' }"
        >
            <CommonMore title="Explore Our Blog" href="/blogs" class="mt-8" />
        </Motion> -->
    </section>
</template>
