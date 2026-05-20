<script setup lang="ts">
const { settings, loading } = useSettings()

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
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center min-h-screen">
            <div class="text-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                <p class="text-gray-600 font-degular">
                    Loading...
                </p>
            </div>
        </div>

        <!-- Maintenance Mode -->
        <div
            v-else-if="settings?.maintenanceMode"
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
