<script setup lang="ts">
useSeoMeta({
    title: 'AlpOS',
    description: 'Sovereign AI infrastructure for decisions that cannot wait — and cannot leak. AlpOS turns data into operational action inside your perimeter, end to end.',
    ogTitle: 'Davion · AlpOS',
    ogDescription: 'The sovereign AI platform: ingest, ontology, analyze, decide, act — governed end to end, deployed inside your perimeter.',
})

const layers = [
    { n: '01', slug: 'Ingest', title: 'Data integration & preparation', body: 'Pull every relevant signal — structured, unstructured, real-time, archival — through a single governed pipeline. Native connectors, schema-on-read or schema-on-write, lineage tracked from source. Nothing is collected blindly. Nothing is collected outside policy.', specifics: ['200+ connectors', 'Streaming + batch ingest', 'Lineage + provenance', 'PII-aware transforms'] },
    { n: '02', slug: 'Ontology', title: 'Semantic model of your domain', body: 'Entities, events, and relationships modeled to your domain — not a generic schema. The ontology becomes the shared vocabulary across analysts, engineers, and operators. Queries and AI reason against it, not against raw tables.', specifics: ['Entities · Events · Relationships', 'Versioned model', 'Role-aware visibility', 'Domain vocabularies'] },
    { n: '03', slug: 'Analyze', title: 'Analytics, knowledge graphs, weak-signal detection', body: 'Run the analytic load where the data lives. Knowledge graphs surface relationships flat queries miss. Statistical and ML methods detect the patterns — and the weak signals that precede them.', specifics: ['Graph queries', 'Anomaly + weak-signal detection', 'Behavioral analytics', 'Geospatial · time-series'] },
    { n: '04', slug: 'Decide', title: 'AI copilot with traceability', body: 'An agentic copilot that argues from the ontology, cites the data, and shows its work. Every recommendation is traceable to its source. Hallucinations do not survive contact with auditable evidence.', specifics: ['RAG over your ontology', 'Reasoning traces', 'Human-in-the-loop gating', 'Model provenance', 'Refusal under uncertainty'] },
    { n: '05', slug: 'Act', title: 'Operational decisioning & workflow', body: 'Decisions only matter when they reach the operator and the system. Workflows, dispatch, case management, and write-back to systems of record are embedded — so AlpOS does not stop at insight.', specifics: ['Workflow engine', 'Case / ticket integration', 'Write-back to systems of record', 'SLA + escalation', 'Post-action review'] },
]

const fieldStories = [
    {
        sector: 'Financial Services · AML',
        problem: 'Financial crime rarely leaves a single trace.',
        body: 'AlpOS maps the full network of entities, accounts, transactions, and behavioural signals across sources — surfacing the patterns flat rules and isolated dashboards miss. Investigations move from alerts to actionable cases, with full lineage from raw transaction to operator decision.',
        outcome: 'Faster case adjudication. Fewer false positives. Audit by design.',
    },
    {
        sector: 'Energy & Critical Infrastructure · Asset health',
        problem: 'Fleet-wide defects, hidden in the variance.',
        body: 'AlpOS correlates telemetry across distributed assets, finds the weak signals that precede failure, and routes the response to the operators who can act — without telemetry leaving the perimeter. The same spine handles unplanned outages and planned maintenance windows.',
        outcome: 'Anomaly response in minutes. Defensible runbooks. Post-incident review without losing the institution.',
    },
    {
        sector: 'Defense & Intelligence · Signals fusion',
        problem: 'Decisions in classified environments cannot wait — and cannot leak.',
        body: 'AlpOS unifies signal streams inside the perimeter, lets analysts pivot across them with cited evidence, and produces traceable outputs the after-action can defend. Deployable on-premise and air-gapped, with cell-level access control and a full audit trail.',
        outcome: 'Mission cycle compressed. Every action defensible.',
    },
]

