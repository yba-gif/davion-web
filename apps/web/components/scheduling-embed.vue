<script setup lang="ts">
// P0.U3 — Inline scheduling embed for the "Book a demo" conversion event.
//
// Behaviour:
//   - When SCHEDULING_URL env var is configured (Cal.com / Calendly URL),
//     this renders an inline iframe scheduler. Modern Cal.com / Calendly
//     URLs both support iframe embeds without extra JS.
//   - When SCHEDULING_URL is empty (current state — pending founder
//     provisioning), this renders an honest fallback that surfaces the
//     reason and routes to mailto.
//
// The mailto fallback is ALWAYS rendered below the iframe (visible) so
// users who block iframes or prefer email have a working path.

const config = useRuntimeConfig()
const schedulingUrl = computed(() => config.public.schedulingUrl as string)
const schedulingEmail = computed(() => config.public.schedulingEmail as string)
const hasScheduler = computed(() => !!schedulingUrl.value)
</script>

<template>
    <div class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <CommonSup title="Book a demo" />
        <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
            Pick a time<span class="text-primary-text">.</span> 30 minutes<span class="text-primary-text">.</span> Consultative<span class="text-primary-text">.</span>
        </h2>
        <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
            The first conversation is a briefing, not a pitch. We listen first — to your data architecture, your regulatory constraints, your operational reality. If Davion is not the right answer, we will say so.
        </p>

        <!-- Live scheduler (when configured) -->
        <div v-if="hasScheduler" class="mt-10 rounded-2xl overflow-hidden border border-drygray-200 bg-white">
            <iframe
                :src="schedulingUrl"
                title="Davion scheduling — pick a 30-minute briefing slot"
                class="w-full"
                style="height: 720px; border: 0;"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
            />
        </div>

        <!-- Honest fallback while scheduler URL is unset -->
        <div v-else class="mt-10 bg-whitesmoke-100 rounded-2xl p-6 md:p-8">
            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text mb-3">
                Scheduling link pending
            </p>
            <p class="text-b1 text-drygray-100 max-w-2xl">
                We are setting up direct scheduling. Until that's wired,
                <a :href="`mailto:${schedulingEmail}`" class="text-primary-text underline underline-offset-2 hover:no-underline">email {{ schedulingEmail }}</a>
                with a one-line description of what you are trying to decide and 3 windows that work for you (CET ± 2 ideal). We respond inside one business day.
            </p>
        </div>

        <!-- Always-visible mailto backup -->
        <p class="text-[13px] text-drygray-default mt-6">
            Prefer email?
            <a :href="`mailto:${schedulingEmail}`" class="text-primary-text underline underline-offset-2 hover:no-underline">{{ schedulingEmail }}</a>
        </p>
    </div>
</template>
