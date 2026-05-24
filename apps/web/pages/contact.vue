<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.contact.hero.sup'),
    description: () => t('pages.contact.hero.body'),
    ogTitle: () => `Davion · ${t('pages.contact.hero.sup')}`,
    ogDescription: () => t('pages.contact.hero.body'),
})

// Intents list, labels come from the form.intents.* keys (shared with
// the engagement form so both surfaces stay in sync). Descriptions are
// contact-specific.
const intents = [
    { labelKey: 'form.intents.briefing',    descKey: 'pages.contact.intents.briefingDesc' },
    { labelKey: 'form.intents.partnership', descKey: 'pages.contact.intents.partnershipDesc' },
    { labelKey: 'form.intents.press',       descKey: 'pages.contact.intents.pressDesc' },
    { labelKey: 'form.intents.careers',     descKey: 'pages.contact.intents.careersDesc' },
    { labelKey: 'form.intents.venture',     descKey: 'pages.contact.intents.ventureDesc' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.contact.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                {{ $t('pages.contact.hero.headline') }}<DotAccent />
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.contact.hero.body') }}
            </p>
        </section>

        <EngagementForm />

        <SchedulingEmbed />

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup :title="$t('pages.contact.intents.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05] max-w-3xl">
                {{ $t('pages.contact.intents.headline') }}
            </h2>
            <div class="mt-8 bg-white rounded-2xl divide-y divide-drygray-200">
                <div v-for="intent in intents" :key="intent.labelKey" class="grid lg:grid-cols-12 gap-4 px-6 md:px-8 py-6">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ $t(intent.labelKey) }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ $t(intent.descKey) }}</p>
                </div>
            </div>
        </section>

        <!-- Per-team email routing. -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <CommonSup :title="$t('pages.contact.email.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                {{ $t('pages.contact.email.headline') }}<DotAccent />
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                {{ $t('pages.contact.email.body') }}
            </p>
            <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <a href="mailto:engagement@davion.com" class="bg-white card-hover rounded-2xl p-6 block group">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.contact.email.engagementLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">engagement@</p>
                </a>
                <a href="mailto:press@davion.com" class="bg-white card-hover rounded-2xl p-6 block group">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.contact.email.pressLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">press@</p>
                </a>
                <a href="mailto:careers@davion.com" class="bg-white card-hover rounded-2xl p-6 block group">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.contact.email.careersLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">careers@</p>
                </a>
                <a href="mailto:ops@davion.com" class="bg-white card-hover rounded-2xl p-6 block group">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.contact.email.opsLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">ops@</p>
                </a>
            </div>
        </section>
    </div>
</template>
