<script setup lang="ts">
useSeoMeta({
    title: 'Privacy policy',
    description: 'How Davion handles personal data on this website. Sovereign by deployment; minimal-collection by default.',
    ogTitle: 'Davion · Privacy policy',
    ogDescription: 'How Davion handles personal data on this website. Minimal-collection by default.',
})

const lastUpdated = '2026-05-21'

const sections = [
    {
        n: '01',
        title: 'Who this applies to',
        body: 'This Privacy Policy applies to visitors of davion.com and Davion-operated subdomains. It does not describe how Davion handles data inside customer deployments, those are governed by the Master Services Agreement with the relevant institution, the Data Processing Agreement, and the deployment posture (on-prem / air-gapped / sovereign cloud).',
    },
    {
        n: '02',
        title: 'What we collect on this website',
        body: 'When you visit Davion pages we collect: the URL you visited, the referring URL if any, your IP address (truncated for analytics), your user-agent string, and approximate country from your IP. When you submit the engagement form, we collect the contact details you provide (name, email, organisation, role, free-text intent) plus the metadata above. We do not load third-party trackers without consent.',
    },
    {
        n: '03',
        title: 'Why we collect it',
        body: 'Operational analytics (which pages are visited, where readers come from, which content gets engagement) and engagement intake (so we can reply to your enquiry, route it to the right team, and keep a record of the conversation). We do not sell, share, or rent personal data.',
    },
    {
        n: '04',
        title: 'How long we keep it',
        body: 'Anonymous analytics events: 24 months, then deleted. Engagement enquiries: retained for the lifetime of the relationship, plus 7 years after the last interaction for legal/audit reasons, then deleted. You may request earlier deletion at the contact below.',
    },
    {
        n: '05',
        title: 'Your rights',
        body: 'Under the EU GDPR, the Turkish KVKK, and equivalent laws elsewhere, you may request access to, correction of, restriction on, or deletion of your personal data. You may also withdraw consent and lodge a complaint with your supervisory authority. We respond inside 30 days.',
    },
    {
        n: '06',
        title: 'Cookies',
        body: 'Davion uses one strictly-necessary cookie to remember your cookie-consent choice. We do not load analytics or third-party cookies without your explicit opt-in. See the cookie banner on first visit, or the cookie policy linked below.',
    },
    {
        n: '07',
        title: 'Where the data lives',
        body: 'Davion operates from Zurich and Istanbul. Website operational data is processed in EU/Swiss jurisdictions. Customer-deployment data lives where you specify in your engagement contract, inside your perimeter for on-prem and air-gapped postures; in your contracted sovereign-cloud region otherwise.',
    },
    {
        n: '08',
        title: 'Contact',
        body: 'For privacy enquiries or to exercise your rights, write to privacy@davion.com. A formal Data Protection Officer contact will be published once the legal entity is finalised.',
    },
    {
        n: '09',
        title: 'Changes to this policy',
        body: 'When material changes happen, the Last-updated date below changes and we post a Newsroom dispatch within 30 days. For minor edits (typo, clarification), the Last-updated date changes silently.',
    },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup title="Legal · Privacy policy" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                Privacy policy<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                A v1 policy in plain language. Davion is early-stage; this document will become more specific as the legal entity, processors, and certifications are finalised. The Last-updated date at the foot of the page tracks every change.
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
                    <NuxtLink to="/legal/terms"><CommonButton variant="outline" size="xs" icon="base:arrow">Terms</CommonButton></NuxtLink>
                    <NuxtLink to="/legal/cookies"><CommonButton variant="outline" size="xs" icon="base:arrow">Cookies</CommonButton></NuxtLink>
                    <NuxtLink to="/legal/responsible-ai"><CommonButton variant="outline" size="xs" icon="base:arrow">Responsible AI</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
