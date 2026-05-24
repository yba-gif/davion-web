// `v-reveal`, section-level reveal-on-scroll directive.
// Spec lives at docs/motion.md §2. Plays once per page load, then unobserves.
// Respects prefers-reduced-motion via the CSS `[data-reveal-on-scroll]` block.
//
// Universal plugin (not .client.ts) so the directive is registered on BOTH
// server and client. Without an SSR-side registration, Vue's renderToString
// hits `Cannot read properties of undefined (reading 'getSSRProps')` when it
// encounters <section v-reveal> during SSR. The `getSSRProps` hook below is
// a no-op — the IntersectionObserver setup only runs in `mounted` (client).
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('reveal', {
        // Called during SSR. Returns no extra DOM props; the visible/hidden
        // state is purely a client-side animation concern.
        getSSRProps() {
            return {}
        },
        mounted(el: HTMLElement) {
            // SSR safety guard — mounted itself only fires on the client, but
            // belt+braces in case this ever runs in a Node-rendered context.
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
