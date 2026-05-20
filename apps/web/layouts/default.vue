<script setup>
const { trackPageView } = useAnalytics()
const route = useRoute()

watch(() => route.fullPath, (newPath) => {
    trackPageView(newPath)
}, { immediate: true })

const startTime = Date.now()
onBeforeUnmount(() => {
    const duration = Math.round((Date.now() - startTime) / 1000)
    if (duration > 1) {
        trackPageView(route.fullPath, duration)
    }
})
</script>

<template>
    <div
        class="w-full relative bg-whitesmoke-200 text-left text-sm text-gray-200 font-switzer pb-4"
    >
        <!-- P3.12 a11y: skip-to-content link. Only visible on keyboard focus. -->
        <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-drygray-100 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
            Skip to content
        </a>
        <LayoutHeader />
        <main id="main-content" class="py-2 max-w-7xl mx-auto " tabindex="-1">
            <slot />
        </main>
        <LayoutFooter />
    </div>
</template>
