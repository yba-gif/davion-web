<script setup lang="ts">
// P0.U2 — Branded error page. Davion voice, 4 status branches (404 / 500 /
// 403 / other), return-to-home + recovery suggestions, AA-safe contrast.
// Motion wrappers stripped — they previously caused opacity:0 hangs in
// this Nuxt + Motion setup (see P0 baseline notes).

interface ErrorProps {
    error: {
        statusCode?: number
        statusMessage?: string
        message?: string
        stack?: string
    }
}

const props = defineProps<ErrorProps>()

const errorCode = computed(() => props.error?.statusCode || 500)

// Branded per-status copy. Davion voice — declarative, no exclamation marks,
// no buzzwords. Each variant has a heading + a one-sentence body.
const copy = computed(() => {
    switch (errorCode.value) {
        case 404:
            return {
                eyebrow: 'Error · 404',
                heading: 'That page is not where it used to be',
                body: 'Davion has shipped a lot of pages in the last week. A link may have moved, or the URL may be off. The platform is fine; this page is not.',
            }
        case 403:
            return {
                eyebrow: 'Error · 403',
                heading: 'Inside the perimeter, but not inside this room',
                body: 'You are authenticated, but this resource is gated. If you should have access, contact your operations lead — they can adjust the policy.',
            }
        case 500:
            return {
                eyebrow: 'Error · 500',
                heading: 'Something on our side broke',
                body: 'A server-side error was logged. The site itself is operational; this request is the one that failed. Try again, or write to ops@davion.com if it persists.',
            }
        case 503:
            return {
                eyebrow: 'Error · 503',
                heading: 'Service temporarily unavailable',
                body: 'Davion may be in scheduled maintenance. Check the status page for the latest, or try again in a few minutes.',
            }
        default:
            return {
                eyebrow: `Error · ${errorCode.value}`,
                heading: 'An unexpected error occurred',
                body: props.error?.statusMessage || 'The request did not complete as expected. Try again, or write to ops@davion.com if the issue persists.',
            }
    }
})

useSeoMeta({
    title: computed(() => `${errorCode.value} · ${copy.value.heading}`),
    description: computed(() => copy.value.body),
    ogTitle: computed(() => `Davion · Error ${errorCode.value}`),
    ogDescription: computed(() => copy.value.body),
})

function handleClearError() {
    clearError({ redirect: '/' })
}
</script>

<template>
    <NuxtLayout>
        <div class="flex flex-col gap-4">
            <!-- Hero -->
            <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
                <CommonSup :title="copy.eyebrow" />
                <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[68px] tracking-tight max-w-4xl">
                    {{ copy.heading }}<span class="text-primary-text">.</span>
                </h1>
                <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                    {{ copy.body }}
                </p>
                <div class="mt-10 flex flex-wrap gap-3">
                    <CommonButton
                        variant="primary"
                        icon="base:arrow"
                        @click="handleClearError"
                    >
                        Back to home
                    </CommonButton>
                    <NuxtLink to="/contact"><CommonButton variant="outline" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                </div>
            </section>

            <!-- Recovery suggestions -->
            <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
                <CommonSup title="Where to go from here" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                    Likely the page you wanted is one of these<span class="text-primary-text">.</span>
                </h2>
                <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <NuxtLink to="/" class="bg-white card-hover rounded-2xl p-6 block group">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Start here</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">Home</p>
                        <p class="text-b1 text-drygray-default mt-3">The one-sentence pitch and the navigation to the rest.</p>
                    </NuxtLink>
                    <NuxtLink to="/solutions/alpos" class="bg-white card-hover rounded-2xl p-6 block group">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">The product</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">AlpOS</p>
                        <p class="text-b1 text-drygray-default mt-3">The sovereign AI platform — ingest, ontology, analyse, decide, act.</p>
                    </NuxtLink>
                    <NuxtLink to="/trust" class="bg-white card-hover rounded-2xl p-6 block group">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">The proof</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">Trust</p>
                        <p class="text-b1 text-drygray-default mt-3">Deployment matrix, sovereignty model, certification status.</p>
                    </NuxtLink>
                    <NuxtLink to="/company/newsroom" class="bg-white card-hover rounded-2xl p-6 block group">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">The dispatches</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">Newsroom</p>
                        <p class="text-b1 text-drygray-default mt-3">Announcements, insight, technical notes.</p>
                    </NuxtLink>
                </div>
            </section>

            <!-- Report block — only visible on 5xx errors -->
            <section v-if="errorCode >= 500" class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
                <div class="grid lg:grid-cols-12 gap-8 items-end">
                    <div class="lg:col-span-8">
                        <CommonSup title="Reporting" />
                        <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05]">
                            If this happens again<span class="text-primary-text">,</span> tell us<span class="text-primary-text">.</span>
                        </h2>
                        <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                            Send the URL + the time + a short description to ops@davion.com. We respond inside one business day. Status of public services lives on the status page.
                        </p>
                    </div>
                    <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                        <a href="mailto:ops@davion.com"><CommonButton variant="primary" icon="base:arrow">ops@davion.com</CommonButton></a>
                        <NuxtLink to="/status"><CommonButton variant="outline" icon="base:arrow">Status page</CommonButton></NuxtLink>
                    </div>
                </div>
            </section>
        </div>
    </NuxtLayout>
</template>
