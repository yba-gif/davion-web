<script setup lang="ts">
useSeoMeta({
    title: 'About',
    description: 'Davion is the sovereign AI platform for institutions whose data can\'t leave. The opinion, the values, and the people behind it.',
    ogTitle: 'About Davion',
    ogDescription: 'Sovereignty isn\'t a feature. It\'s where the work happens.',
})

const values = [
    {
        n: '01',
        title: 'Sovereignty is where the work happens',
        body: 'Regulatory residency is not sovereignty. Hosted AI with a European postcode is not sovereignty. Sovereignty is determined by where the data lives, where the weights are stored, and where the inference runs. Davion runs where the work runs.',
    },
    {
        n: '02',
        title: 'A decision is only defensible when it can be reconstructed',
        body: 'AI without an audit trail is not AI an institution can use. Every output Davion produces points back to the data it was made on, the policy it applied, and the version of the model that produced it. If a regulator asks "why", the platform has an answer.',
    },
    {
        n: '03',
        title: 'The hard cases are not edge cases',
        body: 'Air-gapped. On-prem. Inside a perimeter you control. These are not exceptions to the category, they are the operational reality of every institution where decisions actually matter. We design for the hard case first; the easier deployments are downstream.',
    },
    {
        n: '04',
        title: 'Modular replaces lock-in',
        body: 'Davion is composable end to end and replaceable end to end. Ingestion, ontology, analytics, agentic layer, action, each is replaceable. We intend to be a vendor you can leave. That is how vendors who deserve to stay get to stay.',
    },
    {
        n: '05',
        title: 'The operator runs the system. We do not run the decisions.',
        body: 'Davion is a platform, not an autonomous agent. The decisions belong to the people accountable for them: the analyst, the compliance officer, the operator, the commander. The platform proposes, cites its sources, and waits for approval. We do not move money. We do not move people. We do not move troops.',
    },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Company · About" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[76px] tracking-tight max-w-4xl">
                Sovereignty isn't a feature<span class="text-primary-text">.</span><br>It's where the work happens<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                A conviction-led note from the team building Davion, the opinion underneath the product, the values that decide what we build next, and the people accountable for it.
            </p>
        </section>

        <!-- Why Davion exists -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-10 items-start">
                <div class="lg:col-span-4">
                    <CommonSup title="Why Davion exists" />
                </div>
                <div class="lg:col-span-8 space-y-6 text-[17px] md:text-[19px] leading-[1.55] text-drygray-100 font-medium">
                    <p>
                        The category has confused regulatory residency with operational sovereignty.
                    </p>
                    <p>
                        Most platforms calling themselves "sovereign AI" today are hosted services with European billing addresses. The data crosses the vendor's network. The inference runs on the vendor's hardware. The audit trail lives in the vendor's cloud. The contract says "sovereign" because the postcode is European.
                    </p>
                    <p>
                        For banks, ministries, and operators of critical infrastructure, that is not sovereignty. It is procurement theatre. The data is still leaving. The decisions are still being made somewhere the operator doesn't control. The audit trail still belongs to the vendor.
                    </p>
                    <p>
                        Davion exists because the gap between <em>hosted with EU billing</em> and <em>operationally sovereign</em> is the gap between a platform a defense ministry can use and a platform it cannot. We build for the second.
                    </p>
                    <p>
                        Our deployments run inside the customer's perimeter. The data does not leave. The weights are auditable on-prem. The inference runs where the work runs, air-gapped, on-prem, or in a sovereign cloud bound by contract. Every decision is traceable to the data it was made on, the policy it applied, and the version of the model that produced it.
                    </p>
                    <p>
                        This is not marketing copy. It is the operational difference between a platform that can be used and one that cannot.
                    </p>
                </div>
            </div>
        </section>

        <!-- What we believe, 5 values written as sentences, not nouns -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-12 md:mb-16 max-w-3xl">
                <CommonSup title="What we believe" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Five claims we will defend in public<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    Every product decision Davion makes traces back to one of these. If you read them and disagree, we're probably not the right vendor, and that's a useful thing to learn early.
                </p>
            </div>
            <ol class="space-y-8">
                <li v-for="v in values" :key="v.n" class="grid lg:grid-cols-12 gap-6 lg:gap-10 border-t border-drygray-200 pt-8">
                    <div class="lg:col-span-3">
                        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Claim {{ v.n }}</p>
                        <p class="font-degular font-bold text-drygray-100 text-[22px] md:text-[26px] leading-[1.15] mt-3">{{ v.title }}<span class="text-primary-text">.</span></p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-b1 text-drygray-100 leading-[1.55]">{{ v.body }}</p>
                    </div>
                </li>
            </ol>
        </section>

        <!-- How we work, engagement model -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-10 items-start">
                <div class="lg:col-span-4">
                    <CommonSup title="How we work" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        Consultative<span class="text-primary-text">.</span><br>Bounded<span class="text-primary-text">.</span><br>Replaceable<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <div class="lg:col-span-8 space-y-6 text-[17px] leading-[1.55] text-drygray-100">
                    <p>
                        <strong class="font-semibold">Engagements begin with a briefing, not a pitch.</strong> We listen first, to your data architecture, your regulatory constraints, your operational reality, the decisions you actually need to defend. The first conversation is consultative; if Davion isn't the right answer, we will say so.
                    </p>
                    <p>
                        <strong class="font-semibold">Pilots are bounded.</strong> Most engagements start with a 6 to 12 week pilot scoped against a specific, measurable outcome, typically a single decision class (e.g. AML alert triage, anomaly detection on operational telemetry, OSINT brief generation). The deliverable is a working deployment inside your perimeter, plus the operational evidence to decide whether to expand.
                    </p>
                    <p>
                        <strong class="font-semibold">Deployment matches the deployment posture.</strong> On-prem, air-gapped, or sovereign cloud, your choice. Davion's job is to make all three operationally identical from the surface. The deployment matrix lives on <NuxtLink to="/trust" class="text-primary-text underline underline-offset-4 hover:no-underline">the Trust page</NuxtLink>.
                    </p>
                    <p>
                        <strong class="font-semibold">We intend to be a vendor you can leave.</strong> Davion is modular end to end. Ingestion, ontology, analytics, agentic layer, action, each is a replaceable component. The data, the weights, and the audit log are yours from day one. That is how vendors who deserve to stay get to stay.
                    </p>
                </div>
            </div>
        </section>

        <!-- Who's behind this -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14 max-w-3xl">
                <CommonSup title="Who's behind this" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    A small team. Operators, not pitchmen<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    Davion is early-stage and operates from <strong class="font-semibold text-drygray-100">Zurich and Istanbul</strong>, Swiss neutrality for the data layer, NATO-perimeter operational depth for the field. The team is named where named is appropriate; the rest is being built. Press contact and additional executive bios will land once approved for public reference.
                </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">Founder · CTO</p>
                    <p class="font-degular font-bold text-drygray-100 text-h3 mt-3">Bek</p>
                    <p class="text-b1 text-drygray-default mt-3">
                        Builds the platform. Writes the architecture. Sits in on every engagement. Full bio on request and once approved for public reference.
                    </p>
                </div>
                <div class="bg-white/60 rounded-2xl p-6 border border-dashed border-drygray-200">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default">Hiring · Solutions Engineering</p>
                    <p class="font-degular font-bold text-drygray-100 text-h3 mt-3">Open</p>
                    <p class="text-b1 text-drygray-default mt-3">
                        We are hiring senior engineers with deployment experience inside regulated institutions. Reach out via the engagement page.
                    </p>
                </div>
                <div class="bg-white/60 rounded-2xl p-6 border border-dashed border-drygray-200">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default">Hiring · Field</p>
                    <p class="font-degular font-bold text-drygray-100 text-h3 mt-3">Open</p>
                    <p class="text-b1 text-drygray-default mt-3">
                        Solutions architects and field engineers who have lived the mission, banks, ministries, defense, not just sold to it.
                    </p>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        If the opinion lands<span class="text-primary-text">,</span> the next move is a conversation<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Speak to an expert</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
