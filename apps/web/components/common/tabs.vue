<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
    id: string
    label: string
}

interface Props {
    tabs: Tab[]
    modelValue?: string
}

interface Emits {
    (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
})

const emit = defineEmits<Emits>()

const activeTab = ref(props.modelValue || (props.tabs.length > 0 ? props.tabs[0].id : ''))

function selectTab(tabId: string) {
    activeTab.value = tabId
    emit('update:modelValue', tabId)
}
</script>

<template>
    <div class="flex flex-row items-center justify-start gap-2 text-[15px] text-gray-200 font-switzer">
        <button
            v-for="tab in tabs"
            :key="tab.id"
            class="rounded-lg px-4 py-2 font-semibold tracking-[-0.3px] leading-[150%] transition-colors"
            :class="tab.id === activeTab ? 'bg-drygray-100 text-white' : 'bg-drygray-200 text-drygray-100'"
            @click="selectTab(tab.id)"
        >
            {{ tab.label }}
        </button>
    </div>
</template>
