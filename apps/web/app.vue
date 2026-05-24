<script setup lang="ts">
// Settings come from /api/settings (Postgres-backed). They override head meta
// when present and gate maintenance mode. They MUST NOT block page rendering:
// previously this file had `<div v-if="loading">Loading...</div>` wrapping
// <NuxtPage>, which meant:
//   - SSR HTML was just the loading spinner (no page body, no SEO content)
//   - Mobile users saw white-screen + spinner for the full 1.4s the
//     /api/settings round-trip took before any content rendered
//   - "Scroll down full white screen" reports mapped to this
// Now: the page renders immediately, settings hydrate async, watchEffect
// applies head overrides + maintenance redirect when ready.
const { settings } = useSettings()

watchEffect(() => {
    if (settings.value?.siteName) {
        useHead({
            titleTemplate: settings.value.siteName,
            meta: [
                {
                    name: 'description',
                    content: settings.value.siteDescription,
                },
            ],
        })
    }
})
</script>

<template>
    <NuxtLayout>
        <!-- Maintenance Mode (only renders once settings have arrived AND the
             flag is true; until then settings?.maintenanceMode is undefined → falsy → NuxtPage renders) -->
        <div
            v-if="settings?.maintenanceMode"
            class="flex items-center justify-center min-h-screen bg-gray-50"
        >
            <div class="max-w-md w-full mx-auto text-center p-8">
                <div class="mb-8">
                    <NuxtImg src="/logo.svg" alt="Logo" width="60" height="60" class="mx-auto h-6 mb-6" />
                    <h1 class="text-2xl font-bold text-gray-900 mb-4">
                        Maintenance Mode
                    </h1>
                    <p class="text-gray-600">
                        {{ settings.maintenanceMessage }}
                    </p>
                </div>
                <div class="text-sm text-gray-500">
                    Please check back soon or contact us at
                    <a :href="`mailto:${settings.contactEmail}`" class="text-primary-text hover:underline">
                        {{ settings.contactEmail }}
                    </a>
                </div>
            </div>
        </div>

        <!-- Normal App -->
        <NuxtPage v-else />
    </NuxtLayout>

    <!-- P3.5: GDPR-compliant cookie consent banner. Mounted globally so it
         appears on first visit to any route. Self-hides once a choice is made. -->
    <CookieConsent />
</template>
