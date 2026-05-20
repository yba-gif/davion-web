<script setup lang="ts">
useSeoMeta({
    title: 'Trust & Sovereignty',
    description: 'The Davion sovereignty model, deployment matrix, access control, end-to-end auditability, standards alignment, responsible-AI commitments, and data lifecycle.',
})

const principles = [
    { label: 'Residency', body: 'Data stays in the jurisdiction you specify. No cross-border transit without explicit policy.' },
    { label: 'Nothing leaves', body: 'No telemetry, no analyst behavior, no model gradients, no query content exit the perimeter unless you authorize it.' },
    { label: 'National control', body: 'For sovereign deployments, operational control rests with the institution — not with Davion or any third party.' },
    { label: 'Provable', body: 'Sovereignty is not asserted. It is auditable — by your team, your regulators, and any party with a legitimate interest.' },
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
    { label: 'RBAC', body: 'Role-based access for analysts, operators, administrators, and auditors — defined to your org structure, not ours.' },
    { label: 'ABAC', body: 'Attribute-based policy on top of RBAC. Visibility at the entity, event, and cell level, conditioned on context, clearance, and purpose.' },
    { label: 'Federation', body: 'Plug into your identity provider — SAML, OIDC, mTLS — with attestable session binding.' },
    { label: 'Privileged access', body: 'Just-in-time elevation, dual-control on sensitive actions, full session recording. No standing admin.' },
]

const auditAttributes = [
    { label: 'Who', body: 'Every operator, every analyst, every system identity is named — no anonymous actions.' },
    { label: 'What', body: 'The action, the query, the input, the AI output, the workflow transition — captured in full.' },
    { label: 'When', body: 'Trusted timestamps, write-once log, tamper-evident chain.' },
    { label: 'Why', body: 'Purpose tags carry through every action — supporting after-action review and regulatory inquiry.' },
]

const standards = [
    { name: 'ISO 27001', body: 'Information security management system aligned to the platform and to operator practice.' },
    { name: 'SOC 2', body: 'Security, availability, processing integrity, confidentiality, and privacy — engineered for; audited where applicable.' },
    { name: 'NIS2-class', body: 'Critical-infrastructure cyber regulation as a deployment baseline in EU jurisdictions.' },
    { name: 'GDPR', body: 'Lawful basis, data-subject rights, and DPA-ready by design.' },
    { name: 'Sector-specific', body: 'Defense, financial-services, healthcare, and public-sector regimes addressed per engagement.' },
]

const responsibleAi = [
    { label: 'Sovereign inference', body: 'Models run inside your perimeter. No training data, no gradients, no outputs cross into Davion or any vendor without explicit policy.' },
    { label: 'Provenance', body: 'Every model used, every version, every input — recorded against every output.' },
    { label: 'Citation', body: 'Outputs cite their source data. An AI conclusion you cannot trace is one you cannot defend.' },
    { label: 'Refusal under uncertainty', body: 'When confidence is low or evidence is missing, the system says so. Defensible over confident.' },
    { label: 'Human-in-the-loop', body: 'Consequential actions require a named operator. The AI does not act unilaterally.' },
    { label: 'No covert training', body: 'Customer data is never used to train shared models without explicit, written consent.' },
]

const lifecycle = [
    { n: '01', stage: 'Ingest', body: 'Data enters under policy — sources, purposes, and retention declared at the source.' },
    { n: '02', stage: 'Process', body: 'Lineage tracked through transforms, joins, and enrichments. Every derived datum is traceable to its origin.' },
    { n: '03', stage: 'Use', body: 'Access governed by RBAC + ABAC. Queries logged. AI outputs cited.' },
    { n: '04', stage: 'Retain', body: 'Retention policy enforced per-source, per-purpose. Customer-defined, contractually bound.' },
    { n: '05', stage: 'Delete', body: 'Right-to-erasure honored. Cryptographic deletion where required. Provable, not just claimed.' },
]
</script>

