<script setup lang="ts">
import { CommonSup } from '#components'

interface BlogProps {
    index?: number
    image?: string
    author?: string
    readTime?: string
    date?: string
    title?: string
    excerpt?: string
    slug?: string
}

withDefaults(defineProps<BlogProps>(), {
    image: '/placeholder.png',
    author: 'Ivan',
    readTime: '3 min read',
    date: '06.07.2025',
    title: 'London & Capital and Waverton unite as W1M as the firm pursues ambitious growth beyond £21 billion AUM milestone.',
    excerpt: 'We have already seen a sharp fall in the dollar in just a few months, and the consensus against the currency is now at such an extreme that we could see a short-term snap-back.',
    slug: '/blog/post-1'
})
</script>

<template>
    <NuxtLink
        :to="slug"
        class="group w-full h-full flex flex-col items-start gap-5 text-left text-sm text-drygray-100 bg-whitesmoke-100 font-switzer rounded-xl p-5 transition-all duration-300"
    >
        <NuxtImg
            class="w-full h-[170px] object-cover rounded-lg transition-transform duration-300 group-hover:opacity-80"
            alt=""
            :src="image"
        />

        <div class="flex items-center gap-5">
            <CommonSup
                :title="`By ${author}`"
                :color="!index ? '#60e576' : '#212121'"
                vertical
                class="whitespace-nowrap leading-[150%]"
            />

            <span class="text-drygray-default font-medium whitespace-nowrap leading-[150%]">
                {{ readTime }} min read
            </span>

            <span class="font-medium leading-[150%]">{{ date }}</span>
        </div>

        <div
            class="w-full flex flex-col text-4xl transition-colors group-hover:text-drygray-default font-degular-display-demo tracking-[-0.5px] leading-[100%] font-semibold"
        >
            {{ title.replace(/\.$/, '') }}
        </div>

        <p class="w-full font-medium leading-[150%] m-0">
            {{ excerpt }}
        </p>

        <CommonButton
            variant="outline"
            size="sm"
            class="w-full mt-auto transition-colors duration-300 group-hover:border-drygray-100"
        >
            Read more
        </CommonButton>
    </NuxtLink>
</template>

