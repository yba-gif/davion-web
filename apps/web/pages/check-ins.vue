<script setup>
import { Pagination as SwiperPagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const checkInCards = [
    {
        id: 1,
        bgColor: 'bg-azure',
        icon: 'base:happyemoji',
        title: 'We believe in showing face, not just logos',
        backgroundImage: '/section_background.png',
        imageClasses: 'left-12 top-36 absolute inset-0 w-full h-full object-cover scale-150',
    },
    {
        id: 2,
        bgColor: 'bg-aliceblue',
        icon: 'base:message-notif',
        title: 'We meet the teams we back — and the projects we work with',
        backgroundImage: '/checkins_bg1.png',
        imageClasses: 'inset-0 md:inset-unset top-36 md:left-48 md:top-42 w-full h-full absolute object-contain md:scale-150',
    },
    {
        id: 3,
        bgColor: 'bg-honeydew',
        icon: 'base:location-tick',
        title: 'Panels, roundtables, summits, side-events — we don’t miss what matters.',
        backgroundImage: '/checkins_bg2.png',
        imageClasses: 'top-36 left-0 absolute w-full h-full object-contain',
    },
]

const events = ref([
    {
        id: 1,
        title: 'Base1 x XYZ Conference',
        date: 'May 15, 2025',
        location: 'San Francisco, CA',
        daysLeft: '289 days left',
        status: 'upcoming',
        slug: '/events/base1-xyz-conference',
    },
    {
        id: 2,
        title: 'Base1 Community Meetup',
        date: 'June 20, 2025',
        location: 'New York, NY',
        daysLeft: '325 days left',
        status: 'upcoming',
        slug: '/events/base1-community-meetup',
    },
    {
        id: 3,
        title: 'Base1 Tech Workshop',
        date: 'July 10, 2025',
        location: 'Austin, TX',
        daysLeft: '345 days left',
        status: 'upcoming',
        slug: '/events/base1-tech-workshop',
    },
    {
        id: 4,
        title: 'Base1 Annual Retreat',
        date: 'March 15, 2025',
        location: 'Miami, FL',
        status: 'past',
        slug: '/events/base1-annual-retreat',
    },
])

const hostedEvents = ref([
    {
        id: 1,
        title: 'Web3 Builders Summit 2025',
        date: 'August 15-17, 2025 • 9:00 AM - 6:00 PM',
        location: 'Silicon Valley, CA',
        description: 'Join leading Web3 builders, investors, and innovators for three days of networking, workshops, and insights into the future of decentralized technology.',
        slug: '/hosted-events/web3-builders-summit-2025',
    },
    {
        id: 2,
        title: 'DeFi Innovation Workshop',
        date: 'September 10, 2025 • 2:00 PM - 8:00 PM',
        location: 'New York, NY',
        description: 'Deep dive into the latest DeFi protocols, yield farming strategies, and regulatory developments with industry experts and protocol founders.',
        slug: '/hosted-events/defi-innovation-workshop',
    },
    {
        id: 3,
        title: 'Base1 Demo Day',
        date: 'October 5, 2025 • 10:00 AM - 4:00 PM',
        location: 'Austin, TX',
        description: 'Watch our portfolio companies showcase their latest products and innovations. Network with founders, investors, and tech leaders shaping the Web3 ecosystem.',
        slug: '/hosted-events/base1-demo-day',
    },
    {
        id: 4,
        title: 'NFT Art & Culture Festival',
        date: 'November 20-22, 2025 • 11:00 AM - 7:00 PM',
        location: 'Los Angeles, CA',
        description: 'Explore the intersection of art and technology at our NFT festival. Meet artists, collectors, and creators pushing the boundaries of digital art.',
        slug: '/hosted-events/nft-art-culture-festival',
    },
])
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
                        <span class="text-drygray-100 font-degular">Web3 moves fast</span>
                        <span class="text-primary font-degular">—</span>
                        <br class="lg:hidden">
                        <span class="text-drygray-100 font-degular">but the real</span>
                    </span>
                    <br>
                    <span class="whitespace-nowrap">
                        <span class="text-drygray-100 font-degular">connections still <br class="lg:hidden"> happen
                            offline</span>
                        <span class="text-primary font-degular">.</span>
                    </span>
                </div>

                <div class="leading-[150%] font-medium text-drygray-100">
                    In Web3, identity matters. Use this page to check if the person contacting you is a verified member
                    of
                    Base1.
                </div>

                <CommonSup title="Why We Check In" />

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-2 lg:gap-2">
                    <div
                        v-for="card in checkInCards" :key="card.id"
                        class="w-full relative rounded-3xl h-[439px] p-9 flex flex-col gap-6 overflow-hidden"
                        :class="card.bgColor"
                    >
                        <Icon :name="card.icon" class="size-8" />

                        <span
                            class="z-10 relative max-w-xs text-4xl tracking-[-0.5px] leading-[100%] text-drygray-100 font-semibold"
                            :class="card.id === 3 ? 'font-degular-display-demo text-left inline-block text-gray' : 'font-degular'"
                        >

                            <span class="font-degular text-drygray-100">{{
                                card.title }}</span>
                            <span class="text-primary">.</span>
                        </span>

                        <img :src="card.backgroundImage" :class="card.imageClasses" alt="pattern">
                    </div>
                </div>
            </div>

            <div
                class="z-0 w-full flex items-center justify-start lg:justify-center max-w-full max-h-full lg:overflow-hidden lg:absolute -right-1/3 top-0 h-[250px] lg:h-[477px]"
            >
                <img
                    src="/map.svg"
                    class="z-20 drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] absolute lg:w-full max-w-full h-[170.1px] px-4 lg:px-0"
                    alt="search user"
                >
                <img class="object-cover" src="/page_section_background1.png" alt="Page section background">
            </div>
        </section>

        <section
            class="w-full relative flex flex-col lg:flex-col gap-12 rounded-3xl bg-white px-4 lg:px-24 pb-6 pt-24 lg:py-24 md:p-12 lg:p-24 box-border text-left text-sm text-drygray-200 font-switzer overflow-hidden"
        >
            <CommonSup title="Check-ins" />

            <div class="text-5xl font-degular text-drygray-100 font-semibold tracking-[-0.5px] leading-[110%]">
                Upcoming Check-ins<span class="text-primary">.</span>
            </div>

            <div
                class="relative text-drygray-100 text-sm leading-[150%] font-medium font-switzer text-gray text-left inline-block"
            >
                Sharp takes on markets, on-chain trends, and token mechanics.
            </div>

            <!-- Mobile Swiper -->
            <div class="block md:hidden">
                <Swiper
                    :slides-per-view="1.2"
                    :space-between="16"
                    :pagination="{ clickable: true }"
                    :modules="[SwiperPagination]"
                    class="events-swiper"
                >
                    <SwiperSlide
                        v-for="event in events"
                        :key="event.id"
                        class="h-auto"
                    >
                        <EventCard
                            :title="event.title"
                            :date="event.date"
                            :location="event.location"
                            :days-left="event.daysLeft"
                            :status="event.status"
                            :slug="event.slug"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

            <!-- Desktop Grid -->
            <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-2 lg:gap-2">
                <EventCard
                    v-for="event in events"
                    :key="event.id"
                    :title="event.title"
                    :date="event.date"
                    :location="event.location"
                    :days-left="event.daysLeft"
                    :status="event.status"
                    :slug="event.slug"
                />
            </div>
        </section>

        <section
            class="w-full relative flex flex-col lg:flex-col px-4 gap-12 rounded-3xl bg-white lg:px-24 pb-6 pt-24 lg:py-24 md:p-12 lg:p-24 box-border text-left text-sm text-drygray-200 font-switzer overflow-hidden"
        >
            <CommonSup title="Events" />

            <div class="text-5xl font-degular text-drygray-100 font-semibold tracking-[-0.5px] leading-[110%]">
                Base1 Hosted Events.<span class="text-primary">.</span>
            </div>

            <div
                class="relative text-drygray-100 text-sm leading-[150%] font-medium font-switzer text-gray text-left inline-block"
            >
                Events organized by our team — curated, invite-only, and built for meaningful conversations.
            </div>

            <!-- Mobile Swiper -->
            <div class="block md:hidden">
                <Swiper
                    :slides-per-view="1.2"
                    :space-between="16"
                    :pagination="{ clickable: true }"
                    :modules="[SwiperPagination]"
                    class="hosted-events-swiper"
                >
                    <SwiperSlide
                        v-for="event in hostedEvents"
                        :key="event.id"
                        class="h-auto"
                    >
                        <HostedEventCard
                            :title="event.title"
                            :date="event.date"
                            :location="event.location"
                            :description="event.description"
                            :slug="event.slug"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

            <!-- Desktop Grid -->
            <div class="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 lg:gap-2">
                <HostedEventCard
                    v-for="event in hostedEvents"
                    :key="event.id"
                    :title="event.title"
                    :date="event.date"
                    :location="event.location"
                    :description="event.description"
                    :slug="event.slug"
                />
            </div>
        </section>
    </div>
</template>

<style scoped>
:deep(.swiper-pagination) {
    position: relative !important;
    margin-top: 24px;
}

:deep(.swiper-pagination-bullet) {
    background-color: #e5e7eb;
    opacity: 1;
    width: 8px;
    height: 8px;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: #60e576;
}

.events-swiper,
.hosted-events-swiper {
    padding-bottom: 40px;
}
</style>
