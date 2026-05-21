<script setup lang="ts">
useSeoMeta({
    title: 'Trust & Sovereignty',
    description: 'The Davion sovereignty model, deployment matrix, access control, end-to-end auditability, standards alignment, responsible-AI commitments, and data lifecycle.',
    ogTitle: 'Davion · Trust & Sovereignty',
    ogDescription: 'Where the data sits, who can see it, what we sign, what we will not sign, and the deployment matrix that backs it.',
})

const principles = [
    { label: 'Residency', body: 'Data stays in the jurisdiction you specify. No cross-border transit without explicit policy.' },
    { label: 'Nothing leaves', body: 'No telemetry, no analyst behavior, no model gradients, no query content exit the perimeter unless you authorize it.' },
    { label: 'National control', body: 'For sovereign deployments, operational control rests with the institution, not with Davion or any third party.' },
    { label: 'Provable', body: 'Sovereignty is not asserted. It is auditable, by your team, your regulators, and any party with a legitimate interest.' },
]

const deploymentMatrix = [
    { attribute: 'Data residency', onprem: 'Your hardware', airgap: 'Your hardware', sovereign: 'Your region', private: 'Your provider, your region' },
    { attribute: 'Network egress', onprem: 'None required', airgap: 'None', sovereign: 'Constrained', private: 'Constrained' },
    { attribute: 'Customer-managed keys', onprem: 'Yes', airgap: 'Yes', sovereign: 'Yes', private: 'Yes' },
    { attribute: 'Tenant isolation', onprem: 'Single tenant', airgap: 'Single tenant', sovereign: 'Sovereign region', private: 'Single tenant' },
    { attribute: 'Update model', onprem: 'Signed updates', airgap: 'Signed, offline', sovereign: 'Signed updates', private: 'Signed updates' },
    { attribute: 'Operator access', onprem: 'Yours', airgap: 'Yours', sovereign: 'Bounded by contract', private: 'Bounded by contract' },
    { attribute: 'Audit log', onprem: 'In-perimeter', airgap: 'In-perimeter', sovereign: 'Customer-owned', private: 'Customer-owned' },
]

const accessControl = [
    { label: 'RBAC', body: 'Role-based access for analysts, operators, administrators, and auditors, defined to your org structure, not ours.' },
    { label: 'ABAC', body: 'Attribute-based policy on top of RBAC. Visibility at the entity, event, and cell level, conditioned on context, clearance, and purpose.' },
    { label: 'Federation', body: 'Plug into your identity provider, SAML, OIDC, mTLS, with attestable session binding.' },
    { label: 'Privileged access', body: 'Just-in-time elevation, dual-control on sensitive actions, full session recording. No standing admin.' },
]

const auditAttributes = [
    { label: 'Who', body: 'Every operator, every analyst, every system identity is named, no anonymous actions.' },
    { label: 'What', body: 'The action, the query, the input, the AI output, the workflow transition, captured in full.' },
    { label: 'When', body: 'Trusted timestamps, write-once log, tamper-evident chain.' },
    { label: 'Why', body: 'Purpose tags carry through every action, supporting after-action review and regulatory inquiry.' },
]

const standards = [
    { name: 'ISO 27001', body: 'Information security management system aligned to the platform and to operator practice.' },
    { name: 'SOC 2', body: 'Security, availability, processing integrity, confidentiality, and privacy, engineered for; audited where applicable.' },
    { name: 'NIS2-class', body: 'Critical-infrastructure cyber regulation as a deployment baseline in EU jurisdictions.' },
    { name: 'GDPR', body: 'Lawful basis, data-subject rights, and DPA-ready by design.' },
    { name: 'Sector-specific', body: 'Defense, financial-services, healthcare, and public-sector regimes addressed per engagement.' },
]

const responsibleAi = [
    { label: 'Sovereign inference', body: 'Models run inside your perimeter. No training data, no gradients, no outputs cross into Davion or any vendor without explicit policy.' },
    { label: 'Provenance', body: 'Every model used, every version, every input, recorded against every output.' },
    { label: 'Citation', body: 'Outputs cite their source data. An AI conclusion you cannot trace is one you cannot defend.' },
    { label: 'Refusal under uncertainty', body: 'When confidence is low or evidence is missing, the system says so. Defensible over confident.' },
    { label: 'Human-in-the-loop', body: 'Consequential actions require a named operator. The AI does not act unilaterally.' },
    { label: 'No covert training', body: 'Customer data is never used to train shared models without explicit, written consent.' },
]

