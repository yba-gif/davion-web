<template>
    <section
        id="reference-section"
        class="w-full flex max-[950px]:flex-col gap-12 relative rounded-3xl bg-black min-[950px]:h-[522px] items-start justify-center p-24 max-[950px]:px-4 box-border text-left text-[15px] text-gray font-switzer"
    >
        <Motion
            tag="div"
            :initial="{ x: -80, opacity: 0, filter: 'blur(8px)' }"
            :animate="{ x: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.8, ease: 'easeOut' }"
            class="w-[345px] flex flex-shrink-0 flex-col items-start justify-start gap-10"
        >
            <Motion
                tag="div"
                :initial="{ y: 30, opacity: 0, filter: 'blur(4px)' }"
                :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
                :transition="{ duration: 0.6, delay: 0.2, ease: 'easeOut' }"
            >
                <CommonSup title="Reference Portfolio" class="text-white" />
            </Motion>
            <Motion
                tag="div"
                :initial="{ y: 50, opacity: 0, filter: 'blur(6px)' }"
                :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
                :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }"
                class="relative text-5xl max-[950px]:text-4xl tracking-[-0.5px] leading-[100%] font-semibold font-degular-display-demo inline-block"
            >
                <span class="font-degular">Projects We've Invested In</span>
                <span class="text-primary">.</span>
            </Motion>
            <Motion
                tag="div"
                :initial="{ y: 30, opacity: 0, filter: 'blur(4px)' }"
                :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
                :transition="{ duration: 0.6, delay: 0.6, ease: 'easeOut' }"
                class="self-stretch relative text-sm leading-[150%] font-medium"
            >
                A few of the ecosystems and tokens we've actively supported — across Infrastucture, DeFi and Gaming.
            </Motion>
        </Motion>

        <Motion
            tag="div"
            :initial="{ x: 80, opacity: 0, filter: 'blur(8px)' }"
            :animate="{ x: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }"
            class="relative gap-2 overflow-hidden w-full h-full flex flex-col items-center justify-center"
        >
            <div
                class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"
            />
            <div
                class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"
            />

            <Motion
                tag="div"
                :initial="{ y: 40, opacity: 0, filter: 'blur(5px)' }"
                :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
                :transition="{ duration: 0.6, delay: 0.8, ease: 'easeOut' }"
                class="w-full"
            >
                <Vue3Marquee :duration="10" clone :pause-on-hover="true">
                    <ReferenceCard title="OpenPayd" src="/references/openpayd.png" :grayscale="true" :invert="true" />
                    <ReferenceCard title="Köpek Meme" src="/references/bnbcoin.png" />
                    <ReferenceCard title="HTX Exchange" src="/references/htx.svg" />
                    <ReferenceCard title="Keeta" src="/references/keeta.svg" />
                    <ReferenceCard title="Khorus" src="/references/khorus.svg" />
                    <ReferenceCard title="Umbra Privacy" src="/references/umbraprivacy.svg" />
                    <ReferenceCard title="Hedera" src="/references/hedera.svg" />
                </Vue3Marquee>
            </Motion>

            <Motion
                tag="div"
                :initial="{ y: 40, opacity: 0, filter: 'blur(5px)' }"
                :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
                :transition="{ duration: 0.6, delay: 1.0, ease: 'easeOut' }"
                class="w-full"
            >
                <Vue3Marquee :duration="10" clone :pause-on-hover="true" direction="reverse">
                    <ReferenceCard title="Opendesci DeSci" src="/references/opendesci.svg" />
                    <ReferenceCard title="Phantom Clash" src="/references/pc.svg" />
                    <ReferenceCard title="375.ai" src="/references/375ai.svg" />
                    <ReferenceCard title="Euler Finance" src="/references/euler.svg" />
                    <ReferenceCard title="Hygh" src="/references/hygh.svg" />
                </Vue3Marquee>
            </Motion>
        </Motion>
    </section>
</template>

