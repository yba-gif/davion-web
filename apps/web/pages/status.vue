<script setup lang="ts">
useSeoMeta({
    title: 'Status',
    description: 'Operational status of Davion services. The marketing site, the engagement intake, and per-deployment status routes.',
    ogTitle: 'Davion · Status',
    ogDescription: 'Operational status of Davion services.',
})

// Static status view. Real per-component status comes from a managed status
// provider (StatusPage / Better Stack / Atlassian) once production deploy
// lands per P3.6. This page is honest until then.
const lastChecked = '2026-05-21'

const services = [
    {
        name: 'davion.com (marketing site)',
        status: 'operational',
        detail: 'Nuxt 3 SSR. Cached at edge. No incidents tracked since launch.',
    },
    {
        name: 'Engagement intake',
        status: 'operational',
        detail: 'mailto-based intake to engagement@davion.com. Routing inside one business day.',
    },
    {
        name: 'Newsroom & content API',
        status: 'operational',
        detail: 'Postgres-backed. Read-only public API at /api/blog.',
    },
    {
        name: 'Per-customer AlpOS deployments',
        status: 'per-deployment',
        detail: 'Customer deployments run inside the customer\'s perimeter. Their status is reported under their engagement contract — not on this public page.',
    },
]

const statusColour = (s: string) =>
    s === 'operational' ? 'bg-primary' : s === 'per-deployment' ? 'bg-drygray-default' : 'bg-red-500'

const statusLabel = (s: string) =>
    s === 'operational' ? 'Operational' : s === 'per-deployment' ? 'Per deployment' : 'Disrupted'
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Operations · Status" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                Operational status<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                The public surfaces — this site, the engagement intake, the newsroom API. Customer-deployment status is reported under the engagement contract, not here; sovereignty by deployment cuts both ways.
            </p>
            <p class="text-[13px] font-mono uppercase tracking-[0.15em] text-drygray-default mt-8">
                Last checked · {{ lastChecked }}
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
                        All public services operational<span class="text-primary-text">.</span>
                    </p>
                    <p class="text-b1 text-drygray-default mt-3">
                        No incidents currently tracked. To report a suspected issue, write to <a href="mailto:ops@davion.com" class="text-primary-text underline underline-offset-2 hover:no-underline">ops@davion.com</a>.
                    </p>
                </div>
            </div>
        </section>

        <!-- Per-service list -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Services" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                What's covered here<span class="text-primary-text">.</span>
            </h2>
            <ul class="mt-10 space-y-3">
                <li v-for="s in services" :key="s.name" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <div class="grid md:grid-cols-12 gap-4 items-center">
                        <div class="md:col-span-1">
                            <span class="block w-3 h-3 rounded-full" :class="statusColour(s.status)" aria-hidden="true" />
                        </div>
                        <div class="md:col-span-4">
                            <p class="font-degular font-bold text-drygray-100 text-h3 leading-tight">{{ s.name }}</p>
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text mt-1">{{ statusLabel(s.status) }}</p>
                        </div>
                        <div class="md:col-span-7">
                            <p class="text-b1 text-drygray-default">{{ s.detail }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <!-- Incident history -->
        <section class="bg-aliceblue rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup title="Incident history" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05] max-w-3xl">
                No incidents on record<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b1 text-drygray-default mt-6 max-w-3xl">
                Davion is early-stage; the public surfaces have not been live long enough to produce a meaningful incident history. Once we deploy under a managed status provider (P3.6), per-component uptime and incident timelines will live here.
            </p>
        </section>

        <!-- How to report -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Reporting" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05]">
                        Found something that's not working<span class="text-primary-text">?</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        For public-surface issues (this site, the engagement intake, the newsroom): ops@davion.com. For per-deployment incidents inside your engagement: route through your assigned solutions engineer or the contractual support channel.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <a href="mailto:ops@davion.com"><CommonButton variant="primary" icon="base:arrow">ops@davion.com</CommonButton></a>
                </div>
            </div>
        </section>
    </div>
</template>
