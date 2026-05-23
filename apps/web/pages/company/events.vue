<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('pages.events.meta.title'),
    description: () => t('pages.events.meta.description'),
    ogTitle: () => t('pages.events.meta.ogTitle'),
    ogDescription: () => t('pages.events.meta.ogDescription'),
})
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.events.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                {{ $t('pages.events.hero.headline') }}<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.events.hero.body') }}
            </p>
        </section>

        <!-- Empty-state pattern (P2.U6), honest placeholder until events are publishable -->
        <EmptyState
            variant="soft"
            :eyebrow="$t('pages.events.empty.eyebrow')"
            :headline="$t('pages.events.empty.headline')"
            :body="$t('pages.events.empty.body')"
        >
            <NuxtLink :to="localePath('/company/newsroom')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.events.empty.ctaPrimary') }}</CommonButton></NuxtLink>
            <template #extra>
                <a href="mailto:press@davion.com"><CommonButton variant="outline" icon="base:arrow">press{{ '@' }}davion.com</CommonButton></a>
            </template>
        </EmptyState>
    </div>
</template>
