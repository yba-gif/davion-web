<script lang="ts" setup>
// Davion hero, Variant A (clarity-first): one positioning statement, one promise,
// one primary CTA + one secondary. Replaces three stacked slogans with a single
// sentence a stranger can recite after 10 seconds. See redesign-action-plan §P0.3.
// P0.6: NuxtImg dropped here, IPX dev pipeline was shipping a broken w_2 variant
// and prod was falling back to the raw 27 MB PNG. Plain <img> + srcset wired to
// pre-processed WebP variants under /public.
import Button from '~/components/common/button.vue'

const router = useRouter()
const localePath = useLocalePath()

function navigateToContact() {
    router.push(localePath('/contact'))
}
function navigateToAlpos() {
    router.push(localePath('/solutions/alpos'))
}
</script>

<template>
    <section
        id="hero-section"
        class="w-full bg-azure h-[640px] max-[400px]:h-[520px] relative min-[980px]:h-[700px] flex flex-col items-start justify-start py-[122px] px-24 max-[980px]:py-10 max-[980px]:px-6 max-[400px]:py-8 box-border gap-2.5 text-left text-drygray-100 font-switzer rounded-3xl overflow-hidden"
    >
        <!-- P2.U7: mobile-tight crop served at <=768px; full master variants on larger viewports.
             P1.1 (2026-05-24 audit): hero stays 640px on >400px screens, but drops to 520px
             at ≤400px so the section underneath is visible without scroll on iPhone SE
             (375×667) and Galaxy Fold cover (280×653). Spiral background scale tightened
             to 1.4 at the smallest size so the art doesn't dominate the headline. -->
        <picture>
            <source
                media="(max-width: 768px)"
                srcset="/section_background-mobile.webp"
                type="image/webp"
            >
            <img
                class="min-[980px]:w-[1176px] absolute pointer-events-none top-0 max-[980px]:top-32 max-[400px]:top-24 min-[980px]:-right-80 scale-150 max-[980px]:scale-[1.7] max-[400px]:scale-[1.4]"
                src="/section_background-1600.webp"
                srcset="
                    /section_background-480.webp 480w,
                    /section_background-960.webp 960w,
                    /section_background-1600.webp 1600w,
                    /section_background-2400.webp 2400w
                "
                sizes="(min-width: 980px) 70vw, 200vw"
                alt=""
                loading="eager"
                decoding="async"
                fetchpriority="high"
            >
        </picture>
        <div class="min-[980px]:w-[676px] max-[980px]:w-full flex flex-col items-start justify-end max-[980px]:h-full gap-8 max-[400px]:gap-5 z-[1]">
            <!-- H1 ladder: 68px desktop → 40px tablet/mobile → 32px on ≤400px screens.
                 At 32px the headline 'Decision infrastructure for data that can't leave'
                 wraps to 3 lines on 320px viewport without 'infrastructure' overflowing. -->
            <h1 class="font-degular font-semibold tracking-[-0.02em] leading-[1.02] m-0 text-[68px] max-[980px]:text-[40px] max-[400px]:text-[32px] min-[980px]:w-[676px] max-[980px]:w-full">
                {{ $t('hero.headline') }}<DotAccent />
            </h1>
            <p class="min-[980px]:w-[560px] max-[980px]:w-full leading-[150%] font-medium text-[18px] max-[980px]:text-[16px] max-[400px]:text-[15px] m-0">
                {{ $t('hero.body') }}
            </p>
            <div class="w-full flex flex-row max-[980px]:flex-col items-center justify-start gap-3 text-center text-[15px]">
                <Button
                    variant="primary"
                    size="sm"
                    icon="base:arrow"
                    class="min-[980px]:w-[200px] max-[980px]:w-full"
                    @click="navigateToContact"
                >
                    {{ $t('hero.ctaPrimary') }}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    icon="base:arrow"
                    class="min-[980px]:w-[220px] max-[980px]:w-full"
                    @click="navigateToAlpos"
                >
                    {{ $t('hero.ctaSecondary') }}
                </Button>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
