<script setup lang="ts">
interface Props {
    title: string
    src: string
    grayscale?: boolean
    invert?: boolean
}

const props = defineProps<Props>()

const imageClass = computed(() => {
    const classes = ['w-[72.6px] h-12 object-contain']
    if (props.grayscale && props.invert) {
        classes.push('filter-grayscale-invert')
    } else if (props.grayscale) {
        classes.push('grayscale')
    } else if (props.invert) {
        classes.push('invert')
    }
    return classes.join(' ')
})
</script>

<template>
    <div
        class="w-32 h-36 mx-1 rounded-xl bg-drygray-default/20 text-xs text-drygray-100 font-switzer flex flex-col justify-between items-center p-4">
        <div class="flex-1 flex items-center justify-center">
            <img :class="imageClass" alt="reference" :src="src">
        </div>
        <!-- <div class="tracking-[-0.5px] leading-[150%] font-medium text-whitesmoke-100 capitalize">
            {{ title }}
        </div> -->
    </div>
</template>

<style scoped>
.filter-grayscale-invert {
    filter: grayscale(100%) invert(1);
}
</style>
