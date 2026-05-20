<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules'

interface EventCard {
    id: string | number
    title: string
    date: string
    location: string
    daysLeft?: number
    status: 'upcoming' | 'past'
    slug: string
    registrationUrl?: string | null
}

const activeTab = ref('upcoming')

const tabs = [
    { id: 'upcoming', label: 'Up-coming' },
    { id: 'past', label: 'Past Events' },
]

const {
    loading,
    getUpcomingEvents,
    getPastEvents,
    formatEventDate,
    calculateDaysLeft,
} = useEvents()

const upcomingEvents = ref<EventCard[]>([])
const pastEvents = ref<EventCard[]>([])

async function loadUpcomingEvents() {
    const events = await getUpcomingEvents(6)
    upcomingEvents.value = events.map((event) => {
        const daysLeftResult = calculateDaysLeft(event.eventDate)
        return {
            id: event.id,
            title: event.title,
            date: formatEventDate(event.eventDate),
            location: event.location || 'TBA',
            daysLeft: typeof daysLeftResult === 'number' ? daysLeftResult : undefined,
            status: 'upcoming' as const,
            slug: `/events/${event.slug}`,
            registrationUrl: event.registrationUrl,
        }
    })
}

async function loadPastEvents() {
    const events = await getPastEvents(6)
    pastEvents.value = events.map(event => ({
        id: event.id,
        title: event.title,
        date: formatEventDate(event.eventDate),
        location: event.location || 'TBA',
        daysLeft: undefined,
        status: 'past' as const,
        slug: `/events/${event.slug}`,
        registrationUrl: event.registrationUrl,
    }))
}

onMounted(async () => {
    try {
        activeTab.value = 'upcoming'
        await loadUpcomingEvents()

        await loadPastEvents()
    }
    catch (err) {
        console.error('Failed to load events:', err)
    }
})

watch(activeTab, async (newTab) => {
    if (newTab === 'upcoming' && upcomingEvents.value.length === 0) {
        await loadUpcomingEvents()
    }
    else if (newTab === 'past' && pastEvents.value.length === 0) {
        await loadPastEvents()
    }
})

const currentEvents = computed(() => {
    return activeTab.value === 'upcoming' ? upcomingEvents.value : pastEvents.value
})

const showLoading = computed(() => loading.value && currentEvents.value.length === 0)
const carousel = ref<any>(null)

const windowWidth = ref(0)

const slidesPerView = computed(() => {
    if (windowWidth.value >= 1024)
        return 3
    if (windowWidth.value >= 768)
        return 2
    return 1
})

const breakpoints = {
    320: {
        slidesPerView: 1,
        spaceBetween: 16,
    },
    768: {
        slidesPerView: 2,
        spaceBetween: 16,
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 16,
    },
}

function nextSlide() {
    if (carousel.value?.swiper) {
        carousel.value.swiper.slideNext()
    } else {
        console.warn('Swiper instance not available')
    }
}

function updateWindowWidth() {
    windowWidth.value = window.innerWidth
}

