<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.solutions.osint.meta.title'),
    description: () => t('pages.solutions.osint.meta.description'),
    ogTitle: () => t('pages.solutions.osint.meta.ogTitle'),
    ogDescription: () => t('pages.solutions.osint.meta.ogDescription'),
})

const sources = [
    { name: 's1Name', body: 's1Body' },
    { name: 's2Name', body: 's2Body' },
    { name: 's3Name', body: 's3Body' },
    { name: 's4Name', body: 's4Body' },
] as const

const engine = [
    { l: 'r1g', b: 'r1i' }, { l: 'r2g', b: 'r2i' }, { l: 'r3g', b: 'r3i' }, { l: 'r4g', b: 'r4i' },
] as const

const useCases = [
    { audience: 'publicAudience',     examples: ['publicE1', 'publicE2', 'publicE3', 'publicE4'] },
    { audience: 'enterpriseAudience', examples: ['enterpriseE1', 'enterpriseE2', 'enterpriseE3', 'enterpriseE4'] },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.solutions.osint.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                {{ $t('pages.solutions.osint.hero.headline') }}
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.solutions.osint.hero.body') }}
            </p>
            <div class="mt-10">
                <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.solutions.osint.hero.cta') }}</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <CommonSup :title="$t('pages.solutions.osint.problem.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[36px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight max-w-4xl">
                {{ $t('pages.solutions.osint.problem.headline') }}
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                {{ $t('pages.solutions.osint.problem.body') }}
            </p>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.osint.sources.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.osint.sources.headline') }}
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('pages.solutions.osint.sources.body') }}
                </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="s in sources" :key="s.name" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.solutions.osint.sources.sourceLabel') }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ $t(`pages.solutions.osint.sources.${s.name}`) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(`pages.solutions.osint.sources.${s.body}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.osint.engine.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.osint.engine.headline') }}
                </h2>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl divide-y divide-drygray-200">
                <div v-for="e in engine" :key="e.l" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ $t(`pages.solutions.osint.engine.${e.l}`) }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ $t(`pages.solutions.osint.engine.${e.b}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.solutions.osint.useCases.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.solutions.osint.useCases.headline') }}
                </h2>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
                <div v-for="u in useCases" :key="u.audience" class="bg-white rounded-2xl p-8">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.solutions.osint.useCases.${u.audience}`) }}</p>
                    <ul class="mt-4 space-y-3">
                        <li v-for="ex in u.examples" :key="ex" class="text-b2 text-drygray-100 flex items-center gap-3">
                            <span class="text-primary-text" aria-hidden="true">·</span>
                            {{ $t(`pages.solutions.osint.useCases.${ex}`) }}
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.solutions.osint.engage.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        {{ $t('pages.solutions.osint.engage.headline') }}
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.solutions.osint.engage.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.solutions.osint.engage.cta') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
