<script setup lang="ts">
useSeoMeta({
    title: 'Responsible AI',
    description: 'Davion\'s commitments on data sovereignty, decision-trace lineage, human-in-the-loop, and adversarial robustness. The principles AlpOS is engineered against.',
    ogTitle: 'Davion · Responsible AI',
    ogDescription: 'Sovereignty, lineage, human-in-the-loop, robustness. The principles AlpOS is engineered against.',
})

const lastUpdated = '2026-05-21'

const commitments = [
    {
        n: '01',
        title: 'Data sovereignty by deployment',
        body: 'AlpOS deploys inside the customer\'s perimeter, on-prem, air-gapped, or in a sovereign cloud bound by contract. Customer data, weights, and audit logs stay where the customer specifies. We do not train central foundation models on customer data; what runs inside a customer deployment stays in that deployment.',
    },
    {
        n: '02',
        title: 'Lineage on every decision',
        body: 'Every output AlpOS produces points back to the data it was made on, the policy it applied, and the version of the model that produced it. A regulator or internal auditor can reconstruct the decision from raw source to final action. This is engineered into the spine, not bolted on.',
    },
    {
        n: '03',
        title: 'Human in the loop',
        body: 'AlpOS is a platform, not an autonomous agent. It proposes, cites its sources, and waits for approval. The platform does not move money, does not move people, does not move troops. The decisions belong to the operators accountable for them, analyst, compliance officer, commander.',
    },
    {
        n: '04',
        title: 'Adversarial robustness',
        body: 'Models that operate against adversarial inputs (OSINT, intelligence, fraud, cybersecurity) are evaluated against red-team scenarios and prompt-injection attacks before deployment. Customer deployments include evaluation harnesses so model behaviour can be regression-tested as data evolves.',
    },
    {
        n: '05',
        title: 'Explainability calibrated to the buyer',
        body: 'A regulator wants a different kind of explanation than an analyst. AlpOS surfaces explanations in the language and granularity each audience needs: citations and source passages for analysts; policy-trace and model-version for regulators; natural-language rationales for operators.',
    },
    {
        n: '06',
        title: 'Bias monitoring against the customer\'s population',
        body: 'No platform-wide "fairness metric" survives every domain. Customer deployments include per-population disparity monitoring against the customer\'s own protected-attribute definitions, with thresholds reviewable by the customer\'s ethics or compliance function.',
    },
    {
        n: '07',
        title: 'No third-party model API calls without explicit consent',
        body: 'AlpOS deployments run against models hosted inside the customer\'s perimeter by default. If a deployment integrates a hosted model API (OpenAI, Anthropic, etc.), it is a per-engagement decision documented in the deployment architecture and the DPA, never a hidden default.',
    },
    {
        n: '08',
        title: 'Sunset and replaceability',
        body: 'Modular replaces lock-in. Davion is composable end to end and replaceable end to end. If a customer terminates the engagement, the data, the weights, the audit log, and the ontology are theirs. We will be a vendor you can leave.',
    },
]

const alignment = [
    { name: 'EU AI Act', status: 'Engineered to', detail: 'High-risk AI obligations, transparency, human oversight, data quality, log retention.' },
    { name: 'NIST AI RMF', status: 'Engineered to', detail: 'Govern / Map / Measure / Manage functions with deployment-level evidence.' },
    { name: 'ISO/IEC 42001 (AI management)', status: 'Engineered to', detail: 'Formal certification target. Status: scoping. Date: TBD pending entity finalisation.' },
    { name: 'ISO/IEC 27001 (information security)', status: 'In progress for', detail: 'Target Q4 2026, placeholder pending founder confirmation on commit/legal entity.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Legal · Responsible AI" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-5xl">
                Principles AlpOS is engineered against<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion publishes its responsible-AI commitments as engineering claims, not aspirations. Where a claim is fully implemented, it says so. Where a claim is targeted but not yet certified, it says <em>engineered to</em>. Where work is in progress, it says <em>in progress for</em>, with a date. Honesty is the precondition for trust.
            </p>
            <p class="text-[13px] font-mono uppercase tracking-[0.15em] text-drygray-default mt-8">
                Last updated · {{ lastUpdated }}
            </p>
        </section>

        <!-- Commitments -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Commitments" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                Eight engineering commitments<span class="text-primary-text">.</span>
            </h2>
            <ol class="mt-10 space-y-8">
                <li v-for="c in commitments" :key="c.n" class="grid md:grid-cols-12 gap-4 md:gap-8 border-t border-drygray-200 pt-8 first:border-t-0 first:pt-0">
                    <div class="md:col-span-3">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Commitment {{ c.n }}</p>
                        <p class="font-degular font-bold text-drygray-100 text-[22px] md:text-[24px] leading-tight mt-2">{{ c.title }}<span class="text-primary-text">.</span></p>
                    </div>
                    <div class="md:col-span-9">
                        <p class="text-b1 text-drygray-100 leading-relaxed">{{ c.body }}</p>
                    </div>
                </li>
            </ol>
        </section>

        <!-- Regulatory alignment -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Regulatory alignment" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                Frameworks AlpOS is engineered against<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                Each row uses honest status language: <strong class="font-semibold text-drygray-100">Engineered to</strong> means the platform is designed against the framework; <strong class="font-semibold text-drygray-100">In progress for</strong> means we are working toward formal certification with a target date; <strong class="font-semibold text-drygray-100">Achieved</strong> would mean we hold a current certificate (none yet).
            </p>
            <div class="mt-10 space-y-3">
                <div v-for="a in alignment" :key="a.name" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <div class="grid md:grid-cols-12 gap-4">
                        <div class="md:col-span-4">
                            <p class="text-h3 font-degular font-bold text-drygray-100 leading-tight">{{ a.name }}</p>
                        </div>
                        <div class="md:col-span-2">
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ a.status }}</p>
                        </div>
                        <div class="md:col-span-6">
                            <p class="text-b1 text-drygray-default">{{ a.detail }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-[13px] text-drygray-default mt-6 italic">
                Additional certifications (SOC 2, regional sovereign-cloud accreditations) land as the customer base demands. Status published here, never aspirational.
            </p>
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
                    <NuxtLink to="/legal/terms"><CommonButton variant="outline" size="xs" icon="base:arrow">Terms</CommonButton></NuxtLink>
                    <NuxtLink to="/legal/cookies"><CommonButton variant="outline" size="xs" icon="base:arrow">Cookies</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
