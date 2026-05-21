<script setup lang="ts">
// P2.U1: Right-rail Table of Contents for long pages.
// Pass `:sections="[{ id: 'problem', label: 'The problem' }, ...]"`.
// IntersectionObserver picks the currently-visible section. Scroll-anchor
// links use smooth scrolling (honours prefers-reduced-motion). Mobile collapses
// to an inline `Jump to` <select>.
//
// Pages adopt this by:
//   1. Adding `id="<slug>"` to each section the TOC should point at.
//   2. Rendering <TableOfContents :sections="[...]" /> inside a flex
//      container so the page content takes col-9 and the TOC takes col-3
//      on >=lg viewports.

interface Section {
    id: string
    label: string
}
const props = defineProps<{ sections: Section[] }>()

const activeId = ref<string>(props.sections[0]?.id ?? '')
let io: IntersectionObserver | null = null

function jumpTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
    // Update active immediately for snappier feel.
    activeId.value = id
}

function onSelectChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value
    jumpTo(value)
}

onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return
    // Observe each section. The first one whose top crosses the threshold
    // wins active. Skip animation-on-mount; just set once when the page
    // settles.
    io = new IntersectionObserver(
        (entries) => {
            // Pick the entry closest to the viewport top that is currently visible.
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
            if (visible) activeId.value = visible.target.id
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    )
    for (const s of props.sections) {
        const el = document.getElementById(s.id)
        if (el) io.observe(el)
    }
})
onBeforeUnmount(() => {
    io?.disconnect()
    io = null
})
</script>

<template>
    <!-- Desktop: sticky right-rail nav -->
    <nav class="hidden lg:block sticky top-24 self-start text-left" aria-label="Page table of contents">
        <p class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default mb-4">On this page</p>
        <ul class="space-y-2.5 border-l border-drygray-200">
            <li v-for="s in sections" :key="s.id" class="relative">
                <a
                    :href="`#${s.id}`"
                    :class="[
                        'block pl-4 py-1 text-[13px] leading-snug transition-colors',
                        activeId === s.id
                            ? 'text-drygray-100 font-semibold'
                            : 'text-drygray-default hover:text-drygray-100',
                    ]"
                    :aria-current="activeId === s.id ? 'true' : undefined"
                    @click.prevent="jumpTo(s.id)"
                >
                    <span
                        v-if="activeId === s.id"
                        class="absolute -left-px top-1.5 bottom-1.5 w-[2px] bg-primary-text"
                        aria-hidden="true"
                    />
                    {{ s.label }}
                </a>
            </li>
        </ul>
    </nav>

    <!-- Mobile: inline jump-to select. Mount this once at the top of long pages. -->
    <div class="lg:hidden bg-white rounded-2xl border border-drygray-200 px-4 py-3">
        <label for="toc-jump" class="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-drygray-default block mb-2">Jump to section</label>
        <select
            id="toc-jump"
            class="w-full bg-transparent text-[14px] text-drygray-100 font-medium py-2 focus:outline-none"
            :value="activeId"
            @change="onSelectChange"
        >
            <option v-for="s in sections" :key="s.id" :value="s.id">{{ s.label }}</option>
        </select>
    </div>
</template>
