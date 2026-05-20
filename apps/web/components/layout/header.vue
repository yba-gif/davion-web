<script setup lang="ts">
// Davion header — real IA nav. Solutions / Company as multi-level dropdowns; Venture as a top link.
// Click-to-open (a11y-friendly), Escape closes, click-outside closes, route change closes.
const isMobileMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const route = useRoute()

const nav = [
    {
        label: 'Solutions',
        children: [
            { label: 'AlpOS', to: '/solutions/alpos', flagship: true, desc: 'The sovereign platform underneath every solution.' },
            { label: 'Digital Transformation', to: '/solutions/digital-transformation' },
            { label: 'Cybersecurity', to: '/solutions/cybersecurity' },
            { label: 'OSINT', to: '/solutions/osint' },
        ],
    },
    {
        label: 'Company',
        children: [
            { label: 'About Us', to: '/company/about' },
            { label: 'Newsroom', to: '/company/newsroom' },
            { label: 'Careers', to: '/company/careers' },
            { label: 'Events', to: '/company/events' },
        ],
    },
    { label: 'Venture', to: '/venture' },
] as const

function toggleDropdown(label: string) {
    openDropdown.value = openDropdown.value === label ? null : label
}

function closeAll() {
    openDropdown.value = null
    isMobileMenuOpen.value = false
}

watch(() => route.path, closeAll)

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
    <header ref="headerRef" class="sticky top-0 z-50 w-full bg-ink/95 backdrop-blur border-b border-ink-200">
        <div class="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <!-- Wordmark -->
            <NuxtLink to="/" class="flex items-center gap-3" @click="closeAll">
                <NuxtImg src="/icon.svg" alt="" width="24" height="24" class="h-6 w-6" />
                <span class="font-display font-semibold text-bone-bright text-xl tracking-display-tight">Davion</span>
            </NuxtLink>

            <!-- Desktop nav -->
            <nav class="hidden md:flex items-center gap-1 text-body-s" aria-label="Primary">
                <template v-for="item in nav" :key="item.label">
                    <NuxtLink
                        v-if="'to' in item && item.to"
                        :to="item.to"
                        class="px-3 py-2 text-bone hover:text-signal transition-colors duration-davion-hover"
                    >
                        {{ item.label }}
                    </NuxtLink>
                    <div v-else class="relative">
                        <button
                            type="button"
                            class="px-3 py-2 text-bone hover:text-signal transition-colors duration-davion-hover inline-flex items-center gap-1"
                            :aria-expanded="openDropdown === item.label"
                            :aria-controls="`dropdown-${item.label}`"
                            @click.stop="toggleDropdown(item.label)"
                        >
                            {{ item.label }}
                            <span
                                class="text-steel text-xs transition-transform duration-davion-hover"
                                :class="openDropdown === item.label ? 'rotate-180' : ''"
                                aria-hidden="true"
                            >▾</span>
                        </button>
                        <div
                            v-if="openDropdown === item.label && 'children' in item"
                            :id="`dropdown-${item.label}`"
                            class="absolute top-full right-0 mt-2 min-w-[340px] bg-ink-50 border border-ink-200 shadow-2xl rounded-sm overflow-hidden"
                        >
                            <NuxtLink
                                v-for="c in item.children"
                                :key="c.to"
                                :to="c.to"
                                class="block px-5 py-4 hover:bg-ink-100 transition-colors duration-davion-hover border-t border-ink-200 first:border-t-0"
                            >
                                <div class="flex items-center justify-between gap-4">
                                    <span class="text-bone-bright font-medium">{{ c.label }}</span>
                                    <span v-if="'flagship' in c && c.flagship" class="text-label !text-signal">Flagship</span>
                                </div>
                                <p v-if="'desc' in c && c.desc" class="text-body-s mt-1">{{ c.desc }}</p>
                            </NuxtLink>
                        </div>
                    </div>
                </template>
            </nav>

            <!-- CTA + mobile toggle -->
            <div class="flex items-center gap-3">
                <NuxtLink
                    to="/contact"
                    class="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-ink-200 text-bone hover:border-signal hover:text-signal transition-colors duration-davion-hover text-sm font-medium"
                >
                    Request a briefing
                </NuxtLink>
                <button
                    type="button"
                    class="md:hidden p-2 text-bone"
                    :aria-expanded="isMobileMenuOpen"
                    aria-label="Toggle menu"
                    @click="isMobileMenuOpen = !isMobileMenuOpen"
                >
                    <span v-if="!isMobileMenuOpen" aria-hidden="true">☰</span>
                    <span v-else aria-hidden="true">✕</span>
                </button>
            </div>
        </div>

        <!-- Mobile drawer -->
        <div v-if="isMobileMenuOpen" class="md:hidden border-t border-ink-200 bg-ink">
            <nav class="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-1" aria-label="Mobile">
                <template v-for="item in nav" :key="item.label">
                    <NuxtLink
                        v-if="'to' in item && item.to"
                        :to="item.to"
                        class="py-3 text-bone hover:text-signal"
                        @click="closeAll"
                    >
                        {{ item.label }}
                    </NuxtLink>
                    <div v-else-if="'children' in item" class="py-2">
                        <p class="text-eyebrow mb-2">{{ item.label }}</p>
                        <NuxtLink
                            v-for="c in item.children"
                            :key="c.to"
                            :to="c.to"
                            class="block py-2 pl-4 text-bone hover:text-signal"
                            @click="closeAll"
                        >
                            {{ c.label }}
                            <span v-if="'flagship' in c && c.flagship" class="text-label !text-signal ml-2">Flagship</span>
                        </NuxtLink>
                    </div>
                </template>
                <NuxtLink
                    to="/contact"
                    class="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-signal text-ink font-medium"
                    @click="closeAll"
                >
                    Request a briefing
                </NuxtLink>
            </nav>
        </div>
    </header>
</template>
