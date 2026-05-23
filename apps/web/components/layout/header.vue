<script setup lang="ts">
// Davion header, base1's rounded blurred sticky nav.
// P0.7: stub pages pruned from nav. Only pages with real depth are advertised.
// Routes for the pruned pages remain alive (direct-link traffic still works);
// they're re-added once content lands per redesign-action-plan §P1–P2.
const isMobileMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const route = useRoute()

// Lock body scroll while the mobile drawer is open so the page underneath
// doesn't bleed through scrolling on touch devices. Restored on close.
watch(isMobileMenuOpen, (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
})

// Nav model uses i18n keys (labelKey / descKey) instead of literal strings.
// Resolved with $t() in the template so the bar tracks the current locale.
// Paths stay raw; localePath() wraps them at render time so /about becomes
// /tr/about for Turkish, /de/about for German, etc.
const nav = [
    {
        labelKey: 'nav.solutions',
        children: [
            { labelKey: 'subnav.solutions.alpos', to: '/solutions/alpos', flagship: true, descKey: 'subnav.solutions.alposDesc' },
            { labelKey: 'subnav.solutions.digital', to: '/solutions/digital-transformation' },
            { labelKey: 'subnav.solutions.cybersecurity', to: '/solutions/cybersecurity' },
            { labelKey: 'subnav.solutions.osint', to: '/solutions/osint' },
        ],
    },
    {
        labelKey: 'nav.capabilities',
        children: [
            { labelKey: 'subnav.capabilities.rag', to: '/capabilities/rag', descKey: 'subnav.capabilities.ragDesc' },
            { labelKey: 'subnav.capabilities.geospatial', to: '/capabilities/geospatial', descKey: 'subnav.capabilities.geospatialDesc' },
            { labelKey: 'subnav.capabilities.video', to: '/capabilities/video-intelligence', descKey: 'subnav.capabilities.videoDesc' },
            { labelKey: 'subnav.capabilities.audio', to: '/capabilities/audio-analysis', descKey: 'subnav.capabilities.audioDesc' },
            { labelKey: 'subnav.capabilities.translation', to: '/capabilities/translation', descKey: 'subnav.capabilities.translationDesc' },
            { labelKey: 'subnav.capabilities.dataAcq', to: '/capabilities/data-acquisition', descKey: 'subnav.capabilities.dataAcqDesc' },
            { labelKey: 'subnav.capabilities.all', to: '/capabilities' },
        ],
    },
    {
        labelKey: 'nav.industries',
        children: [
            { labelKey: 'subnav.industries.finance', to: '/industries/financial-services', flagship: true, descKey: 'subnav.industries.financeDesc' },
            { labelKey: 'subnav.industries.energy', to: '/industries/energy', descKey: 'subnav.industries.energyDesc' },
            { labelKey: 'subnav.industries.defense', to: '/industries/defense-intelligence', descKey: 'subnav.industries.defenseDesc' },
            { labelKey: 'subnav.industries.manufacturing', to: '/industries/manufacturing', descKey: 'subnav.industries.manufacturingDesc' },
            { labelKey: 'subnav.industries.lifeSciences', to: '/industries/life-sciences', descKey: 'subnav.industries.lifeSciencesDesc' },
            { labelKey: 'subnav.industries.government', to: '/industries/government', descKey: 'subnav.industries.governmentDesc' },
            { labelKey: 'subnav.industries.all', to: '/industries' },
        ],
    },
    { labelKey: 'nav.trust', to: '/trust' },
    {
        labelKey: 'nav.company',
        children: [
            { labelKey: 'subnav.company.about', to: '/company/about', flagship: true, descKey: 'subnav.company.aboutDesc' },
            { labelKey: 'subnav.company.careers', to: '/company/careers', descKey: 'subnav.company.careersDesc' },
            { labelKey: 'subnav.company.newsroom', to: '/company/newsroom', descKey: 'subnav.company.newsroomDesc' },
        ],
    },
] as const

