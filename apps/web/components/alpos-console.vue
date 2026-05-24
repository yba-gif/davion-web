<script setup lang="ts">
// AlpOS Console, 3-slide product preview carousel for the home AlpOS teaser.
// Each slide tells ONE clear story in plain language:
//   1. Alert, "we found a suspicious pattern"
//   2. Pipeline, "we ingest a lot, from these sources, in real time"
//   3. Copilot, "the AI suggests this action, you approve"
import { Autoplay, Pagination } from 'swiper/modules'

const sources = [
    { name: 'Banking systems', rate: '4.2k / hr' },
    { name: 'Document archive', rate: '5.6k / hr' },
    { name: 'Market data feed', rate: '1.8k / hr' },
    { name: 'Public records', rate: '0.8k / hr' },
]

// P0.U5, pause-on-focus + aria-live. Swiper's `pauseOnMouseEnter` handles
// pointer users; this wiring handles keyboard users who Tab into the carousel.
// `aria-live="polite"` is on the root region so slide changes are announced.
function getSwiperFromEvent(e: FocusEvent) {
    const root = (e.currentTarget as HTMLElement | null)
    // The Swiper component exposes its instance via the .swiper property on
    // the root DOM element it renders.
    return (root as any)?.swiper as { autoplay?: { pause: () => void; resume: () => void } } | undefined
}
function onFocusIn(e: FocusEvent) {
    getSwiperFromEvent(e)?.autoplay?.pause?.()
}
function onFocusOut(e: FocusEvent) {
    // FocusEvent.relatedTarget tells us where focus is going. If still inside
    // the carousel, don't resume yet.
    const root = e.currentTarget as HTMLElement | null
    const next = e.relatedTarget as Node | null
    if (root && next && root.contains(next)) return
    getSwiperFromEvent(e)?.autoplay?.resume?.()
}
</script>

