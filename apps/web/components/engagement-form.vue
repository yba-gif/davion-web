<script setup lang="ts">
// P2.U3: Engagement form. Real backed-by-Postgres intake. Replaces the
// mailto-only path with a structured form, validates server-side, returns a
// ticket code on success.
//
// Honeypot: `companyName` field is visually hidden but rendered in the DOM;
// real users leave it empty, bots fill everything.

interface FormState {
    name: string
    email: string
    organisation: string
    role: string
    intent: string
    message: string
    companyName: string // honeypot
}

const localePath = useLocalePath()
const { t } = useI18n()

// Intent radio options. `label` resolved from i18n at render time so
// the form tracks the active locale. `value` stays English so the
// server-side handler receives a stable enum regardless of UI lang.
const intents = computed(() => [
    { value: 'briefing',    labelKey: 'form.intents.briefing' },
    { value: 'partnership', labelKey: 'form.intents.partnership' },
    { value: 'press',       labelKey: 'form.intents.press' },
    { value: 'careers',     labelKey: 'form.intents.careers' },
    { value: 'venture',     labelKey: 'form.intents.venture' },
])

const form = reactive<FormState>({
    name: '',
    email: '',
    organisation: '',
    role: '',
    intent: 'briefing',
    message: '',
    companyName: '', // honeypot, must stay empty
})

const pending = ref(false)
const ticketCode = ref<string | null>(null)
const formError = ref<string | null>(null)
const fieldErrors = ref<Record<string, string>>({})

const messageLengthOk = computed(() => form.message.trim().length >= 20)
const messageLengthLabel = computed(() => `${form.message.trim().length}/4000`)

async function onSubmit() {
    formError.value = null
    fieldErrors.value = {}

    // Client-side sanity check, server will revalidate.
    if (!form.name.trim()) fieldErrors.value.name = t('form.errors.required')
    if (!form.email.trim()) fieldErrors.value.email = t('form.errors.required')
    if (!messageLengthOk.value) fieldErrors.value.message = t('form.errors.messageMin')
    if (Object.keys(fieldErrors.value).length > 0) return

    pending.value = true
    try {
        const res = await $fetch<{ ok: boolean; ticketCode: string }>('/api/engagement/intake', {
            method: 'POST',
            body: { ...form },
        })
        if (res.ok && res.ticketCode) {
            ticketCode.value = res.ticketCode
        }
    }
    catch (err: unknown) {
        // Nuxt's $fetch surfaces structured errors at err.data.data.errors.
        const e = err as { statusCode?: number; data?: { data?: { errors?: Record<string, string> } } }
        const errs = e?.data?.data?.errors
        if (errs) {
            const { _form, ...rest } = errs
            fieldErrors.value = rest
            if (_form) formError.value = _form
        }
        else if (e?.statusCode === 429) {
            formError.value = t('form.errors.rateLimit')
        }
        else {
            formError.value = t('form.errors.generic')
        }
    }
    finally {
        pending.value = false
    }
}

function resetForm() {
    ticketCode.value = null
    formError.value = null
    fieldErrors.value = {}
    form.name = ''
    form.email = ''
    form.organisation = ''
    form.role = ''
    form.intent = 'briefing'
    form.message = ''
    form.companyName = ''
}
</script>

