<script setup lang="ts">
import { clsx } from 'clsx'

interface Props {
    variant?: 'primary' | 'outline' | 'link'
    size?: 'sm' | 'xs'
    icon?: string
    className?: string
    style?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'outline',
    size: 'sm',
    icon: '',
})

defineEmits(['click'])

// P1.4 (2026-05-24 audit): every variant now meets WCAG 2.5.5 (44×44 minimum
// tap target) and has touch-action:manipulation set so iOS Safari skips the
// 300ms double-tap-zoom delay. Previously the `xs` size was h-10 (40px),
// 4px short of the spec, and `link` had no height anchor at all.
const buttonClasses = clsx(
    'flex flex-row items-center justify-center transition-colors [touch-action:manipulation]',
    {
        'rounded-xl bg-primary hover:bg-drygray-100 hover:text-white': props.variant === 'primary',
        'rounded-xl border-drygray-200 hover:border-drygray-100 border-solid border-[1px] hover:border-drygray-300 text-drygray-100': props.variant === 'outline',
        'text-drygray-100 hover:text-primary-text whitespace-nowrap': props.variant === 'link',
        // xs filled/outline: min-h floor of 44px even though visual height
        // stays h-10 (40px) on hover/baseline — padding fills the rest.
        'min-h-[44px] py-[11px] px-3 gap-2 text-sm': props.size === 'xs' && props.variant !== 'link',
        'min-h-[54px] py-[11px] px-3 gap-2 text-base': props.size === 'sm' && props.variant !== 'link',
        // Link variant gets a vertical padding to lift the tap area to 44px
        // without changing the visual line-height treatment.
        'min-h-[44px] py-[11px] gap-2 text-sm': props.size === 'xs' && props.variant === 'link',
        'min-h-[44px] py-[11px] gap-2 text-base': props.size === 'sm' && props.variant === 'link',
    },
)
</script>

<template>
    <button :class="buttonClasses" @click="$emit('click')">
        <Icon
            v-if="icon && variant !== 'link'"
            :name="icon"
            :class="size === 'xs' ? 'w-3.5 h-3.5' : 'w-4 h-4'"
        />
        <div class="tracking-[-0.3px] leading-[150%] font-semibold">
            <slot />
        </div>
        <Icon
            v-if="icon && variant === 'link'"
            :name="icon"
            :class="size === 'xs' ? 'w-3.5 h-3.5' : 'w-4 h-4'"
        />
    </button>
</template>
