<script setup lang="ts">
// Davion home — foundation slice (minimal).
// Real Home (mission-hero with signature motif, intelligence-cycle stepper,
// sovereignty strip, proof band, Newsroom latest) is the next slice.
useSeoMeta({
    title: 'Davion',
    description: 'Sovereign software for data intelligence and artificial intelligence. Innovate. Secure. Perform.',
})
</script>

<template>
    <div class="min-h-[calc(100vh-4rem)] bg-ink text-bone">
        <main class="relative mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-48 lg:pb-32">
            <div class="grid lg:grid-cols-12 gap-12 items-end">
                <div class="lg:col-span-9">
                    <p class="text-eyebrow mb-6">Sovereign · v0</p>
                    <h1 class="text-display-xl text-bone-bright">
                        Sovereign software for<br />
                        data intelligence<br />
                        and artificial intelligence.
                    </h1>
                    <p class="text-body-l text-steel-light mt-8 max-w-2xl">
                        Davion builds the platforms institutions use to innovate, secure, and perform — for defense, intelligence, critical infrastructure, the public sector, and regulated industry.
                    </p>
                    <div class="mt-10 flex flex-wrap items-center gap-6">
                        <NuxtLink
                            to="/contact"
                            class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover"
                        >
                            Request a briefing
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                        <NuxtLink
                            to="/solutions/alpos"
                            class="text-bone hover:text-signal transition-colors duration-davion-hover inline-flex items-center gap-2"
                        >
                            Explore AlpOS
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
                <div class="lg:col-span-3 lg:text-right">
                    <p class="text-label">Innovate · Secure · Perform</p>
                </div>
            </div>

            <!-- Pillars — hairline-separated, document-like authority -->
            <div class="mt-24 border-t border-ink-200 pt-10 grid sm:grid-cols-3 gap-8">
                <div>
                    <p class="text-eyebrow mb-3">Pillar 01</p>
                    <p class="text-h3 text-bone-bright">Sovereign</p>
                    <p class="text-body-s mt-2 max-w-xs">
                        Your data stays yours. On-premise, air-gapped, or sovereign cloud — nothing leaves, everything is auditable.
                    </p>
                </div>
                <div>
                    <p class="text-eyebrow mb-3">Pillar 02</p>
                    <p class="text-h3 text-bone-bright">Intelligent</p>
                    <p class="text-body-s mt-2 max-w-xs">
                        Data to meaning to decision to action, under full sovereignty — the institutional decision cycle.
                    </p>
                </div>
                <div>
                    <p class="text-eyebrow mb-3">Pillar 03</p>
                    <p class="text-h3 text-bone-bright">Operational</p>
                    <p class="text-body-s mt-2 max-w-xs">
                        Built to be deployed and trusted in mission-critical environments by institutions that cannot afford uncertainty.
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>
