export function useScrollAnimation(sectionId: string, offset = 100) {
    const isVisible = ref(false)
    const { lenis } = useLenis()

    onMounted(() => {
        const checkVisibility = () => {
            const section = document.querySelector(sectionId)
            if (!section) return

            const rect = section.getBoundingClientRect()
            const windowHeight = window.innerHeight

            if (rect.top <= windowHeight - offset && rect.bottom >= offset) {
                isVisible.value = true
            }
        }

        nextTick(() => {
            checkVisibility()
        })

        const lenisInstance = lenis()
        if (lenisInstance) {
            lenisInstance.on('scroll', checkVisibility)

            onUnmounted(() => {
                lenisInstance.off('scroll', checkVisibility)
            })
        } else {
            window.addEventListener('scroll', checkVisibility)
            onUnmounted(() => {
                window.removeEventListener('scroll', checkVisibility)
            })
        }
    })

    return { isVisible }
}