const localePath = useLocalePath()

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
    // Defensive: restore body scroll if the component unmounts while the
    // drawer is open (e.g. user navigates away).
    if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<template>
    <nav
        ref="headerRef"
        class="sticky rounded-b-2xl top-0 w-full max-w-7xl mx-auto [backdrop-filter:blur(32px)] bg-white/80 h-[72px] flex flex-row items-center justify-between gap-0 text-left text-sm text-drygray-100 font-switzer px-6 z-50 shadow-sm"
    >
        <div class="flex flex-row items-center justify-start gap-8">
            <NuxtLink :to="localePath('/')" class="flex items-center gap-2 cursor-pointer" @click="closeAll">
                <NuxtImg src="/logo-64.png" alt="Davion" width="20" height="20" class="size-5" />
                <span class="font-degular font-bold text-[18px] text-drygray-100">Davion</span>
            </NuxtLink>

            <!-- Desktop nav -->
            <div class="hidden lg:flex flex-row items-center justify-start gap-7">
                <template v-for="item in nav" :key="item.labelKey">
                    <NuxtLink
                        v-if="'to' in item && item.to"
                        :to="localePath(item.to)"
                        class="leading-[150%] font-medium transition-colors hover:text-primary-text"
                    >
                        {{ $t(item.labelKey) }}
                    </NuxtLink>
                    <div v-else class="relative">
                        <button
                            :ref="(el) => registerTrigger(item.labelKey, el as HTMLElement | null)"
                            type="button"
                            class="leading-[150%] font-medium transition-colors hover:text-primary-text inline-flex items-center gap-1.5"
                            :aria-expanded="openDropdown === item.labelKey"
                            aria-haspopup="menu"
                            :aria-controls="`menu-${item.labelKey}`"
                            @click.stop="toggleDropdown(item.labelKey)"
                            @keydown="onTriggerKeydown($event, item.labelKey)"
                        >
                            {{ $t(item.labelKey) }}
                            <span
                                class="text-drygray-default text-[10px] transition-transform"
                                :class="openDropdown === item.labelKey ? 'rotate-180' : ''"
                                aria-hidden="true"
                            >▾</span>
                        </button>
                        <div
                            v-if="openDropdown === item.labelKey && 'children' in item"
                            :id="`menu-${item.labelKey}`"
                            role="menu"
                            :aria-label="$t(item.labelKey)"
                            class="absolute top-full left-0 mt-3 min-w-[340px] bg-white rounded-2xl shadow-xl border border-drygray-200 overflow-hidden"
                        >
                            <NuxtLink
                                v-for="(c, idx) in item.children"
                                :key="c.to"
                                :ref="(el) => registerMenuItem(item.labelKey, idx, el as unknown as HTMLElement | null)"
                                :to="localePath(c.to)"
                                role="menuitem"
                                :tabindex="idx === 0 ? 0 : -1"
                                class="block px-5 py-4 hover:bg-whitesmoke-100 transition-colors border-t border-drygray-200 first:border-t-0"
                                @keydown="onMenuKeydown($event, item.labelKey, idx)"
                            >
                                <div class="flex items-center justify-between gap-4">
                                    <span class="text-drygray-100 font-medium">{{ $t(c.labelKey) }}</span>
                                    <span v-if="'flagship' in c && c.flagship" class="text-primary-text text-[11px] font-semibold uppercase tracking-wider">{{ $t('subnav.flagship') }}</span>
                                </div>
                                <p v-if="'descKey' in c && c.descKey" class="text-drygray-default text-[13px] mt-1">{{ $t(c.descKey) }}</p>
                            </NuxtLink>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Desktop CTA + language switcher + mobile toggle -->
        <div class="flex items-center gap-2 lg:gap-3 text-[15px]">
            <CommonLangSwitcher class="hidden lg:block" />
            <NuxtLink :to="localePath('/contact')" class="hidden lg:inline-flex">
                <CommonButton size="xs" variant="outline" icon="base:arrow">{{ $t('nav.bookDemo') }}</CommonButton>
            </NuxtLink>
            <CommonLangSwitcher class="lg:hidden" />
            <button
                type="button"
                class="lg:hidden p-2"
                :aria-expanded="isMobileMenuOpen"
                :aria-label="$t('nav.openMenu')"
                @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
                <Icon :name="isMobileMenuOpen ? 'base:close' : 'base:menu'" class="size-7" />
            </button>
        </div>
    </nav>

    <!-- Mobile drawer -->
    <Teleport to="body">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 top-[72px] bg-white/95 backdrop-blur-md z-40 lg:hidden overflow-y-auto">
            <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
                <template v-for="item in nav" :key="item.labelKey">
                    <NuxtLink
                        v-if="'to' in item && item.to"
                        :to="localePath(item.to)"
                        class="text-[28px] leading-tight font-degular font-semibold text-drygray-100 hover:text-primary-text"
                        @click="closeAll"
                    >
                        {{ $t(item.labelKey) }}
                    </NuxtLink>
                    <div v-else-if="'children' in item">
                        <p class="text-[11px] text-drygray-default uppercase tracking-[0.15em] font-semibold mb-3">{{ $t(item.labelKey) }}</p>
                        <div class="flex flex-col gap-3 pl-1">
                            <NuxtLink
                                v-for="c in item.children"
                                :key="c.to"
                                :to="localePath(c.to)"
                                class="text-[22px] font-degular font-semibold text-drygray-100 hover:text-primary-text inline-flex items-center gap-3"
                                @click="closeAll"
                            >
                                {{ $t(c.labelKey) }}
                                <span v-if="'flagship' in c && c.flagship" class="text-primary-text text-[11px] font-semibold uppercase tracking-wider">{{ $t('subnav.flagship') }}</span>
                            </NuxtLink>
                        </div>
                    </div>
                </template>
                <NuxtLink :to="localePath('/contact')" class="mt-4" @click="closeAll">
                    <CommonButton variant="primary" icon="base:arrow" class="w-full">{{ $t('nav.bookDemo') }}</CommonButton>
                </NuxtLink>
            </div>
        </div>
    </Teleport>
</template>
