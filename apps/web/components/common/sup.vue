<script setup lang="ts">
interface Props {
    title: string
    color?: string
    vertical?: boolean
}

const { color = '#60e576' } = defineProps<Props>()
</script>

<template>
    <div class="flex gap-2 items-center relative h-[23px] text-left text-[15px] text-drygray-100 font-switzer">
        <div :class="vertical ? 'w-3 h-1' : 'w-3 h-[5px]'" :style="{background: color, transform: vertical ? 'rotate(90deg)' : 'none'}" />
        <div class="tracking-[-0.3px] leading-[150%]" :class="vertical ? 'font-medium' : 'font-semibold'">
            {{ title }}
        </div>
    </div>
</template>

<style scoped></style>
