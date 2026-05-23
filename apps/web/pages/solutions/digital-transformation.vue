<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.solutions.dt.meta.title'),
    description: () => t('pages.solutions.dt.meta.description'),
    ogTitle: () => t('pages.solutions.dt.meta.ogTitle'),
    ogDescription: () => t('pages.solutions.dt.meta.ogDescription'),
})

const phases = [
    { n: '01', name: 'p1Name', body: 'p1Body' },
    { n: '02', name: 'p2Name', body: 'p2Body' },
    { n: '03', name: 'p3Name', body: 'p3Body' },
    { n: '04', name: 'p4Name', body: 'p4Body' },
] as const

const layers = [
    { name: 'l1Name', body: 'l1Body' },
    { name: 'l2Name', body: 'l2Body' },
    { name: 'l3Name', body: 'l3Body' },
    { name: 'l4Name', body: 'l4Body' },
] as const

const outcomes = [
    { label: 'speedLabel', body: 'speedBody' },
    { label: 'govLabel',   body: 'govBody' },
    { label: 'ownerLabel', body: 'ownerBody' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.solutions.dt.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                {{ $t('pages.solutions.dt.hero.headline') }}
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.solutions.dt.hero.body') }}
            </p>
            <div class="mt-10">
                <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.solutions.dt.hero.cta') }}</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <CommonSup :title="$t('pages.solutions.dt.problem.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[36px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight max-w-4xl">
                {{ $t('pages.solutions.dt.problem.headline') }}
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                {{ $t('pages.solutions.dt.problem.body') }}
            </p>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.dt.phases.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.dt.phases.headline') }}
                </h2>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="phase in phases" :key="phase.n" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.solutions.dt.phases.phaseLabel') }} {{ phase.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ $t(`pages.solutions.dt.phases.${phase.name}`) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(`pages.solutions.dt.phases.${phase.body}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.dt.underneath.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.dt.underneath.headline') }}
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    {{ $t('pages.solutions.dt.underneath.body') }}
                </p>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl divide-y divide-drygray-200">
                <div v-for="layer in layers" :key="layer.name" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ $t(`pages.solutions.dt.underneath.${layer.name}`) }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ $t(`pages.solutions.dt.underneath.${layer.body}`) }}</p>
                </div>
            </div>
            <div class="mt-8">
                <NuxtLink :to="localePath('/solutions/alpos')"><CommonButton variant="outline" size="xs" icon="base:arrow">{{ $t('pages.solutions.dt.underneath.exploreCta') }}</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.dt.outcomes.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.dt.outcomes.headline') }}
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="o in outcomes" :key="o.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.solutions.dt.outcomes.${o.label}`) }}</p>
                    <p class="text-b2 text-drygray-100 mt-4 leading-relaxed">{{ $t(`pages.solutions.dt.outcomes.${o.body}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.solutions.dt.engage.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        {{ $t('pages.solutions.dt.engage.headline') }}
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.solutions.dt.engage.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.solutions.dt.engage.cta') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
