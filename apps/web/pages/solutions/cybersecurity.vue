<script setup lang="ts">
useSeoMeta({
    title: 'Cybersecurity',
    description: 'Defensive intelligence for environments that cannot fail. Detection through pattern, anomaly, and graph analysis; secure-by-design architecture for constrained and air-gapped environments.',
})

const methods = [
    { name: 'Pattern', body: 'Behavioral baselines across users, systems, and traffic. Departures from the known surface fast.' },
    { name: 'Anomaly', body: 'Statistical and ML methods catch what rule-based detection cannot — including weak signals that precede the breach.' },
    { name: 'Graph', body: 'Relationship analysis across entities, sessions, and events. Lateral movement and adversary tradecraft made visible.' },
]

const architecture = [
    { label: 'Segmentation', body: 'Per-zone deployment with controlled inter-zone exchange. Compromise contained by design.' },
    { label: 'Controlled exchange', body: 'Signed, audited data flow between perimeters. No covert channels.' },
    { label: 'Traceability', body: 'Every action, every operator, every signal — logged and reviewable end to end.' },
    { label: 'Standards alignment', body: 'ISO 27001, NIS2-class, and sector-specific certifications respected — not retrofitted.' },
]

const outcomes = [
    { label: 'Detection', body: 'Adversary tradecraft surfaced inside your perimeter — not from a third-party feed.' },
    { label: 'Response', body: 'From signal to operator action in minutes. The investigation cycle is the architecture.' },
    { label: 'Defensibility', body: 'Every action, every detection, every analyst keystroke — reviewable for regulators and the after-action.' },
]
</script>

<template>
    <div class="bg-ink text-bone">
        <!-- Hero -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-44 lg:pb-24">
                <p class="text-eyebrow mb-6">Solutions · Cybersecurity</p>
                <h1 class="text-display-l text-bone-bright max-w-4xl">Defensive intelligence for environments that cannot fail.</h1>
                <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                    Cyber is now the defining institutional risk. Davion deploys detection, response, and governance inside the perimeters that cannot send their data anywhere — including air-gapped ones.
                </p>
                <div class="mt-10">
                    <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                        Assess your posture
                        <span aria-hidden="true">→</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- The problem -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12">
                    <div class="lg:col-span-3"><p class="text-eyebrow">The problem</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-display-m text-bone-bright max-w-4xl">A breach inside your perimeter is also a breach of your sovereignty.</p>
                        <p class="text-body-l text-steel-light mt-8 max-w-3xl">
                            Standard SaaS-SOC architectures move telemetry, decisions, and analyst behavior out of the institution. For regulated and sensitive operators, that is the wrong direction. Detection has to live where the data lives.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Detection methods -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Detection</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Three methods. One analytic surface.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-3xl">
                            Davion detection runs on AlpOS. Pattern, anomaly, and graph analysis share the same ontology — and the same audit trail.
                        </p>
                    </div>
                </div>
                <div class="grid md:grid-cols-3 gap-px bg-ink-200">
                    <div v-for="m in methods" :key="m.name" class="bg-ink p-8 lg:p-10">
                        <p class="text-label">Method</p>
                        <p class="text-h3 text-bone-bright mt-3">{{ m.name }}</p>
                        <p class="text-body-s mt-3">{{ m.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Secure-by-design architecture -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Architecture</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">Secure by design. Aligned to your standards.</p>
                    </div>
                </div>
                <div class="border-t border-ink-200">
                    <div v-for="a in architecture" :key="a.label" class="grid lg:grid-cols-12 gap-6 py-6 border-b border-ink-200">
                        <div class="lg:col-span-3"><p class="text-label">{{ a.label }}</p></div>
                        <p class="lg:col-span-9 text-body text-bone">{{ a.body }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Constrained environments -->
        <section class="border-b border-ink-200 bg-ink-50/40">
            <div class="mx-auto max-w-7xl px-6 py-20 lg:py-24">
                <div class="grid lg:grid-cols-12 gap-12 items-center">
                    <div class="lg:col-span-7">
                        <p class="text-eyebrow mb-4">Constrained environments</p>
                        <p class="text-h1 text-bone-bright">Designed for the air-gapped and the under-resourced.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            Davion deploys in environments without internet egress, without per-seat licensing, and without third-party telemetry. The platform works at the edge of what is operationally possible.
                        </p>
                    </div>
                    <div class="lg:col-span-5">
                        <div class="border border-ink-200 rounded-sm p-6 bg-ink">
                            <p class="text-eyebrow mb-4">Modes</p>
                            <ul class="space-y-2 text-body text-bone">
                                <li class="flex items-center gap-3"><span class="text-signal">·</span> On-premise</li>
                                <li class="flex items-center gap-3"><span class="text-signal">·</span> Air-gapped</li>
                                <li class="flex items-center gap-3"><span class="text-signal">·</span> Tactical edge</li>
                                <li class="flex items-center gap-3"><span class="text-signal">·</span> Sovereign cloud</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Outcomes -->
        <section class="border-b border-ink-200">
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 mb-16">
                    <div class="lg:col-span-3"><p class="text-eyebrow">Outcomes</p></div>
                    <div class="lg:col-span-9">
                        <p class="text-h1 text-bone-bright">What you defend with.</p>
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

        <!-- CTA -->
        <section>
            <div class="mx-auto max-w-7xl px-6 py-24 lg:py-32">
                <div class="grid lg:grid-cols-12 gap-12 items-end">
                    <div class="lg:col-span-8">
                        <p class="text-eyebrow mb-6">Engage</p>
                        <p class="text-display-m text-bone-bright">Defend where the data lives.</p>
                        <p class="text-body-l text-steel-light mt-6 max-w-2xl">
                            Assessments start with the threats you actually have to defend against, in the operational environment you actually have.
                        </p>
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-signal text-ink font-medium hover:bg-signal-dim transition-colors duration-davion-hover">
                            Assess your posture
                            <span aria-hidden="true">→</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
