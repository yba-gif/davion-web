<script setup lang="ts">
import { useLenis } from '~/composables/useLenis'

const { scrollTo } = useLenis()
const router = useRouter()
const isMobileMenuOpen = ref(false)

function scrollToSection(sectionId: string) {
    const section = document.querySelector(sectionId) as HTMLElement
    if (section) {
        const offset = -100
        scrollTo(section, {
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
            offset,
        })
    }
    isMobileMenuOpen.value = false
}

function navigateToPage(path: string) {
    router.push(path)
    isMobileMenuOpen.value = false
}

function scrollToTop() {
    router.push('/')
    scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    })
    isMobileMenuOpen.value = false
}

function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

</script>

<template>
    <!-- Desktop Header -->
    <nav
        class="sticky rounded-b-2xl top-0 w-full max-w-7xl mx-auto [backdrop-filter:blur(32px)] bg-white/80 h-[72px] flex flex-row items-center justify-between gap-0 text-left text-sm text-drygray-100 font-switzer px-6 z-50 shadow-sm"
    >
        <div class="flex flex-row items-center justify-start gap-8">
            <button class="flex items-center cursor-pointer" @click="scrollToTop">
                <NuxtImg
                    src="/logo.svg" alt="Logo" width="40" height="40"
                    class="w-full relative max-w-full overflow-hidden h-4"
                />
            </button>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex flex-row items-center justify-start gap-9">
                <button
                    class="leading-[150%] font-medium transition-colors hover:text-primary"
                    @click="scrollToSection('#features-section')"
                >
                    What We Do
                </button>
                <button
                    class="leading-[150%] font-medium transition-colors hover:text-primary"
                    @click="scrollToSection('#reference-section')"
                >
                    Reference Portfolio
                </button>
                <button
                    class="leading-[150%] font-medium transition-colors hover:text-primary"
                    @click="scrollToSection('#blog-section')"
                >
                    Our Blog
                </button>
                <button
                    class="leading-[150%] font-medium transition-colors hover:text-primary"
                    @click="scrollToSection('#irl-section')"
                >
                    IRL Check-ins
                </button>
                <button
                    class="leading-[150%] font-medium transition-colors hover:text-primary"
                    @click="navigateToPage('/on-chain')"
                >
                    On-Chain
                </button>
            </div>
        </div>

        <!-- Desktop Buttons -->
        <div class="hidden lg:flex flex-row items-center justify-start gap-3 text-[15px]">
            <CommonButton size="xs" variant="outline" icon="base:verified" class="w-48" @click="navigateToPage('/team-verify')">
                Verify Base1 Team
            </CommonButton>
            <!-- <CommonButton size="xs" variant="primary" icon="base:arrow" class="w-[220px]">
                Request Market Making
            </CommonButton> -->
        </div>

        <!-- Mobile Menu Button -->
        <ClientOnly>
            <Motion tag="button" class="lg:hidden flex items-center justify-center p-2" @click="toggleMobileMenu">
                <Motion
                    tag="div" :animate="{ rotate: isMobileMenuOpen ? 90 : 0 }"
                    :transition="{ duration: 0.3, ease: 'easeInOut' }" class="flex items-center justify-center"
                >
                    <Icon
                        :name="isMobileMenuOpen ? 'base:close' : 'base:menu'"
                        :class="isMobileMenuOpen ? 'size-6' : 'size-16'"
                    />
                </Motion>
            </Motion>
            <template #fallback>
                <button class="lg:hidden flex items-center justify-center p-2" @click="toggleMobileMenu">
                    <div class="flex items-center justify-center">
                        <Icon
                            :name="isMobileMenuOpen ? 'base:close' : 'base:menu'"
                            :class="isMobileMenuOpen ? 'size-6' : 'size-16'"
                        />
                    </div>
                </button>
            </template>
        </ClientOnly>
    </nav>

    <ClientOnly>
        <Motion
            v-if="isMobileMenuOpen" tag="div" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :exit="{ opacity: 0 }"
            :transition="{ duration: 0.3, ease: 'easeOut' }"
            class="fixed inset-0 bg-white/80 backdrop-blur-md z-40 lg:hidden text-drygray-100"
        >
            <Motion
                tag="div" :initial="{ y: '-100%' }" :animate="{ y: 0 }" :exit="{ y: '-100%' }"
                :transition="{ duration: 0.4, ease: 'easeInOut' }" class="flex flex-col h-full"
            >
                <!-- Mobile Header -->
                <Motion
                    tag="div" :initial="{ y: -50, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                    :transition="{ duration: 0.3, delay: 0.2 }" class="flex items-center justify-between p-6"
                >
                    <button class="flex items-center" @click="scrollToTop">
                        <NuxtImg src="/logo.svg" alt="Logo" width="40" height="40" class="h-4" />
                    </button>
                    <Motion tag="button" class="p-2" @click="toggleMobileMenu">
                        <Icon name="base:close" class="w-6 h-6" />
                    </Motion>
                </Motion>

                <!-- Mobile Navigation -->
                <div class="flex-1 flex flex-col justify-start items-start space-y-8 py-6">
                    <Motion
                        v-for="(section, index) in [
                            { name: 'features', label: 'What We Do', action: () => scrollToSection('#features-section') },
                            { name: 'reference', label: 'Reference Portfolio', action: () => scrollToSection('#reference-section') },
                            { name: 'blog', label: 'Our Blog', action: () => scrollToSection('#blog-section') },
                            { name: 'irl', label: 'IRL Check-ins', action: () => scrollToSection('#irl-section') },
                            { name: 'onchain', label: 'On-Chain', action: () => navigateToPage('/on-chain') },
                        ]" :key="section.name" tag="button" :initial="{ x: -100, opacity: 0 }"
                        :animate="{ x: 0, opacity: 1 }"
                        :transition="{ duration: 0.4, delay: 0.3 + (index * 0.1), ease: 'easeOut' }"
                        class="text-4xl font-semibold transition-colors px-6 hover:text-primary font-degular"
                        @click="section.action"
                    >
                        {{ section.label }}
                    </Motion>
                </div>

                <!-- Mobile Buttons -->
                <Motion
                    tag="div" :initial="{ y: 100, opacity: 0 }" :animate="{ y: 0, opacity: 1 }"
                    :transition="{ duration: 0.4, delay: 0.7 }" class="p-6 bg-white rounded-t-2xl space-y-4 w-full"
                >
                    <div
                        class="w-[292px] relative text-[13px] leading-[150%] font-medium font-switzer text-drygray-default text-left inline-block"
                    >
                        © 2025 Base1 Companies Ltd. All rights reserved.
                    </div>

                    <div class="w-full flex flex-grow items-center justify-between">
                        <div
                            class="w-[148px] relative text-sm leading-[150%] font-medium font-switzer text-left inline-block text-gray"
                        >
                            <span>Early</span>
                            <span class="text-primary">.</span>
                            <span> Connected</span>
                            <span class="text-primary">.</span>
                            <span> Moving</span>
                        </div>

                        <div class="flex flex-row items-center justify-start gap-2">
                            <CommonButton
                                class="w-11 relative !h-11 border-none !rounded-full bg-whitesmoke-200 hover:!bg-whitesmoke-100"
                            >
                                <Icon name="base:telegram" class="size-4" />
                            </CommonButton>

                            <CommonButton
                                class="w-11 relative !h-11 border-none !rounded-full bg-whitesmoke-200 hover:!bg-whitesmoke-100"
                            >
                                <Icon name="base:twitter" class="size-4" />
                            </CommonButton>

                            <CommonButton
                                class="w-11 relative !h-11 border-none !rounded-full bg-whitesmoke-200 hover:!bg-whitesmoke-100"
                            >
                                <Icon name="base:linkedin" class="size-4" />
                            </CommonButton>
                        </div>
                    </div>

                    <div class="flex flex-col items-center space-y-4">
                        <CommonButton size="sm" variant="outline" icon="base:verified" class="w-full" @click="navigateToPage('/team-verify')">
                            Verify Base1 Team
                        </CommonButton>
                        <CommonButton size="sm" variant="primary" icon="base:arrow" class="w-full">
                            Request Market Making
                        </CommonButton>
                    </div>
                </Motion>
            </Motion>
        </Motion>
        <template #fallback>
            <div
                v-if="isMobileMenuOpen"
                class="fixed inset-0 bg-white/80 backdrop-blur-md z-40 lg:hidden text-drygray-100"
            >
                <div class="flex flex-col h-full">
                    <!-- Mobile Header -->
                    <div class="flex items-center justify-between p-6">
                        <button class="flex items-center" @click="navigateToPage('/')">
                            <NuxtImg src="/logo.svg" alt="Logo" width="40" height="40" class="h-4" />
                        </button>
                        <button class="p-2" @click="toggleMobileMenu">
                            <Icon name="base:close" class="w-6 h-6" />
                        </button>
                    </div>

                    <!-- Mobile Navigation -->
                    <div class="flex-1 flex flex-col justify-start items-start space-y-8 py-6">
                        <button
                            v-for="section in [
                                { name: 'features', label: 'What We Do', action: () => scrollToSection('#features-section') },
                                { name: 'reference', label: 'Reference Portfolio', action: () => scrollToSection('#reference-section') },
                                { name: 'blog', label: 'Our Blog', action: () => scrollToSection('#blog-section') },
                                { name: 'irl', label: 'IRL Check-ins', action: () => scrollToSection('#irl-section') },
                                { name: 'onchain', label: 'On-Chain', action: () => navigateToPage('/on-chain') },
                            ]"
                            :key="section.name"
                            class="text-4xl font-semibold transition-colors px-6 hover:text-primary font-degular"
                            @click="section.action"
                        >
                            {{ section.label }}
                        </button>
                    </div>

                    <!-- Mobile Footer -->
                    <div class="p-6 bg-white rounded-t-2xl space-y-4 w-full">
                        <div class="w-[292px] relative text-[13px] leading-[150%] font-medium font-switzer text-drygray-default text-left inline-block">
                            © 2025 Base1 Companies Ltd. All rights reserved.
                        </div>

                        <div class="w-full flex flex-grow items-center justify-between">
                            <div class="w-[148px] relative text-sm leading-[150%] font-medium font-switzer text-left inline-block text-gray">
                                <span>Early</span>
                                <span class="text-primary">.</span>
                                <span> Connected</span>
                                <span class="text-primary">.</span>
                                <span> Moving</span>
                            </div>

                            <div class="flex flex-row items-center justify-start gap-2">
                                <CommonButton class="w-11 relative !h-11 border-none !rounded-full bg-whitesmoke-200 hover:!bg-whitesmoke-100">
                                    <Icon name="base:telegram" class="size-4" />
                                </CommonButton>
                                <CommonButton class="w-11 relative !h-11 border-none !rounded-full bg-whitesmoke-200 hover:!bg-whitesmoke-100">
                                    <Icon name="base:twitter" class="size-4" />
                                </CommonButton>
                                <CommonButton class="w-11 relative !h-11 border-none !rounded-full bg-whitesmoke-200 hover:!bg-whitesmoke-100">
                                    <Icon name="base:linkedin" class="size-4" />
                                </CommonButton>
                            </div>
                        </div>

                        <div class="flex flex-col items-center space-y-4">
                            <CommonButton size="sm" variant="outline" icon="base:verified" class="w-full" @click="navigateToPage('/team-verify')">
                                Verify Base1 Team
                            </CommonButton>
                            <CommonButton size="sm" variant="primary" icon="base:arrow" class="w-full">
                                Request Market Making
                            </CommonButton>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </ClientOnly>
</template>