const lifecycle = [
    { n: '01', stage: 'Ingest', body: 'Data enters under policy, sources, purposes, and retention declared at the source.' },
    { n: '02', stage: 'Process', body: 'Lineage tracked through transforms, joins, and enrichments. Every derived datum is traceable to its origin.' },
    { n: '03', stage: 'Use', body: 'Access governed by RBAC + ABAC. Queries logged. AI outputs cited.' },
    { n: '04', stage: 'Retain', body: 'Retention policy enforced per-source, per-purpose. Customer-defined, contractually bound.' },
    { n: '05', stage: 'Delete', body: 'Right-to-erasure honored. Cryptographic deletion where required. Provable, not just claimed.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Trust &amp; Sovereignty" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Your data. Your jurisdiction. Your audit.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Sovereignty is not asserted at Davion. It is engineered. This page is the one a CIO opens before approving anything, the model, the deployment matrix, access control, audit, the standards we design to, and the AI commitments.
            </p>
            <div class="mt-10">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Speak with our security team</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup title="Sovereignty model" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Four principles. Auditable, not asserted.
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    Sovereignty in software is a claim that has to be redeemable. These are the principles Davion engineers to, and the principles your security team can validate independently.
                </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="p in principles" :key="p.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ p.label }}</p>
                    <p class="text-b2 text-drygray-100 mt-3 leading-relaxed">{{ p.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Deployment matrix" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Four modes. One sovereignty contract.
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    The deployment model is yours to choose. The sovereignty guarantees do not change.
                </p>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl overflow-x-auto">
                <table class="w-full text-left min-w-[900px]">
                    <thead>
                        <tr class="bg-white border-b border-drygray-200">
                            <th class="px-5 py-4 w-[22%]"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">Attribute</span></th>
                            <th class="px-5 py-4"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">On-premise</span></th>
                            <th class="px-5 py-4"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">Air-gapped</span></th>
                            <th class="px-5 py-4"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">Sovereign cloud</span></th>
                            <th class="px-5 py-4"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">Private cloud</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in deploymentMatrix" :key="row.attribute" :class="[i % 2 === 0 ? 'bg-white' : 'bg-whitesmoke-100', 'border-t border-drygray-200']">
                            <td class="px-5 py-4 align-top"><span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ row.attribute }}</span></td>
                            <td class="px-5 py-4 text-b1 text-drygray-100">{{ row.onprem }}</td>
                            <td class="px-5 py-4 text-b1 text-drygray-100">{{ row.airgap }}</td>
                            <td class="px-5 py-4 text-b1 text-drygray-100">{{ row.sovereign }}</td>
                            <td class="px-5 py-4 text-b1 text-drygray-100">{{ row.private }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Access control" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Fine-grained. Federated. Auditable.
                </h2>
            </div>
            <div class="bg-white rounded-2xl divide-y divide-drygray-200">
                <div v-for="a in accessControl" :key="a.label" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ a.label }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ a.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup title="Auditability" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Who. What. When. Why.
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    Every action on the platform is captured to a tamper-evident, customer-owned audit log. Designed for the regulator, the after-action, and the internal review board.
                </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="a in auditAttributes" :key="a.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ a.label }}</p>
                    <p class="text-b2 text-drygray-100 mt-3 leading-relaxed">{{ a.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Standards" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Engineered to the standards your auditors already use.
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    Davion designs to the frameworks your security team and regulators already operate by. Where formal certification applies, we document the scope and the evidence per engagement.
                </p>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl divide-y divide-drygray-200">
                <div v-for="s in standards" :key="s.name" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ s.name }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ s.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup title="Responsible AI" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Sovereign inference. Cited outputs. Refusal when warranted.
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    AI inside AlpOS is governed the same way every other layer is, with provenance, citation, audit, and the right to refuse. We do not ship AI that the institution cannot defend.
                </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="r in responsibleAi" :key="r.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ r.label }}</p>
                    <p class="text-b2 text-drygray-100 mt-3 leading-relaxed">{{ r.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup title="Data lifecycle" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Ingest. Process. Use. Retain. Delete.
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    The data lifecycle is governed end to end. Policy enforced at the boundary, lineage tracked through transformation, retention bounded by contract, deletion provable on request.
                </p>
            </div>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div v-for="step in lifecycle" :key="step.n" class="bg-white rounded-2xl p-5">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ step.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2">{{ step.stage }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ step.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Bring your security team to the table.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        We answer security questionnaires in full, run technical deep-dives against your environment, and provide the evidence your audit team will ask for, before you commit.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Speak with our security team</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
