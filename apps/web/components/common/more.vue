<script setup lang="ts">
interface Props {
    title: string
    href: string
}

defineProps<Props>()
</script>

<template>
    <NuxtLink
        :to="href"
        class="group w-full h-[49px] text-left text-2xl text-drygray-100 font-switzer flex flex-col hover:opacity-80 transition-opacity"
    >
        <div class="flex-1 flex flex-row items-center justify-start gap-1.5">
            <div class="relative tracking-[-0.4px] leading-[100%] font-semibold group-hover:text-drygray-default transition-colors">
                {{ title }}
            </div>

            <Icon name="base:arrow" class="w-4 h-4 relative shrink-0 text-primary-text group-hover:text-drygray-default transition-colors" />
        </div>
        <div class="h-[1px] w-full bg-drygray-default" />
    </NuxtLink>
</template>