const deploymentModes = [
    { name: 'On-premise', body: 'Your hardware. Your network. Your operational control. AlpOS is installable inside your perimeter with no external dependencies at runtime.' },
    { name: 'Air-gapped', body: 'Disconnected operation for environments that require it. Signed-update model; nothing transits unsanctioned channels.' },
    { name: 'Sovereign cloud', body: 'Run inside a sovereign cloud you trust, in the region you require, under contracts that bind data jurisdiction.' },
    { name: 'Private cloud', body: 'Single-tenant deployment in a cloud of your choice, with customer-managed keys and per-tenant isolation.' },
]

const capabilities = [
    { group: 'Data integration', items: 'Streaming + batch · 200+ connectors · Schema-on-read / on-write' },
    { group: 'Governance', items: 'End-to-end audit log · Lineage + provenance · Data residency controls' },
    { group: 'Access control', items: 'RBAC · ABAC · Per-entity visibility · Cell-level policy' },
    { group: 'Ontology', items: 'Domain modeling · Entities / events / relationships · Versioned · Role-aware' },
    { group: 'Analytics', items: 'SQL + graph queries · Time-series · Geospatial · Weak-signal detection' },
    { group: 'AI', items: 'RAG over ontology · Reasoning traces · Model provenance · HITL gating' },
    { group: 'Operations', items: 'Workflow engine · Case management · Back-system write · SLA + escalation' },
    { group: 'Deployment', items: 'On-premise · Air-gapped · Sovereign cloud · Private cloud' },
]

const aiCapabilities = [
    { name: 'RAG over your ontology', body: 'Retrieval-augmented generation grounded in your domain model — not the open web.', slug: 'rag' },
    { name: 'Geospatial analytics', body: 'Map, ground, and reason over location-aware data at operational scale.', slug: 'geospatial' },
    { name: 'Video intelligence', body: 'Detect, classify, and search across video corpora — inside your perimeter.', slug: 'video-intelligence' },
    { name: 'Audio analysis & transcription', body: 'Speaker, sentiment, and semantic structure from audio at scale.', slug: 'audio-analysis' },
    { name: 'Machine translation', body: '60+ languages, with provenance, run inside your perimeter.', slug: 'translation' },
    { name: 'Data acquisition & preparation', body: 'Connectors, ETL, enrichment, and governance from source to ontology.', slug: 'data-acquisition' },
]

const industriesServed = [
    { name: 'Financial Services', slug: 'financial-services' },
    { name: 'Energy', slug: 'energy' },
    { name: 'Manufacturing', slug: 'manufacturing' },
    { name: 'Life Sciences', slug: 'life-sciences' },
    { name: 'Government', slug: 'government' },
    { name: 'Defense & Intelligence', slug: 'defense-intelligence' },
]

