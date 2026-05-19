<script setup lang="ts">
// Minimal Davion header — foundation slice.
// Real IA nav (Solutions / Company / Venture with multi-level dropdowns)
// lands in the next slice once the sitemap is wired data-driven.
</script>

<template>
    <header class="sticky top-0 z-50 w-full bg-ink/95 backdrop-blur border-b border-ink-200">
        <div class="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <NuxtLink to="/" class="flex items-center gap-3 group">
                <NuxtImg src="/icon.svg" alt="" width="24" height="24" class="h-6 w-6" />
                <span class="font-display font-semibold text-bone-bright text-xl tracking-display-tight">Davion</span>
            </NuxtLink>
            <nav class="hidden md:flex items-center gap-8 text-body-s text-steel-light" aria-label="Primary">
                <!-- Solutions / Company / Venture nav — wired in the next slice. -->
            </nav>
            <NuxtLink
                to="/contact"
                class="inline-flex items-center gap-2 px-4 py-2 border border-ink-200 text-bone hover:border-signal hover:text-signal transition-colors duration-davion-hover text-sm font-medium"
            >
                Request a briefing
            </NuxtLink>
        </div>
    </header>
</template>
