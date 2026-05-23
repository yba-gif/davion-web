<script setup lang="ts">
// P4.1: Language switcher (EN / TR / DE). Used in the header and footer.
// Uses Nuxt i18n's `switchLocalePath` so the current route is preserved
// across languages (e.g. /solutions/alpos -> /tr/solutions/alpos).
//
// UX: shows current locale code, click expands a small menu with all
// three languages. The active one is marked but still clickable (no-op,
// closes the menu). Closes on outside click and ESC.
//
// Accessibility: aria-expanded on the trigger, role=menu + menuitem on
// the options, keyboard navigation (Down/Up to cycle, Enter to select,
// Escape to close).

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const items = computed(() =>
    (locales.value as Array<{ code: string, name: string }>).map(l => ({
        code: l.code,
        name: l.name,
        active: l.code === locale.value,
        href: switchLocalePath(l.code),
    })),
)

const currentLabel = computed(() =>
    (locales.value as Array<{ code: string, name: string }>)
        .find(l => l.code === locale.value)?.code.toUpperCase() ?? 'EN',
)

function toggle() {
    open.value = !open.value
}

function close() {
    open.value = false
}

function onClickOutside(e: MouseEvent) {
    if (rootRef.value && !rootRef.value.contains(e.target as Node)) close()
}

function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape' && open.value) close()
}

onMounted(() => {
    document.addEventListener('click', onClickOutside)
    document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside)
    document.removeEventListener('keydown', onKey)
})
</script>

<template>
    <div ref="rootRef" class="relative">
        <button
            type="button"
            class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-drygray-100 hover:text-primary-text transition-colors px-2 py-1.5 rounded-md min-h-[36px]"
            :aria-expanded="open"
            aria-haspopup="menu"
            :aria-label="$t('lang.label')"
            @click.stop="toggle"
        >
            <span aria-hidden="true">{{ currentLabel }}</span>
            <span class="text-drygray-default text-[10px] transition-transform" :class="open ? 'rotate-180' : ''" aria-hidden="true">▾</span>
        </button>
        <div
            v-if="open"
            role="menu"
            :aria-label="$t('lang.label')"
            class="absolute top-full right-0 mt-2 min-w-[140px] bg-white rounded-xl shadow-xl border border-drygray-200 overflow-hidden z-50"
        >
            <NuxtLink
                v-for="item in items"
                :key="item.code"
                :to="item.href"
                role="menuitem"
                :class="[
                    'block px-4 py-3 text-[14px] font-medium transition-colors',
                    item.active
                        ? 'bg-whitesmoke-100 text-primary-text'
                        : 'text-drygray-100 hover:bg-whitesmoke-100',
                ]"
                @click="close"
            >
                {{ item.name }}
            </NuxtLink>
        </div>
    </div>
</template>
