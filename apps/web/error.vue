<script setup lang="ts">
interface ErrorProps {
    error: {
        statusCode?: number
        statusMessage?: string
        message?: string
        stack?: string
    }
}

const props = defineProps<ErrorProps>()

const errorCode = computed(() => props.error?.statusCode || 500)
const errorMessage = computed(() => {
    if (errorCode.value === 404)
        return 'Page not found'
    if (errorCode.value === 500)
        return 'Server error'
    if (errorCode.value === 403)
        return 'Access forbidden'
    return props.error?.statusMessage || 'Something went wrong'
})

const errorDescription = computed(() => {
    if (errorCode.value === 404)
        return 'The page you\'re looking for doesn\'t exist.'
    if (errorCode.value === 500)
        return 'We\'re experiencing technical difficulties.'
    if (errorCode.value === 403)
        return 'You don\'t have permission to access this resource.'
    return 'An unexpected error occurred. Please try again.'
})

const errorTitle = computed(() => {
    const code = errorCode.value.toString()
    return {
        first: code.charAt(0),
        middle: code.charAt(1),
        last: code.charAt(2) || 'X',
    }
})

// Meta tags
useHead({
    title: computed(() => `${errorCode.value} - ${errorMessage.value} | Base1`),
    meta: [
        {
            name: 'description',
            content: computed(() => `${errorDescription.value} Navigate back to Base1 homepage or explore our services.`),
        },
    ],
})

function goBack() {
    if (process.client && window.history.length > 1) {
        window.history.back()
    }
    else {
        navigateTo('/')
    }
}

function handleClearError() {
    clearError({ redirect: '/' })
}
</script>

<template>
    <section
        class="w-full relative rounded-3xl bg-white px-6 lg:px-16 py-16 lg:py-20 box-border text-left text-sm text-drygray-200 font-switzer overflow-hidden min-h-[500px] flex items-center justify-center"
    >
        <div class="z-10 flex flex-col items-center text-center max-w-lg mx-auto space-y-6">
            <!-- Error Code with Icon -->
            <Motion
                tag="div"
                :initial="{ scale: 0.9, opacity: 0, y: -20 }"
                :animate="{ scale: 1, opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, delay: 0.1, ease: 'easeOut' }"
                class="flex items-center gap-4 mb-2"
            >
                <div class="text-6xl md:text-7xl font-degular font-semibold leading-none tracking-[-1px] text-drygray-100">
                    <span>{{ errorTitle.first }}</span>
                    <span class="text-primary-text">{{ errorTitle.middle }}</span>
                    <span>{{ errorTitle.last }}</span>
                </div>
            </Motion>

            <!-- Error Title -->
            <Motion
                tag="h1"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.3, ease: 'easeOut' }"
                class="text-2xl md:text-3xl font-degular font-semibold tracking-[-0.3px] text-drygray-100"
            >
                {{ errorMessage }}<span class="text-primary-text">.</span>
            </Motion>

            <!-- Error Description -->
            <Motion
                tag="p"
                :initial="{ y: 15, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.4, ease: 'easeOut' }"
                class="text-drygray-100 font-medium leading-relaxed max-w-sm"
            >
                {{ errorDescription }}
            </Motion>

            <!-- Action Buttons -->
            <Motion
                tag="div"
                :initial="{ y: 20, opacity: 0 }"
                :animate="{ y: 0, opacity: 1 }"
                :transition="{ duration: 0.5, delay: 0.5, ease: 'easeOut' }"
                class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2"
            >
                <CommonButton
                    variant="primary"
                    size="xs"
                    class="sm:w-auto text-drygray-100"
                    icon="base:arrow"
                    @click="handleClearError"
                >
                    Back to Home
                </CommonButton>

                <CommonButton
                    variant="outline"
                    size="xs"
                    class="sm:w-auto"
                    @click="goBack"
                >
                    Go Back
                </CommonButton>
            </Motion>
        </div>
    </section>
</template>
