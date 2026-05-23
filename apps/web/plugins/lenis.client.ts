import { defineNuxtPlugin } from '#app'
import Lenis from '@studio-freight/lenis'

// Lenis smooth-scroll. Desktop only.
//
// Why touch devices skip it: Lenis on iOS WebKit interferes with touch
// event delivery to fixed-positioned elements (the cookie banner became
// unclickable; the founder bio modal had inconsistent tap behaviour).
// Native iOS momentum scroll is good enough; the smooth-scroll polish is
// a desktop nicety, not worth breaking core interaction for.
//
// Detection uses `(pointer: coarse)` + `(hover: none)` which correctly
// identifies phones and tablets without false-positiving touchscreen
// laptops. Matched once at mount; we don't re-evaluate on resize because
// devices don't gain/lose touch capability mid-session.

export default defineNuxtPlugin((nuxtApp) => {
    let lenis: Lenis | null = null

    if (process.client) {
        nuxtApp.hook('app:mounted', () => {
            const isTouch = window.matchMedia('(pointer: coarse) and (hover: none)').matches
            if (isTouch) return

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
