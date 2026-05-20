<script setup lang="ts">
useSeoMeta({ title: 'About', description: 'Why Davion exists, what we work on, and the institutions we work with.' })
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Company" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Sovereignty is not a feature. It is the brief.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Why Davion exists, what we work on, and the institutions we work with. A conviction-led essay, not a leadership bio page.
            </p>
            <p class="text-b1 text-drygray-default mt-8">In progress. Full page lands in a subsequent slice.</p>
            <div class="mt-10">
                <NuxtLink to="/company/careers"><CommonButton variant="primary" icon="base:arrow">Join the mission</CommonButton></NuxtLink>
            </div>
        </section>
    </div>
</template>
