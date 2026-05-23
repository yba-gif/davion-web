<script setup lang="ts">
// Davion header, base1's rounded blurred sticky nav.
// P0.7: stub pages pruned from nav. Only pages with real depth are advertised.
// Routes for the pruned pages remain alive (direct-link traffic still works);
// they're re-added once content lands per redesign-action-plan §P1–P2.
const isMobileMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const route = useRoute()

const nav = [
    {
        label: 'Solutions',
        children: [
            { label: 'AlpOS', to: '/solutions/alpos', flagship: true, desc: 'The sovereign AI platform underneath every solution.' },
            { label: 'Digital Transformation', to: '/solutions/digital-transformation' },
            { label: 'Cybersecurity', to: '/solutions/cybersecurity' },
            { label: 'OSINT', to: '/solutions/osint' },
        ],
    },
    // Capabilities dropdown restored, P2.2 promoted all 6 capability pages
    // out of stub status. Each links into 2-4 industries that lean on it.
    {
        label: 'Capabilities',
        children: [
            { label: 'RAG over your ontology', to: '/capabilities/rag', desc: 'AI that cites its sources, grounded in your ontology.' },
            { label: 'Geospatial analytics', to: '/capabilities/geospatial', desc: 'Map, ground, and reason over location-aware data.' },
            { label: 'Video intelligence', to: '/capabilities/video-intelligence', desc: 'Search hours of video by content. Chain-of-custody intact.' },
            { label: 'Audio analysis', to: '/capabilities/audio-analysis', desc: 'Transcribe, diarise, and extract structure at archive scale.' },
            { label: 'Machine translation', to: '/capabilities/translation', desc: '60+ languages inside your perimeter.' },
            { label: 'Data acquisition', to: '/capabilities/data-acquisition', desc: 'Connectors, ETL, enrichment from source to ontology.' },
            { label: 'All capabilities', to: '/capabilities' },
        ],
    },
    // Industries dropdown carries all 6 real playbooks (P2.1 promoted
    // Manufacturing / Life Sciences / Government out of stub status).
    {
        label: 'Industries',
        children: [
            { label: 'Financial Services', to: '/industries/financial-services', flagship: true, desc: 'Market & risk, compliance, client intelligence, resilience.' },
            { label: 'Energy', to: '/industries/energy', desc: 'Grid, generation, asset reliability, OT-side cyber.' },
            { label: 'Defense & Intelligence', to: '/industries/defense-intelligence', desc: 'Air-gapped sovereign AI inside the enclave.' },
            { label: 'Manufacturing', to: '/industries/manufacturing', desc: 'Plant operations, quality, supply, OT cyber.' },
            { label: 'Life Sciences', to: '/industries/life-sciences', desc: 'Discovery, clinical, pharmacovigilance, GxP.' },
            { label: 'Government', to: '/industries/government', desc: 'Cross-agency entity resolution, fraud, oversight.' },
            { label: 'All industries', to: '/industries' },
        ],
    },
    { label: 'Trust', to: '/trust' },
    // Company dropdown, collapsed from 3 flat top-level links (About / Careers /
    // Newsroom) once Careers landed in P2.6.
    {
        label: 'Company',
        children: [
            { label: 'About', to: '/company/about', flagship: true, desc: 'The opinion underneath the product.' },
            { label: 'Careers', to: '/company/careers', desc: 'Engineers and operators wanted.' },
            { label: 'Newsroom', to: '/company/newsroom', desc: 'Dispatches from the work.' },
        ],
    },
] as const

// P1.U4: WAI-ARIA menubar pattern.
// - Trigger button: aria-haspopup="menu", aria-expanded toggles on open/close.
// - Menu panel: role="menu" with role="menuitem" links.
// - Keyboard: ↓/↑ navigate items inside an open menu (wraparound), Home/End
//   jump to first/last, Enter activates focused item (NuxtLink follows href),
//   Escape closes menu and returns focus to its trigger, Tab closes and
//   moves focus naturally.
// - Roving tabindex: only the currently-focused menu item has tabindex="0".

