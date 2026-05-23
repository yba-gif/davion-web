<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.venture.meta.title'),
    description: () => t('pages.venture.meta.description'),
    ogTitle: () => t('pages.venture.meta.ogTitle'),
    ogDescription: () => t('pages.venture.meta.ogDescription'),
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.venture.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                {{ $t('pages.venture.hero.headline') }}<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.venture.hero.body') }}
            </p>
        </section>

        <!-- Empty-state placeholder (P2.U6) until thesis + intake are publishable -->
        <EmptyState
            variant="soft"
            :eyebrow="$t('pages.venture.empty.eyebrow')"
            :headline="$t('pages.venture.empty.headline')"
            :body="$t('pages.venture.empty.body')"
        >
            <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.venture.empty.ctaPrimary') }}</CommonButton></NuxtLink>
            <template #extra>
                <NuxtLink :to="localePath('/company/about')"><CommonButton variant="outline" icon="base:arrow">{{ $t('pages.venture.empty.ctaSecondary') }}</CommonButton></NuxtLink>
            </template>
        </EmptyState>
    </div>
</template>
