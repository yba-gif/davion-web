<script lang="ts" setup>
import { NuxtImg } from '#components'
import Button from '~/components/common/button.vue'

const router = useRouter()

function navigateToContact() {
    router.push('/contact')
}
</script>

<template>
    <section
        id="hero-section"
        class="w-full bg-azure h-[847px] relative min-[980px]:h-[700px] flex flex-col items-start justify-start py-[122px] px-24 max-[980px]:py-4 max-[980px]:px-4 box-border gap-2.5 text-left text-[88px] max-[980px]:text-[44px] text-drygray-100 font-switzer rounded-3xl overflow-hidden"
    >
        <NuxtImg
            class="min-[980px]:w-[1176px] absolute pointer-events-none top-0 max-[980px]:top-64 min-[980px]:-right-80 scale-150 max-[980px]:scale-[3]"
            src="/section_background.png"
            preload
            placeholder="/section_background_placeholder.png"
        />
        <div class="min-[980px]:w-[676px] max-[980px]:w-full flex flex-col items-start justify-end max-[980px]:h-full gap-12 z-[1]">
            <div class="flex flex-col items-start justify-start min-[980px]:h-[252px] font-degular">
                <div class="tracking-[-1px] leading-[95%] font-semibold w-[676px] max-[980px]:w-full">
                    <p class="m-0 font-degular">
                        <span class="font-degular">Defense</span>
                        <span class="text-primary font-degular">.</span>
                    </p>
                    <p class="m-0 whitespace-nowrap font-degular">
                        Intelligence
                    </p>
                    <p class="m-0 whitespace-nowrap font-degular">
                        Critical Infrastructure
                    </p>
                </div>
            </div>
            <div class="min-[980px]:w-[492px] flex items-start justify-start text-base">
                <div class="leading-[150%] font-medium">
                    Davion builds sovereign software for the institutions that cannot afford to get critical decisions wrong — from ingest to act, under your jurisdiction, your access controls, your audit trail.
                </div>
            </div>
            <div class="w-full flex flex-row max-[980px]:flex-col items-center justify-start gap-[18px] text-center text-[15px]">
                <div class="w-[230px] max-[980px]:w-full">
                    <Button
                        variant="primary"
                        size="sm"
                        icon="base:arrow"
                        class="w-[230px] max-[980px]:w-full"
                        @click="navigateToContact"
                    >
                        Request a briefing
                    </Button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
