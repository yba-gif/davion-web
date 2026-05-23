<script setup lang="ts">
useSeoMeta({
    title: 'Cybersecurity',
    description: 'Defensive intelligence for environments that cannot fail. Detection through pattern, anomaly, and graph analysis; secure-by-design architecture for constrained and air-gapped environments.',
    ogTitle: 'Davion · Cybersecurity',
    ogDescription: 'Pattern, anomaly, and graph analysis inside the perimeter. Designed for environments where telemetry cannot leave.',
})

const methods = [
    { name: 'Pattern', body: 'Behavioral baselines across users, systems, and traffic. Departures from the known surface fast.' },
    { name: 'Anomaly', body: 'Statistical and ML methods catch what rule-based detection cannot, including weak signals that precede the breach.' },
    { name: 'Graph', body: 'Relationship analysis across entities, sessions, and events. Lateral movement and adversary tradecraft made visible.' },
]

const architecture = [
    { label: 'Segmentation', body: 'Per-zone deployment with controlled inter-zone exchange. Compromise contained by design.' },
    { label: 'Controlled exchange', body: 'Signed, audited data flow between perimeters. No covert channels.' },
    { label: 'Traceability', body: 'Every action, every operator, every signal, logged and reviewable end to end.' },
    { label: 'Standards alignment', body: 'ISO 27001, NIS2-class, and sector-specific certifications respected, not retrofitted.' },
]

const outcomes = [
    { label: 'Detection', body: 'Adversary tradecraft surfaced inside your perimeter, not from a third-party feed.' },
    { label: 'Response', body: 'From signal to operator action in minutes. The investigation cycle is the architecture.' },
    { label: 'Defensibility', body: 'Every action, every detection, every analyst keystroke, reviewable for regulators and the after-action.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup title="Solutions · Cybersecurity" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Defensive intelligence for environments that cannot fail.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Cyber is now the defining institutional risk. Davion deploys detection, response, and governance inside the perimeters that cannot send their data anywhere, including air-gapped ones.
            </p>
            <div class="mt-10">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <CommonSup title="The problem" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[36px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight max-w-4xl">
                A breach inside your perimeter is also a breach of your sovereignty.
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                Standard SaaS-SOC architectures move telemetry, decisions, and analyst behavior out of the institution. For regulated and sensitive operators, that is the wrong direction. Detection has to live where the data lives.
            </p>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="max-w-3xl mb-10 md:mb-14">
                <CommonSup title="Detection" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Three methods. One analytic surface.
                </h2>
                <p class="text-b2 text-drygray-default mt-6">
                    Davion detection runs on AlpOS. Pattern, anomaly, and graph analysis share the same ontology, and the same audit trail.
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="m in methods" :key="m.name" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Method</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-3">{{ m.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ m.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Architecture" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    Secure by design. Aligned to your standards.
                </h2>
            </div>
            <div class="bg-whitesmoke-100 rounded-2xl divide-y divide-drygray-200">
                <div v-for="a in architecture" :key="a.label" class="grid lg:grid-cols-12 gap-4 px-6 py-5">
                    <p class="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text self-center">{{ a.label }}</p>
                    <p class="lg:col-span-9 text-b2 text-drygray-100">{{ a.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
                <div class="lg:col-span-7">
                    <CommonSup title="Constrained environments" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                        Designed for the air-gapped and the under-resourced.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Davion deploys in environments without internet egress, without per-seat licensing, and without third-party telemetry. The platform works at the edge of what is operationally possible.
                    </p>
                </div>
                <div class="lg:col-span-5">
                    <div class="bg-white rounded-2xl p-6">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text mb-4">Modes</p>
                        <ul class="space-y-3 text-b2 text-drygray-100">
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> On-premise</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Air-gapped</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Tactical edge</li>
                            <li class="flex items-center gap-3"><span class="text-primary-text" aria-hidden="true">·</span> Sovereign cloud</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="mb-10 md:mb-14">
                <CommonSup title="Outcomes" />
                <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[44px] md:leading-[1.05]">
                    What you defend with.
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
                <div v-for="o in outcomes" :key="o.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ o.label }}</p>
                    <p class="text-b2 text-drygray-100 mt-4 leading-relaxed">{{ o.body }}</p>
                </div>
            </div>
        </section>

        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Defend where the data lives.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Assessments start with the threats you actually have to defend against, in the operational environment you actually have.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Book a demo</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
