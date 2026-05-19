<script setup lang="ts">
import { NuxtLink } from '#components'

interface Props {
    title: string
    description: string
    icon: string
    href?: string
}

defineProps<Props>()
</script>

<template>
    <component
        :is="href ? NuxtLink : 'div'" :to="href"
        class="w-full relative flex flex-col items-start justify-start text-left text-4xl font-degular bg-white" :class="!!href ? 'group cursor-pointer' : ''"
    >
        <div v-if="href" class="rounded-xl absolute top-5 right-5 border flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm group-hover:bg-white/90 transition-colors group-hover:border-primary">
            <Icon name="base:arrow" class="h-4 text-drygray-100 group-hover:text-primary transition-colors" />
        </div>

        <div
            class="self-stretch shadow-[0px_9px_80px_rgba(0,_0,_0,_0.07),_0px_1.1269396543502808px_10.02px_rgba(0,_0,_0,_0.04)] rounded-xl h-[300px] flex flex-col items-start justify-start py-12 px-9 box-border gap-6"
        >
            <div class="w-[108px] h-9 flex items-center justify-between">
                <Icon :name="icon" class="h-9 text-drygray-100 group-hover:text-primary transition" />
            </div>
            <div class="tracking-[-0.5px] leading-[100%] font-semibold font-degular">
                <span class="whitespace-nowrap !text-drygray-100 font-degular">{{ title }}</span>
                <span class="text-primary font-degular">.</span>
            </div>
            <div class="min-[980px]:w-[214px] text-sm leading-[150%] font-medium font-switzer !text-drygray-100">
                {{ description }}
            </div>
        </div>
    </component>
</template>
