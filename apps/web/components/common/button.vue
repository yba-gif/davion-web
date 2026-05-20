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

const buttonClasses = clsx(
    'flex flex-row items-center justify-center transition-colors',
    {
        'rounded-xl bg-primary hover:bg-drygray-100 hover:text-white': props.variant === 'primary',
        'rounded-xl border-drygray-200 hover:border-drygray-100 border-solid border-[1px] hover:border-drygray-300 text-drygray-100': props.variant === 'outline',
        'text-drygray-100 hover:text-primary-text whitespace-nowrap': props.variant === 'link',
        'h-10 py-[11px] px-3 gap-2 text-sm': props.size === 'xs' && props.variant !== 'link',
        'h-[54px] py-[11px] px-3 gap-2 text-base': props.size === 'sm' && props.variant !== 'link',
        'gap-2 text-sm': props.size === 'xs' && props.variant === 'link',
        'gap-2 text-base': props.size === 'sm' && props.variant === 'link',
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