<template>
    <div class="bg-ink text-bone">
        <!-- 1. Hero -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-44 lg:pb-24">
                <p class="text-eyebrow mb-6">Trust &amp; Sovereignty</p>
                <h1 class="text-display-l text-bone-bright max-w-4xl">Your data. Your jurisdiction. Your audit.</h1>
                <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                    Sovereignty is not asserted at Davion. It is engineered. This page is the one a CIO opens before approving anything — the model, the deployment matrix, access control, audit, the standards we design to, and the AI commitments.
                </p>
                <div class="mt-10">
                    <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                        Speak with our security team
                        <span aria-hidden="true">→</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- 2. Sovereignty model -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Sovereignty model</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Four principles. Auditable, not asserted.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Sovereignty in software is a claim that has to be redeemable. These are the principles Davion engineers to — and the principles your security team can validate independently.
                        </p>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200">
                    <div v-for="p in principles" :key="p.label" class="bg-ink p-8">
                        <p class="text-eyebrow">{{ p.label }}</p>
                        <p class="text-body text-bone mt-3">{{ p.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. Deployment matrix -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-12">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Deployment matrix</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Four modes. One sovereignty contract.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            The deployment model is yours to choose. The sovereignty guarantees do not change.
                        </p>
                    </div>
                </div>
                <div class="border border-ink-200 rounded-sm overflow-x-auto">
                    <table class="w-full text-left min-w-[900px]">
                        <thead>
                            <tr class="bg-ink-50 border-b border-ink-200">
                                <th class="px-5 py-4 w-[22%]"><span class="text-label">Attribute</span></th>
                                <th class="px-5 py-4"><span class="text-label">On-premise</span></th>
                                <th class="px-5 py-4"><span class="text-label">Air-gapped</span></th>
                                <th class="px-5 py-4"><span class="text-label">Sovereign cloud</span></th>
                                <th class="px-5 py-4"><span class="text-label">Private cloud</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(row, i) in deploymentMatrix"
                                :key="row.attribute"
                                :class="[i % 2 === 0 ? 'bg-ink' : 'bg-ink-50/40', 'border-t border-ink-200 first:border-t-0']"
                            >
                                <td class="px-5 py-4 align-top"><span class="text-label">{{ row.attribute }}</span></td>
                                <td class="px-5 py-4 text-sm text-bone">{{ row.onprem }}</td>
                                <td class="px-5 py-4 text-sm text-bone">{{ row.airgap }}</td>
                                <td class="px-5 py-4 text-sm text-bone">{{ row.sovereign }}</td>
                                <td class="px-5 py-4 text-sm text-bone">{{ row.private }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- 4. Access control -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Access control</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Fine-grained. Federated. Auditable.</p>
                    </div>
                </div>
                <div class="border-t border-ink-200">
                    <div v-for="a in accessControl" :key="a.label" class="grid lg:grid-cols-12 gap-6 py-6 border-b border-ink-200">
                        <div class="lg:col-span-3"><p class="text-label">{{ a.label }}</p></div>
                        <p class="lg:col-span-9 text-body text-bone">{{ a.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. Auditability -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Auditability</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Who. What. When. Why.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Every action on the platform is captured to a tamper-evident, customer-owned audit log. Designed for the regulator, the after-action, and the internal review board.
                        </p>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200">
                    <div v-for="a in auditAttributes" :key="a.label" class="bg-ink p-8">
                        <p class="text-eyebrow">{{ a.label }}</p>
                        <p class="text-body text-bone mt-3">{{ a.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 6. Standards -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Standards</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Engineered to the standards your auditors already use.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Davion designs to the frameworks your security team and regulators already operate by. Where formal certification applies, we document the scope and the evidence per engagement.
                        </p>
                    </div>
                </div>
                <div class="border-t border-ink-200">
                    <div v-for="s in standards" :key="s.name" class="grid lg:grid-cols-12 gap-6 py-6 border-b border-ink-200">
                        <div class="lg:col-span-3"><p class="text-label">{{ s.name }}</p></div>
                        <p class="lg:col-span-9 text-body text-bone">{{ s.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 7. Responsible AI -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Responsible AI</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Sovereign inference. Cited outputs. Refusal when warranted.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            AI inside AlpOS is governed the same way every other layer is — with provenance, citation, audit, and the right to refuse. We do not ship AI that the institution cannot defend.
                        </p>
                    </div>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200">
                    <div v-for="r in responsibleAi" :key="r.label" class="bg-ink p-8">
                        <p class="text-eyebrow">{{ r.label }}</p>
                        <p class="text-body text-bone mt-3">{{ r.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 8. Data lifecycle -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Data lifecycle</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Ingest. Process. Use. Retain. Delete.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            The data lifecycle is governed end to end. Policy enforced at the boundary, lineage tracked through transformation, retention bounded by contract, deletion provable on request.
                        </p>
                    </div>
                </div>
                <div class="grid md:grid-cols-5 gap-px bg-ink-200">
                    <div v-for="step in lifecycle" :key="step.n" class="bg-ink p-6">
                        <p class="text-eyebrow">{{ step.n }}</p>
                        <p class="text-h3 text-bone-bright mt-2">{{ step.stage }}</p>
                        <p class="text-body-s mt-3">{{ step.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 9. CTA -->
        <section>
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 items-end">
                    <div class="lg:col-span-8">
                        <p class="text-eyebrow mb-6">Engage</p>
                        <p class="text-display-m text-bone-bright">Bring your security team to the table.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            We answer security questionnaires in full, run technical deep-dives against your environment, and provide the evidence your audit team will ask for — before you commit.
                        </p>
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                            Speak with our security team
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
