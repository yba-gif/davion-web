<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.trust.meta.title'),
    description: () => t('pages.trust.meta.description'),
    ogTitle: () => t('pages.trust.meta.ogTitle'),
    ogDescription: () => t('pages.trust.meta.ogDescription'),
})

// Only structural shape lives in JS — copy resolves through $t.
const principles = [
    { l: 'residencyLabel',      b: 'residencyBody' },
    { l: 'nothingLeavesLabel',  b: 'nothingLeavesBody' },
    { l: 'nationalLabel',       b: 'nationalBody' },
    { l: 'provableLabel',       b: 'provableBody' },
] as const

const matrixRows = [
    { a: 'r1Attr', m: { onprem: 'r1Onprem', airgap: 'r1Airgap', sov: 'r1Sov', priv: 'r1Priv' } },
    { a: 'r2Attr', m: { onprem: 'r2Onprem', airgap: 'r2Airgap', sov: 'r2Sov', priv: 'r2Priv' } },
    { a: 'r3Attr', m: { onprem: 'r3Onprem', airgap: 'r3Airgap', sov: 'r3Sov', priv: 'r3Priv' } },
    { a: 'r4Attr', m: { onprem: 'r4Onprem', airgap: 'r4Airgap', sov: 'r4Sov', priv: 'r4Priv' } },
    { a: 'r5Attr', m: { onprem: 'r5Onprem', airgap: 'r5Airgap', sov: 'r5Sov', priv: 'r5Priv' } },
    { a: 'r6Attr', m: { onprem: 'r6Onprem', airgap: 'r6Airgap', sov: 'r6Sov', priv: 'r6Priv' } },
    { a: 'r7Attr', m: { onprem: 'r7Onprem', airgap: 'r7Airgap', sov: 'r7Sov', priv: 'r7Priv' } },
] as const

const accessControl = [
    { l: 'rbacLabel', b: 'rbacBody' },
    { l: 'abacLabel', b: 'abacBody' },
    { l: 'fedLabel',  b: 'fedBody' },
    { l: 'privLabel', b: 'privBody' },
] as const

const auditAttributes = [
    { l: 'whoLabel',  b: 'whoBody' },
    { l: 'whatLabel', b: 'whatBody' },
    { l: 'whenLabel', b: 'whenBody' },
    { l: 'whyLabel',  b: 'whyBody' },
] as const

const standards = [
    { n: 'isoName',    b: 'isoBody' },
    { n: 'socName',    b: 'socBody' },
    { n: 'nis2Name',   b: 'nis2Body' },
    { n: 'gdprName',   b: 'gdprBody' },
    { n: 'sectorName', b: 'sectorBody' },
] as const

const responsibleAi = [
    { l: 'sovInfLabel',   b: 'sovInfBody' },
    { l: 'provenLabel',   b: 'provenBody' },
    { l: 'citationLabel', b: 'citationBody' },
    { l: 'refusalLabel',  b: 'refusalBody' },
    { l: 'hitlLabel',     b: 'hitlBody' },
    { l: 'noCovertLabel', b: 'noCovertBody' },
] as const

