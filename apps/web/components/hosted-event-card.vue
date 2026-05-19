<script setup lang="ts">
import { CommonButton } from '#components'

interface Props {
    title: string
    date: string
    location: string
    description: string
    slug?: string
}

withDefaults(defineProps<Props>(), {
    slug: '#',
})
</script>

<template>
    <NuxtLink
        :to="slug"
        class="group rounded-xl bg-azure text-drygray-100 p-6 flex flex-col gap-4 text-left transition-all hover:from-primary/15 hover:to-primary/10 hover:border-primary/30 h-full"
    >
        <!-- Location -->
        <CommonSup :title="location" vertical color="#60e576" />

        <!-- Title -->
        <h2 class="text-3xl font-semibold tracking-tight font-degular text-drygray-100">
            {{ title }}
        </h2>

        <!-- Date Time -->
        <p class="text-base font-semibold tracking-tight text-drygray-100">
            {{ date }}
        </p>

        <!-- Description -->
        <p class="text-sm leading-relaxed text-drygray-100 flex-grow">
            {{ description }}
        </p>

        <div class="mt-auto pt-2">
            <CommonButton variant="primary" class="w-full group-hover:bg-drygray-100 group-hover:text-white">
                <div class="flex gap-2 items-center">
                    Apply to Attend
                    <Icon name="base:arrow" class="ml-2" />
                </div>
            </CommonButton>
        </div>
    </NuxtLink>
</template>
