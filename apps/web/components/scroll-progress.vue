<script setup lang="ts">
// P1.U3 — Sticky scroll-progress bar. Thin (2px), top of viewport, fills with
// primary-text colour as the reader scrolls. Disabled in prefers-reduced-
// motion via CSS so no JS branch needed.
//
// Mounted globally in layouts/default.vue. Cheap: one rAF-throttled scroll
// listener, one style update per frame.
const progress = ref(0)
let raf: number | null = null

function compute() {
    if (typeof document === 'undefined') return
    const h = document.documentElement
    const scrollable = h.scrollHeight - h.clientHeight
    if (scrollable <= 0) {
        progress.value = 0
        return
    }
    const ratio = Math.min(1, Math.max(0, h.scrollTop / scrollable))
    progress.value = ratio
}

function onScroll() {
    if (raf !== null) return
    raf = requestAnimationFrame(() => {
        compute()
        raf = null
    })
}

onMounted(() => {
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
    }
    if (raf !== null) cancelAnimationFrame(raf)
})
</script>

<template>
    <!-- Lives above everything via z-index. Inside the layout's wrapper so the
         sticky positioning anchors to viewport-top. -->
    <div
        class="scroll-progress-bar fixed top-0 inset-x-0 h-[2px] bg-transparent z-[70] pointer-events-none"
        aria-hidden="true"
    >
        <div
            class="h-full bg-primary-text origin-left"
            :style="{ transform: `scaleX(${progress})` }"
        />
    </div>
</template>

<style scoped>
.scroll-progress-bar > div {
    transition: transform 100ms linear;
}
@media (prefers-reduced-motion: reduce) {
    .scroll-progress-bar > div {
        transition: none;
    }
}
</style>
