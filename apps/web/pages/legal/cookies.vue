<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.legal.cookies.meta.title'),
    description: () => t('pages.legal.cookies.meta.description'),
    ogTitle: () => t('pages.legal.cookies.meta.ogTitle'),
    ogDescription: () => t('pages.legal.cookies.meta.ogDescription'),
})

const lastUpdated = '2026-05-21'

const cookies = [
    { key: 'c1', cat: 'c1Category', name: 'c1Name', purpose: 'c1Purpose', lifetime: 'c1Lifetime', provider: 'c1Provider' },
    { key: 'c2', cat: 'c2Category', name: 'c2Name', purpose: 'c2Purpose', lifetime: 'c2Lifetime', provider: 'c2Provider' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.legal.cookies.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                {{ $t('pages.legal.cookies.headline') }}<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.legal.cookies.intro') }}
            </p>
            <p class="text-[13px] font-mono uppercase tracking-[0.15em] text-drygray-default mt-8">
                {{ $t('pages.legal.shared.lastUpdatedLabel') }} · {{ lastUpdated }}
            </p>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup :title="$t('pages.legal.cookies.principleSup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                {{ $t('pages.legal.cookies.principleHeadline') }}
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl" v-html="$t('pages.legal.cookies.principleBody')" />
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup :title="$t('pages.legal.cookies.inventorySup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                {{ $t('pages.legal.cookies.inventoryHeadline') }}<span class="text-primary-text">.</span>
            </h2>
            <div class="mt-10 space-y-4">
                <div v-for="c in cookies" :key="c.key" class="bg-white rounded-2xl p-6 md:p-8">
                    <div class="grid md:grid-cols-12 gap-4 md:gap-6">
                        <div class="md:col-span-4">
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.legal.cookies.${c.cat}`) }}</p>
                            <p class="font-mono text-[15px] text-drygray-100 mt-2 break-all">{{ $t(`pages.legal.cookies.${c.name}`) }}</p>
                        </div>
                        <div class="md:col-span-8">
                            <p class="text-b1 text-drygray-100">{{ $t(`pages.legal.cookies.${c.purpose}`) }}</p>
                            <div class="mt-4 flex flex-wrap gap-6 text-[13px] text-drygray-default">
                                <span><strong class="text-drygray-100 font-medium">{{ $t('pages.legal.cookies.lifetimeLabel') }}:</strong> {{ $t(`pages.legal.cookies.${c.lifetime}`) }}</span>
                                <span><strong class="text-drygray-100 font-medium">{{ $t('pages.legal.cookies.providerLabel') }}:</strong> {{ $t(`pages.legal.cookies.${c.provider}`) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup :title="$t('pages.legal.cookies.controlSup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05] max-w-3xl">
                {{ $t('pages.legal.cookies.controlHeadline') }}
            </h2>
            <p class="text-b1 text-drygray-100 mt-6 max-w-3xl" v-html="$t('pages.legal.cookies.controlBody')" />
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div class="grid lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.legal.shared.otherSup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05]">
                        {{ $t('pages.legal.shared.relatedHeadline') }}<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-wrap gap-3 lg:justify-end">
                    <NuxtLink :to="localePath('/legal/privacy')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.legal.shared.privacyLabel') }}</CommonButton></NuxtLink>
                    <NuxtLink :to="localePath('/legal/terms')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.legal.shared.termsLabel') }}</CommonButton></NuxtLink>
                    <NuxtLink :to="localePath('/legal/responsible-ai')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.legal.shared.raiLabel') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
