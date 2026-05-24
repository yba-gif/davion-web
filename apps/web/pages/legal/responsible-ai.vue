<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.legal.rai.meta.title'),
    description: () => t('pages.legal.rai.meta.description'),
    ogTitle: () => t('pages.legal.rai.meta.ogTitle'),
    ogDescription: () => t('pages.legal.rai.meta.ogDescription'),
})

const lastUpdated = '2026-05-21'

const commitments = [
    { n: '01', t: 'c1Title', b: 'c1Body' },
    { n: '02', t: 'c2Title', b: 'c2Body' },
    { n: '03', t: 'c3Title', b: 'c3Body' },
    { n: '04', t: 'c4Title', b: 'c4Body' },
    { n: '05', t: 'c5Title', b: 'c5Body' },
    { n: '06', t: 'c6Title', b: 'c6Body' },
    { n: '07', t: 'c7Title', b: 'c7Body' },
    { n: '08', t: 'c8Title', b: 'c8Body' },
] as const

const alignment = [
    { key: 'a1', n: 'a1Name', s: 'a1Status', d: 'a1Detail' },
    { key: 'a2', n: 'a2Name', s: 'a2Status', d: 'a2Detail' },
    { key: 'a3', n: 'a3Name', s: 'a3Status', d: 'a3Detail' },
    { key: 'a4', n: 'a4Name', s: 'a4Status', d: 'a4Detail' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.legal.rai.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-5xl">
                {{ $t('pages.legal.rai.headline') }}<DotAccent />
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl" v-html="$t('pages.legal.rai.intro')" />
            <p class="text-[13px] font-mono uppercase tracking-[0.15em] text-drygray-default mt-8">
                {{ $t('pages.legal.shared.lastUpdatedLabel') }} · {{ lastUpdated }}
            </p>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup :title="$t('pages.legal.rai.commitmentsSup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                {{ $t('pages.legal.rai.commitmentsHeadline') }}
            </h2>
            <ol class="mt-10 space-y-8">
                <li v-for="c in commitments" :key="c.n" class="grid md:grid-cols-12 gap-4 md:gap-8 border-t border-drygray-200 pt-8 first:border-t-0 first:pt-0">
                    <div class="md:col-span-3">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.legal.shared.commitmentLabel') }} {{ c.n }}</p>
                        <p class="font-degular font-bold text-drygray-100 text-[22px] md:text-[24px] leading-tight mt-2">{{ $t(`pages.legal.rai.${c.t}`) }}<DotAccent /></p>
                    </div>
                    <div class="md:col-span-9">
                        <p class="text-b1 text-drygray-100 leading-relaxed">{{ $t(`pages.legal.rai.${c.b}`) }}</p>
                    </div>
                </li>
            </ol>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup :title="$t('pages.legal.rai.alignSup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                {{ $t('pages.legal.rai.alignHeadline') }}
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl" v-html="$t('pages.legal.rai.alignIntro')" />
            <div class="mt-10 space-y-3">
                <div v-for="a in alignment" :key="a.key" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <div class="grid md:grid-cols-12 gap-4">
                        <div class="md:col-span-4">
                            <p class="text-h3 font-degular font-bold text-drygray-100 leading-tight">{{ $t(`pages.legal.rai.${a.n}`) }}</p>
                        </div>
                        <div class="md:col-span-2">
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.legal.rai.${a.s}`) }}</p>
                        </div>
                        <div class="md:col-span-6">
                            <p class="text-b1 text-drygray-default">{{ $t(`pages.legal.rai.${a.d}`) }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-[13px] text-drygray-default mt-6 italic">
                {{ $t('pages.legal.rai.alignFootnote') }}
            </p>
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
                    <NuxtLink :to="localePath('/legal/terms')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.legal.shared.termsLabel') }}</CommonButton></NuxtLink>
                    <NuxtLink :to="localePath('/legal/cookies')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.legal.shared.cookiesLabel') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