onMounted(() => {
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
    <section
        id="irl-section"
        class="w-full relative rounded-3xl bg-white px-4 py-6 md:p-12 lg:p-24 box-border text-left text-sm text-drygray-200 font-switzer gap-6 md:gap-8 lg:gap-12 flex flex-col overflow-hidden"
    >
        <NuxtImg
            class="w-full max-w-full overflow-hidden h-[375px] absolute -right-96 -top-24" src="/earth.svg"
            preload
        />
        <Motion
            tag="div"
            :initial="{ y: 50, opacity: 0, filter: 'blur(6px)' }"
            :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
            <CommonSup title="IRL Check-ins" />
        </Motion>

        <Motion
            tag="div"
            :initial="{ y: 80, opacity: 0, filter: 'blur(8px)' }"
            :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
            class="text-2xl md:text-4xl lg:text-5xl font-degular text-drygray-100 font-semibold tracking-[-0.5px] leading-[110%]"
        >
            We Don't Just Sit Behind Dashboards<span class="text-primary-text">.</span>
        </Motion>

        <Motion
            tag="div"
            :initial="{ y: 40, opacity: 0, filter: 'blur(4px)' }"
            :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
        >
            <CommonTabs v-model="activeTab" :tabs="tabs" />
        </Motion>

        <Motion
            tag="div"
            :initial="{ y: 60, opacity: 0, filter: 'blur(6px)' }"
            :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
            class="w-full flex items-center gap-3 lg:gap-6"
            v-if="!showLoading && currentEvents.length > 0"
            >
            <div class="flex-1 min-w-0">
                <Swiper
                    ref="carousel"
                    :modules="[Navigation, Pagination]"
                    :slides-per-view="slidesPerView"
                    :space-between="16"
                    :breakpoints="breakpoints"
                    :navigation="{
                        nextEl: '.custom-next-button',
                        prevEl: '.custom-prev-button',
                    }"
                    :pagination="{
                        clickable: true,
                        el: '.swiper-pagination',
                        dynamicBullets: false,
                    }"
                    class="events-carousel"
                >

                    <!-- Events -->
                    <SwiperSlide
                        v-for="(event, index) in currentEvents"
                        :key="event?.id || index"
                    >
                        <Motion
                            tag="div"
                            :initial="{ scale: 0.8, opacity: 0, filter: 'blur(4px)' }"
                            :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
                            :transition="{ duration: 0.5, delay: 0.8 + (index * 0.1), ease: 'easeOut' }"
                            class="carousel-slide"
                        >
                            <EventCard
                                :title="event.title" :date="event.date" :location="event.location"
                                :days-left="event.daysLeft?.toString()" :status="event.status" :slug="event.slug"
                                :registration-url="event.registrationUrl"
                            />
                        </Motion>
                    </SwiperSlide>
                </Swiper>

                <div class="swiper-pagination lg:hidden mt-4" />
            </div>

            <div class="flex items-center justify-center">
                <Motion
                    tag="button"
                    :initial="{ x: 50, opacity: 0, filter: 'blur(4px)' }"
                    :animate="{ x: 0, opacity: 1, filter: 'blur(0px)' }"
                    :transition="{ duration: 0.6, delay: 1.0, ease: 'easeOut' }"
                    class="custom-next-button hidden lg:flex z-10 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    @click="nextSlide"
                >
                    <Icon name="base:chevron-right-line" class="size-12 text-drygray-100 hover:text-drygray-50 transition-colors" />
                </Motion>
            </div>
        </Motion>

        <!-- <Motion
            tag="div"
            :initial="{ y: 40, opacity: 0, filter: 'blur(4px)' }"
            :animate="{ y: 0, opacity: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.6, delay: 1.2, ease: 'easeOut' }"
        >
            <CommonMore title="See All Events" href="/events" class="mt-8" />
        </Motion> -->
    </section>
</template>

<style scoped lang="scss">
.events-carousel {
    position: relative;
    width: 100%;
    min-height: 300px;
}

.events-carousel :deep(.swiper-wrapper) {
    align-items: stretch;
}

.events-carousel :deep(.swiper-slide) {
    height: auto;
    display: flex;
}

.carousel-slide {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.carousel-slide > * {
    width: 100%;
    height: 100%;
    flex: 1;
}

/* Swiper pagination styles */
:deep(.swiper-pagination) {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    position: static;
}

:deep(.swiper-pagination-bullet) {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgb(209 213 219);
    opacity: 1;
    transition: all 300ms;
    margin: 0 2px;

    @media (min-width: 768px) {
        width: 8px;
        height: 8px;
        margin: 0 4px;
    }

    &:hover {
        background-color: #3B82F6;
    }
}

:deep(.swiper-pagination-bullet-active) {
    background-color: #3B82F6;
}

/* Hide pagination on desktop */
@media (min-width: 1024px) {
    .swiper-pagination {
        display: none !important;
    }
}

/* Custom navigation button styles */
.custom-next-button {
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);

        :deep(.icon) {
            color: #374151;
        }
    }

    &:active {
        transform: scale(0.95);
    }
}
</style>
