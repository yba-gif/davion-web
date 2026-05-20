<script setup lang="ts">
useSeoMeta({
    title: 'Engage',
    description: 'Request a briefing or contact Davion. Consultative intake — tell us what you are trying to decide.',
})

const intents = [
    { label: 'Briefing', desc: 'A tailored, consultative session on AlpOS and the Davion approach.' },
    { label: 'Partnership', desc: 'Joint deployments, integrations, and strategic partnerships.' },
    { label: 'Press', desc: 'Media inquiries and Newsroom contact.' },
    { label: 'Careers', desc: 'Open roles and speculative outreach for mission-aligned engineers and operators.' },
    { label: 'Venture', desc: 'Founders building in sovereign data, AI, or defense-adjacent technology.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Engage" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Tell us what you're trying to decide.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion engagements are consultative. We route you to the right team based on what you bring. Tell us your intent, and we will reach out.
            </p>
        </section>

        <section class="bg-aliceblue rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Intents" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05] max-w-3xl">
                Which one applies?
            </h2>
            <div class="mt-8 bg-white rounded-2xl divide-y divide-drygray-200">
                <div v-for="intent in intents" :key="intent.label" class="grid lg:grid-cols-12 gap-4 px-6 md:px-8 py-6">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary self-center">{{ intent.label }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ intent.desc }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Reach us" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Write to us.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        A consultative intake form lands in a subsequent slice. For now, write to us directly — and tell us which intent applies.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <a href="mailto:briefings@davion.com"><CommonButton variant="primary" icon="base:arrow">briefings@davion.com</CommonButton></a>
                </div>
            </div>
        </section>
    </div>
</template>
