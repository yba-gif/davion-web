<script setup lang="ts">
useSeoMeta({
    title: 'Events',
    description: 'Where Davion shows up: defense expos, summits, forums, and bilateral briefings.',
    ogTitle: 'Davion · Events',
    ogDescription: 'Where Davion shows up.',
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Company · Events" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                Where Davion shows up<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Defense expos, summits, forums, and bilateral briefings on the margins of those rooms. The events programme is run by invitation; the public index lists what we can name and adds context for what we can't.
            </p>
        </section>

        <!-- Empty-state pattern (P2.U6), honest placeholder until events are publishable -->
        <EmptyState
            variant="soft"
            eyebrow="Programme in flight"
            headline="The public events index lands once we have something to share"
            body="Current and recent participation is referenced in Newsroom dispatches when we can name a venue. For meetings on the margins of a specific event, write to the press desk and we will route the request to the right operator."
        >
            <NuxtLink to="/company/newsroom"><CommonButton variant="primary" icon="base:arrow">Recent dispatches</CommonButton></NuxtLink>
            <template #extra>
                <a href="mailto:press@davion.com"><CommonButton variant="outline" icon="base:arrow">press@davion.com</CommonButton></a>
            </template>
        </EmptyState>
    </div>
</template>
