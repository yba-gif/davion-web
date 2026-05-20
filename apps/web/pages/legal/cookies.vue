<script setup lang="ts">
useSeoMeta({
    title: 'Cookie policy',
    description: 'Davion uses one strictly-necessary cookie and loads analytics only with explicit opt-in. Full inventory and how to control them.',
    ogTitle: 'Davion · Cookie policy',
    ogDescription: 'One strictly-necessary cookie. Analytics only with explicit consent.',
})

const lastUpdated = '2026-05-21'

const cookies = [
    {
        name: 'davion_cookie_consent',
        category: 'Strictly necessary',
        purpose: 'Remembers your choice from the cookie banner ("accept" or "essential only"). Set the moment you make a choice; not set before.',
        lifetime: '12 months',
        provider: 'davion.com (first-party)',
    },
    {
        name: 'analytics_session_id',
        category: 'Optional · Analytics',
        purpose: 'Anonymous session identifier used to group page-view events from a single visit. Not linked to your identity. Only set if you opt in.',
        lifetime: 'Session (cleared when you close the browser)',
        provider: 'davion.com (first-party)',
    },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Legal · Cookie policy" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                Cookie policy<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                The minimum number of cookies necessary, with explicit consent before anything beyond strictly-necessary. No third-party tracking. No pre-checked boxes.
            </p>
            <p class="text-[13px] font-mono uppercase tracking-[0.15em] text-drygray-default mt-8">
                Last updated · {{ lastUpdated }}
            </p>
        </section>

        <!-- The principle -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup title="The principle" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                Consent first<span class="text-primary-text">.</span> Strictly-necessary second<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                On first visit you see a non-blocking banner with two options: <strong class="font-semibold text-drygray-100">Accept all</strong> or <strong class="font-semibold text-drygray-100">Essential only</strong>. Nothing is loaded before you choose. There are no third-party cookies in either state. Your choice persists; you can change it any time via the link in the footer.
            </p>
        </section>

        <!-- Inventory -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <CommonSup title="Cookie inventory" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                Every cookie this site can set<span class="text-primary-text">.</span>
            </h2>
            <div class="mt-10 space-y-4">
                <div v-for="c in cookies" :key="c.name" class="bg-white rounded-2xl p-6 md:p-8">
                    <div class="grid md:grid-cols-12 gap-4 md:gap-6">
                        <div class="md:col-span-4">
                            <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ c.category }}</p>
                            <p class="font-mono text-[15px] text-drygray-100 mt-2 break-all">{{ c.name }}</p>
                        </div>
                        <div class="md:col-span-8">
                            <p class="text-b1 text-drygray-100">{{ c.purpose }}</p>
                            <div class="mt-4 flex flex-wrap gap-6 text-[13px] text-drygray-default">
                                <span><strong class="text-drygray-100 font-medium">Lifetime:</strong> {{ c.lifetime }}</span>
                                <span><strong class="text-drygray-100 font-medium">Provider:</strong> {{ c.provider }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Control -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <CommonSup title="Control" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05] max-w-3xl">
                How to change your mind<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b1 text-drygray-100 mt-6 max-w-3xl">
                The cookie-consent footer link reopens the banner so you can change your selection at any time. You can also clear the <code class="font-mono text-[13px] bg-whitesmoke-100 px-2 py-0.5 rounded">davion_cookie_consent</code> cookie in your browser settings to be re-prompted on next visit. Browser-level tracking-prevention features (Safari ITP, Firefox ETP, Brave Shields, etc.) work as expected; we do not attempt to defeat them.
            </p>
        </section>

        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div class="grid lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-8">
                    <CommonSup title="Other legal" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[32px] md:leading-[1.05]">
                        Related documents<span class="text-primary-text">.</span>
                    </h2>
                </div>
                <div class="lg:col-span-4 lg:text-right flex flex-wrap gap-3 lg:justify-end">
                    <NuxtLink to="/legal/privacy"><CommonButton variant="outline" size="xs" icon="base:arrow">Privacy</CommonButton></NuxtLink>
                    <NuxtLink to="/legal/terms"><CommonButton variant="outline" size="xs" icon="base:arrow">Terms</CommonButton></NuxtLink>
                    <NuxtLink to="/legal/responsible-ai"><CommonButton variant="outline" size="xs" icon="base:arrow">Responsible AI</CommonButton></NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>
