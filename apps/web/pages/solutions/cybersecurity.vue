<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.solutions.cyber.meta.title'),
    description: () => t('pages.solutions.cyber.meta.description'),
    ogTitle: () => t('pages.solutions.cyber.meta.ogTitle'),
    ogDescription: () => t('pages.solutions.cyber.meta.ogDescription'),
})

const methods = [
    { nameKey: 'patternName', bodyKey: 'patternBody' },
    { nameKey: 'anomalyName', bodyKey: 'anomalyBody' },
    { nameKey: 'graphName',   bodyKey: 'graphBody' },
] as const

const architecture = [
    { l: 'r1g', b: 'r1i' }, { l: 'r2g', b: 'r2i' }, { l: 'r3g', b: 'r3i' }, { l: 'r4g', b: 'r4i' },
] as const

const modes = ['m1', 'm2', 'm3', 'm4'] as const

const outcomes = [
    { label: 'detectionLabel', body: 'detectionBody' },
    { label: 'responseLabel',  body: 'responseBody' },
    { label: 'defenseLabel',   body: 'defenseBody' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.solutions.cyber.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                {{ $t('pages.solutions.cyber.hero.headline') }}
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.solutions.cyber.hero.body') }}
            </p>
            <div class="mt-10">
                <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.solutions.cyber.hero.cta') }}</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <CommonSup :title="$t('pages.solutions.cyber.problem.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[36px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight max-w-4xl">
                {{ $t('pages.solutions.cyber.problem.headline') }}
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                {{ $t('pages.solutions.cyber.problem.body') }}
            </p>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.cyber.detection.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.cyber.detection.headline') }}
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('pages.solutions.cyber.detection.body') }}
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="m in methods" :key="m.nameKey" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.solutions.cyber.detection.methodLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ $t(`pages.solutions.cyber.detection.${m.nameKey}`) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(`pages.solutions.cyber.detection.${m.bodyKey}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.cyber.architecture.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.cyber.architecture.headline') }}
                </h2>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl divide-y divide-drygray-200">
                <div v-for="a in architecture" :key="a.l" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ $t(`pages.solutions.cyber.architecture.${a.l}`) }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ $t(`pages.solutions.cyber.architecture.${a.b}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <CommonSup :title="$t('pages.solutions.cyber.constrained.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        {{ $t('pages.solutions.cyber.constrained.headline') }}
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.solutions.cyber.constrained.body') }}
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-white rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text mb-4">{{ $t('pages.solutions.cyber.constrained.modesLabel') }}</p>
                        <ul class="space-y-3 text-b2 text-drygray-100">
                            <li v-for="m in modes" :key="m" class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> {{ $t(`pages.solutions.cyber.constrained.${m}`) }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.cyber.outcomes.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.cyber.outcomes.headline') }}
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="o in outcomes" :key="o.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.solutions.cyber.outcomes.${o.label}`) }}</p>
                    <p class="text-b2 text-drygray-100 mt-4 leading-relaxed">{{ $t(`pages.solutions.cyber.outcomes.${o.body}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.solutions.cyber.engage.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        {{ $t('pages.solutions.cyber.engage.headline') }}
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.solutions.cyber.engage.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.solutions.cyber.engage.cta') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
