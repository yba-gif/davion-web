<script setup lang="ts">
// P2.U6: Reusable empty-state pattern. Used anywhere a list, table, or
// filter narrows to zero. Replaces ad-hoc "nothing here" markup with a
// consistent eyebrow / headline / body / CTA structure.
//
// Slots:
//   - default content for primary action (a button or link)
//   - `extra` for a secondary action
//
// Behaviour:
//   - role="status" + aria-live="polite" so screen readers announce empty.
//   - Honours the green-dot punctuation accent on the headline.

interface Props {
    eyebrow?: string
    headline: string
    body?: string
    /**
     * Visual variant: chooses the section background and tone.
     * - 'neutral'  → bg-whitesmoke-100 (default, fits in any context)
     * - 'soft'     → bg-azure          (light, gentle; paired with the P1.U6 palette)
     * - 'card'     → bg-white border    (drops into a card layout)
     */
    variant?: 'neutral' | 'soft' | 'card'
}
const props = withDefaults(defineProps<Props>(), {
    eyebrow: 'Nothing yet',
    body: '',
    variant: 'neutral',
})

const wrapperClass = computed(() => {
    if (props.variant === 'soft') return 'bg-azure'
    if (props.variant === 'card') return 'bg-white border border-drygray-200'
    return 'bg-whitesmoke-100'
})
</script>

<template>
    <div
        role="status"
        aria-live="polite"
        :class="[wrapperClass, 'rounded-2xl px-6 md:px-10 py-12 md:py-16 text-left']"
    >
        <CommonSup v-if="eyebrow" :title="eyebrow" />
        <h3 class="font-degular font-bold text-drygray-100 mt-4 text-h3 md:text-[28px] leading-tight max-w-2xl">
            {{ headline }}<DotAccent />
        </h3>
        <p v-if="body" class="text-b1 text-drygray-default mt-4 max-w-2xl">{{ body }}</p>
        <div v-if="$slots.default || $slots.extra" class="mt-6 flex flex-wrap gap-3">
            <slot />
            <slot name="extra" />
        </div>
    </div>
</template>
