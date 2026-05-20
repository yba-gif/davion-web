<script setup lang="ts">
useSeoMeta({ title: 'OSINT', description: 'Sovereign open-source intelligence — multi-source collection, correlation, and synthesis; anonymous, secure, and compliant.' })
</script>

<template>
    <div class="bg-ink text-bone min-h-[calc(100vh-4rem)]">
        <main class="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-44 lg:pb-32">
            <p class="text-eyebrow mb-6">Solutions · OSINT</p>
            <h1 class="text-display-l text-bone-bright max-w-4xl">Sovereign open-source intelligence.</h1>
            <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                Multi-source collection — open, deep, dark, signals — correlated and synthesized inside your perimeter. Anonymous, secure, compliant. For the public sector and corporate risk.
            </p>
            <div class="mt-12 border-t border-ink-200 pt-8 max-w-2xl">
                <p class="text-label">In progress. Full page lands in a subsequent slice.</p>
            </div>
            <div class="mt-10">
                <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                    Request an OSINT demo
                    <span aria-hidden="true">→</span>
                </NuxtLink>
            </div>
        </main>
    </div>
</template>
