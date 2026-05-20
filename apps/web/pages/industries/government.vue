<script setup lang="ts">
useSeoMeta({ title: 'Government', description: 'Sovereign AI for the public sector — cross-agency integration, citizen-data law respected by design, decisioning at population scale.' })
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Industries · Government" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Public-sector decisioning at population scale<span class="text-primary">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion integrates data across agencies that have historically refused to integrate, with sovereign AI that respects classification, residency, and citizen-data law — audit by design.
            </p>
            <p class="text-b1 text-drygray-default mt-8">In progress. Full page lands in a subsequent slice.</p>
            <div class="mt-10">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Underneath" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                Built on AlpOS<span class="text-primary">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                Government deployments run on AlpOS — the sovereign AI platform. Ingest, ontology, analytics, AI, decisioning, action — governed end to end across classification boundaries and inter-agency exchange.
            </p>
            <div class="mt-8">
                <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" size="xs" icon="base:arrow">Explore AlpOS</CommonButton></NuxtLink>
            </div>
        </section>
    </div>
</template>