<template>
    <div class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <!-- Success state -->
        <div v-if="ticketCode">
            <CommonSup :title="$t('form.received')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                {{ $t('form.thankYouTitle') }}<span class="text-primary-text">.</span>
            </h2>
            <i18n-t keypath="form.thankYouBody" tag="p" class="text-b2 text-drygray-default mt-6 max-w-3xl">
                <template #ref>
                    <span class="font-mono text-drygray-100">{{ ticketCode }}</span>
                </template>
                <template #email>
                    <a href="mailto:engagement@davion.com" class="text-primary-text underline underline-offset-2 hover:no-underline">engagement@davion.com</a>
                </template>
            </i18n-t>
            <div class="mt-8 flex flex-wrap gap-3">
                <NuxtLink :to="localePath('/')"><CommonButton variant="primary" icon="base:arrow">{{ $t('form.backToHome') }}</CommonButton></NuxtLink>
                <button type="button" @click="resetForm">
                    <CommonButton variant="outline" icon="base:arrow">{{ $t('form.submitAnother') }}</CommonButton>
                </button>
            </div>
        </div>

        <!-- Form state -->
        <form v-else novalidate @submit.prevent="onSubmit">
            <CommonSup :title="$t('form.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                {{ $t('form.title') }}<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                {{ $t('form.body') }}
            </p>

            <!-- Honeypot (kept English; never user-visible) -->
            <div class="sr-only" aria-hidden="true">
                <label for="companyName">Company name (leave blank)</label>
                <input
                    id="companyName"
                    v-model="form.companyName"
                    type="text"
                    tabindex="-1"
                    autocomplete="off"
                >
            </div>

            <div class="mt-10 grid md:grid-cols-2 gap-5">
                <!-- Name -->
                <div>
                    <label for="ef-name" class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default block mb-2">{{ $t('form.name') }}</label>
                    <input
                        id="ef-name"
                        v-model="form.name"
                        type="text"
                        required
                        autocomplete="name"
                        :aria-invalid="!!fieldErrors.name || undefined"
                        :aria-describedby="fieldErrors.name ? 'ef-name-err' : undefined"
                        class="w-full bg-whitesmoke-100 rounded-xl px-4 py-3 text-base text-drygray-100 placeholder-drygray-default focus:outline-none focus:ring-2 focus:ring-drygray-100 focus:bg-white transition-colors min-h-[44px]"
                        :placeholder="$t('form.namePlaceholder')"
                    >
                    <p v-if="fieldErrors.name" id="ef-name-err" class="text-[12px] text-red-600 mt-1.5">{{ fieldErrors.name }}</p>
                </div>

                <!-- Email -->
                <div>
                    <label for="ef-email" class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default block mb-2">{{ $t('form.email') }}</label>
                    <input
                        id="ef-email"
                        v-model="form.email"
                        type="email"
                        required
                        autocomplete="email"
                        :aria-invalid="!!fieldErrors.email || undefined"
                        :aria-describedby="fieldErrors.email ? 'ef-email-err' : undefined"
                        class="w-full bg-whitesmoke-100 rounded-xl px-4 py-3 text-base text-drygray-100 placeholder-drygray-default focus:outline-none focus:ring-2 focus:ring-drygray-100 focus:bg-white transition-colors min-h-[44px]"
                        :placeholder="$t('form.emailPlaceholder')"
                    >
                    <p v-if="fieldErrors.email" id="ef-email-err" class="text-[12px] text-red-600 mt-1.5">{{ fieldErrors.email }}</p>
                </div>

                <!-- Organisation -->
                <div>
                    <label for="ef-org" class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default block mb-2">{{ $t('form.organisation') }} <span class="text-drygray-default font-normal normal-case">{{ $t('form.organisationOptional') }}</span></label>
                    <input
                        id="ef-org"
                        v-model="form.organisation"
                        type="text"
                        autocomplete="organization"
                        :aria-invalid="!!fieldErrors.organisation || undefined"
                        class="w-full bg-whitesmoke-100 rounded-xl px-4 py-3 text-base text-drygray-100 placeholder-drygray-default focus:outline-none focus:ring-2 focus:ring-drygray-100 focus:bg-white transition-colors min-h-[44px]"
                        :placeholder="$t('form.organisationPlaceholder')"
                    >
                </div>

                <!-- Role -->
                <div>
                    <label for="ef-role" class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default block mb-2">{{ $t('form.role') }} <span class="text-drygray-default font-normal normal-case">{{ $t('form.organisationOptional') }}</span></label>
                    <input
                        id="ef-role"
                        v-model="form.role"
                        type="text"
                        autocomplete="organization-title"
                        :aria-invalid="!!fieldErrors.role || undefined"
                        class="w-full bg-whitesmoke-100 rounded-xl px-4 py-3 text-base text-drygray-100 placeholder-drygray-default focus:outline-none focus:ring-2 focus:ring-drygray-100 focus:bg-white transition-colors min-h-[44px]"
                        :placeholder="$t('form.rolePlaceholder')"
                    >
                </div>
            </div>

            <!-- Intent -->
            <fieldset class="mt-8">
                <legend class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default mb-3">{{ $t('form.intentLabel') }}</legend>
                <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
                    <label
                        v-for="i in intents"
                        :key="i.value"
                        :class="[
                            'cursor-pointer rounded-xl px-4 py-3 border transition-colors flex flex-col items-start text-left min-h-[44px]',
                            form.intent === i.value
                                ? 'bg-drygray-100 text-white border-drygray-100'
                                : 'bg-white text-drygray-100 border-drygray-200 hover:border-drygray-100',
                        ]"
                    >
                        <input
                            v-model="form.intent"
                            type="radio"
                            name="intent"
                            :value="i.value"
                            class="sr-only"
                        >
                        <span class="text-[13px] font-semibold">{{ $t(i.labelKey) }}</span>
                    </label>
                </div>
                <p v-if="fieldErrors.intent" class="text-[12px] text-red-600 mt-2">{{ fieldErrors.intent }}</p>
            </fieldset>

            <!-- Message -->
            <div class="mt-8">
                <label for="ef-msg" class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default block mb-2">{{ $t('form.message') }}</label>
                <textarea
                    id="ef-msg"
                    v-model="form.message"
                    rows="5"
                    required
                    minlength="20"
                    maxlength="4000"
                    :aria-invalid="!!fieldErrors.message || undefined"
                    :aria-describedby="fieldErrors.message ? 'ef-msg-err' : 'ef-msg-help'"
                    class="w-full bg-whitesmoke-100 rounded-xl px-4 py-3 text-base text-drygray-100 placeholder-drygray-default focus:outline-none focus:ring-2 focus:ring-drygray-100 focus:bg-white transition-colors leading-relaxed resize-y"
                    :placeholder="$t('form.messagePlaceholder')"
                />
                <div class="flex justify-between mt-1.5">
                    <p :id="fieldErrors.message ? 'ef-msg-err' : 'ef-msg-help'"
                       :class="['text-[12px]', fieldErrors.message ? 'text-red-600' : 'text-drygray-default']">
                        {{ fieldErrors.message || $t('form.messageHelp') }}
                    </p>
                    <p class="text-[12px] font-mono text-drygray-default">{{ messageLengthLabel }}</p>
                </div>
            </div>

            <!-- Form-level error -->
            <div v-if="formError" role="alert" class="mt-6 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-[14px]">
                {{ formError }}
            </div>

            <!-- Submit -->
            <div class="mt-8 flex flex-wrap items-center gap-4">
                <button type="submit" :disabled="pending" class="text-[14px] font-semibold px-6 py-3 bg-primary text-drygray-100 rounded-lg hover:bg-primary/90 transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2">
                    {{ pending ? $t('form.submitting') : $t('form.submit') }}
                    <span aria-hidden="true">↗</span>
                </button>
                <p class="text-[12px] text-drygray-default">
                    {{ $t('form.privacyPrefix') }} <NuxtLink :to="localePath('/legal/privacy')" class="text-primary-text underline underline-offset-2 hover:no-underline">{{ $t('form.privacyLink') }}</NuxtLink>.
                </p>
            </div>
        </form>
    </div>
</template>
