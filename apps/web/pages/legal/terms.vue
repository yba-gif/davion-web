<script setup lang="ts">
useSeoMeta({
    title: 'Website terms of use',
    description: 'Terms of use for the davion.com website. Commercial engagements are governed by separate Master Services Agreement.',
    ogTitle: 'Davion · Website terms',
    ogDescription: 'Terms of use for the davion.com website.',
})

const lastUpdated = '2026-05-21'

const sections = [
    {
        n: '01',
        title: 'Scope',
        body: 'These Terms govern your use of davion.com and Davion-operated subdomains. They do not govern any Davion software or platform deployment. Commercial engagements are governed by a separate Master Services Agreement and the deployment-specific Data Processing Agreement.',
    },
    {
        n: '02',
        title: 'Use of the site',
        body: 'You may read, link to, and quote from publicly published Davion content under fair-use and equivalent doctrines. You may not scrape the site at high volume, attempt to reverse-engineer non-public surfaces, attempt to compromise hosting or analytics, or impersonate Davion in your own publications.',
    },
    {
        n: '03',
        title: 'Content ownership',
        body: 'Site copy, the Davion mark, the wordmark, and the spiral image are property of Davion and its licensors. The AlpOS architecture, layer names, and supporting diagrams are Davion intellectual property. Published Newsroom posts may be quoted under fair use; commercial republishing requires written permission via press@davion.com.',
    },
    {
        n: '04',
        title: 'Forward-looking statements',
        body: 'Site content discussing planned product capabilities, certifications, geographic expansion, and engagement timelines is forward-looking. Davion is early-stage and reserves the right to change roadmap, feature set, certification targets, and timing without notice. No promise in marketing copy creates a contractual obligation; commercial obligations live in the executed MSA.',
    },
    {
        n: '05',
        title: 'No warranty on the marketing site',
        body: 'davion.com is provided "as is." Davion does not warrant that the site is uninterrupted, error-free, or that linked third-party resources will remain available. This disclaimer is limited to the marketing site, production deployments are warranted under the MSA.',
    },
    {
        n: '06',
        title: 'Liability cap',
        body: 'For the marketing site only, Davion\'s liability to you for site-related claims is limited to the greater of EUR 100 or the fees you have paid Davion (typically zero, since the site is free). Production deployments have separate liability terms in the MSA.',
    },
    {
        n: '07',
        title: 'Jurisdiction',
        body: 'These Terms are governed by the laws of Switzerland. Disputes will be resolved in the courts of Zürich. If you engage Davion commercially, your MSA may specify a different governing-law / dispute-resolution regime.',
    },
    {
        n: '08',
        title: 'Contact',
        body: 'Questions about these Terms: legal@davion.com.',
    },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup title="Legal · Terms of use" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                Website terms of use<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                These Terms govern the marketing site. Commercial engagements run under a separate Master Services Agreement. The MSA is the document you read carefully before signing; this one keeps the marketing site working honestly.
            </p>
            <p class="text-[13px] font-mono uppercase tracking-[0.15em] text-drygray-default mt-8">
                Last updated · {{ lastUpdated }}
            </p>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <ol class="space-y-8 max-w-4xl">
                <li v-for="s in sections" :key="s.n" class="grid md:grid-cols-12 gap-4 md:gap-8 border-t border-drygray-200 pt-8 first:border-t-0 first:pt-0">
                    <div class="md:col-span-3">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Section {{ s.n }}</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight">{{ s.title }}</p>
                    </div>
                    <div class="md:col-span-9">
                        <p class="text-b1 text-drygray-100 leading-relaxed">{{ s.body }}</p>
                    </div>
                </li>
            </ol>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div class="grid lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-8">
                    <CommonSup title="Other legal" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05]">
                        Related documents<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-wrap gap-3 lg:justify-end">
                    <NuxtLink to="/legal/privacy"><CommonButton variant="outline" size="xs" icon="base:arrow">Privacy</CommonButton></NuxtLink>
                    <NuxtLink to="/legal/cookies"><CommonButton variant="outline" size="xs" icon="base:arrow">Cookies</CommonButton></NuxtLink>
                    <NuxtLink to="/legal/responsible-ai"><CommonButton variant="outline" size="xs" icon="base:arrow">Responsible AI</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
