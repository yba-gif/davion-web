<script setup lang="ts">
// AlpOS Console — a 3-slide product preview carousel for the home AlpOS teaser.
// Each slide is a fake product window showing a different layer of AlpOS in action:
// Ontology investigation -> Ingest pipeline -> Decide / agentic copilot.
import { Autoplay, Pagination } from 'swiper/modules'

const slides = [
    { label: 'Ontology · Investigation', meta: '14 entities · 9 events' },
    { label: 'Ingest · Pipeline', meta: '8 connectors · live' },
    { label: 'Decide · Copilot', meta: 'recommendation' },
]
</script>

<template>
    <div class="bg-white rounded-2xl overflow-hidden shadow-xl ring-1 ring-drygray-200">
        <!-- Window chrome (shared across all slides for continuity) -->
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
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :pagination="{ clickable: true, bulletClass: 'custom-bullet', bulletActiveClass: 'custom-bullet-active' }"
            class="alpos-console-swiper"
        >
            <!-- Slide 1: Ontology · Investigation -->
            <SwiperSlide>
                <div class="bg-white px-5 py-4">
                    <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mb-3">
                        <span>{{ slides[0].label }}</span>
                        <span>{{ slides[0].meta }}</span>
                    </div>
                    <svg viewBox="0 0 380 220" class="w-full h-auto" role="img" aria-label="AlpOS ontology graph snapshot — flagged entity linked to a transaction across two companies and an account.">
                        <defs>
                            <pattern id="alpos-grid-1" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.04)" stroke-width="1" />
                            </pattern>
                        </defs>
                        <rect width="380" height="220" fill="url(#alpos-grid-1)" />
                        <g stroke="rgba(0,0,0,0.12)" stroke-width="1" fill="none">
                            <path d="M 70 50 L 180 100" />
                            <path d="M 70 50 L 70 130" />
                            <path d="M 70 130 L 180 100" />
                            <path d="M 180 100 L 290 170" />
                            <path d="M 290 170 L 340 100" />
                            <path d="M 290 50 L 340 100" />
                        </g>
                        <path d="M 180 100 L 290 50" stroke="#60E576" stroke-width="2" fill="none" stroke-dasharray="4 3">
                            <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.4s" repeatCount="indefinite" />
                        </path>
                        <circle cx="290" cy="50" r="22" fill="none" stroke="#60E576" stroke-width="1.5" opacity="0.5">
                            <animate attributeName="r" from="22" to="38" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <g font-family="'Switzer', sans-serif">
                            <circle cx="70" cy="50" r="18" fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
                            <text x="70" y="54" text-anchor="middle" font-size="10" font-weight="700" fill="#212121">A</text>
                            <text x="70" y="80" text-anchor="middle" font-size="9" font-weight="500" fill="#979797">Acme Corp</text>
                            <circle cx="70" cy="130" r="16" fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
                            <text x="70" y="134" text-anchor="middle" font-size="10" font-weight="700" fill="#212121">B</text>
                            <text x="70" y="158" text-anchor="middle" font-size="9" font-weight="500" fill="#979797">Beta Hold.</text>
                            <rect x="158" y="84" width="44" height="32" rx="6" fill="#212121" />
                            <text x="180" y="104" text-anchor="middle" font-size="11" font-weight="700" fill="#FFFFFF">TX</text>
                            <text x="180" y="134" text-anchor="middle" font-size="9" font-weight="500" fill="#979797">$ 2,400</text>
                            <circle cx="290" cy="50" r="20" fill="#60E576" />
                            <text x="290" y="54" text-anchor="middle" font-size="11" font-weight="700" fill="#FFFFFF">P</text>
                            <text x="290" y="82" text-anchor="middle" font-size="9" font-weight="600" fill="#212121">Person · flagged</text>
                            <circle cx="290" cy="170" r="16" fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
                            <text x="290" y="174" text-anchor="middle" font-size="11" font-weight="700" fill="#212121">$</text>
                            <text x="290" y="196" text-anchor="middle" font-size="9" font-weight="500" fill="#979797">Account</text>
                            <circle cx="340" cy="100" r="10" fill="#FFFFFF" stroke="rgba(0,0,0,0.15)" stroke-width="1" stroke-dasharray="2 2" />
                        </g>
                    </svg>
                    <div class="border-t border-drygray-200 mt-3 pt-3 flex items-start gap-2.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                        <p class="text-[12px] font-medium text-drygray-100 leading-snug">
                            Anomaly · Entity <span class="font-mono">P</span> linked to 3 dormant accounts in 14 days. Recommend case open.
                        </p>
                    </div>
                </div>
            </SwiperSlide>

            <!-- Slide 2: Ingest · Pipeline -->
            <SwiperSlide>
                <div class="bg-white px-5 py-4">
                    <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mb-3">
                        <span>{{ slides[1].label }}</span>
                        <span>{{ slides[1].meta }}</span>
                    </div>

                    <!-- Big number + sparkline -->
                    <div class="flex items-end justify-between gap-6 mb-4">
                        <div>
                            <p class="font-degular font-bold text-drygray-100 text-[44px] leading-none tracking-tight">
                                12,400
                            </p>
                            <p class="text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mt-2">
                                events / hr
                            </p>
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
                                <rect x="192" y="6" width="8" height="54" />
                            </g>
                            <!-- Last bar highlighted -->
                            <rect x="192" y="6" width="8" height="54" fill="#60E576" />
                        </svg>
                    </div>

                    <!-- Connector list -->
                    <div class="border-t border-drygray-200 pt-3 space-y-2">
                        <div v-for="c in [
                            { name: 'SAP · ERP', state: 'live', rate: '4.2k/hr' },
                            { name: 'Kafka · stream', state: 'live', rate: '5.6k/hr' },
                            { name: 'S3 · archive', state: 'live', rate: '1.8k/hr' },
                            { name: 'OSINT · feed', state: 'live', rate: '0.8k/hr' },
                        ]" :key="c.name" class="flex items-center justify-between text-[11px]">
                            <div class="flex items-center gap-2.5 min-w-0">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                                <span class="font-mono text-drygray-100 truncate">{{ c.name }}</span>
                            </div>
                            <div class="flex items-center gap-3 flex-shrink-0">
                                <span class="text-[9px] font-mono uppercase tracking-[0.15em] text-drygray-default">{{ c.rate }}</span>
                                <span class="text-[9px] font-mono uppercase tracking-[0.15em] text-primary">{{ c.state }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <!-- Slide 3: Decide · Copilot -->
            <SwiperSlide>
                <div class="bg-white px-5 py-4">
                    <div class="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mb-4">
                        <span>{{ slides[2].label }}</span>
                        <span>{{ slides[2].meta }}</span>
                    </div>

                    <!-- Copilot message bubble -->
                    <div class="flex items-start gap-3 mb-4">
                        <div class="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <span class="text-white font-degular font-bold text-[12px]">D</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mb-1.5">
                                Davion copilot
                            </p>
                            <p class="text-[12px] text-drygray-100 leading-relaxed">
                                Based on 4 entities and 3 transactions in the past 14 days, I recommend opening a case on entity <span class="font-mono font-semibold">P</span>. The pattern matches <span class="font-mono font-semibold">AML-12</span> (dormant-account flow).
                            </p>
                        </div>
                    </div>

                    <!-- Cited sources -->
                    <div class="bg-whitesmoke-100 rounded-lg p-3 mb-4">
                        <p class="text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default mb-2">
                            Cited · 4 sources
                        </p>
                        <ul class="space-y-1.5">
                            <li v-for="src in [
                                'kyc.persons / id=P-8401',
                                'tx.movements / 2026-05-08..05-22',
                                'accounts.dormant / cluster #14',
                                'policy.aml / pattern AML-12',
                            ]" :key="src" class="flex items-center gap-2 text-[11px] font-mono text-drygray-100">
                                <span class="w-1 h-1 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                                <span class="truncate">{{ src }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex items-center gap-2">
                        <button type="button" class="text-[11px] font-medium px-3 py-2 bg-primary text-white rounded-lg" disabled>
                            Open case
                        </button>
                        <button type="button" class="text-[11px] font-medium px-3 py-2 bg-white border border-drygray-200 text-drygray-100 rounded-lg" disabled>
                            Dismiss
                        </button>
                        <span class="text-[10px] font-mono uppercase tracking-[0.15em] text-drygray-default ml-auto">
                            HITL required
                        </span>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<style scoped>
.alpos-console-swiper {
    --swiper-pagination-bottom: 14px;
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
