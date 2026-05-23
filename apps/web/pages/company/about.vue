<script setup lang="ts">
useSeoMeta({
    title: 'About',
    description: 'Davion is the sovereign AI platform for institutions whose data can\'t leave. The opinion, the values, and the people behind it.',
    ogTitle: 'About Davion',
    ogDescription: 'Sovereignty isn\'t a feature. It\'s where the work happens.',
})

// Founder bio modal. Triggered from the team card. Closes on backdrop
// click or ESC. Body scroll lock while open so the page underneath
// doesn't shift.
const showBio = ref(false)

function openBio() { showBio.value = true }
function closeBio() { showBio.value = false }

function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && showBio.value) closeBio()
}

watch(showBio, (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    if (typeof document !== 'undefined') document.body.style.overflow = ''
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

        <!-- What is sovereign AI? Definitional anchor for novice buyers. Moved here
             from the landing page so the home stays focused on the expert funnel
             while this page carries the full explainer. -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
            <div class="grid lg:grid-cols-12 gap-10 items-start">
                <div class="lg:col-span-4">
                    <CommonSup title="If you are new to the term" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        What is sovereign AI<span class="text-primary-text">?</span>
                    </h2>
                </div>
                <div class="lg:col-span-8 space-y-5 text-[17px] leading-[1.6] text-drygray-100 font-medium">
                    <p>
                        Sovereign AI is AI that runs <strong class="font-semibold">where the data lives</strong>, under the institution's own governance, not in a vendor's cloud.
                    </p>
                    <p>
                        Most platforms calling themselves "sovereign AI" today are hosted services with European billing addresses. The data still crosses the vendor's network, the inference still runs on the vendor's hardware, and the audit trail still belongs to the vendor. That is regulatory residency, not operational sovereignty.
                    </p>
                    <p>
                        Davion is operationally sovereign: deployments run inside the customer's perimeter, air-gapped, on-prem, or in a sovereign cloud bound by contract. The data does not leave. The weights are auditable on-prem. Every decision traces back to the source it was made on.
                    </p>
                </div>
            </div>
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
                <div class="bg-white rounded-2xl p-6 flex flex-col">
                    <NuxtImg
                        src="/team/berkan-altun-240.webp"
                        alt="Berkan Altun, CEO of Davion"
                        width="240"
                        height="240"
                        class="size-20 rounded-2xl object-cover mb-4"
                    />
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">CEO</p>
                    <p class="font-degular font-bold text-drygray-100 text-h3 mt-3">Berkan Altun</p>
                    <p class="text-b1 text-drygray-default mt-3">
                        Sets product direction, owns the platform's architecture, and personally sits in on every customer engagement.
                    </p>
                    <button
                        type="button"
                        class="mt-5 self-start text-[13px] font-semibold text-primary-text underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-primary-text focus-visible:outline-offset-2 rounded"
                        :aria-expanded="showBio"
                        aria-controls="berkan-altun-bio"
                        @click="openBio"
                    >
                        Read full bio →
                    </button>
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

        <!-- Bio modal. Teleported to body so it sits above all stacking contexts.
             Backdrop click closes; ESC key handled in <script setup>. -->
        <Teleport to="body">
            <Transition name="fade">
                <div
                    v-if="showBio"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="berkan-altun-bio-title"
                    data-lenis-prevent
                    class="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                    @click.self="closeBio"
                >
                    <div
                        id="berkan-altun-bio"
                        class="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-10 max-h-[90vh] overflow-y-auto relative"
                    >
                        <button
                            type="button"
                            class="absolute top-4 right-4 size-10 rounded-full bg-whitesmoke-100 hover:bg-drygray-200 flex items-center justify-center text-drygray-100 focus-visible:outline-2 focus-visible:outline-primary-text focus-visible:outline-offset-2"
                            aria-label="Close bio"
                            @click="closeBio"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3 L15 15 M15 3 L3 15"/></svg>
                        </button>
                        <div class="flex flex-col md:flex-row gap-6 md:gap-10 mt-2">
                            <NuxtImg
                                src="/team/berkan-altun.webp"
                                alt="Berkan Altun, CEO of Davion"
                                width="600"
                                height="600"
                                class="size-40 md:size-48 rounded-2xl object-cover flex-shrink-0"
                            />
                            <div class="flex-1 min-w-0">
                                <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">CEO</p>
                                <h3 id="berkan-altun-bio-title" class="font-degular font-bold text-drygray-100 text-h2 md:text-[36px] mt-3">Berkan Altun</h3>
                                <div class="mt-6 space-y-4 text-[16px] leading-[1.6] text-drygray-100">
                                    <p>
                                        Berkan leads Davion as Chief Executive Officer. He sets product direction, owns the platform's architecture, and personally sits in on every customer engagement.
                                    </p>
                                    <p>
                                        He operates between <strong class="font-semibold">Zurich and Istanbul</strong>, aligning Swiss neutrality at the data layer with NATO-perimeter operational depth in the field.
                                    </p>
                                    <p class="text-drygray-default">
                                        Detailed background and prior work published once approved for public reference. For board-level engagements, reach out via <NuxtLink to="/contact" class="text-primary-text underline underline-offset-4 hover:no-underline">the contact page</NuxtLink>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
