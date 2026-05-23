<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.careers.meta.title'),
    description: () => t('pages.careers.meta.description'),
    ogTitle: () => t('pages.careers.meta.ogTitle'),
    ogDescription: () => t('pages.careers.meta.ogDescription'),
})

const evpPoints = ['p1', 'p2', 'p3', 'p4', 'p5'] as const

const roles = [
    { key: 'r1', signals: ['r1s1', 'r1s2', 'r1s3'] },
    { key: 'r2', signals: ['r2s1', 'r2s2', 'r2s3'] },
    { key: 'r3', signals: ['r3s1', 'r3s2', 'r3s3'] },
    { key: 'r4', signals: ['r4s1', 'r4s2', 'r4s3'] },
    { key: 'r5', signals: ['r5s1', 'r5s2', 'r5s3'] },
] as const

const process = [
    { n: '01', t: 'p1Title', b: 'p1Body' },
    { n: '02', t: 'p2Title', b: 'p2Body' },
    { n: '03', t: 'p3Title', b: 'p3Body' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.careers.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                {{ $t('pages.careers.hero.headline') }}<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.careers.hero.body') }}
            </p>
        </section>

        <!-- EVP -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10">
                <div class="lg:col-span-4">
                    <CommonSup :title="$t('pages.careers.evp.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        {{ $t('pages.careers.evp.headline') }}<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <ol class="lg:col-span-8 space-y-3 text-b1 text-drygray-100">
                    <li v-for="p in evpPoints" :key="p" class="bg-white rounded-2xl p-5 flex items-start gap-4">
                        <span class="text-primary-text mt-1.5 text-lg" aria-hidden="true">·</span>
                        <span v-html="$t(`pages.careers.evp.${p}`)" />
                    </li>
                </ol>
            </div>
        </section>

        <!-- Open roles -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                    <CommonSup :title="$t('pages.careers.roles.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        {{ $t('pages.careers.roles.headline') }}<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <p class="text-b2 text-drygray-default max-w-md">
                    {{ $t('pages.careers.roles.intro') }}
                </p>
            </div>
            <ul class="space-y-4">
                <li v-for="r in roles" :key="r.key" class="bg-whitesmoke-100 rounded-2xl p-7 md:p-9">
                    <div class="grid lg:grid-cols-12 gap-6">
                        <div class="lg:col-span-4">
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.careers.roles.${r.key}Team`) }}</p>
                            <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight">{{ $t(`pages.careers.roles.${r.key}Title`) }}</p>
                            <p class="text-[13px] text-drygray-default mt-3">{{ $t(`pages.careers.roles.${r.key}Location`) }}</p>
                        </div>
                        <div class="lg:col-span-8">
                            <p class="text-b1 text-drygray-100">{{ $t(`pages.careers.roles.${r.key}Body`) }}</p>
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default mt-5 mb-2">{{ $t('pages.careers.roles.signalsLabel') }}</p>
                            <ul class="space-y-2 text-b1 text-drygray-default">
                                <li v-for="sig in r.signals" :key="sig" class="flex items-start gap-3">
                                    <span class="text-primary-text mt-1.5" aria-hidden="true">·</span>
                                    <span>{{ $t(`pages.careers.roles.${sig}`) }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <!-- Hiring process -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="mb-10 md:mb-14 max-w-3xl">
                <CommonSup :title="$t('pages.careers.process.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                    {{ $t('pages.careers.process.headline') }}<span class="text-primary-text">.</span>
                </h2>
            </div>
            <ol class="grid md:grid-cols-3 gap-4">
                <li v-for="s in process" :key="s.n" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.careers.process.stepLabel') }} {{ s.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 leading-tight">{{ $t(`pages.careers.process.${s.t}`) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(`pages.careers.process.${s.b}`) }}</p>
                </li>
            </ol>
        </section>

        <!-- CTA -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.careers.cta.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        {{ $t('pages.careers.cta.headline') }}<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.careers.cta.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.careers.cta.applyCta') }}</CommonButton></NuxtLink>
                    <NuxtLink :to="localePath('/company/about')"><CommonButton variant="outline" icon="base:arrow">{{ $t('pages.careers.cta.aboutCta') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
