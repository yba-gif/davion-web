<script setup lang="ts">
import { CommonButton } from '#components'

interface Props {
    title: string
    date: string
    location: string
    daysLeft?: string
    status?: 'upcoming' | 'past'
    slug?: string
    registrationUrl?: string | null
}

const props = withDefaults(defineProps<Props>(), {
    status: 'upcoming',
    slug: '#',
})
</script>

<template>
    <div
        class="group rounded-xl bg-whitesmoke-200 text-drygray-100 p-6 flex flex-col gap-6 text-left text-4xl !text-drygray-00 font-degular transition-colors hover:bg-whitesmoke-100 h-full"
    >
        <h2 class="font-semibold tracking-tight font-degular">
            {{ title }}
        </h2>

        <p class="text-base font-semibold tracking-tight">
            {{ date }}
        </p>

        <div class="flex flex-wrap items-center gap-6 text-sm font-medium flex-grow">
            <CommonSup :title="location" vertical color="#60e576" />
            <CommonSup
                v-if="daysLeft && status === 'upcoming'"
                :title="daysLeft"
                vertical
                color="#ea6d62"
            />
            <CommonSup
                v-if="status === 'past'"
                title="Completed"
                vertical
                color="#6b7280"
            />
        </div>

        <div class="mt-auto">
            <NuxtLink
                v-if="status === 'upcoming' && registrationUrl"
                :to="registrationUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block"
            >
                <CommonButton icon="base:arrow" class="w-full transition-colors group-hover:border-drygray-100">
                    Join Event
                </CommonButton>
            </NuxtLink>
            <NuxtLink
                v-else
                :to="slug"
                class="block"
            >
                <CommonButton icon="base:arrow" class="w-full transition-colors group-hover:border-drygray-100">
                    {{ status === 'upcoming' ? 'Learn More' : 'View Summary' }}
                </CommonButton>
            </NuxtLink>
        </div>
    </div>
</template>
