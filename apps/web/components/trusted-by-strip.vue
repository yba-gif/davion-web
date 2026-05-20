<script setup lang="ts">
interface Props {
    title?: string
    sub?: string
}
withDefaults(defineProps<Props>(), {
    title: 'Trusted by',
    sub: 'Davion engagements are sovereign by contract. Customer names are withheld unless explicitly approved for press.',
})

const placeholders = [
    'Defense Ministry',
    'Tier-1 Global Bank',
    'National Energy Operator',
    'EU Regulator',
    'Sovereign Cloud Op.',
    'Critical Infra Op.',
]
</script>

<template>
    <div class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <div>
                <CommonSup :title="title" />
                <p class="text-b2 text-drygray-default mt-3 max-w-md">{{ sub }}</p>
            </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div v-for="(label, i) in placeholders" :key="i" class="bg-whitesmoke-100 rounded-xl px-5 py-6 text-center flex items-center justify-center min-h-[72px]">
                <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default leading-snug">{{ label }}</p>
            </div>
        </div>
    </div>
</template>
