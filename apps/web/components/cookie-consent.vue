<script setup lang="ts">
// P3.5: GDPR-compliant cookie consent — consent-first, no pre-checked boxes,
// dismissable, persists choice. Honours the existing useAnalytics — only fires
// page_view events after consent is "accept".
//
// Storage:
//   localStorage.davion_cookie_consent = 'accept' | 'essential' | unset
//
// External control: the footer's "Cookie preferences" link dispatches
//   window.CustomEvent('cookie-consent:open') to reopen the banner.

const STORAGE_KEY = 'davion_cookie_consent'

const visible = ref(false)
// Track whether we've checked storage yet — avoids flash on first paint.
const ready = ref(false)

function readConsent(): 'accept' | 'essential' | null {
    if (typeof window === 'undefined') return null
    try {
        const v = window.localStorage.getItem(STORAGE_KEY)
        if (v === 'accept' || v === 'essential') return v
        return null
    }
    catch {
        return null
    }
}

function writeConsent(value: 'accept' | 'essential') {
    try {
        window.localStorage.setItem(STORAGE_KEY, value)
        // Broadcast so any analytics-dependent code can react.
        window.dispatchEvent(new CustomEvent('cookie-consent:changed', { detail: { value } }))
    }
    catch {}
}

function choose(value: 'accept' | 'essential') {
    writeConsent(value)
    visible.value = false
}

function open() {
    visible.value = true
}

onMounted(() => {
    ready.value = true
    if (readConsent() === null) {
        visible.value = true
    }
    window.addEventListener('cookie-consent:open', open)
})
onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('cookie-consent:open', open)
    }
})
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="ready && visible"
                role="dialog"
                aria-labelledby="cookie-consent-title"
                aria-describedby="cookie-consent-body"
                class="fixed bottom-3 inset-x-3 md:bottom-6 md:right-6 md:left-auto md:max-w-md z-[60] bg-white rounded-2xl shadow-xl border border-drygray-200 p-6"
            >
                <p id="cookie-consent-title" class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text mb-2">
                    Cookies
                </p>
                <h2 class="font-degular font-bold text-drygray-100 text-[20px] leading-tight mb-3">
                    Strictly-necessary by default<span class="text-primary-text">.</span>
                </h2>
                <p id="cookie-consent-body" class="text-[14px] leading-[1.5] text-drygray-default mb-5">
                    Davion uses one strictly-necessary cookie to remember your choice. Anonymous analytics are loaded only if you opt in. No third-party tracking either way. Full policy in
                    <NuxtLink to="/legal/cookies" class="text-primary-text underline underline-offset-2 hover:no-underline">Cookies</NuxtLink>.
                </p>
                <div class="flex flex-col sm:flex-row gap-2">
                    <button
                        type="button"
                        class="text-[13px] font-semibold px-4 py-2.5 bg-drygray-100 text-white rounded-lg hover:bg-drygray-100/90 transition-colors"
                        @click="choose('accept')"
                    >
                        Accept all
                    </button>
                    <button
                        type="button"
                        class="text-[13px] font-semibold px-4 py-2.5 bg-white text-drygray-100 border border-drygray-200 rounded-lg hover:border-drygray-100 transition-colors"
                        @click="choose('essential')"
                    >
                        Essential only
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
