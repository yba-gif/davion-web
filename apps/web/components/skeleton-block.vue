<script setup lang="ts">
// P1.U2, Skeleton-loader primitive. Three variants cover every loading
// surface we have today; extend as new ones appear.
//
// Usage:
//   <SkeletonBlock variant="card" />, full card with image + 2 lines + 3 lines body
//   <SkeletonBlock variant="line" />, single text line
//   <SkeletonBlock variant="image" />, 16:10 image placeholder
//   <SkeletonBlock variant="card" :count="3" />, grid of 3
//
// Behaviour:
//   - Subtle pulse animation (1500ms, ease-in-out, infinite alternate).
//   - Honours prefers-reduced-motion: static, no pulse.
//   - aria-busy + aria-live so screen-readers announce loading.
interface Props {
    variant?: 'card' | 'line' | 'image'
    count?: number
}
const props = withDefaults(defineProps<Props>(), {
    variant: 'card',
    count: 1,
})
const items = computed(() => Array.from({ length: props.count }, (_, i) => i))
</script>

<template>
    <div role="status" aria-busy="true" aria-live="polite" class="skeleton-block-wrap">
        <span class="sr-only">Loading…</span>

        <!-- Card variant: image + meta + heading + body -->
        <div
            v-if="variant === 'card'"
            class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            <div v-for="i in items" :key="i" class="bg-whitesmoke-100 rounded-2xl p-6 flex flex-col gap-4">
                <div class="skeleton-shimmer aspect-[16/10] rounded-xl bg-drygray-200" />
                <div class="skeleton-shimmer h-3 w-32 rounded bg-drygray-200" />
                <div class="space-y-2">
                    <div class="skeleton-shimmer h-5 w-full rounded bg-drygray-200" />
                    <div class="skeleton-shimmer h-5 w-3/4 rounded bg-drygray-200" />
                </div>
                <div class="space-y-2 mt-2">
                    <div class="skeleton-shimmer h-3 w-full rounded bg-drygray-200" />
                    <div class="skeleton-shimmer h-3 w-5/6 rounded bg-drygray-200" />
                    <div class="skeleton-shimmer h-3 w-2/3 rounded bg-drygray-200" />
                </div>
            </div>
        </div>

        <!-- Single line variant -->
        <div
            v-else-if="variant === 'line'"
            class="space-y-2"
        >
            <div v-for="i in items" :key="i" class="skeleton-shimmer h-4 rounded bg-drygray-200" />
        </div>

        <!-- Image-only variant -->
        <div
            v-else-if="variant === 'image'"
            class="space-y-3"
        >
            <div v-for="i in items" :key="i" class="skeleton-shimmer aspect-[16/10] rounded-2xl bg-drygray-200" />
        </div>
    </div>
</template>

<style scoped>
.skeleton-shimmer {
    position: relative;
    overflow: hidden;
    animation: skeleton-pulse 1500ms ease-in-out infinite alternate;
}

@keyframes skeleton-pulse {
    from { opacity: 0.55; }
    to   { opacity: 0.85; }
}

@media (prefers-reduced-motion: reduce) {
    .skeleton-shimmer {
        animation: none;
        opacity: 0.7;
    }
}
</style>
