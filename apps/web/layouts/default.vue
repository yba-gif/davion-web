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
        <LayoutHeader />
        <main class="py-2 max-w-7xl mx-auto ">
            <slot />
        </main>
        <LayoutFooter />
    </div>
</template>
