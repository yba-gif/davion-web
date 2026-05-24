<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.legal.terms.meta.title'),
    description: () => t('pages.legal.terms.meta.description'),
    ogTitle: () => t('pages.legal.terms.meta.ogTitle'),
    ogDescription: () => t('pages.legal.terms.meta.ogDescription'),
})

const lastUpdated = '2026-05-21'

const sections = [
    { n: '01', t: 's1Title', b: 's1Body' },
    { n: '02', t: 's2Title', b: 's2Body' },
    { n: '03', t: 's3Title', b: 's3Body' },
    { n: '04', t: 's4Title', b: 's4Body' },
    { n: '05', t: 's5Title', b: 's5Body' },
    { n: '06', t: 's6Title', b: 's6Body' },
    { n: '07', t: 's7Title', b: 's7Body' },
    { n: '08', t: 's8Title', b: 's8Body' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.legal.terms.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                {{ $t('pages.legal.terms.headline') }}<DotAccent />
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.legal.terms.intro') }}
            </p>
            <p class="text-[13px] font-mono uppercase tracking-[0.15em] text-drygray-default mt-8">
                {{ $t('pages.legal.shared.lastUpdatedLabel') }} · {{ lastUpdated }}
            </p>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <ol class="space-y-8 max-w-4xl">
                <li v-for="s in sections" :key="s.n" class="grid md:grid-cols-12 gap-4 md:gap-8 border-t border-drygray-200 pt-8 first:border-t-0 first:pt-0">
                    <div class="md:col-span-3">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.legal.shared.sectionLabel') }} {{ s.n }}</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight">{{ $t(`pages.legal.terms.${s.t}`) }}</p>
                    </div>
                    <div class="md:col-span-9">
                        <p class="text-b1 text-drygray-100 leading-relaxed">{{ $t(`pages.legal.terms.${s.b}`) }}</p>
                    </div>
                </li>
            </ol>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div class="grid lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.legal.shared.otherSup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05]">
                        {{ $t('pages.legal.shared.relatedHeadline') }}<DotAccent />
                    </h2>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-wrap gap-3 lg:justify-end">
                    <NuxtLink :to="localePath('/legal/privacy')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.legal.shared.privacyLabel') }}</CommonButton></NuxtLink>
                    <NuxtLink :to="localePath('/legal/cookies')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.legal.shared.cookiesLabel') }}</CommonButton></NuxtLink>
                    <NuxtLink :to="localePath('/legal/responsible-ai')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.legal.shared.raiLabel') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
