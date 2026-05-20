<script setup lang="ts">
// Davion header — base1's rounded blurred sticky nav, extended with multi-level dropdowns
// for the Davion IA (Solutions / Company / Venture).
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
    <nav
        ref="headerRef"
        class="sticky rounded-b-2xl top-0 w-full max-w-7xl mx-auto [backdrop-filter:blur(32px)] bg-white/80 h-[72px] flex flex-row items-center justify-between gap-0 text-left text-sm text-drygray-100 font-switzer px-6 z-50 shadow-sm"
    >
        <div class="flex flex-row items-center justify-start gap-8">
            <NuxtLink to="/" class="flex items-center gap-2 cursor-pointer" @click="closeAll">
                <NuxtImg src="/icon.svg" alt="" width="20" height="20" class="size-5" />
                <span class="font-degular font-bold text-[18px] text-drygray-100">Davion</span>
            </NuxtLink>

            <!-- Desktop nav -->
            <div class="hidden lg:flex flex-row items-center justify-start gap-7">
                <template v-for="item in nav" :key="item.label">
                    <NuxtLink
                        v-if="'to' in item && item.to"
                        :to="item.to"
                        class="leading-[150%] font-medium transition-colors hover:text-primary"
                    >
                        {{ item.label }}
                    </NuxtLink>
                    <div v-else class="relative">
                        <button
                            type="button"
                            class="leading-[150%] font-medium transition-colors hover:text-primary inline-flex items-center gap-1.5"
                            :aria-expanded="openDropdown === item.label"
                            @click.stop="toggleDropdown(item.label)"
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
                            class="absolute top-full left-0 mt-3 min-w-[340px] bg-white rounded-2xl shadow-xl border border-drygray-200 overflow-hidden"
                        >
                            <NuxtLink
                                v-for="c in item.children"
                                :key="c.to"
                                :to="c.to"
                                class="block px-5 py-4 hover:bg-whitesmoke-100 transition-colors border-t border-drygray-200 first:border-t-0"
                            >
                                <div class="flex items-center justify-between gap-4">
                                    <span class="text-drygray-100 font-medium">{{ c.label }}</span>
                                    <span v-if="'flagship' in c && c.flagship" class="text-primary text-[11px] font-semibold uppercase tracking-wider">Flagship</span>
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
                <CommonButton size="xs" variant="outline" icon="base:arrow">Request a briefing</CommonButton>
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
                        class="text-[28px] leading-tight font-degular font-semibold text-drygray-100 hover:text-primary"
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
                                class="text-[22px] font-degular font-semibold text-drygray-100 hover:text-primary inline-flex items-center gap-3"
                                @click="closeAll"
                            >
                                {{ c.label }}
                                <span v-if="'flagship' in c && c.flagship" class="text-primary text-[11px] font-semibold uppercase tracking-wider">Flagship</span>
                            </NuxtLink>
                        </div>
                    </div>
                </template>
                <NuxtLink to="/contact" class="mt-4" @click="closeAll">
                    <CommonButton variant="primary" icon="base:arrow" class="w-full">Request a briefing</CommonButton>
                </NuxtLink>
            </div>
        </div>
    </Teleport>
</template>
