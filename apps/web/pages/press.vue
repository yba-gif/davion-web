<script setup lang="ts">
useSeoMeta({
    title: 'Press kit',
    description: 'Davion press kit, logos, brand colours, executive bio placeholders, contact for journalists and analysts.',
    ogTitle: 'Davion · Press kit',
    ogDescription: 'Logos, colours, factsheet, executive bios, media contact.',
})

// Brand colour swatches. AA-safe + decoration colours from tailwind.config.ts.
const colours = [
    { name: 'Primary (decoration)', hex: '#60E576', usage: 'Buttons, fills, dots, decorative accents. Not as text on white.' },
    { name: 'Primary-text (AA-safe)', hex: '#2A8B3C', usage: 'Green-on-white text: eyebrows, badges, link hovers, headline `.` punctuation. Contrast against white ≥ 5.3:1.' },
    { name: 'Drygray-100 (text)', hex: '#212121', usage: 'Body text, headings, the wordmark.' },
    { name: 'Drygray-default (muted)', hex: '#979797', usage: 'Secondary text, captions, metadata.' },
    { name: 'Azure (section)', hex: '#E0F1F3', usage: 'Section background, primary pastel.' },
    { name: 'Aliceblue (section)', hex: '#DCEFF3', usage: 'Section background, secondary pastel.' },
    { name: 'Honeydew (section)', hex: '#D9EFDF', usage: 'Section background, narrative-story pastel.' },
    { name: 'Whitesmoke-100 (card)', hex: '#F8F8F8', usage: 'Card background, neutral.' },
]

const assets = [
    { name: 'Davion mark · PNG (1024×1024)', file: '/logo.png', size: '~ 41 KB', note: 'The "D." mark on brand-green with rounded corners. Generated from the 1000×1000 master via pnpm build:logo. Smaller sizes available at /logo-512.png, /logo-192.png, /logo-64.png, /logo-32.png.' },
    { name: 'Davion wordmark · SVG', file: '/logo.svg', size: '~ 4 KB', note: 'Full "Davion" wordmark, dark grey on transparent. For light backgrounds.' },
    { name: 'OG card · 1200×630 PNG', file: '/og-cover.png', size: '~ 49 KB', note: 'Default social-share card. Brand-aligned with current positioning headline.' },
    { name: 'Hero spiral · WebP @ 1600w', file: '/section_background-1600.webp', size: '~ 50 KB', note: 'The signature image. Cleared for editorial use with credit to Davion.' },
]

const executives = [
    {
        name: 'Berkan Altun',
        role: 'CEO',
        bio: 'Sets product direction, owns the platform\'s architecture, and personally sits in on every customer engagement. Operates between Zurich and Istanbul. Detailed background published once approved for public reference.',
        contact: 'press@davion.com',
        photo: '/team/berkan-altun.webp',
    },
]

