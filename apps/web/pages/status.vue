<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
    title: () => t('pages.status.meta.title'),
    description: () => t('pages.status.meta.description'),
    ogTitle: () => t('pages.status.meta.ogTitle'),
    ogDescription: () => t('pages.status.meta.ogDescription'),
})

// Static status view. Real per-component status comes from a managed status
// provider once production deploy lands per P3.6. This page is honest until then.
const lastChecked = '2026-05-21'

const services = [
    { nameKey: 's1Name', detailKey: 's1Detail', status: 'operational' },
    { nameKey: 's2Name', detailKey: 's2Detail', status: 'operational' },
    { nameKey: 's3Name', detailKey: 's3Detail', status: 'operational' },
    { nameKey: 's4Name', detailKey: 's4Detail', status: 'per-deployment' },
] as const

const statusColour = (s: string) =>
    s === 'operational' ? 'bg-primary' : s === 'per-deployment' ? 'bg-drygray-default' : 'bg-red-500'

const { t: tt } = useI18n()
const statusLabel = (s: string) =>
    s === 'operational' ? tt('pages.status.services.operationalLabel')
    : s === 'per-deployment' ? tt('pages.status.services.perDeploymentLabel')
    : tt('pages.status.services.disruptedLabel')
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.status.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                {{ $t('pages.status.hero.headline') }}<DotAccent />
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.status.hero.body') }}
            </p>
            <p class="text-[13px] font-mono uppercase tracking-[0.15em] text-drygray-default mt-8">
                {{ $t('pages.status.hero.lastCheckedLabel') }} · {{ lastChecked }}
            </p>
        </section>

        <!-- Overall summary -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div class="grid lg:grid-cols-12 gap-6 items-center">
                <div class="lg:col-span-1">
                    <span class="block w-4 h-4 rounded-full bg-primary" aria-hidden="true" />
                </div>
                <div class="lg:col-span-11">
                    <p class="font-degular font-bold text-drygray-100 text-h2 md:text-[36px] leading-tight">
                        {{ $t('pages.status.summary.headline') }}<DotAccent />
                    </p>
                    <p class="text-b1 text-drygray-default mt-3">
                        <i18n-t keypath="pages.status.summary.body" tag="span">
                            <template #email>
                                <a href="mailto:ops@davion.com" class="text-primary-text underline underline-offset-2 hover:no-underline">ops{{ '@' }}davion.com</a>
                            </template>
                        </i18n-t>
                    </p>
                </div>
            </div>
        </section>

        <!-- Per-service list -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup :title="$t('pages.status.services.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                {{ $t('pages.status.services.headline') }}<DotAccent />
            </h2>
            <ul class="mt-10 space-y-3">
                <li v-for="s in services" :key="s.nameKey" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <div class="grid md:grid-cols-12 gap-4 items-center">
                        <div class="md:col-span-1">
                            <span class="block w-3 h-3 rounded-full" :class="statusColour(s.status)" aria-hidden="true" />
                        </div>
                        <div class="md:col-span-4">
                            <p class="font-degular font-bold text-drygray-100 text-h3 leading-tight">{{ $t(`pages.status.services.${s.nameKey}`) }}</p>
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text mt-1">{{ statusLabel(s.status) }}</p>
                        </div>
                        <div class="md:col-span-7">
                            <p class="text-b1 text-drygray-default">{{ $t(`pages.status.services.${s.detailKey}`) }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <!-- Incident history -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup :title="$t('pages.status.history.sup')" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05] max-w-3xl">
                {{ $t('pages.status.history.headline') }}<DotAccent />
            </h2>
            <p class="text-b1 text-drygray-default mt-6 max-w-3xl">
                {{ $t('pages.status.history.body') }}
            </p>
        </section>

        <!-- How to report -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.status.reporting.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05]">
                        {{ $t('pages.status.reporting.headline') }}
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.status.reporting.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <a href="mailto:ops@davion.com"><CommonButton variant="primary" icon="base:arrow">ops{{ '@' }}davion.com</CommonButton></a>
                </div>
            </div>
        </section>
    </div>
</template>
