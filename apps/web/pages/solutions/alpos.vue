<script setup lang="ts">
// AlpOS — flagship platform page, the depth bar-setter.
// Pass 1: structure + content + static architecture diagram.
// Pass 2 (later): scan-line motion behind hero, reveal-on-scroll, interactive diagram.
useSeoMeta({
    title: 'AlpOS',
    description: 'AlpOS is the operating system for sovereign decisions. From ingest to act — under your jurisdiction, your access controls, your audit trail.',
})

const layers = [
    {
        n: '01',
        slug: 'Ingest',
        title: 'Data integration & preparation',
        body: 'Pull every relevant signal — structured, unstructured, real-time, archival — through a single governed pipeline. Native connectors, schema-on-read or schema-on-write, lineage tracked from source. Nothing is collected blindly. Nothing is collected outside policy.',
        specifics: ['Streaming + batch ingest', 'Connector library', 'Lineage + provenance', 'PII-aware transforms'],
    },
    {
        n: '02',
        slug: 'Ontology',
        title: 'Semantic model of your domain',
        body: 'Entities, events, and relationships modeled to your domain — not a generic schema. The ontology becomes the shared vocabulary across analysts, engineers, and operators. Queries and AI reason against it, not against raw tables.',
        specifics: ['Entities · Events · Relationships', 'Versioned model', 'Role-aware visibility', 'Domain vocabularies'],
    },
    {
        n: '03',
        slug: 'Analyze',
        title: 'Analytics, knowledge graphs, weak-signal detection',
        body: 'Run the analytic load where the data lives. Knowledge graphs surface relationships flat queries miss. Statistical and ML methods detect the patterns — and the weak signals that precede them.',
        specifics: ['Graph queries', 'Anomaly + weak-signal detection', 'Behavioral analytics', 'Geospatial · time-series'],
    },
    {
        n: '04',
        slug: 'Decide',
        title: 'AI copilot with traceability',
        body: 'An agentic copilot that argues from the ontology, cites the data, and shows its work. Every recommendation is traceable to its source. Hallucinations do not survive contact with auditable evidence.',
        specifics: ['RAG over your ontology', 'Reasoning traces', 'Human-in-the-loop gating', 'Model provenance', 'Refusal under uncertainty'],
    },
    {
        n: '05',
        slug: 'Act',
        title: 'Operational decisioning & workflow',
        body: 'Decisions only matter when they reach the operator and the system. Workflows, dispatch, case management, and write-back to systems of record are embedded — so AlpOS does not stop at insight.',
        specifics: ['Workflow engine', 'Case / ticket integration', 'Write-back to systems of record', 'SLA + escalation', 'Post-action review'],
    },
]

const deploymentModes = [
    { name: 'On-premise', body: 'Your hardware. Your network. Your operational control. AlpOS is installable inside your perimeter with no external dependencies at runtime.' },
    { name: 'Air-gapped', body: 'Disconnected operation for environments that require it. Signed-update model; nothing transits unsanctioned channels.' },
    { name: 'Sovereign cloud', body: 'Run inside a sovereign cloud you trust, in the region you require, under contracts that bind data jurisdiction.' },
    { name: 'Private cloud', body: 'Single-tenant deployment in a cloud of your choice, with customer-managed keys and per-tenant isolation.' },
]

const capabilities = [
    { group: 'Data integration', items: 'Streaming + batch · Connector library · Schema-on-read / on-write' },
    { group: 'Governance', items: 'End-to-end audit log · Lineage + provenance · Data residency controls' },
    { group: 'Access control', items: 'RBAC · ABAC · Per-entity visibility · Cell-level policy' },
    { group: 'Ontology', items: 'Domain modeling · Entities / events / relationships · Versioned · Role-aware' },
    { group: 'Analytics', items: 'SQL + graph queries · Time-series · Geospatial · Weak-signal detection' },
    { group: 'AI', items: 'RAG over ontology · Reasoning traces · Model provenance · HITL gating' },
    { group: 'Operations', items: 'Workflow engine · Case management · Back-system write · SLA + escalation' },
    { group: 'Deployment', items: 'On-premise · Air-gapped · Sovereign cloud · Private cloud' },
]

const outcomes = [
    { label: 'Speed', body: 'From signal to first action in minutes, not weeks. The cycle is the architecture, not a series of integrations.' },
    { label: 'Defensibility', body: 'Every output traceable to its source data and the operator who acted on it. Auditable by design — before, during, and after.' },
    { label: 'Trust', body: 'Deployable in environments where "send the data to a vendor" is not an option. Sovereignty as a precondition, not a feature.' },
]
</script>

