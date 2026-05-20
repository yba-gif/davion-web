<script lang="ts" setup>
import { NuxtImg } from '#components'
import Button from '~/components/common/button.vue'
import { useLenis } from '~/composables/useLenis'

const { scrollTo } = useLenis()
const router = useRouter()

const isVisible = ref(false)

onMounted(() => {
    setTimeout(() => {
        isVisible.value = true
    }, 200)
})

function scrollToFeatures() {
    const featuresSection = document.querySelector('#features-section') as HTMLElement
    if (featuresSection) {
        scrollTo(featuresSection, {
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        })
    }
}

function navigateToContact() {
    router.push('/contact')
}
</script>

<template>
    <section id="hero-section" class="w-full bg-azure h-[847px] relative min-[980px]:h-[700px] flex flex-col items-start justify-start py-[122px] px-24 max-[980px]:py-4 max-[980px]:px-4 box-border gap-2.5 text-left text-[88px] max-[980px]:text-[44px] text-drygray-100 font-switzer rounded-3xl overflow-hidden">
        <NuxtImg class="min-[980px]:w-[1176px] absolute pointer-events-none top-0 max-[980px]:top-64 min-[980px]:-right-80 scale-150 max-[980px]:scale-[3]" src="/section_background.png" preload placeholder="/section_background_placeholder.png" />
        <div class="min-[980px]:w-[676px] max-[980px]:w-full flex flex-col items-start justify-end max-[980px]:h-full gap-12 z-[1]">
            <Motion
                tag="div"
                :initial="{ y: 100, opacity: 0, filter: 'blur(10px)' }"
                :animate="isVisible ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: 100, opacity: 0, filter: 'blur(10px)' }"
                :transition="{ duration: 1.0, delay: 0.2, ease: 'easeOut' }"
                class="flex flex-col items-start justify-start min-[980px]:h-[252px] font-degular"
            >
                <div class="tracking-[-1px] leading-[95%] font-semibold w-[676px]">
                    <Motion
                        tag="p"
                        :initial="{ x: -50, opacity: 0, filter: 'blur(8px)' }"
                        :animate="isVisible ? { x: 0, opacity: 1, filter: 'blur(0px)' } : { x: -50, opacity: 0, filter: 'blur(8px)' }"
                        :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }"
                        class="m-0"
                    >
                        <span class="font-degular">Defense</span>
                        <span class="text-primary font-degular">.</span>
                    </Motion>
                    <Motion
                        tag="p"
                        :initial="{ x: -50, opacity: 0, filter: 'blur(8px)' }"
                        :animate="isVisible ? { x: 0, opacity: 1, filter: 'blur(0px)' } : { x: -50, opacity: 0, filter: 'blur(8px)' }"
                        :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
                        class="m-0 whitespace-nowrap font-degular"
                    >
                        Intelligence
                    </Motion>
                    <Motion
                        tag="p"
                        :initial="{ x: -50, opacity: 0, filter: 'blur(8px)' }"
                        :animate="isVisible ? { x: 0, opacity: 1, filter: 'blur(0px)' } : { x: -50, opacity: 0, filter: 'blur(8px)' }"
                        :transition="{ duration: 0.8, delay: 0.8, ease: 'easeOut' }"
                        class="m-0 whitespace-nowrap font-degular"
                    >
                        Critical Infrastructure
                    </Motion>
                </div>
            </Motion>
            <Motion
                tag="div"
                :initial="{ y: 50, opacity: 0, filter: 'blur(6px)' }"
                :animate="isVisible ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: 50, opacity: 0, filter: 'blur(6px)' }"
                :transition="{ duration: 0.8, delay: 1.0, ease: 'easeOut' }"
                class="min-[980px]:w-[492px] flex items-start justify-start h-12 text-base"
            >
                <div class="leading-[150%] font-medium">
                    Davion builds sovereign software for the institutions that cannot afford to get critical decisions wrong — from ingest to act, under your jurisdiction, your access controls, your audit trail.
                </div>
            </Motion>
            <Motion
                tag="div"
                :initial="{ y: 50, opacity: 0, filter: 'blur(6px)' }"
                :animate="isVisible ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: 50, opacity: 0, filter: 'blur(6px)' }"
                :transition="{ duration: 0.8, delay: 1.2, ease: 'easeOut' }"
                class="w-full flex flex-row max-[980px]:flex-col items-center justify-start gap-[18px] text-center text-[15px]"
            >
                <!-- <Motion
                    tag="div"
                    :initial="{ scale: 0.9, opacity: 0, filter: 'blur(4px)' }"
                    :animate="isVisible ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : { scale: 0.9, opacity: 0, filter: 'blur(4px)' }"
                    :transition="{ duration: 0.6, delay: 1.4, ease: 'easeOut' }"
                    class="w-[272px] max-[980px]:w-full"
                >
                    <Button
                        variant="primary"
                        size="sm"
                        icon="base:arrow"
                        class="w-[272px] max-[980px]:w-full"
                        @click="scrollToFeatures"
                    >
                        Our Solutions
                    </Button>
                </Motion> -->
                <Motion
                    tag="div"
                    :initial="{ scale: 0.9, opacity: 0, filter: 'blur(4px)' }"
                    :animate="isVisible ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : { scale: 0.9, opacity: 0, filter: 'blur(4px)' }"
                    :transition="{ duration: 0.6, delay: 1.6, ease: 'easeOut' }"
                    class="w-[230px] max-[980px]:w-full"
                >
                    <Button
                        variant="primary"
                        size="sm"
                        icon="base:arrow"
                        class="w-[230px] max-[980px]:w-full"
                        @click="navigateToContact"
                    >
                        Request a briefing
                    </Button>
                </Motion>
            </Motion>
        </div>
    </section>
</template>

<style scoped>

</style>
