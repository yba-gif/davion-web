<script setup lang="ts">
useSeoMeta({ title: 'Newsroom', description: 'Press releases, announcements, recognition, and selected insight from the Davion team.' })
</script>

<template>
    <div class="bg-ink text-bone min-h-[calc(100vh-4rem)]">
        <main class="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-44 lg:pb-32">
            <p class="text-eyebrow mb-6">Company · Newsroom</p>
            <h1 class="text-display-l text-bone-bright max-w-4xl">Dispatches from the work.</h1>
            <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                Press releases, announcements, recognition, and selected insight from the Davion team.
            </p>
            <div class="mt-12 border-t border-ink-200 pt-8 max-w-2xl">
                <p class="text-label">The Newsroom opens with our first dispatch shortly. Index, filters, and article template land in a subsequent slice.</p>
            </div>
            <div class="mt-10">
                <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                    Contact press
                    <span aria-hidden="true">→</span>
                </NuxtLink>
            </div>
        </main>
    </div>
</template>