function toggleDropdown(label: string) {
    openDropdown.value = openDropdown.value === label ? null : label
}
function closeAll() {
    openDropdown.value = null
    isMobileMenuOpen.value = false
}

watch(() => route.path, closeAll)

// Refs for trigger buttons + menu items, keyed by item label.
const triggerRefs = ref<Record<string, HTMLButtonElement | null>>({})
const menuItemRefs = ref<Record<string, HTMLAnchorElement[]>>({})

function registerTrigger(label: string, el: HTMLElement | null) {
    triggerRefs.value[label] = el as HTMLButtonElement | null
}
function registerMenuItem(label: string, index: number, el: HTMLElement | null) {
    if (!menuItemRefs.value[label]) menuItemRefs.value[label] = []
    if (el) menuItemRefs.value[label][index] = el as HTMLAnchorElement
}

async function openAndFocusFirst(label: string) {
    openDropdown.value = label
    await nextTick()
    menuItemRefs.value[label]?.[0]?.focus()
}
async function openAndFocusLast(label: string) {
    openDropdown.value = label
    await nextTick()
    const items = menuItemRefs.value[label] || []
    items[items.length - 1]?.focus()
}

function onTriggerKeydown(e: KeyboardEvent, label: string) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openAndFocusFirst(label)
    }
    else if (e.key === 'ArrowUp') {
        e.preventDefault()
        openAndFocusLast(label)
    }
}

function onMenuKeydown(e: KeyboardEvent, label: string, idx: number) {
    const items = menuItemRefs.value[label] || []
    if (items.length === 0) return
    if (e.key === 'ArrowDown') {
        e.preventDefault()
        items[(idx + 1) % items.length]?.focus()
    }
    else if (e.key === 'ArrowUp') {
        e.preventDefault()
        items[(idx - 1 + items.length) % items.length]?.focus()
    }
    else if (e.key === 'Home') {
        e.preventDefault()
        items[0]?.focus()
    }
    else if (e.key === 'End') {
        e.preventDefault()
        items[items.length - 1]?.focus()
    }
    else if (e.key === 'Escape') {
        e.preventDefault()
        openDropdown.value = null
        triggerRefs.value[label]?.focus()
    }
    else if (e.key === 'Tab') {
        // Tab closes the menu and lets focus move naturally to the next focusable.
        openDropdown.value = null
    }
}

const onClickOutside = (e: MouseEvent) => {
    if (headerRef.value && !headerRef.value.contains(e.target as Node)) {
        openDropdown.value = null
    }
}
const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeAll()
}

