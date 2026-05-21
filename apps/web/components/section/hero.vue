<script lang="ts" setup>
// Davion hero, Variant A (clarity-first): one positioning statement, one promise,
// one primary CTA + one secondary. Replaces three stacked slogans with a single
// sentence a stranger can recite after 10 seconds. See redesign-action-plan §P0.3.
// P0.6: NuxtImg dropped here, IPX dev pipeline was shipping a broken w_2 variant
// and prod was falling back to the raw 27 MB PNG. Plain <img> + srcset wired to
// pre-processed WebP variants under /public.
import Button from '~/components/common/button.vue'

const router = useRouter()

function navigateToContact() {
    router.push('/contact')
}
function navigateToAlpos() {
    router.push('/solutions/alpos')
}
</script>

<template>
    <section
        id="hero-section"
        class="w-full bg-azure h-[847px] relative min-[980px]:h-[700px] flex flex-col items-start justify-start py-[122px] px-24 max-[980px]:py-4 max-[980px]:px-4 box-border gap-2.5 text-left text-drygray-100 font-switzer rounded-3xl overflow-hidden"
    >
        <img
            class="min-[980px]:w-[1176px] absolute pointer-events-none top-0 max-[980px]:top-64 min-[980px]:-right-80 scale-150 max-[980px]:scale-[3]"
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
        <div class="min-[980px]:w-[676px] max-[980px]:w-full flex flex-col items-start justify-end max-[980px]:h-full gap-8 z-[1]">
            <h1 class="font-degular font-semibold tracking-[-0.02em] leading-[1.02] m-0 text-[68px] max-[980px]:text-[40px] min-[980px]:w-[676px] max-[980px]:w-full">
                Sovereign AI for institutions whose data can't leave<span class="text-primary-text font-degular">.</span>
            </h1>
            <p class="min-[980px]:w-[560px] max-[980px]:w-full leading-[150%] font-medium text-[18px] max-[980px]:text-[16px] m-0">
                Davion is the platform banks, ministries, and energy operators use when decisions must be defensible, auditable, and made on data that never enters a public cloud.
            </p>
            <div class="w-full flex flex-row max-[980px]:flex-col items-center justify-start gap-3 text-center text-[15px]">
                <Button
                    variant="primary"
                    size="sm"
                    icon="base:arrow"
                    class="min-[980px]:w-[200px] max-[980px]:w-full"
                    @click="navigateToContact"
                >
                    Book a demo
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    icon="base:arrow"
                    class="min-[980px]:w-[220px] max-[980px]:w-full"
                    @click="navigateToAlpos"
                >
                    See how AlpOS works
                </Button>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
