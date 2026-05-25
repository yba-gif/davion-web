// `v-reveal`, section-level reveal-on-scroll directive.
// Spec lives at docs/motion.md §2. Plays once per page load, then unobserves.
// Respects prefers-reduced-motion via the CSS `[data-reveal-on-scroll]` block.
//
// Universal plugin (not .client.ts) so the directive is registered on BOTH
// server and client. Without an SSR-side registration, Vue's renderToString
// hits `Cannot read properties of undefined (reading 'getSSRProps')` when it
// encounters <section v-reveal> during SSR. The `getSSRProps` hook below is
// a no-op — the IntersectionObserver setup only runs in `mounted` (client).
//
// MOBILE WHITE-SCREEN BUGFIX (2026-05-25):
// The previous version unconditionally added `data-reveal-on-scroll` on
// mount, which made CSS `opacity: 0` apply to every <section v-reveal> on
// the page — including sections currently *visible* in the viewport. On
// fast desktops the IntersectionObserver callback fires within a frame, so
// the flash is invisible. On slow phones the JS bundle finishes hydrating
// 8–15s after first paint, and at that moment a screen full of content
// suddenly went blank; the user reads it as "site broke." Sections below
// the fold then needed the user to scroll into 15% visibility before they
// faded in, which compounded to a 20s+ "scrolling-into-white" feel.
//
// Fix is three-pronged:
//   1. Skip the reveal entirely on narrow viewports (<= 768px). Animation
//      is luxury; reading the content is the job. Mobile users get
//      everything visible from the start.
//   2. Skip on prefers-reduced-motion (was already in place, kept).
//   3. On wider viewports, synchronously check whether the element is
//      already in viewport at mount time. If yes, leave it alone — never
//      set the hiding attribute. Only set it for elements that genuinely
//      need to fade in as the user scrolls down to them.
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
                return
            }

            // (1) Mobile: skip the reveal entirely. Content stays visible.
            //     768px matches Tailwind `md:` breakpoint — anything narrower
            //     is a phone where the perf cost outweighs the polish.
            if (window.matchMedia('(max-width: 768px)').matches) {
                return
            }

            // (2) Reduced-motion preference: same as mobile — content visible,
            //     no animation.
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return
            }

            // (3) Sync viewport check. If the element is already on screen at
            //     mount time, hydration is happening WHILE the user is looking
            //     at it — adding the hiding attribute would cause a content
            //     flash. Skip the animation for this element; leave it visible.
            const rect = el.getBoundingClientRect()
            const inViewport = rect.top < window.innerHeight && rect.bottom > 0
            if (inViewport) {
                return
            }

            // Below the fold at mount: opt into the reveal-on-scroll behaviour.
            // CSS rule `[data-reveal-on-scroll]` makes it invisible; IO
            // callback flips `data-revealed="true"` once it enters viewport.
            el.setAttribute('data-reveal-on-scroll', '')

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
