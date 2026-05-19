<script setup lang="ts">
import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules'

const onChainCards = [
    {
        icon: '/metrics.svg',
        title: 'Transparency Dashboards',
        description: 'Live dashboards that surface emissions, treasury balances, unlocks, claimable flows, and LP positions. Fully on-chain, always visible — for teams, communities, and investors.',
    },
    {
        icon: '/data.svg',
        title: 'Execution Infrastructure',
        description: 'Claim logic, vesting engines, payout contracts, reward distribution, vault routing.Everything modular. Built to audit standards. Shipped fast.',
    },
    {
        icon: '/file-done.svg',
        title: 'Token Launch & GTM',
        description: 'Contract setup, unlock schedules, listing coordination, LP seeding, and exchange market making support. We manage mechanics — you focus on momentum.',
    },
    {
        icon: '/deploy.svg',
        title: 'Wallet Architecture',
        description: 'Secure multisig + smart wallet structures for founders, operations, treasury, and ecosystem use. Cross-chain, compliant, and layered by function.',
    },
    {
        icon: '/table.svg',
        title: 'Treasury Management',
        description: 'Secure multisig + smart wallet structures for founders, operations, treasury, and ecosystem use. Cross-chain, compliant, and layered by function.',
    },
    {
        icon: '/wallet.svg',
        title: 'Liquidity Optimization',
        description: 'We run LPs, bridge coverage, and cross-DEX balance logic.Custom bots, real-time triggers, and on-chain telemetry included.',
    },
    {
        icon: '/automatization.svg',
        title: 'Custom Automation',
        description: 'If it touches tokens and repeats, we can automate it. Vesting updates, balance triggers, DAO rewards, emissions, bridges — scoped and shipped.',
    },
]

const whoThisIsForItems = [
    {
        icon: 'base:favorite-chart',
        text: 'Live projects with emissions, unlocks, or ops debt',
    },
    {
        icon: 'base:sidebar-right',
        text: 'Launching protocols needing trustable infra from Day 1',
    },
    {
        icon: 'base:hierarchy-3',
        text: 'Teams running manual ops via spreadsheets and hope',
    },
    {
        icon: 'base:hashtag',
        text: 'Teams running manual ops via spreadsheets and hope',
    },
]
</script>

