// `v-reveal`, section-level reveal-on-scroll directive.
// Spec lives at docs/motion.md §2. Plays once per page load, then unobserves.
// Respects prefers-reduced-motion via the CSS `[data-reveal-on-scroll]` block.
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('reveal', {
        mounted(el: HTMLElement) {
            // SSR safety: IntersectionObserver only exists client-side.
            if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
                el.setAttribute('data-revealed', 'true')
                return
            }

            // Mark the element so the CSS initial-state rule applies.
            el.setAttribute('data-reveal-on-scroll', '')

            // If the user prefers reduced motion, skip the animation entirely.
            // The CSS already handles the visual; we just flip the flag so any
            // observer-dependent UI behaves consistently.
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                el.setAttribute('data-revealed', 'true')
                return
            }

            const io = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            el.setAttribute('data-revealed', 'true')
                            io.unobserve(el)
                        }
                    }
                },
                {
                    threshold: 0.15,
                    rootMargin: '0px 0px -60px 0px',
                },
            )

            io.observe(el)
        },
    })
})