<template>
    <article class="bg-ink text-bone">
        <!-- 1. Platform statement hero -->
        <section class="relative border-b border-ink-200">
            <!-- Faint instrument grid (signature motif placeholder; scan-line lands in pass 2) -->
            <div
                class="absolute inset-0 pointer-events-none opacity-[0.035]"
                aria-hidden="true"
                style="background-image: linear-gradient(var(--davion-bone) 1px, transparent 1px), linear-gradient(90deg, var(--davion-bone) 1px, transparent 1px); background-size: 64px 64px;"
            />
            <div class="relative mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-44 lg:pb-32">
                <p class="text-eyebrow mb-6">Platform · AlpOS</p>
                <h1 class="text-display-xl text-bone-bright max-w-5xl">
                    The operating system for sovereign decisions.
                </h1>
                <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                    AlpOS unifies data integration, ontology, analytics, and AI inside a sovereign perimeter. From ingest to act — under your jurisdiction, your access controls, your audit trail.
                </p>
                <div class="mt-10 flex flex-wrap items-center gap-6">
                    <NuxtLink
                        to="/contact"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover"
                    >
                        Request an AlpOS briefing
                        <span aria-hidden="true">→</span>
                    </NuxtLink>
                    <a
                        href="#architecture"
                        class="text-bone hover:text-signal transition-colors duration-davion-hover inline-flex items-center gap-2"
                    >
                        See the architecture
                        <span aria-hidden="true">↓</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- 2. The problem -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">The problem</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-display-m text-bone-bright max-w-4xl">
                            When data outpaces the capacity to decide, decisions fail.
                        </p>
                        <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                            Institutions today inherit fragmented data, opaque models, and tooling that was not built to be governed. The cost is not abstract — it is missed signals, slow responses, and decisions that cannot be defended after the fact. AlpOS exists to close that gap.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. Architecture diagram -->
        <section id="architecture" class="border-b border-ink-200 scroll-mt-20">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-12">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Architecture</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">
                            Ingest → Ontology → Analyze → Decide → Act.<br>
                            All inside a sovereign perimeter.
                        </p>
                    </div>
                </div>
                <div class="rounded-sm border border-ink-200 bg-ink-50 p-4 sm:p-6 lg:p-10 overflow-x-auto">
                    <svg
                        viewBox="0 0 1200 320"
                        class="w-full h-auto min-w-[820px]"
                        role="img"
                        aria-label="AlpOS architecture: Ingest, Ontology, Analyze and AI, Decide, Act — all inside a sovereign perimeter with data residency, access control, full audit trail, and nothing leaving."
                    >
                        <!-- Sovereign perimeter label -->
                        <text x="40" y="38" fill="#5FB8D1" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="11" letter-spacing="3">SOVEREIGN PERIMETER</text>

                        <!-- Perimeter rectangle (dashed hairline) -->
                        <rect x="20" y="56" width="1160" height="200" fill="none" stroke="#2A2E3A" stroke-width="1" stroke-dasharray="2 3" rx="2"/>

                        <!-- 5 layer boxes -->
                        <g>
                            <rect x="60" y="120" width="180" height="80" fill="#13151B" stroke="#2A2E3A" stroke-width="1" rx="2"/>
                            <text x="150" y="156" text-anchor="middle" fill="#F5F7FA" font-family="'Inter Tight', Inter, sans-serif" font-size="18" font-weight="600">Ingest</text>
                            <text x="150" y="180" text-anchor="middle" fill="#9BA3B2" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="10" letter-spacing="2">DATA</text>

                            <rect x="270" y="120" width="180" height="80" fill="#13151B" stroke="#2A2E3A" stroke-width="1" rx="2"/>
                            <text x="360" y="156" text-anchor="middle" fill="#F5F7FA" font-family="'Inter Tight', Inter, sans-serif" font-size="18" font-weight="600">Ontology</text>
                            <text x="360" y="180" text-anchor="middle" fill="#9BA3B2" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="10" letter-spacing="2">MEANING</text>

                            <rect x="480" y="120" width="180" height="80" fill="#13151B" stroke="#2A2E3A" stroke-width="1" rx="2"/>
                            <text x="570" y="156" text-anchor="middle" fill="#F5F7FA" font-family="'Inter Tight', Inter, sans-serif" font-size="18" font-weight="600">Analyze · AI</text>
                            <text x="570" y="180" text-anchor="middle" fill="#9BA3B2" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="10" letter-spacing="2">INSIGHT</text>

                            <rect x="690" y="120" width="180" height="80" fill="#13151B" stroke="#2A2E3A" stroke-width="1" rx="2"/>
                            <text x="780" y="156" text-anchor="middle" fill="#F5F7FA" font-family="'Inter Tight', Inter, sans-serif" font-size="18" font-weight="600">Decide</text>
                            <text x="780" y="180" text-anchor="middle" fill="#9BA3B2" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="10" letter-spacing="2">DECISION</text>

                            <rect x="900" y="120" width="180" height="80" fill="#13151B" stroke="#2A2E3A" stroke-width="1" rx="2"/>
                            <text x="990" y="156" text-anchor="middle" fill="#F5F7FA" font-family="'Inter Tight', Inter, sans-serif" font-size="18" font-weight="600">Act</text>
                            <text x="990" y="180" text-anchor="middle" fill="#9BA3B2" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="10" letter-spacing="2">ACTION</text>
                        </g>

                        <!-- Arrows (signal cyan) -->
                        <g stroke="#5FB8D1" stroke-width="1" fill="none" stroke-linecap="square">
                            <path d="M 244 160 L 266 160" />
                            <path d="M 261 156 L 266 160 L 261 164" />
                            <path d="M 454 160 L 476 160" />
                            <path d="M 471 156 L 476 160 L 471 164" />
                            <path d="M 664 160 L 686 160" />
                            <path d="M 681 156 L 686 160 L 681 164" />
                            <path d="M 874 160 L 896 160" />
                            <path d="M 891 156 L 896 160 L 891 164" />
                        </g>

                        <!-- Perimeter guarantees -->
                        <g font-family="'JetBrains Mono', ui-monospace, monospace" font-size="10" fill="#6B7384" letter-spacing="2">
                            <text x="40" y="232">DATA RESIDENCY</text>
                            <text x="40" y="246">ACCESS CONTROL · RBAC / ABAC</text>
                            <text x="1160" y="232" text-anchor="end">FULL AUDIT TRAIL</text>
                            <text x="1160" y="246" text-anchor="end">NOTHING LEAVES</text>
                        </g>
                    </svg>
                </div>
            </div>
        </section>

        <!-- 4. Layer deep-dives -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Layers</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Five layers. One spine. Designed to be governed.</p>
                    </div>
                </div>
                <div class="space-y-16">
                    <div
                        v-for="layer in layers"
                        :key="layer.n"
                        class="grid lg:grid-cols-12 gap-12 pt-12 border-t border-ink-200 first:border-t-0 first:pt-0"
                    >
                        <div class="lg:col-span-3">
                            <p class="text-eyebrow">Layer {{ layer.n }} · {{ layer.slug }}</p>
                        </div>
                        <div class="lg:col-span-6">
                            <h3 class="text-h2 text-bone-bright">{{ layer.title }}</h3>
                            <p class="text-body-l text-steel-light mt-4">{{ layer.body }}</p>
                        </div>
                        <div class="lg:col-span-3">
                            <ul class="text-label space-y-2">
                                <li v-for="s in layer.specifics" :key="s">{{ s }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. Sovereign by design + deployment modes -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Sovereign by design</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Your data. Your jurisdiction. Your access controls. Your audit.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Sovereignty is not a deployment option. It is an architectural commitment. AlpOS runs where you require — and only where you require.
                        </p>
                    </div>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200">
                    <div v-for="mode in deploymentModes" :key="mode.name" class="bg-ink p-8">
                        <p class="text-eyebrow">Mode</p>
                        <p class="text-h3 text-bone-bright mt-3">{{ mode.name }}</p>
                        <p class="text-body-s mt-3">{{ mode.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 6. Modularity -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Modular</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Compose the platform. Brand the modules.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            AlpOS layers are independently deployable and independently brandable. Customers and partners map their own product names onto the same architecture, under the same sovereignty guarantees. The platform is the constant. The surface is yours.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 7. Capability matrix -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-12">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Capability matrix</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">What AlpOS is, in specifics.</p>
                    </div>
                </div>
                <div class="rounded-sm border border-ink-200 overflow-hidden">
                    <table class="w-full text-left">
                        <tbody>
                            <tr
                                v-for="(row, i) in capabilities"
                                :key="row.group"
                                :class="[i % 2 === 0 ? 'bg-ink-50' : 'bg-ink', 'border-t border-ink-200 first:border-t-0']"
                            >
                                <td class="px-6 py-5 align-top w-1/3 sm:w-1/4">
                                    <span class="text-label">{{ row.group }}</span>
                                </td>
                                <td class="px-6 py-5 text-body text-bone">{{ row.items }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="text-body-s mt-6 max-w-3xl">
                    Pre-built connectors for the systems institutions actually run: enterprise data warehouses, identity providers, ticketing and case systems, geospatial stacks, and the protocols of regulated industry.
                </p>
            </div>
        </section>

        <!-- 8. Outcomes -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3">
                        <p class="text-eyebrow">Outcomes</p>
                    </div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Faster decisions. Defensible decisions. Governed at scale.</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="o in outcomes" :key="o.label" class="border-t border-signal pt-6">
                        <p class="text-eyebrow">{{ o.label }}</p>
                        <p class="text-body-l text-bone mt-4">{{ o.body }}</p>
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
                        <p class="text-display-m text-bone-bright">Bring AlpOS into your mission.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            We work with a small number of institutions at a time, deeply. Briefings are tailored — bring your data architecture, your constraints, and your operational reality.
                        </p>
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <NuxtLink
                            to="/contact"
                            class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover"
                        >
                            Request an AlpOS briefing
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </article>
</template>
