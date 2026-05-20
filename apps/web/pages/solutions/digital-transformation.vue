<script setup lang="ts">
useSeoMeta({
    title: 'Digital Transformation',
    description: 'Modernization with sovereignty intact — from siloed data to a single governed source of truth, phased from POC to industrial deployment.',
})

const phases = [
    { n: '01', name: 'Discover', body: 'Audit the data, the workflows, and the operational reality. Identify the single highest-value decision to govern first.' },
    { n: '02', name: 'POC', body: 'Stand up AlpOS against the proof-of-concept dataset. Demonstrate the ingest-to-act spine end to end, inside the sovereign perimeter.' },
    { n: '03', name: 'Industrialize', body: 'Expand from POC to operational deployment. Connect remaining sources, formalize the ontology, embed decisions into workflows of record.' },
    { n: '04', name: 'Enable', body: 'Train operators, hand off ownership, and instrument the platform for ongoing change. The work continues — without the contractor.' },
]

const layers = [
    { name: 'Ingest', body: 'Bring fragmented data into a single governed pipeline; lineage tracked from source.' },
    { name: 'Ontology', body: 'Establish the shared vocabulary across the institution — analysts, engineers, operators reason against the same model.' },
    { name: 'Decide', body: 'Replace report-and-meeting cycles with operator-grade decisioning, with AI that cites its sources.' },
    { name: 'Act', body: 'Write decisions back to the systems of record the institution already runs.' },
]

const outcomes = [
    { label: 'Time to insight', body: 'Decisions in days, not quarterly reviews. The platform absorbs the speed gap legacy stacks create.' },
    { label: 'Governance', body: 'Every decision is traceable. Modernization arrives with audit, not at its expense.' },
    { label: 'Operator ownership', body: 'The institution owns the platform after deployment — not a vendor relationship in perpetuity.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Solutions · Digital Transformation" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                From siloed data to a single governed source of truth.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Modernization for institutions that cannot trade governance for speed — and cannot afford to keep paying for both. AlpOS becomes the backbone, phased from proof-of-concept to industrial deployment.
            </p>
            <div class="mt-10">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <CommonSup title="The problem" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[36px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight max-w-4xl">
                Legacy stacks were not designed to be governed.
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                Decades of point tools, fragmented schemas, and migrations-deferred have left institutions with data they cannot trust, models they cannot defend, and decisions that arrive too late. Modernization is not a cosmetic exercise. It is a sovereign one.
            </p>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup title="Phased journey" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    From POC to industrial deployment, without losing the institution.
                </h2>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="phase in phases" :key="phase.n" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Phase {{ phase.n }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ phase.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ phase.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Underneath" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    The AlpOS layers that carry the work.
                </h2>
                <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                    Digital Transformation engagements lean on the full ingest-to-act spine, but the weight of the work falls on these four.
                </p>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl divide-y divide-drygray-200">
                <div v-for="layer in layers" :key="layer.name" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ layer.name }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ layer.body }}</p>
                </div>
            </div>
            <div class="mt-8">
                <NuxtLink to="/solutions/alpos"><CommonButton variant="outline" size="xs" icon="base:arrow">Explore AlpOS</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-aliceblue rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Outcomes" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    What the institution gets.
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="o in outcomes" :key="o.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ o.label }}</p>
                    <p class="text-b2 text-drygray-100 mt-4 leading-relaxed">{{ o.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Modernize without trading governance for speed.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Briefings start with the highest-value decision in your institution today — and work backwards from there.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
