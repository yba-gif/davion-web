<script setup lang="ts">
// Numbers Strip, P1.7. Replaces the deleted TrustedByStrip slot with verifiable
// architectural / presence facts. Acceptance: "No invented metrics. Each card is
// a noun + a verifiable number." (redesign-action-plan §P1.7)
//
// Founding-year card omitted by founder direction (2026-05-21). Add when legal
// entity finalized.
interface Stat {
    label: string
    value: string
    detail: string
}
withDefaults(defineProps<{ title?: string, sub?: string, stats?: Stat[] }>(), {
    title: 'Where Davion stands today',
    sub: 'Numbers Davion can defend. Surface honestly, replaced as the company grows.',
    stats: () => ([
        { label: 'Where we are', value: '2 HQs', detail: 'Zurich · Istanbul' },
        { label: 'Deployment modes', value: '3', detail: 'On-prem · Air-gapped · Sovereign cloud' },
        { label: 'Platform layers', value: '5', detail: 'Ingest → Ontology → Analyze → Decide → Act' },
        { label: 'Pilot scope', value: '6–12 weeks', detail: 'Bounded engagement against a measurable outcome' },
    ]),
})
</script>

<template>
    <div class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <div>
                <CommonSup :title="title" />
                <p class="text-b2 text-drygray-default mt-3 max-w-md">{{ sub }}</p>
            </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div v-for="s in stats" :key="s.label" class="bg-whitesmoke-100 rounded-2xl px-6 py-7 flex flex-col gap-2 min-h-[140px]">
                <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ s.label }}</p>
                <p class="font-degular font-bold text-drygray-100 text-[32px] md:text-[36px] leading-none tracking-tight">{{ s.value }}<span class="text-primary-text">.</span></p>
                <p class="text-[13px] text-drygray-default leading-snug mt-auto">{{ s.detail }}</p>
            </div>
        </div>
    </div>
</template>