const facts = [
    { label: 'Headquarters', value: 'Zurich · Istanbul' },
    { label: 'Founded', value: 'Pending entity finalisation' },
    { label: 'Stage', value: 'Early-stage; first engagements under contract' },
    { label: 'Categories', value: 'Sovereign AI · Data intelligence · Decision support' },
    { label: 'Buyers we serve', value: 'Banks, ministries, defense, energy, life sciences, manufacturing, government, critical infrastructure' },
    { label: 'Deployment postures', value: 'On-prem · Air-gapped · Sovereign cloud' },
]
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Hero -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-14 md:py-28">
            <CommonSup title="Press kit · Media" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[60px] md:leading-[0.98] lg:text-[72px] tracking-tight max-w-4xl">
                For journalists and analysts<span class="text-primary-text">.</span>
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Everything a working journalist or analyst needs to write about Davion accurately. Embargoed material handled with discretion via the press desk.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
                <a href="mailto:press@davion.com"><CommonButton variant="primary" icon="base:arrow">press@davion.com</CommonButton></a>
                <NuxtLink to="/company/newsroom"><CommonButton variant="outline" icon="base:arrow">Newsroom</CommonButton></NuxtLink>
            </div>
        </section>

        <!-- Factsheet -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup title="Factsheet" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                Davion at a glance<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                The facts as they stand today. Updated as the company grows; anything pending is marked as such.
            </p>
            <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="f in facts" :key="f.label" class="bg-white rounded-2xl p-6">
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default">{{ f.label }}</p>
                    <p class="font-degular font-bold text-drygray-100 text-[18px] mt-2 leading-snug">{{ f.value }}</p>
                </div>
            </div>
        </section>

        <!-- Downloadable assets -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup title="Logos and assets" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                Download-ready files<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                These are the placeholder assets shipped with the current site. The full identity package, mark, wordmark, lockups, type system, lands with the P2.3 identity refresh.
            </p>
            <div class="mt-10 space-y-3">
                <a
                    v-for="a in assets"
                    :key="a.file"
                    :href="a.file"
                    :download="a.file.split('/').pop()"
                    class="bg-whitesmoke-100 card-hover hover:bg-whitesmoke-200 rounded-2xl p-6 transition-colors block group"
                >
                    <div class="grid md:grid-cols-12 gap-4 items-center">
                        <div class="md:col-span-5">
                            <p class="text-h3 font-degular font-bold text-drygray-100 leading-tight group-hover:text-primary-text transition-colors">{{ a.name }}</p>
                            <p class="text-[13px] text-drygray-default mt-1">{{ a.size }}</p>
                        </div>
                        <div class="md:col-span-6">
                            <p class="text-b1 text-drygray-default">{{ a.note }}</p>
                        </div>
                        <div class="md:col-span-1 md:text-right">
                            <span class="text-[13px] text-drygray-100 group-hover:text-primary-text transition-colors font-medium inline-flex items-center gap-2">
                                Download
                                <span aria-hidden="true">↓</span>
                            </span>
                        </div>
                    </div>
                </a>
            </div>
        </section>

        <!-- Colours -->
        <section class="bg-azure rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup title="Brand colours" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                The palette in use today<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                Two greens (decoration + AA-safe text), two greys, four pastels. The two-tone green system passes WCAG AA contrast for green-on-white text.
            </p>
            <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div v-for="c in colours" :key="c.hex" class="bg-white rounded-2xl overflow-hidden">
                    <div class="h-24" :style="{ backgroundColor: c.hex }" :aria-label="`Swatch for ${c.name} ${c.hex}`" />
                    <div class="p-5">
                        <p class="font-degular font-bold text-drygray-100 text-[15px] leading-tight">{{ c.name }}</p>
                        <p class="font-mono text-[12px] text-primary-text mt-1">{{ c.hex }}</p>
                        <p class="text-[13px] text-drygray-default mt-3">{{ c.usage }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Executive bios -->
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <CommonSup title="Executive bios" />
            <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05] max-w-3xl">
                People you can quote<span class="text-primary-text">.</span>
            </h2>
            <p class="text-b2 text-drygray-default mt-6 max-w-3xl">
                Davion is early-stage. Additional executive bios are added as they are approved for public reference. For background interviews, route through the press desk.
            </p>
            <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="e in executives" :key="e.name" class="bg-whitesmoke-100 rounded-2xl p-6">
                    <div v-if="e.photo === null" class="aspect-square bg-white rounded-xl mb-4 flex items-center justify-center">
                        <span class="text-[11px] font-mono uppercase tracking-[0.15em] text-drygray-default">Portrait pending</span>
                    </div>
                    <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-primary-text">{{ e.role }}</p>
                    <p class="text-h3 font-degular font-bold text-drygray-100 mt-2 leading-tight">{{ e.name }}</p>
                    <p class="text-b1 text-drygray-default mt-3">{{ e.bio }}</p>
                    <a :href="`mailto:${e.contact}`" class="text-[13px] text-primary-text mt-4 inline-block hover:underline">{{ e.contact }}</a>
                </div>
            </div>
        </section>

        <!-- Media contact -->
        <section class="bg-honeydew rounded-3xl px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div class="grid lg:grid-cols-12 gap-8 items-end">
                <div class="lg:col-span-8">
                    <CommonSup title="Press desk" />
                    <h2 class="font-degular font-bold text-drygray-100 mt-4 text-h2 md:text-[40px] md:leading-[1.05]">
                        Media enquiries<span class="text-primary-text">.</span>
                    </h2>
                    <p class="text-b2 text-drygray-default mt-6 max-w-2xl">
                        Routing through the press desk for embargoed news, executive interview requests, background briefings, and analyst inquiries. We respond inside one business day.
                    </p>
                </div>
                <div class="lg:col-span-4 lg:text-right">
                    <a href="mailto:press@davion.com"><CommonButton variant="primary" icon="base:arrow">press@davion.com</CommonButton></a>
                </div>
            </div>
        </section>
    </div>
</template>
