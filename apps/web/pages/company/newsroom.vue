<script setup lang="ts">
useSeoMeta({ title: 'Newsroom', description: 'Press releases, announcements, recognition, and selected insight from the Davion team.' })
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Company · Newsroom" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Dispatches from the work.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Press releases, announcements, recognition, and selected insight from the Davion team.
            </p>
            <p class="text-b1 text-drygray-default mt-8">The Newsroom opens with our first dispatch shortly. Index, filters, and article template land in a subsequent slice.</p>
            <div class="mt-10">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Contact press</CommonButton></NuxtLink>
            </div>
        </section>
    </div>
</template>
