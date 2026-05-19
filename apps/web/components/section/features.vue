<script setup lang="ts">
import { CommonSup } from '#components'

const { isVisible } = useScrollAnimation('#features-section')
</script>

<template>
    <section id="features-section" class="w-full relative rounded-3xl bg-white p-24 max-[1250px]:px-4 box-border text-left text-sm text-drygray-200 font-switzer gap-12 flex flex-col">
        <Motion
            tag="div"
            :initial="{ y: 50, opacity: 0, filter: 'blur(6px)' }"
            :animate="isVisible ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: 50, opacity: 0, filter: 'blur(6px)' }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
            <CommonSup title="What We Do" />
        </Motion>

        <Motion
            tag="div"
            :initial="{ y: 80, opacity: 0, filter: 'blur(8px)' }"
            :animate="isVisible ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: 80, opacity: 0, filter: 'blur(8px)' }"
            :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
            class="w-full flex max-[1250px]:flex-col gap-2"
        >
            <Motion
                tag="div"
                :initial="{ y: 60, opacity: 0, scale: 0.95, filter: 'blur(6px)' }"
                :animate="isVisible ? { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' } : { y: 60, opacity: 0, scale: 0.95, filter: 'blur(6px)' }"
                :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
                :while-hover="{ y: -5, scale: 1.02 }"
            >
                <FeatureCard
                    title="Incubation"
                    description="Product shaping, token design, GTM strategy, growth modeling, intro to exchanges, infrastructure providers, and KOLs."
                    icon="base:arrow-group"
                />
            </Motion>
            <Motion
                tag="div"
                :initial="{ y: 60, opacity: 0, scale: 0.95, filter: 'blur(6px)' }"
                :animate="isVisible ? { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' } : { y: 60, opacity: 0, scale: 0.95, filter: 'blur(6px)' }"
                :transition="{ duration: 0.6, delay: 0.6, ease: 'easeOut' }"
                :while-hover="{ y: -5, scale: 1.02 }"
            >
                <FeatureCard
                    title="Capital Deployment"
                    description="We back early and move fast. Direct allocations, long-term aligned."
                    icon="base:chart-2"
                />
            </Motion>
            <Motion
                tag="div"
                :initial="{ y: 60, opacity: 0, scale: 0.95, filter: 'blur(6px)' }"
                :animate="isVisible ? { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' } : { y: 60, opacity: 0, scale: 0.95, filter: 'blur(6px)' }"
                :transition="{ duration: 0.6, delay: 0.8, ease: 'easeOut' }"
                :while-hover="{ y: -5, scale: 1.02 }"
            >
                <FeatureCard
                    title="On-Chain Ops"
                    description="Helping founders launch safely through strong tokenomics, emissions, and TGE planning."
                    icon="base:more-2"
                    href="/on-chain"
                />
            </Motion>
        </Motion>

        <!-- <Motion
            tag="div"
            :initial="{ y: 40, opacity: 0, filter: 'blur(4px)' }"
            :animate="isVisible ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: 40, opacity: 0, filter: 'blur(4px)' }"
            :transition="{ duration: 0.6, delay: 1.0, ease: 'easeOut' }"
        >
            <CommonMore title="Request Market Making" href="/what-we-do" />
        </Motion> -->
    </section>
</template>