onMounted(() => {
    document.addEventListener('click', onClickOutside)
    document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside)
    document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
    <nav
        ref="headerRef"
        class="sticky rounded-b-2xl top-0 w-full max-w-7xl mx-auto [backdrop-filter:blur(32px)] bg-white/80 h-[72px] flex flex-row items-center justify-between gap-0 text-left text-sm text-drygray-100 font-switzer px-6 z-50 shadow-sm"
    >
        <div class="flex flex-row items-center justify-start gap-8">
            <NuxtLink to="/" class="flex items-center gap-2 cursor-pointer" @click="closeAll">
                <NuxtImg src="/logo-64.png" alt="Davion" width="20" height="20" class="size-5" />
                <span class="font-degular font-bold text-[18px] text-drygray-100">Davion</span>
            </NuxtLink>

            <!-- Desktop nav -->
            <div class="hidden lg:flex flex-row items-center justify-start gap-7">
                <template v-for="item in nav" :key="item.label">
                    <NuxtLink
                        v-if="'to' in item && item.to"
                        :to="item.to"
                        class="leading-[150%] font-medium transition-colors hover:text-primary-text"
                    >
                        {{ item.label }}
                    </NuxtLink>
                    <div v-else class="relative">
                        <button
                            :ref="(el) => registerTrigger(item.label, el as HTMLElement | null)"
                            type="button"
                            class="leading-[150%] font-medium transition-colors hover:text-primary-text inline-flex items-center gap-1.5"
                            :aria-expanded="openDropdown === item.label"
                            aria-haspopup="menu"
                            :aria-controls="`menu-${item.label}`"
                            @click.stop="toggleDropdown(item.label)"
                            @keydown="onTriggerKeydown($event, item.label)"
                        >
                            {{ item.label }}
                            <span
                                class="text-drygray-default text-[10px] transition-transform"
                                :class="openDropdown === item.label ? 'rotate-180' : ''"
                                aria-hidden="true"
                            >▾</span>
                        </button>
                        <div
                            v-if="openDropdown === item.label && 'children' in item"
                            :id="`menu-${item.label}`"
                            role="menu"
                            :aria-label="item.label"
                            class="absolute top-full left-0 mt-3 min-w-[340px] bg-white rounded-2xl shadow-xl border border-drygray-200 overflow-hidden"
                        >
                            <NuxtLink
                                v-for="(c, idx) in item.children"
                                :key="c.to"
                                :ref="(el) => registerMenuItem(item.label, idx, el as unknown as HTMLElement | null)"
                                :to="c.to"
                                role="menuitem"
                                :tabindex="idx === 0 ? 0 : -1"
                                class="block px-5 py-4 hover:bg-whitesmoke-100 transition-colors border-t border-drygray-200 first:border-t-0"
                                @keydown="onMenuKeydown($event, item.label, idx)"
                            >
                                <div class="flex items-center justify-between gap-4">
                                    <span class="text-drygray-100 font-medium">{{ c.label }}</span>
                                    <span v-if="'flagship' in c && c.flagship" class="text-primary-text text-[11px] font-semibold uppercase tracking-wider">Flagship</span>
                                </div>
                                <p v-if="'desc' in c && c.desc" class="text-drygray-default text-[13px] mt-1">{{ c.desc }}</p>
                            </NuxtLink>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Desktop CTA + mobile toggle -->
        <div class="flex items-center gap-3 text-[15px]">
            <NuxtLink to="/contact" class="hidden lg:inline-flex">
                <CommonButton size="xs" variant="outline" icon="base:arrow">Book a demo</CommonButton>
            </NuxtLink>
            <button
                type="button"
                class="lg:hidden p-2"
                :aria-expanded="isMobileMenuOpen"
                aria-label="Toggle menu"
                @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
                <Icon :name="isMobileMenuOpen ? 'base:close' : 'base:menu'" :class="isMobileMenuOpen ? 'size-6' : 'size-8'" />
            </button>
        </div>
    </nav>

    <!-- Mobile drawer -->
    <Teleport to="body">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 top-[72px] bg-white/95 backdrop-blur-md z-40 lg:hidden overflow-y-auto">
            <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
                <template v-for="item in nav" :key="item.label">
                    <NuxtLink
                        v-if="'to' in item && item.to"
                        :to="item.to"
                        class="text-[28px] leading-tight font-degular font-semibold text-drygray-100 hover:text-primary-text"
                        @click="closeAll"
                    >
                        {{ item.label }}
                    </NuxtLink>
                    <div v-else-if="'children' in item">
                        <p class="text-[11px] text-drygray-default uppercase tracking-[0.15em] font-semibold mb-3">{{ item.label }}</p>
                        <div class="flex flex-col gap-3 pl-1">
                            <NuxtLink
                                v-for="c in item.children"
                                :key="c.to"
                                :to="c.to"
                                class="text-[22px] font-degular font-semibold text-drygray-100 hover:text-primary-text inline-flex items-center gap-3"
                                @click="closeAll"
                            >
                                {{ c.label }}
                                <span v-if="'flagship' in c && c.flagship" class="text-primary-text text-[11px] font-semibold uppercase tracking-wider">Flagship</span>
                            </NuxtLink>
                        </div>
                    </div>
                </template>
                <NuxtLink to="/contact" class="mt-4" @click="closeAll">
                    <CommonButton variant="primary" icon="base:arrow" class="w-full">Book a demo</CommonButton>
                </NuxtLink>
            </div>
        </div>
    </Teleport>
</template>
