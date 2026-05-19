import { defineNuxtPlugin } from '#app'
import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin((nuxtApp) => {
    let lenis: Lenis | null = null

    if (process.client) {
        nuxtApp.hook('app:mounted', () => {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
                touchMultiplier: 2,
                infinite: false,
            })

            function raf(time: number) {
                lenis?.raf(time)
                requestAnimationFrame(raf)
            }

            requestAnimationFrame(raf)

            nuxtApp.hook('page:finish', () => {
                setTimeout(() => {
                    lenis?.scrollTo(0, { immediate: true })
                }, 100)
            })
        })

        nuxtApp.hook('app:beforeMount', () => {
            lenis?.destroy()
            lenis = null
        })
    }

    return {
        provide: {
            lenis: () => lenis,
        },
    }
})
