<script setup lang="ts">
useSeoMeta({
    title: 'Engage',
    description: 'Book a demo or speak to an expert. Consultative intake — tell us what you are trying to decide.',
    ogTitle: 'Davion · Engage',
    ogDescription: 'Briefings are consultative. Tell us what you are trying to decide; we route to the right team.',
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
                Tell us what you're trying to decide<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion engagements are consultative. We route you to the right team based on what you bring. Tell us your intent, and we will reach out.
            </p>
        </section>

        <!-- P0.U3: scheduling embed — the destination every site-wide "Book a demo"
             CTA routes to. Single source of scheduling truth (runtimeConfig). -->
        <SchedulingEmbed />

        <section class="bg-aliceblue rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Intents" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05] max-w-3xl">
                Which one applies?
            </h2>
            <div class="mt-8 bg-white rounded-2xl divide-y divide-drygray-200">
                <div v-for="intent in intents" :key="intent.label" class="grid lg:grid-cols-12 gap-4 px-6 md:px-8 py-6">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ intent.label }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ intent.desc }}</p>
                </div>
            </div>
        </section>

        <!-- Per-team email routing. Generic intake handled by SchedulingEmbed above. -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <CommonSup title="Direct email · per team" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                Or write to the right team directly<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                If your enquiry is not a briefing, these inboxes route faster than the generic intake.
            </p>
            <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <a href="mailto:engagement@davion.com" class="bg-white card-hover rounded-2xl p-6 block group">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Engagement · Partnership</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">engagement@</p>
                </a>
                <a href="mailto:press@davion.com" class="bg-white card-hover rounded-2xl p-6 block group">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Press · Analyst</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">press@</p>
                </a>
                <a href="mailto:careers@davion.com" class="bg-white card-hover rounded-2xl p-6 block group">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Careers</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">careers@</p>
                </a>
                <a href="mailto:ops@davion.com" class="bg-white card-hover rounded-2xl p-6 block group">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Operations · Status</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight group-hover:text-primary-text transition-colors">ops@</p>
                </a>
            </div>
        </section>
    </div>
</template>
