import type Lenis from '@studio-freight/lenis'
import { ref } from 'vue'

/**
 * Composable for accessing the Lenis smooth scroll instance
 */
export function useLenis() {
    const nuxtApp = useNuxtApp()
    const getLenis = (): Lenis | null => nuxtApp.$lenis ? nuxtApp.$lenis() : null

    const isSmooth = ref(true)

    /**
     * Toggle smooth scrolling on/off
     * @param value Boolean to set smooth state, or toggles current state if undefined
     */
    const toggleSmooth = (value?: boolean) => {
        const lenisInstance = getLenis()
        if (!lenisInstance)
            return

        if (value !== undefined) {
            isSmooth.value = value
        }
        else {
            isSmooth.value = !isSmooth.value
        }

        if (isSmooth.value) {
            lenisInstance.start()
        } else {
            lenisInstance.stop()
        }
    }

    /**
     * Scroll to a specific element or position
     * @param target Element or position to scroll to
     * @param options Scroll options (offset, duration, etc)
     */
    const scrollTo = (target: HTMLElement | number | string, options?: any) => {
        const lenisInstance = getLenis()
        if (!lenisInstance)
            return

        lenisInstance.scrollTo(target, options)
    }

    const stop = () => {
        const lenisInstance = getLenis()
        if (!lenisInstance)
            return

        lenisInstance.stop()
    }

    const start = () => {
        const lenisInstance = getLenis()
        if (!lenisInstance)
            return

        lenisInstance.start()
    }

    return {
        lenis: getLenis,
        isSmooth,
        toggleSmooth,
        scrollTo,
        stop,
        start,
    }
}
