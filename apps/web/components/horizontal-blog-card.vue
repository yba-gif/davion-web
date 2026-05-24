<script setup lang="ts">
interface BlogProps {
    image?: string
    author?: string
    readTime?: string
    date?: string
    title?: string
    excerpt?: string
    slug?: string
}

defineProps<BlogProps>()
</script>

<template>
    <NuxtLink
        :to="slug"
        class="group card-hover w-full relative rounded-xl bg-white flex flex-row items-stretch p-[23px] gap-[49px] transition-all duration-300 shadow-[0px_9px_80px_rgba(0,_0,_0,_0.07),_0px_1.1269396543502808px_10.02px_rgba(0,_0,_0,_0.04)]"
    >
        <div class="w-[440.2px] flex-shrink-0 flex" v-if="image">
            <NuxtImg
                :src="image"
                alt=""
                loading="lazy"
                class="w-full h-full object-cover rounded-lg duration-300 group-hover:opacity-80 transition-transform"
            />
        </div>

        <div class="flex flex-col justify-between gap-[26px] flex-1">
            <div class="flex items-center gap-10 text-drygray-100">
                <CommonSup
                    :title="`By ${author}`"
                    vertical
                    class="whitespace-nowrap leading-[150%]"
                />

                <span class="text-drygray-default font-medium whitespace-nowrap leading-[150%]">
                    {{ readTime }} min read
                </span>

                <span class="font-medium leading-[150%]">{{ date }}</span>
            </div>

            <h3 class="text-4xl font-degular font-semibold tracking-[-0.5px] leading-[100%] text-drygray-100 group-hover:text-drygray-default transition-colors">
                <span>{{ title?.replace(/\.$/, '') }}</span><DotAccent />
            </h3>

            <p class="font-medium leading-[150%] text-drygray-100">
                {{ excerpt }}
            </p>

            <CommonButton
                variant="primary"
                size="sm"
                class="w-[170px] transition-colors duration-300 text-white !bg-drygray-100 hover:!bg-primary group-hover:!bg-primary"
            >
                Read dispatch
            </CommonButton>
        </div>
    </NuxtLink>
</template>

<style scoped />