const outcomes = [
    { label: 'Speed', body: 'From signal to first action in minutes, not weeks. The cycle is the architecture, not a series of integrations.' },
    { label: 'Defensibility', body: 'Every output traceable to its source data and the operator who acted on it. Auditable by design — before, during, and after.' },
    { label: 'Trust', body: 'Deployable in environments where "send the data to a vendor" is not an option. Sovereignty as a precondition, not a feature.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- 1. Platform hero — pain-first construction -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Platform · AlpOS" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-5xl">
                Sovereign AI infrastructure for decisions that can't wait<span class="text-primary-text">.</span> And can't leak<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Most organisations can see their data. Few can act on it when it matters. AlpOS closes the gap — one governed environment, from every source to every decision, inside your perimeter.
            </p>
            <div class="mt-10 flex flex-wrap items-center gap-3">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                <a href="#architecture"><CommonButton variant="outline" icon="base:arrow">See the architecture</CommonButton></a>
            </div>
        </section>

        <!-- 2. Problem -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <CommonSup title="The problem" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[32px] leading-[1.05] md:text-[44px] md:leading-[1.05] tracking-tight max-w-4xl">
                When data outpaces the capacity to decide, decisions fail<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                Institutions today inherit fragmented data, opaque models, and tooling that was not built to be governed. The cost is not abstract — it is missed signals, slow responses, and decisions that cannot be defended after the fact. AlpOS exists to close that gap.
            </p>
        </section>

        <!-- 3. Architecture diagram -->
        <section id="architecture" class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24 scroll-mt-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Architecture" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Ingest → Ontology → Analyze → Decide → Act<span class="text-primary-text">.</span> All inside a sovereign perimeter<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl p-4 sm:p-6 lg:p-10 overflow-x-auto">
                <svg viewBox="0 0 1200 320" class="w-full h-auto min-w-[820px]" role="img" aria-label="AlpOS architecture: Ingest, Ontology, Analyze and AI, Decide, Act — all inside a sovereign perimeter.">
                    <text x="40" y="38" fill="#60E576" font-family="'Switzer', sans-serif" font-size="11" font-weight="700" letter-spacing="3">SOVEREIGN PERIMETER</text>
                    <rect x="20" y="56" width="1160" height="200" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="1" stroke-dasharray="3 4" rx="12"/>
                    <g>
                        <rect x="60" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="150" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">Ingest</text>
                        <text x="150" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">DATA</text>

                        <rect x="270" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="360" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">Ontology</text>
                        <text x="360" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">MEANING</text>

                        <rect x="480" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="570" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">Analyze · AI</text>
                        <text x="570" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">INSIGHT</text>

                        <rect x="690" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="780" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">Decide</text>
                        <text x="780" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">DECISION</text>

                        <rect x="900" y="120" width="180" height="80" fill="#FFFFFF" stroke="rgba(0,0,0,0.12)" stroke-width="1" rx="12"/>
                        <text x="990" y="156" text-anchor="middle" fill="#212121" font-family="'Degular Display', sans-serif" font-size="18" font-weight="700">Act</text>
                        <text x="990" y="180" text-anchor="middle" fill="#979797" font-family="'Switzer', sans-serif" font-size="10" font-weight="700" letter-spacing="2">ACTION</text>
                    </g>
                    <g stroke="#60E576" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M 244 160 L 266 160" />
                        <path d="M 260 154 L 266 160 L 260 166" />
                        <path d="M 454 160 L 476 160" />
                        <path d="M 470 154 L 476 160 L 470 166" />
                        <path d="M 664 160 L 686 160" />
                        <path d="M 680 154 L 686 160 L 680 166" />
                        <path d="M 874 160 L 896 160" />
                        <path d="M 890 154 L 896 160 L 890 166" />
                    </g>
                    <g font-family="'Switzer', sans-serif" font-size="10" fill="#979797" font-weight="600" letter-spacing="2">
                        <text x="40" y="232">DATA RESIDENCY</text>
                        <text x="40" y="246">ACCESS CONTROL · RBAC / ABAC</text>
                        <text x="1160" y="232" text-anchor="end">FULL AUDIT TRAIL</text>
                        <text x="1160" y="246" text-anchor="end">NOTHING LEAVES</text>
                    </g>
                </svg>
            </div>
        </section>

        <!-- 4. Layer deep-dives -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Layers" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Five layers. One spine. Designed to be governed<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="space-y-10">
                <div v-for="layer in layers" :key="layer.n" class="grid lg:grid-cols-12 gap-8 lg:gap-12 pt-10 border-t border-drygray-200 first:border-t-0 first:pt-0">
                    <div class="lg:col-span-3">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Layer {{ layer.n }} · {{ layer.slug }}</p>
                    </div>
                    <div class="lg:col-span-6">
                        <h3 class="text-h3 font-degular font-bold text-drygray-100">{{ layer.title }}</h3>
                        <p class="text-b2 text-drygray-default mt-4">{{ layer.body }}</p>
                    </div>
                    <div class="lg:col-span-3">
                        <ul class="space-y-2 text-b1 text-drygray-default">
                            <li v-for="s in layer.specifics" :key="s" class="flex items-center gap-2">
                                <span class="text-primary-text" aria-hidden="true">·</span> {{ s }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. Where it lands — concrete vertical use cases. Eyebrow renamed (was "In the field" — ChapsVision echo per voice doc). -->
        <section class="bg-whitesmoke-100 rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Where it lands" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Three institutions. Three problems. One platform<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    How AlpOS is applied in practice — three concrete deployments across financial services, critical infrastructure, and defense.
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="story in fieldStories" :key="story.sector" class="bg-white rounded-2xl p-7 flex flex-col">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ story.sector }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3 leading-tight">{{ story.problem }}</p>
                    <p class="text-b1 text-drygray-default mt-4 flex-1">{{ story.body }}</p>
                    <p class="text-b1 text-drygray-100 font-medium mt-6 pt-4 border-t border-drygray-200">{{ story.outcome }}</p>
                </div>
            </div>
        </section>

        <!-- 6. Sovereign by design -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14 max-w-3xl">
                <CommonSup title="Sovereign by design" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Your data. Your jurisdiction. Your access controls. Your audit<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    Sovereignty is not a deployment option. It is an architectural commitment. AlpOS runs where you require — and only where you require.
                </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="mode in deploymentModes" :key="mode.name" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Mode</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ mode.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ mode.body }}</p>
                </div>
            </div>
        </section>

        <!-- 7. Modularity -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Modular" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05] max-w-3xl">
                Compose the platform. Brand the modules<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                AlpOS layers are independently deployable and independently brandable. Customers and partners map their own product names onto the same architecture, under the same sovereignty guarantees. The platform is the constant. The surface is yours.
            </p>
        </section>

        <!-- 8. Capability matrix -->
        <section class="bg-whitesmoke-100 rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Capability matrix" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    What AlpOS is, in specifics<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="bg-white rounded-2xl overflow-hidden">
                <table class="w-full text-left">
                    <tbody>
                        <tr v-for="(row, i) in capabilities" :key="row.group" :class="[i % 2 === 1 ? 'bg-whitesmoke-100' : '', 'border-t border-drygray-200 first:border-t-0']">
                            <td class="px-6 py-5 align-top w-1/3 sm:w-1/4">
                                <span class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-100">{{ row.group }}</span>
                            </td>
                            <td class="px-6 py-5 text-b2 text-drygray-default">{{ row.items }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- 9. AI capabilities tiles (NEW) -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="AI capabilities" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    AI capabilities, governed at the layer above<span class="text-primary-text">.</span>
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    AlpOS bundles a stack of AI capabilities that operate inside your perimeter — grounded against your ontology, audited end to end.
                </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="cap in aiCapabilities" :key="cap.slug" :to="`/capabilities/${cap.slug}`" class="bg-white hover:bg-whitesmoke-100 rounded-2xl p-6 transition-colors group block">
                    <p class="text-h3 font-degular font-bold text-drygray-100 group-hover:text-primary-text transition-colors leading-tight">{{ cap.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ cap.body }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-5 inline-flex items-center gap-2 transition-colors text-[13px] font-medium">
                        Explore
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <!-- 10. Outcomes -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Outcomes" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Faster decisions. Defensible decisions. Governed at scale<span class="text-primary-text">.</span>
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="o in outcomes" :key="o.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ o.label }}</p>
                    <p class="text-b2 text-drygray-100 mt-4 leading-relaxed">{{ o.body }}</p>
                </div>
            </div>
        </section>

        <!-- 11. Industries we serve (NEW) -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                <div>
                    <CommonSup title="Industries we serve" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        One platform. Many institutions<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <NuxtLink to="/industries">
                    <CommonButton variant="outline" size="xs" icon="base:arrow">All industries</CommonButton>
                </NuxtLink>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="industry in industriesServed" :key="industry.slug" :to="`/industries/${industry.slug}`" class="bg-whitesmoke-100 card-hover hover:bg-whitesmoke-200 rounded-2xl p-6 transition-colors group block">
                    <p class="text-h3 font-degular font-bold text-drygray-100 group-hover:text-primary-text transition-colors leading-tight">{{ industry.name }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-4 inline-flex items-center gap-2 transition-colors text-[13px] font-medium">
                        Industry detail
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <!-- 12. CTA -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Bring AlpOS into your operations<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Demos are run against your scenarios. Bring your data architecture, your constraints, and your operational reality — we'll bring the platform and the right people from our side.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                    <NuxtLink to="/contact"><CommonButton variant="outline" icon="base:arrow">Speak to an expert</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
