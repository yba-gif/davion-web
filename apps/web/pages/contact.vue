<script setup lang="ts">
useSeoMeta({ title: 'Engage', description: 'Request a briefing or contact Davion. Consultative intake — tell us what you are trying to decide.' })

const intents = [
    { label: 'Briefing', desc: 'A tailored, consultative session on AlpOS and the Davion approach.' },
    { label: 'Partnership', desc: 'Joint deployments, integrations, and strategic partnerships.' },
    { label: 'Press', desc: 'Media inquiries and Newsroom contact.' },
    { label: 'Careers', desc: 'Open roles and speculative outreach for mission-aligned engineers and operators.' },
    { label: 'Venture', desc: 'Founders building in sovereign data, AI, or defense-adjacent technology.' },
]
</script>

<template>
    <div class="bg-ink text-bone min-h-[calc(100vh-4rem)]">
        <main class="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-44 lg:pb-32">
            <p class="text-eyebrow mb-6">Engage</p>
            <h1 class="text-display-l text-bone-bright max-w-4xl">Tell us what you're trying to decide.</h1>
            <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                Davion engagements are consultative. We route you to the right team based on what you bring. Tell us your intent, and we will reach out.
            </p>

            <div class="mt-16 border-t border-ink-200">
                <div v-for="intent in intents" :key="intent.label" class="grid lg:grid-cols-12 gap-6 py-6 border-b border-ink-200">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">{{ intent.label }}</p>
                    </div>
                    <p class="lg:col-span-9 text-body text-bone">{{ intent.desc }}</p>
                </div>
            </div>

            <div class="mt-12 grid lg:grid-cols-12 gap-12 items-end">
                <div class="lg:col-span-8">
                    <p class="text-body-l text-steel-light max-w-2xl">
                        A consultative intake form lands in a subsequent slice. For now, write to us directly — and tell us which intent applies.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <a href="mailto:briefings@davion.com" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                        briefings@davion.com
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </main>
    </div>
</template>