const lifecycle = [
    { n: '01', s: 'l1Stage', b: 'l1Body' },
    { n: '02', s: 'l2Stage', b: 'l2Body' },
    { n: '03', s: 'l3Stage', b: 'l3Body' },
    { n: '04', s: 'l4Stage', b: 'l4Body' },
    { n: '05', s: 'l5Stage', b: 'l5Body' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.trust.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                {{ $t('pages.trust.hero.headline') }}
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.trust.hero.body') }}
            </p>
            <div class="mt-10">
                <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.trust.hero.cta') }}</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup :title="$t('pages.trust.principles.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.trust.principles.headline') }}
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('pages.trust.principles.body') }}
                </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="p in principles" :key="p.l" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.trust.principles.${p.l}`) }}</p>
                    <p class="text-b2 text-drygray-100 mt-3 leading-relaxed">{{ $t(`pages.trust.principles.${p.b}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.trust.matrix.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.trust.matrix.headline') }}
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    {{ $t('pages.trust.matrix.body') }}
                </p>
            </div>
            <!-- P1.2 (2026-05-24 audit): the 7×5 matrix needs ~900px to render without
                 wrapping cells. On every viewport <1024px that triggered horizontal
                 scroll (WCAG 1.4.10 reflow violation at 400% zoom). Now: cards on
                 mobile/tablet, table on desktop. Same data, different presentation.

                 Card variant: one card per attribute (7 cards) with a 4-row dl listing
                 each mode + its value. Scannable, accessible to assistive tech via dl,
                 no horizontal scroll at any viewport. -->
            <div class="bg-whitesmoke-100 rounded-2xl hidden lg:block overflow-x-auto">
                <table class="w-full text-left min-w-[900px]">
                    <thead>
                        <tr class="bg-white border-b border-drygray-200">
                            <th class="px-5 py-4 w-[22%]"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">{{ $t('pages.trust.matrix.attributeHeader') }}</span></th>
                            <th class="px-5 py-4"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">{{ $t('pages.trust.matrix.onpremHeader') }}</span></th>
                            <th class="px-5 py-4"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">{{ $t('pages.trust.matrix.airgapHeader') }}</span></th>
                            <th class="px-5 py-4"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">{{ $t('pages.trust.matrix.sovereignHeader') }}</span></th>
                            <th class="px-5 py-4"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">{{ $t('pages.trust.matrix.privateHeader') }}</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in matrixRows" :key="row.a" :class="[i % 2 === 0 ? 'bg-white' : 'bg-whitesmoke-100', 'border-t border-drygray-200']">
                            <td class="px-5 py-4 align-top"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.trust.matrix.${row.a}`) }}</span></td>
                            <td class="px-5 py-4 text-b1 text-drygray-100">{{ $t(`pages.trust.matrix.${row.m.onprem}`) }}</td>
                            <td class="px-5 py-4 text-b1 text-drygray-100">{{ $t(`pages.trust.matrix.${row.m.airgap}`) }}</td>
                            <td class="px-5 py-4 text-b1 text-drygray-100">{{ $t(`pages.trust.matrix.${row.m.sov}`) }}</td>
                            <td class="px-5 py-4 text-b1 text-drygray-100">{{ $t(`pages.trust.matrix.${row.m.priv}`) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mobile/tablet stacked-card variant. 7 cards × 4 dl rows = same 28 cell
                 values as the desktop table, but reorganized so each attribute reads
                 as a discrete card. dl/dt/dd is the right semantic shape for
                 attribute-value pairs and is announced as a list by NVDA/VoiceOver. -->
            <div class="lg:hidden space-y-3">
                <div v-for="row in matrixRows" :key="row.a" class="bg-whitesmoke-100 rounded-2xl p-5 sm:p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text mb-4">{{ $t(`pages.trust.matrix.${row.a}`) }}</p>
                    <dl class="divide-y divide-drygray-200">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-3 first:pt-0 last:pb-0">
                            <dt class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ $t('pages.trust.matrix.onpremHeader') }}</dt>
                            <dd class="text-b1 text-drygray-100 sm:text-right">{{ $t(`pages.trust.matrix.${row.m.onprem}`) }}</dd>
                        </div>
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-3">
                            <dt class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ $t('pages.trust.matrix.airgapHeader') }}</dt>
                            <dd class="text-b1 text-drygray-100 sm:text-right">{{ $t(`pages.trust.matrix.${row.m.airgap}`) }}</dd>
                        </div>
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-3">
                            <dt class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ $t('pages.trust.matrix.sovereignHeader') }}</dt>
                            <dd class="text-b1 text-drygray-100 sm:text-right">{{ $t(`pages.trust.matrix.${row.m.sov}`) }}</dd>
                        </div>
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 py-3 last:pb-0">
                            <dt class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ $t('pages.trust.matrix.privateHeader') }}</dt>
                            <dd class="text-b1 text-drygray-100 sm:text-right">{{ $t(`pages.trust.matrix.${row.m.priv}`) }}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.trust.access.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.trust.access.headline') }}
                </h2>
            </div>
            <div class="bg-white rounded-2xl divide-y divide-drygray-200">
                <div v-for="a in accessControl" :key="a.l" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ $t(`pages.trust.access.${a.l}`) }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ $t(`pages.trust.access.${a.b}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup :title="$t('pages.trust.audit.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.trust.audit.headline') }}
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('pages.trust.audit.body') }}
                </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="a in auditAttributes" :key="a.l" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.trust.audit.${a.l}`) }}</p>
                    <p class="text-b2 text-drygray-100 mt-3 leading-relaxed">{{ $t(`pages.trust.audit.${a.b}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup :title="$t('pages.trust.standards.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.trust.standards.headline') }}
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    {{ $t('pages.trust.standards.body') }}
                </p>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl divide-y divide-drygray-200">
                <div v-for="s in standards" :key="s.n" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ $t(`pages.trust.standards.${s.n}`) }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ $t(`pages.trust.standards.${s.b}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup :title="$t('pages.trust.ai.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.trust.ai.headline') }}
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('pages.trust.ai.body') }}
                </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="r in responsibleAi" :key="r.l" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t(`pages.trust.ai.${r.l}`) }}</p>
                    <p class="text-b2 text-drygray-100 mt-3 leading-relaxed">{{ $t(`pages.trust.ai.${r.b}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup :title="$t('pages.trust.lifecycle.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.trust.lifecycle.headline') }}
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('pages.trust.lifecycle.body') }}
                </p>
            </div>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div v-for="step in lifecycle" :key="step.n" class="bg-white rounded-2xl p-5">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ step.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2">{{ $t(`pages.trust.lifecycle.${step.s}`) }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ $t(`pages.trust.lifecycle.${step.b}`) }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.trust.engage.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        {{ $t('pages.trust.engage.headline') }}
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        {{ $t('pages.trust.engage.body') }}
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.trust.engage.cta') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
