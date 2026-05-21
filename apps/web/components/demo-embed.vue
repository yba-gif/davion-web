<script setup lang="ts">
// P2.U5 — Inline product-demo video embed. Mirrors the SchedulingEmbed pattern
// (P0.U3): reads runtimeConfig, renders iframe when set, honest fallback
// otherwise.
//
// When DEMO_EMBED_URL is configured (Loom / Vimeo / hosted MP4), the iframe
// activates. Until then, the fallback explains what would land here and points
// at the scheduler for a live walkthrough.

const config = useRuntimeConfig()
const demoUrl = computed(() => config.public.demoEmbedUrl as string)
const demoLength = computed(() => config.public.demoLength as string)
const hasDemo = computed(() => !!demoUrl.value)
</script>

<template>
    <div class="bg-whitesmoke-100 rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <CommonSup title="See AlpOS in motion" />
        <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
            A {{ demoLength }} walkthrough<span class="text-primary-text">.</span>
        </h2>
        <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
            One self-contained tour through the AlpOS spine: data ingest, ontology, analyse, decide, act. Recorded against an anonymised demo deployment.
        </p>

        <div v-if="hasDemo" class="mt-10 rounded-2xl overflow-hidden border border-drygray-200 bg-black aspect-video">
            <iframe
                :src="demoUrl"
                title="Davion · AlpOS product walkthrough"
                class="w-full h-full"
                style="border: 0;"
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
            />
        </div>

        <div v-else class="mt-10 bg-white rounded-2xl p-6 md:p-8 border border-drygray-200">
            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text mb-3">
                Video pending
            </p>
            <p class="text-b1 text-drygray-100 max-w-2xl">
                The recorded walkthrough lands when the demo deployment is locked. Until then, book a 30-minute live walkthrough on the scheduler, the same content, with your questions in the room.
            </p>
            <div class="mt-5 flex flex-wrap gap-3">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a live walkthrough</CommonButton></NuxtLink>
            </div>
        </div>
    </div>
</template>