<template>
    <div class="bg-white rounded-2xl overflow-hidden shadow-xl ring-1 ring-drygray-200">
        <!-- Window chrome (shared) -->
        <div class="bg-whitesmoke-100 px-4 py-3 border-b border-drygray-200 flex items-center justify-between">
            <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-drygray-default/30" aria-hidden="true" />
                <span class="w-2.5 h-2.5 rounded-full bg-drygray-default/30" aria-hidden="true" />
                <span class="w-2.5 h-2.5 rounded-full bg-drygray-default/30" aria-hidden="true" />
            </div>
            <div class="text-[10px] font-mono font-semibold text-drygray-100 uppercase tracking-[0.15em]">
                AlpOS · Console
            </div>
            <div class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                <span class="text-[9px] font-mono font-semibold text-drygray-default uppercase tracking-[0.15em]">On-prem</span>
            </div>
        </div>

        <Swiper
            :modules="[Autoplay, Pagination]"
            :slides-per-view="1"
            :loop="true"
            :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }"
            :pagination="{ clickable: true, bulletClass: 'custom-bullet', bulletActiveClass: 'custom-bullet-active' }"
            class="alpos-console-swiper"
            role="region"
            aria-roledescription="carousel"
            aria-label="AlpOS console preview, three product stories: Detect, Live data, AI recommendation"
            aria-live="polite"
            @focusin="onFocusIn"
            @focusout="onFocusOut"
        >
            <!-- Slide 1: Detect, one clear alert with plain-English facts -->
            <SwiperSlide role="group" aria-roledescription="slide" aria-label="Slide 1 of 3: Detect, suspicious activity alert">
                <div class="bg-white px-5 py-5">
                    <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mb-4">
                        <span class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                            Detect
                        </span>
                        <span>1 alert</span>
                    </div>

                    <!-- The alert: big and obvious -->
                    <p class="font-degular font-bold text-drygray-100 text-[22px] leading-tight">
                        Suspicious activity detected<DotAccent />
                    </p>
                    <p class="text-[13px] text-drygray-default mt-2">
                        $2,400 transferred between 3 previously dormant accounts.
                    </p>

                    <!-- The 3 facts behind it -->
                    <ul class="mt-5 space-y-2.5">
                        <li class="flex items-start gap-3 text-[12px] text-drygray-100">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" aria-hidden="true" />
                            <span>Same person on file for all three accounts</span>
                        </li>
                        <li class="flex items-start gap-3 text-[12px] text-drygray-100">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" aria-hidden="true" />
                            <span>Accounts activated within the last 14 days</span>
                        </li>
                        <li class="flex items-start gap-3 text-[12px] text-drygray-100">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" aria-hidden="true" />
                            <span>Matches a known fraud pattern (AML-12)</span>
                        </li>
                    </ul>

                    <!-- Recommendation -->
                    <div class="border-t border-drygray-200 mt-5 pt-3 flex items-center justify-between">
                        <p class="text-[11px] text-drygray-default">Recommendation</p>
                        <p class="text-[12px] font-medium text-drygray-100">Open a case for review</p>
                    </div>
                </div>
            </SwiperSlide>

            <!-- Slide 2: Ingest, big number + sparkline + plain-English sources -->
            <SwiperSlide role="group" aria-roledescription="slide" aria-label="Slide 2 of 3: Live data, 12,400 events per hour across four sources">
                <div class="bg-white px-5 py-5">
                    <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mb-4">
                        <span class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                            Live data
                        </span>
                        <span>{{ sources.length }} sources connected</span>
                    </div>

                    <div class="flex items-end justify-between gap-6 mb-5">
                        <div>
                            <p class="font-degular font-bold text-drygray-100 text-[44px] leading-none tracking-tight">
                                12,400
                            </p>
                            <p class="text-[11px] text-drygray-default mt-2">events per hour</p>
                        </div>
                        <svg viewBox="0 0 200 60" class="w-1/2 h-12" preserveAspectRatio="none" aria-label="Throughput sparkline" role="img">
                            <g fill="rgba(96, 229, 118, 0.18)">
                                <rect x="0" y="40" width="8" height="20" />
                                <rect x="12" y="30" width="8" height="30" />
                                <rect x="24" y="35" width="8" height="25" />
                                <rect x="36" y="22" width="8" height="38" />
                                <rect x="48" y="28" width="8" height="32" />
                                <rect x="60" y="18" width="8" height="42" />
                                <rect x="72" y="25" width="8" height="35" />
                                <rect x="84" y="15" width="8" height="45" />
                                <rect x="96" y="22" width="8" height="38" />
                                <rect x="108" y="10" width="8" height="50" />
                                <rect x="120" y="20" width="8" height="40" />
                                <rect x="132" y="14" width="8" height="46" />
                                <rect x="144" y="24" width="8" height="36" />
                                <rect x="156" y="8" width="8" height="52" />
                                <rect x="168" y="16" width="8" height="44" />
                                <rect x="180" y="12" width="8" height="48" />
                            </g>
                            <rect x="192" y="6" width="8" height="54" fill="#60E576" />
                        </svg>
                    </div>

                    <div class="border-t border-drygray-200 pt-3 space-y-2.5">
                        <div v-for="s in sources" :key="s.name" class="flex items-center justify-between text-[12px]">
                            <div class="flex items-center gap-2.5">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                                <span class="text-drygray-100">{{ s.name }}</span>
                            </div>
                            <span class="text-[11px] text-drygray-default">{{ s.rate }}</span>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <!-- Slide 3: Decide, plain-English AI recommendation with citations + action -->
            <SwiperSlide role="group" aria-roledescription="slide" aria-label="Slide 3 of 3: AI recommendation, Davion copilot proposes opening a case">
                <div class="bg-white px-5 py-5">
                    <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mb-4">
                        <span class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                            AI recommendation
                        </span>
                        <span>Confidence 92%</span>
                    </div>

                    <div class="flex items-start gap-3 mb-4">
                        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <span class="text-white font-degular font-bold text-[13px]">D</span>
                        </div>
                        <div class="flex-1 min-w-0 pt-0.5">
                            <p class="text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mb-1.5">
                                Davion copilot
                            </p>
                            <p class="text-[13px] text-drygray-100 leading-relaxed">
                                I'd recommend opening a case on this person. Three suspicious transactions in 14 days match a known fraud pattern.
                            </p>
                        </div>
                    </div>

                    <div class="bg-whitesmoke-100 rounded-lg p-3 mb-5 flex items-center justify-between text-[11px]">
                        <span class="text-drygray-default">Based on</span>
                        <span class="text-drygray-100 font-medium">4 sources · 3 transactions · 1 policy match</span>
                    </div>

                    <div class="flex items-center gap-2">
                        <button type="button" class="text-[12px] font-medium px-4 py-2 bg-primary text-white rounded-lg" disabled>
                            Open case
                        </button>
                        <button type="button" class="text-[12px] font-medium px-4 py-2 bg-white border border-drygray-200 text-drygray-100 rounded-lg" disabled>
                            Dismiss
                        </button>
                        <span class="text-[10px] text-drygray-default ml-auto">Needs human approval</span>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style scoped>
.alpos-console-swiper {
    padding-bottom: 32px;
}

.alpos-console-swiper :deep(.swiper-pagination) {
    display: flex;
    justify-content: center;
    gap: 6px;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
}

.alpos-console-swiper :deep(.custom-bullet) {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background-color: rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: all 0.3s;
}

.alpos-console-swiper :deep(.custom-bullet-active) {
    width: 18px;
    background-color: #60E576;
}
</style>
