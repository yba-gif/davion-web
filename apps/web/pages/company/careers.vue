<script setup lang="ts">
useSeoMeta({
    title: 'Careers',
    description: 'Davion hires for the mission. Senior engineers and operators who have lived inside regulated institutions, banks, ministries, defense, not just sold to them.',
    ogTitle: 'Davion · Careers',
    ogDescription: 'Sovereign AI is operator work. Roles for engineers and field operators who have lived the mission.',
})

const roles = [
    {
        title: 'Founding Engineer · Platform',
        team: 'Engineering',
        location: 'Zurich · Istanbul · Remote (CET ±2)',
        body: 'Build AlpOS, the sovereign AI platform. Distributed systems, ontology, retrieval, agentic reasoning. You write the architecture documents and the production code that lands them.',
        signals: [
            'Distributed-systems depth (Kafka / Postgres / Flink class)',
            'Comfort owning a system end to end, from on-call to interview pipeline',
            'Has shipped AI/ML in production against real adversarial inputs',
        ],
    },
    {
        title: 'Solutions Engineer · Field',
        team: 'Field',
        location: 'Zurich · Istanbul · Travel (40-60%)',
        body: 'Lead engagements inside institutions. Map their data architecture, build the pilot deployment, sit beside their analysts, hand off to their operators. You are the operational face of Davion in a specific account.',
        signals: [
            'Has deployed software inside a bank, ministry, defense or critical-infrastructure operator',
            'Reads architecture documents and threat models for fun',
            'Can run a workshop and write a procurement response in the same week',
        ],
    },
    {
        title: 'Sales Engineer · Pre-sales',
        team: 'Go-to-market',
        location: 'Zurich · Remote (EU)',
        body: 'Run technical evaluations with prospective customers. Architect proof-of-concept deployments. Write the technical answers in RFI / RFP responses that win institutional procurement.',
        signals: [
            'Background in solutions engineering at an enterprise data or AI vendor',
            'Comfortable with on-prem and air-gapped deployment topology',
            'Speaks the language of CIOs, CISOs, and procurement leaders',
        ],
    },
    {
        title: 'Senior ML Engineer · Retrieval & RAG',
        team: 'Engineering',
        location: 'Zurich · Istanbul · Remote (CET ±2)',
        body: 'Own the retrieval and RAG stack inside AlpOS. Index design, embedding strategy, access-controlled retrieval, evaluation against real institutional corpora. You ship the system; you also defend it in a customer audit.',
        signals: [
            'Has shipped retrieval at scale (≥ 100M docs) in production',
            'Strong evaluation discipline, golden sets, retrieval@k, faithfulness',
            'Reads adversarial-prompt research and applies it to customer environments',
        ],
    },
    {
        title: 'Founding Designer',
        team: 'Brand · Product',
        location: 'Zurich · Remote (CET ±2)',
        body: 'Shape Davion\'s visual identity and product surface. Logo, type, product UI, in-room documents. You are the calibrator of Davion\'s aesthetic; your work goes from this site to the briefing room.',
        signals: [
            'Strong identity / brand work in your portfolio',
            'Has shipped product UI on real surfaces (not just dribbble shots)',
            'Comfortable being the lone designer for a year',
        ],
    },
]

