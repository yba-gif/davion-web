<script setup lang="ts">
useSeoMeta({ title: 'Events', description: 'Where Davion shows up: defense expos, summits, forums — and bilateral briefings.' })
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Company · Events" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Where Davion shows up.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Defense expos, summits, forums — and bilateral briefings on the margins of those rooms.
            </p>
            <p class="text-b1 text-drygray-default mt-8">Upcoming + past index lands in a subsequent slice.</p>
            <div class="mt-10">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
            </div>
        </section>
    </div>
</template>
