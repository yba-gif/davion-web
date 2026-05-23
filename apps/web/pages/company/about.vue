<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
    title: () => t('nav.about'),
    description: () => t('pages.about.hero.body'),
    ogTitle: () => `${t('nav.about')} · Davion`,
    ogDescription: () => `${t('pages.about.hero.headline1')}. ${t('pages.about.hero.headline2')}.`,
})

// Founder bio modal. Triggered from the team card. Closes on backdrop
// click or ESC. Body scroll lock while open so the page underneath
// doesn't shift.
const showBio = ref(false)

function openBio() { showBio.value = true }
function closeBio() { showBio.value = false }

function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && showBio.value) closeBio()
}

watch(showBio, (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    if (typeof document !== 'undefined') document.body.style.overflow = ''
})

// Five-claims data. Title + body resolve via $t() at render time so the
// section tracks the active locale.
const values = [
    { n: '01', titleKey: 'pages.about.believe.c01t', bodyKey: 'pages.about.believe.c01b' },
    { n: '02', titleKey: 'pages.about.believe.c02t', bodyKey: 'pages.about.believe.c02b' },
    { n: '03', titleKey: 'pages.about.believe.c03t', bodyKey: 'pages.about.believe.c03b' },
    { n: '04', titleKey: 'pages.about.believe.c04t', bodyKey: 'pages.about.believe.c04b' },
    { n: '05', titleKey: 'pages.about.believe.c05t', bodyKey: 'pages.about.believe.c05b' },
] as const
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup :title="$t('pages.about.hero.sup')" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[76px] tracking-tight max-w-4xl">
                {{ $t('pages.about.hero.headline1') }}<span class="text-primary-text">.</span><br>{{ $t('pages.about.hero.headline2') }}<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                {{ $t('pages.about.hero.body') }}
            </p>
        </section>

        <!-- What is sovereign AI? Definitional anchor for novice buyers. -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-10 items-start">
                <div class="lg:col-span-4">
                    <CommonSup :title="$t('pages.about.sovereignAI.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        {{ $t('pages.about.sovereignAI.headline') }}<span class="text-primary-text">?</span>
                    </h2>
                </div>
                <div class="lg:col-span-8 space-y-5 text-[17px] leading-[1.6] text-drygray-100 font-medium">
                    <p>
                        {{ $t('pages.about.sovereignAI.p1Before') }}<strong class="font-semibold">{{ $t('pages.about.sovereignAI.p1Bold') }}</strong>{{ $t('pages.about.sovereignAI.p1After') }}
                    </p>
                    <p>
                        {{ $t('pages.about.sovereignAI.p2') }}
                    </p>
                    <p>
                        {{ $t('pages.about.sovereignAI.p3') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Why Davion exists -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-10 items-start">
                <div class="lg:col-span-4">
                    <CommonSup :title="$t('pages.about.why.sup')" />
                </div>
                <div class="lg:col-span-8 space-y-6 text-[17px] md:text-[19px] leading-[1.55] text-drygray-100 font-medium">
                    <p>{{ $t('pages.about.why.p1') }}</p>
                    <p>{{ $t('pages.about.why.p2') }}</p>
                    <p>{{ $t('pages.about.why.p3') }}</p>
                    <p>
                        {{ $t('pages.about.why.p4Before') }} <em>{{ $t('pages.about.why.p4Em1') }}</em> {{ $t('pages.about.why.p4Mid') }} <em>{{ $t('pages.about.why.p4Em2') }}</em> {{ $t('pages.about.why.p4After') }}
                    </p>
                    <p>{{ $t('pages.about.why.p5') }}</p>
                    <p>{{ $t('pages.about.why.p6') }}</p>
                </div>
            </div>
        </section>

        <!-- What we believe, 5 values written as sentences, not nouns -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="mb-12 md:mb-16 max-w-3xl">
                <CommonSup :title="$t('pages.about.believe.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.about.believe.headline') }}<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('pages.about.believe.body') }}
                </p>
            </div>
            <ol class="space-y-8">
                <li v-for="v in values" :key="v.n" class="grid lg:grid-cols-12 gap-6 lg:gap-10 border-t border-drygray-200 pt-8">
                    <div class="lg:col-span-3">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.about.believe.claimLabel') }} {{ v.n }}</p>
                        <p class="font-degular font-bold text-drygray-100 text-[22px] md:text-[26px] leading-[1.15] mt-3">{{ $t(v.titleKey) }}<span class="text-primary-text">.</span></p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-b1 text-drygray-100 leading-[1.55]">{{ $t(v.bodyKey) }}</p>
                    </div>
                </li>
            </ol>
        </section>

        <!-- How we work, engagement model -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-10 items-start">
                <div class="lg:col-span-4">
                    <CommonSup :title="$t('pages.about.work.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        {{ $t('pages.about.work.h1') }}<span class="text-primary-text">.</span><br>{{ $t('pages.about.work.h2') }}<span class="text-primary-text">.</span><br>{{ $t('pages.about.work.h3') }}<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <div class="lg:col-span-8 space-y-6 text-[17px] leading-[1.55] text-drygray-100">
                    <p>
                        <strong class="font-semibold">{{ $t('pages.about.work.p1bold') }}</strong> {{ $t('pages.about.work.p1') }}
                    </p>
                    <p>
                        <strong class="font-semibold">{{ $t('pages.about.work.p2bold') }}</strong> {{ $t('pages.about.work.p2') }}
                    </p>
                    <p>
                        <strong class="font-semibold">{{ $t('pages.about.work.p3bold') }}</strong> {{ $t('pages.about.work.p3Before') }} <NuxtLink :to="localePath('/trust')" class="text-primary-text underline underline-offset-4 hover:no-underline">{{ $t('pages.about.work.p3Link') }}</NuxtLink>{{ $t('pages.about.work.p3After') }}
                    </p>
                    <p>
                        <strong class="font-semibold">{{ $t('pages.about.work.p4bold') }}</strong> {{ $t('pages.about.work.p4') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Who's behind this -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="mb-10 md:mb-14 max-w-3xl">
                <CommonSup :title="$t('pages.about.team.sup')" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    {{ $t('pages.about.team.headline') }}<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    {{ $t('pages.about.team.bodyBefore') }} <strong class="font-semibold text-drygray-100">{{ $t('pages.about.team.bodyBold') }}</strong>{{ $t('pages.about.team.bodyAfter') }}
                </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white rounded-2xl p-6 flex flex-col">
                    <NuxtImg
                        src="/team/berkan-altun-240.webp"
                        :alt="`${$t('pages.about.team.berkanName')}, ${$t('pages.about.team.ceoRole')} of Davion`"
                        width="240"
                        height="240"
                        class="size-20 rounded-2xl object-cover mb-4"
                    />
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.about.team.ceoRole') }}</p>
                    <p class="font-degular font-bold text-drygray-100 text-h3 mt-3">{{ $t('pages.about.team.berkanName') }}</p>
                    <p class="text-b1 text-drygray-default mt-3">
                        {{ $t('pages.about.team.berkanBlurb') }}
                    </p>
                    <button
                        type="button"
                        class="mt-5 self-start text-[13px] font-semibold text-primary-text underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-primary-text focus-visible:outline-offset-2 rounded"
                        :aria-expanded="showBio"
                        aria-controls="berkan-altun-bio"
                        @click="openBio"
                    >
                        {{ $t('pages.about.team.readBio') }} →
                    </button>
                </div>
                <div class="bg-white/60 rounded-2xl p-6 border border-dashed border-drygray-200">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ $t('pages.about.team.hiringSeLabel') }}</p>
                    <p class="font-degular font-bold text-drygray-100 text-h3 mt-3">{{ $t('pages.about.team.openName') }}</p>
                    <p class="text-b1 text-drygray-default mt-3">
                        {{ $t('pages.about.team.hiringSeBody') }}
                    </p>
                </div>
                <div class="bg-white/60 rounded-2xl p-6 border border-dashed border-drygray-200">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ $t('pages.about.team.hiringFieldLabel') }}</p>
                    <p class="font-degular font-bold text-drygray-100 text-h3 mt-3">{{ $t('pages.about.team.openName') }}</p>
                    <p class="text-b1 text-drygray-default mt-3">
                        {{ $t('pages.about.team.hiringFieldBody') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup :title="$t('pages.about.cta.sup')" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        {{ $t('pages.about.cta.headline1') }}<span class="text-primary-text">,</span> {{ $t('pages.about.cta.headline2') }}<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink :to="localePath('/contact')"><CommonButton variant="primary" icon="base:arrow">{{ $t('pages.about.cta.button') }}</CommonButton></NuxtLink>
                </div>
            </div>
        </section>

        <!-- Bio modal. Teleported to body so it sits above all stacking contexts.
             Backdrop click closes; ESC key handled in <script setup>. -->
        <Teleport to="body">
            <Transition name="fade">
                <div
                    v-if="showBio"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="berkan-altun-bio-title"
                    data-lenis-prevent
                    class="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                    @click.self="closeBio"
                >
                    <div
                        id="berkan-altun-bio"
                        class="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-10 max-h-[90vh] overflow-y-auto relative"
                    >
                        <button
                            type="button"
                            class="absolute top-4 right-4 size-10 rounded-full bg-whitesmoke-100 hover:bg-drygray-200 flex items-center justify-center text-drygray-100 focus-visible:outline-2 focus-visible:outline-primary-text focus-visible:outline-offset-2"
                            :aria-label="$t('bio.closeBio')"
                            @click="closeBio"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3 L15 15 M15 3 L3 15"/></svg>
                        </button>
                        <div class="flex flex-col md:flex-row gap-6 md:gap-10 mt-2">
                            <NuxtImg
                                src="/team/berkan-altun.webp"
                                :alt="`${$t('pages.about.team.berkanName')}, ${$t('pages.about.team.ceoRole')} of Davion`"
                                width="600"
                                height="600"
                                class="size-40 md:size-48 rounded-2xl object-cover flex-shrink-0"
                            />
                            <div class="flex-1 min-w-0">
                                <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ $t('pages.about.team.ceoRole') }}</p>
                                <h3 id="berkan-altun-bio-title" class="font-degular font-bold text-drygray-100 text-h2 md:text-[36px] mt-3">{{ $t('pages.about.team.berkanName') }}</h3>
                                <div class="mt-6 space-y-4 text-[16px] leading-[1.6] text-drygray-100">
                                    <p>{{ $t('pages.about.team.bioP1') }}</p>
                                    <p>
                                        {{ $t('pages.about.team.bioP2Before') }} <strong class="font-semibold">{{ $t('pages.about.team.bioP2Bold') }}</strong>{{ $t('pages.about.team.bioP2After') }}
                                    </p>
                                    <p class="text-drygray-default">
                                        {{ $t('pages.about.team.bioP3Before') }} <NuxtLink :to="localePath('/contact')" class="text-primary-text underline underline-offset-4 hover:no-underline">{{ $t('pages.about.team.bioP3Link') }}</NuxtLink>{{ $t('pages.about.team.bioP3After') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
