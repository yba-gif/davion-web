<script setup lang="ts">
useSeoMeta({
    title: 'Solutions',
    description: 'Davion solutions: AlpOS, Digital Transformation, Cybersecurity, OSINT — built on one sovereign platform.',
})

const solutions = [
    { slug: 'alpos', label: 'Platform · Flagship', name: 'AlpOS', body: 'The sovereign operating system underneath every Davion solution. Ingest, ontology, analytics, AI, decisioning, action.' },
    { slug: 'digital-transformation', label: 'Solution', name: 'Digital Transformation', body: 'From siloed data to a single governed source of truth, phased from POC to industrial deployment.' },
    { slug: 'cybersecurity', label: 'Solution', name: 'Cybersecurity', body: 'Defensive intelligence for environments that cannot fail. Detection through pattern, anomaly, and graph analysis.' },
    { slug: 'osint', label: 'Solution', name: 'OSINT', body: 'Sovereign open-source intelligence — multi-source collection, correlation, and synthesis; anonymous and compliant.' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Solutions" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Four solutions. One platform underneath.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                AlpOS is the operating system. Digital Transformation, Cybersecurity, and OSINT are how it is applied. Same ingest-to-act spine, same sovereignty guarantees, same audit trail.
            </p>
        </section>

        <!-- Stack diagram -->
        <section class="bg-whitesmoke-100 rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup title="Stack" />
            <div class="mt-8 bg-white rounded-2xl p-4 sm:p-6 lg:p-8">
                <div class="grid grid-cols-3 gap-3 mb-3">
                    <div class="bg-aliceblue rounded-xl p-5 text-center">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">Solution</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 text-[22px] sm:text-[28px] leading-tight">Digital Transformation</p>
                    </div>
                    <div class="bg-aliceblue rounded-xl p-5 text-center">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">Solution</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 text-[22px] sm:text-[28px] leading-tight">Cybersecurity</p>
                    </div>
                    <div class="bg-aliceblue rounded-xl p-5 text-center">
                        <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-drygray-default">Solution</p>
                        <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 text-[22px] sm:text-[28px] leading-tight">OSINT</p>
                    </div>
                </div>
                <div class="bg-honeydew rounded-xl p-8 text-center border-t-4 border-primary">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">Platform</p>
                    <p class="font-degular font-bold text-drygray-100 mt-2 text-[44px] md:text-[56px] leading-[1]">AlpOS</p>
                    <p class="text-b1 text-drygray-default mt-3 max-w-2xl mx-auto">
                        Ingest · Ontology · Analyze · Decide · Act — inside a sovereign perimeter.
                    </p>
                </div>
            </div>
        </section>

        <!-- Solution cards -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid sm:grid-cols-2 gap-4">
                <NuxtLink
                    v-for="s in solutions"
                    :key="s.slug"
                    :to="`/solutions/${s.slug}`"
                    class="bg-whitesmoke-100 hover:bg-whitesmoke-200 rounded-2xl p-8 transition-colors block group"
                >
                    <p class="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-text">{{ s.label }}</p>
                    <p class="text-h2 font-degular font-bold text-drygray-100 mt-3">{{ s.name }}</p>
                    <p class="text-b2 text-drygray-default mt-4">{{ s.body }}</p>
                    <p class="text-drygray-100 group-hover:text-primary-text mt-6 inline-flex items-center gap-2 transition-colors font-medium">
                        Explore
                        <span aria-hidden="true">→</span>
                    </p>
                </NuxtLink>
            </div>
        </section>

        <!-- Deployment + Industries -->
        <section class="bg-aliceblue rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div class="grid lg:grid-cols-2 gap-10 lg:gap-14">
                <div>
                    <CommonSup title="Deployment" />
                    <h2 class="text-h2 font-degular font-bold text-drygray-100 mt-4">Every solution. Every deployment mode.</h2>
                    <p class="text-b2 text-drygray-default mt-4">
                        On-premise, air-gapped, sovereign cloud, or private cloud. The deployment model is yours to choose; the sovereignty guarantees do not change.
                    </p>
                    <div class="mt-6">
                        <NuxtLink to="/trust"><CommonButton variant="outline" size="xs" icon="base:arrow">Trust &amp; Sovereignty</CommonButton></NuxtLink>
                    </div>
                </div>
                <div>
                    <CommonSup title="Industries" />
                    <h2 class="text-h2 font-degular font-bold text-drygray-100 mt-4">Buyers identify by mission, not feature.</h2>
                    <p class="text-b2 text-drygray-default mt-4">
                        Davion is deployed in defense, intelligence, critical infrastructure, government, financial services, and energy — wherever decisions must be both fast and defensible.
                    </p>
                    <div class="mt-6">
                        <NuxtLink to="/industries"><CommonButton variant="outline" size="xs" icon="base:arrow">Industries</CommonButton></NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Engage" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-[40px] leading-[1.05] md:text-[56px] md:leading-[1.02] tracking-tight">
                        Start with AlpOS. Tailor the rest.
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Most engagements begin with an AlpOS briefing tailored to your environment, then expand into the solution layers as the platform proves itself.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <NuxtLink to="/solutions/alpos"><CommonButton variant="primary" icon="base:arrow">Explore AlpOS</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