<template>
    <div class="w-full flex flex-col gap-2">
        <section
            id="check-ins-section"
            class="w-full relative flex flex-col-reverse lg:flex-col rounded-3xl bg-white px-0 lg:px-24 pb-6 pt-0 lg:py-24 md:p-12 lg:p-24 box-border text-left text-sm text-drygray-200 font-switzer overflow-hidden"
        >
            <div class="z-20 gap-6 md:gap-8 lg:gap-12 flex flex-col relative px-4 lg:px-0">
                <CommonSup title="Base1 IRL Check-ins" />

                <div
                    class="max-w-[621px] relative text-5xl tracking-[-0.5px] leading-[100%] font-semibold font-degular text-left inline-block text-gray"
                >
                    <span class="whitespace-nowrap">
                        <span class="text-drygray-100 font-degular">Web3 projects don</span>
                        <span class="text-primary">’</span>
                        <br class="lg:hidden">
                        <span class="text-drygray-100 font-degular">t fail on hype</span>
                    </span>
                    <br>
                    <span class="whitespace-nowrap">
                        <span class="text-primary">—</span>
                        <span class="text-drygray-100 font-degular">they fail on ops</span>
                        <span class="text-primary">.</span>
                    </span>
                </div>

                <div class="leading-[150%] font-medium text-drygray-100">
                    Base1 builds and manages the infrastructure that keeps your token economy <br> running —
                    transparently,
                    efficiently, and on-chain.
                </div>

                <div class="w-full">
                    <CommonButton
                        variant="primary" class="w-auto text-drygray-100 px-6" icon="base:arrow"
                        to="/on-chain"
                    >
                        Request On-Chain Support
                    </CommonButton>
                </div>

                <CommonSup title="What We Do" />

                <div
                    class="grid grid-cols-1 md:grid-cols-2 gap-1 md:[&>*:last-child]:col-span-2 [&>*]:h-[436px] md:[&>*:last-child]:h-[260px] w-full"
                >
                    <div
                        v-for="(card, index) in onChainCards" :key="index"
                        class="overflow-hidden pb-32 px-10 md:data-last:pt-0 md:data-last:pb-0 pt-24 w-full relative bg-white shadow-[0px_9px_80px_rgba(0,_0,_0,_0.07),_0px_1.1269396543502808px_10.02px_rgba(0,_0,_0,_0.04)] rounded-xl h-[436px]"
                        :data-last="index === onChainCards.length - 1 ? 'true' : 'false'"
                    >
                        <img
                            src="/card_background.png"
                            class="absolute top-0 left-36 w-full h-full object-cover rounded-xl" alt="On-chain support"
                        >
                        <img
                            src="/card_background.png"
                            class="hidden md:parent-data-last:block md:parent-data-last:-left-56 absolute top-0 left-0 w-full h-full object-cover rounded-xl -scale-x-100"
                            alt="On-chain support"
                        >
                        <img
                            :src="card.icon"
                            class="absolute -right-24 size-48 object-contain md:parent-data-last:hidden"
                            alt="On-chain icon"
                        >
                        <div
                            class="relative flex flex-col md:parent-data-last:h-full md:parent-data-last:flex-row md:parent-data-last:w-full md:parent-data-last:justify-between md:parent-data-last:items-center gap-12"
                        >
                            <div
                                class="max-w-[230px] text-4xl tracking-[-0.5px] leading-[100%] font-semibold font-degular text-left inline-block"
                            >
                                <span class="text-drygray-100 font-degular">{{ card.title }}</span>
                                <span class="text-primary font-degular">.</span>
                            </div>

                            <img
                                :src="card.icon" class="object-contain md:parent-data-last:block hidden"
                                alt="On-chain icon"
                            >

                            <div
                                class="text-drygray-100 max-w-[245px] relative text-base leading-[150%] font-medium font-switzer text-gray text-left inline-block"
                            >
                                {{ card.description }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="z-0 w-full flex items-center justify-start lg:justify-center max-w-full max-h-full lg:overflow-hidden lg:absolute -right-1/3 top-0 h-[250px] lg:h-[477px]"
            >
                <img
                    src="/discover.svg"
                    class="z-20 drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] absolute lg:w-full max-w-full h-[170.1px] px-4 lg:px-0"
                    alt="search user"
                >
                <img
                    class="object-contain translate-x-12" src="/page_section_background2.png"
                    alt="Page section background"
                >
            </div>
        </section>

        <!-- <section
            class="w-full relative flex flex-col-reverse lg:flex-col rounded-3xl bg-white px-0 lg:px-24 pb-6 py-24 md:p-12 lg:p-24 box-border text-left text-sm text-drygray-200 font-switzer overflow-hidden"
        >
            <div class="z-20 gap-6 md:gap-8 lg:gap-12 flex flex-col md:items-center relative px-4 lg:px-0 px-42">
                <CommonSup title="Features" />

                <div
                    class="md:w-[562px] relative text-5xl tracking-[-0.5px] leading-[100%] font-semibold text-left inline-block text-drygray-100"
                >
                    <span class="font-degular">Why Projects Work With Base1</span>
                    <span class="text-primary font-degular">.</span>
                </div>

                <div class="w-full flex gap-8 items-center">
                    <div class="absolute -left-12">
                        <div class="custom-pagination flex flex-col gap-1 items-center" />
                    </div>
                    <div class="w-full overflow-hidden">
                        <Swiper
                            :modules="[SwiperAutoplay, SwiperPagination]" :slides-per-view="1" :space-between="0"
                            direction="vertical" :pagination="{
                                clickable: true,
                                el: '.custom-pagination',
                                bulletClass: 'custom-bullet',
                                bulletActiveClass: 'custom-bullet-active',
                            }" :autoplay="{ delay: 5000, disableOnInteraction: false }"
                            class="mySwiper flex-1 h-[293px]"
                        >
                            <SwiperSlide class="shadow-md overflow-hidden rounded-xl">
                                <div
                                    class="w-full flex flex-col justify-between relative bg-drygray-100 h-[293px] p-8 overflow-hidden shadow-xl"
                                >
                                    <Icon name="base:chart-square" class="size-9 !stroke-white" />
                                    <div
                                        class="w-44 relative text-xl tracking-[-0.4px] leading-[100%] font-semibold font-switzer-variable text-left inline-block text-gray"
                                    >
                                        <span class="text-whitesmoke-100">Built by operators — not advisors</span>
                                        <span class="text-primary">.</span>
                                    </div>

                                    <div class="absolute inset-y-0 w-2/3 right-0">
                                        <div
                                            class="absolute inset-y-0 w-56 bg-gradient-to-l from-transparent to-drygray-100"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1753549724481-d146eaa3f0f0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            class="h-full w-full object-cover"
                                        >
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div
                                    class="w-full flex flex-col justify-between relative rounded-xl bg-drygray-100 h-[293px] p-8 overflow-hidden shadow-xl"
                                >
                                    <Icon name="base:chart-square" class="size-9 stroke-white" />
                                    <div
                                        class="w-44 relative text-xl tracking-[-0.4px] leading-[100%] font-semibold font-switzer-variable text-left inline-block text-gray"
                                    >
                                        <span class="text-whitesmoke-100">Built by operators — not advisors</span>
                                        <span class="text-primary">.</span>
                                    </div>

                                    <div class="absolute inset-y-0 w-2/3 right-0">
                                        <div
                                            class="absolute inset-y-0 w-56 bg-gradient-to-l from-transparent to-drygray-100"
                                        />
                                        <img
                                            src="https://images.unsplash.com/photo-1753549724481-d146eaa3f0f0?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            class="h-full w-full object-cover"
                                        >
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section> -->

        <section
            id="who-this-is-for-section"
            class="relative flex flex-col gap-24 px-4 py-24 md:px-24 md:py-24 w-full md:h-[650px] bg-drygray-100 rounded-3xl overflow-hidden"
        >
            <CommonSup title="Who This Is For" class="text-white" />

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-20">
                <div v-for="(item, index) in whoThisIsForItems" :key="index" class="flex flex-col gap-20">
                    <Icon :name="item.icon" class="size-16" />
                    <div class="w-[173px] relative text-4xl tracking-[-0.5px] leading-[100%] font-semibold">
                        <span class="font-degular">{{ item.text }}</span>
                        <span class="text-primary font-degular">.</span>
                    </div>
                </div>
            </div>
        </section>

        <section
            id="cta-section"
            class="relative flex flex-col items-center justify-end w-full h-[700px] max-[1150px]:h-[803px] bg-azure rounded-3xl overflow-hidden"
        >
            <NuxtImg
                class="absolute inset-0 w-full h-full object-cover pointer-events-none" src="/cta_bg1.png" preload
                placeholder="/cta_bg1.png"
            />

            <div
                class="w-full relative flex flex-col items-center gap-12 py-20 text-center backdrop-blur-[100px] max-[1150px]:px-4 bg-gradient-to-b from-[rgba(208,232,235,0.1)] to-transparent"
            >
                <Motion
                    tag="h2" :initial="{ y: 100, opacity: 0, scale: 0.9 }" :animate="{ y: 0, opacity: 1, scale: 1 }"
                    :transition="{ duration: 1.0, delay: 0.2, ease: 'easeOut' }"
                    class="font-degular text-drygray-100 text-[88px] leading-[0.8] font-semibold tracking-[-1px]"
                >
                    <Motion
                        tag="span" :initial="{ x: -30, opacity: 0 }" :animate="{ x: 0, opacity: 1 }"
                        :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }" class="font-degular"
                    >
                        Ready to Fix Ops?
                    </Motion>
                </Motion>

                <Motion
                    tag="p" :initial="{ y: 50, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                    :transition="{ duration: 0.8, delay: 1.0, ease: 'easeOut' }"
                    class="max-w-[420px] text-sm font-medium leading-[150%] text-drygray-100"
                >
                    If your project is already live or about to launch — don’t scale broken infra. Let’s get your token
                    engine running clean.
                </Motion>

                <Motion
                    tag="div" :initial="{ y: 60, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                    :transition="{ duration: 0.8, delay: 1.2, ease: 'easeOut' }"
                    class="flex max-[1150px]:w-full max-[1150px]:flex-col min-[1150px]:flex-wrap items-center justify-center gap-6 text-drygray-100 text-[15px]"
                >
                    <Motion
                        tag="div" :initial="{ scale: 0.9, opacity: 0 }" :animate="{ scale: 1, opacity: 1 }"
                        :transition="{ duration: 0.6, delay: 1.4, ease: 'easeOut' }"
                        class="w-[272px] max-[1150px]:w-full"
                    >
                        <CommonButton
                            variant="primary" size="sm" icon="base:arrow"
                            class="w-[272px] max-[1150px]:w-full"
                        >
                            Request Market Making
                        </CommonButton>
                    </Motion>
                </Motion>
            </div>
        </section>
    </div>
</template>
