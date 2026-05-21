<script setup lang="ts">
useSeoMeta({
    title: 'Venture',
    description: 'Davion backs and builds in sovereign data, AI, and defense-adjacent technology. Capital, access, and platform together.',
    ogTitle: 'Davion · Venture',
    ogDescription: 'Capital and platform for the sovereign-tech ecosystem.',
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Venture" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                Capital and platform for the sovereign-tech ecosystem<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion backs and builds in sovereign data, AI, and defense-adjacent technology. Capital, access, and platform together. Restrained, serious, founder-first.
            </p>
        </section>

        <!-- Empty-state placeholder (P2.U6) until thesis + intake are publishable -->
        <EmptyState
            variant="soft"
            eyebrow="Thesis pending"
            headline="The public venture thesis and intake process land once they are signed off"
            body="In the meantime, founders building in sovereign data, sovereign AI, defense-adjacent technology, or institutional-decision infrastructure can route a one-page summary through the engagement page with the Venture intent. The right person reads it."
        >
            <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Pitch us</CommonButton></NuxtLink>
            <template #extra>
                <NuxtLink to="/company/about"><CommonButton variant="outline" icon="base:arrow">Read About</CommonButton></NuxtLink>
            </template>
        </EmptyState>
    </div>
</template>
