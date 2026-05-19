
<script setup>
const router = useRouter()

function navigateToVerify() {
    router.push('/team-verify')
}
</script>

<template>
    <section
        id="cta-section"
        class="relative flex flex-col items-center justify-end w-full h-[700px] max-[1150px]:h-[803px] bg-azure rounded-3xl overflow-hidden"
    >
        <NuxtImg
            class="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[2] min-[1150px]:translate-x-64 min-[1150px]:translate-y-48"
            src="/section_background.png"
            preload
            placeholder="/section_background_placeholder.png"
        />

        <div
            class="w-full relative flex flex-col items-center gap-12 py-20 text-center backdrop-blur-[100px] max-[1150px]:px-4 bg-gradient-to-b from-[rgba(208,232,235,0.1)] to-transparent"
        >
            <Motion
                tag="h2"
                :initial="{ y: 100, opacity: 0, scale: 0.9 }"
                :animate="{ y: 0, opacity: 1, scale: 1 }"
                :transition="{ duration: 1.0, delay: 0.2, ease: 'easeOut' }"
                class="font-degular text-drygray-100 text-[88px] leading-[0.8] font-semibold tracking-[-1px]"
            >
                <Motion
                    tag="span"
                    :initial="{ x: -30, opacity: 0 }"
                    :animate="{ x: 0, opacity: 1 }"
                    :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
                    class="font-degular"
                >
                    Early<span class="text-primary">.</span>
                </Motion>
                <Motion
                    tag="span"
                    :initial="{ x: -30, opacity: 0 }"
                    :animate="{ x: 0, opacity: 1 }"
                    :transition="{ duration: 0.6, delay: 0.6, ease: 'easeOut' }"
                    class="font-degular"
                >
                    Real<span class="text-primary font-degular">.</span>
                </Motion>
                <br>
                <Motion
                    tag="span"
                    :initial="{ x: -30, opacity: 0 }"
                    :animate="{ x: 0, opacity: 1 }"
                    :transition="{ duration: 0.6, delay: 0.8, ease: 'easeOut' }"
                    class="font-degular"
                >
                    Moving<span class="text-primary font-degular">.</span>
                </Motion>
            </Motion>

            <Motion
                tag="p"
                :initial="{ y: 50, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.8, delay: 1.0, ease: 'easeOut' }"
                class="max-w-[420px] text-sm font-medium leading-[150%] text-drygray-100"
            >
                You're shipping. We're syncing. Let's talk before the next move.
            </Motion>

            <Motion
                tag="div"
                :initial="{ y: 60, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.8, delay: 1.2, ease: 'easeOut' }"
                class="flex max-[1150px]:w-full max-[1150px]:flex-col min-[1150px]:flex-wrap items-center justify-center gap-6 text-drygray-100 text-[15px]"
            >
                <!-- <Motion
                    tag="div"
                    :initial="{ scale: 0.9, opacity: 0 }"
                    :animate="{ scale: 1, opacity: 1 }"
                    :transition="{ duration: 0.6, delay: 1.4, ease: 'easeOut' }"
                    class="w-[272px] max-[1150px]:w-full"
                >
                    <CommonButton variant="primary" size="sm" icon="base:arrow" class="w-[272px] max-[1150px]:w-full">
                        Request Market Making
                    </CommonButton>
                </Motion> -->

                <Motion
                    tag="div"
                    :initial="{ scale: 0.9, opacity: 0 }"
                    :animate="{ scale: 1, opacity: 1 }"
                    :transition="{ duration: 0.6, delay: 1.6, ease: 'easeOut' }"
                    class="w-[230px] max-[1150px]:w-full"
                >
                    <CommonButton variant="outline" size="sm" icon="base:verified" class="w-[230px] max-[1150px]:w-full" @click="navigateToVerify">
                        Verify Base1 Team
                    </CommonButton>
                </Motion>

                <Motion
                    tag="div"
                    :initial="{ scale: 0.9, opacity: 0 }"
                    :animate="{ scale: 1, opacity: 1 }"
                    :transition="{ duration: 0.6, delay: 1.8, ease: 'easeOut' }"
                    class="w-[126px] max-[1150px]:w-full"
                >
                    <a href="https://calendly.com/bekalt" target="_blank" rel="noopener noreferrer" class="w-[126px] max-[1150px]:w-full">
                        <CommonButton variant="link" size="sm" class="w-[126px] max-[1150px]:w-full">
                            <div class="flex items-center gap-2">
                                Are you raising?
                                <Icon name="base:chevron-right" class="h-4" />
                            </div>
                        </CommonButton>
                    </a>
                </Motion>
            </Motion>
        </div>
    </section>
</template>