const process = [
    {
        n: '01',
        title: 'Conversation',
        body: 'A 30-minute call with the founder or a hiring lead. We discuss the mission, the role, your work, and whether the chemistry is there to keep going. No pitch deck. No homework.',
    },
    {
        n: '02',
        title: 'Work session',
        body: 'A real working session against a real Davion problem, usually 2-4 hours, paid. You see how we think; we see how you think. We do not believe in unpaid take-homes.',
    },
    {
        n: '03',
        title: 'Decision',
        body: 'Reference conversations on both sides. Offer or honest decline within a week of the work session. We respect your time.',
    },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Company · Careers" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                Sovereign AI is operator work<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion hires people who have lived inside regulated institutions, banks, ministries, defense, energy, critical infrastructure, not just sold to them. We are early. The work is consequential. Compensation includes meaningful equity and is benchmarked against top-decile institutional vendors.
            </p>
        </section>

        <!-- EVP, what working here actually looks like -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10">
                <div class="lg:col-span-4">
                    <CommonSup title="What working here looks like" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        Five things we promise<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <ol class="lg:col-span-8 space-y-3 text-b1 text-drygray-100">
                    <li class="bg-white rounded-2xl p-5 flex items-start gap-4">
                        <span class="text-primary-text mt-1.5 text-lg" aria-hidden="true">·</span>
                        <span><strong class="font-semibold">Consequential problems.</strong> The customers are institutions where decisions actually matter. The bugs you fix make the news for the right reasons; the ones you ship matter for the wrong ones.</span>
                    </li>
                    <li class="bg-white rounded-2xl p-5 flex items-start gap-4">
                        <span class="text-primary-text mt-1.5 text-lg" aria-hidden="true">·</span>
                        <span><strong class="font-semibold">Small team for a long time.</strong> We hire deliberately. You will know everyone. You will be deeply load-bearing on something. You will not get diluted into a process org.</span>
                    </li>
                    <li class="bg-white rounded-2xl p-5 flex items-start gap-4">
                        <span class="text-primary-text mt-1.5 text-lg" aria-hidden="true">·</span>
                        <span><strong class="font-semibold">Operator culture.</strong> Engineers go on-site. Field roles read the code. We do not have a wall between "build" and "deploy."</span>
                    </li>
                    <li class="bg-white rounded-2xl p-5 flex items-start gap-4">
                        <span class="text-primary-text mt-1.5 text-lg" aria-hidden="true">·</span>
                        <span><strong class="font-semibold">Real equity.</strong> Meaningful early-stage grants with founder-friendly vesting. We are building a company with real customers, not a markup carousel.</span>
                    </li>
                    <li class="bg-white rounded-2xl p-5 flex items-start gap-4">
                        <span class="text-primary-text mt-1.5 text-lg" aria-hidden="true">·</span>
                        <span><strong class="font-semibold">Honest hiring.</strong> Paid work sessions instead of unpaid take-homes. Real conversations instead of trick questions. Decisions inside a week.</span>
                    </li>
                </ol>
            </div>
        </section>

        <!-- Open roles -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                    <CommonSup title="Open roles" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        Five open seats<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <p class="text-b2 text-drygray-default max-w-md">
                    All roles based in Zurich or Istanbul with remote-friendly arrangements for CET ±2. Field roles travel 40–60%.
                </p>
            </div>
            <ul class="space-y-4">
                <li v-for="r in roles" :key="r.title" class="bg-whitesmoke-100 rounded-2xl p-7 md:p-9">
                    <div class="grid lg:grid-cols-12 gap-6">
                        <div class="lg:col-span-4">
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ r.team }}</p>
                            <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight">{{ r.title }}</p>
                            <p class="text-[13px] text-drygray-default mt-3">{{ r.location }}</p>
                        </div>
                        <div class="lg:col-span-8">
                            <p class="text-b1 text-drygray-100">{{ r.body }}</p>
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default mt-5 mb-2">Signals we look for</p>
                            <ul class="space-y-2 text-b1 text-drygray-default">
                                <li v-for="sig in r.signals" :key="sig" class="flex items-start gap-3">
                                    <span class="text-primary-text mt-1.5" aria-hidden="true">·</span>
                                    <span>{{ sig }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <!-- Hiring process -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14 max-w-3xl">
                <CommonSup title="How we hire" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                    Three steps. One week to a decision<span class="text-primary-text">.</span>
                </h2>
            </div>
            <ol class="grid md:grid-cols-3 gap-4">
                <li v-for="s in process" :key="s.n" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Step {{ s.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 leading-tight">{{ s.title }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ s.body }}</p>
                </li>
            </ol>
        </section>

        <!-- CTA -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Apply or stay in touch" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        If the work fits, send a note<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Apply directly via the engagement page. Include the role you're interested in, a link to a piece of work you're proud of, and what you would build first if you joined.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Apply</CommonButton></NuxtLink>
                    <NuxtLink to="/company/about"><CommonButton variant="outline" icon="base:arrow">Read About</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
