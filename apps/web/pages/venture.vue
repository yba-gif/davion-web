<script setup lang="ts">
useSeoMeta({ title: 'Venture', description: 'Davion backs and builds in sovereign data, AI, and defense-adjacent technology — capital, access, and platform together.' })
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Venture" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Capital and platform for the sovereign-tech ecosystem.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion backs and builds in sovereign data, AI, and defense-adjacent technology — capital, access, and platform together. Restrained, serious, founder-first.
            </p>
            <p class="text-b1 text-drygray-default mt-8">Thesis, areas of interest, and intake land in a subsequent slice.</p>
            <div class="mt-10">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
            </div>
        </section>
    </div>
</template>
