<script setup lang="ts">
import { useLenis } from '~/composables/useLenis'

const { scrollTo, lenis } = useLenis()
const router = useRouter()

function scrollToTop() {
    if (process.client) {
        try {
            const lenisInstance = lenis()
            if (lenisInstance) {
                scrollTo(0, { duration: 1.2 })
            }
            else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            }
        }
        catch (error) {
            console.error('Error scrolling to top:', error)

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    }
}

function navigateToVerify() {
    router.push('/team-verify')
}

function openTwitter() {
    if (process.client) {
        window.open('https://x.com/base1capital', '_blank')
    }
}

function scrollToSection(sectionId: string) {
    // If not on home page, navigate to home first
    if (router.currentRoute.value.path !== '/') {
        router.push('/')
        nextTick(() => {
            setTimeout(() => {
                const section = document.querySelector(sectionId) as HTMLElement
                if (section) {
                    const lenisInstance = lenis()
                    if (lenisInstance) {
                        scrollTo(section, { duration: 1.2, offset: -100 })
                    } else {
                        section.scrollIntoView({ behavior: 'smooth' })
                    }
                }
            }, 500)
        })
    } else {
        const section = document.querySelector(sectionId) as HTMLElement
        if (section) {
            const lenisInstance = lenis()
            if (lenisInstance) {
                scrollTo(section, { duration: 1.2, offset: -100 })
            } else {
                section.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }
}
</script>

<template>
    <div
        class="w-full max-w-7xl mx-auto relative rounded-3xl bg-white min-[1060px]:h-[547px] overflow-hidden flex flex-col items-center justify-start pt-[45px] px-2 pb-2 box-border gap-[57px] text-left text-sm text-drygray-100 font-switzer"
    >
        <CommonButton
            class="absolute top-5 right-5 w-11 !h-11 aspect-square p-0 rounded-2xl border-solid border-[1px] box-border min-[1060px]:hidden"
            @click="scrollToTop"
        >
            <Icon name="base:chevron-right" class="size-5 -rotate-90" />
        </CommonButton>

        <div class="self-stretch flex flex-col items-start justify-start py-0 px-[37px] max-[1060px]:px-4 gap-[57px]">
            <div
                class="self-stretch min-[1060px]:h-[55px] flex max-[1060px]:flex-col items-start justify-between max-[1060px]:gap-4"
            >
                <div class="w-[349px] relative h-[55px] flex flex-col items-start w-full gap-4">
                    <NuxtImg class="flex w-[57px] h-4" alt="logo" src="/logo.svg" />
                    <div class="flex top-[34px] left-[0px] leading-[150%] font-medium">
                        <span>Early. Connected. Moving.</span>
                    </div>
                </div>
                <div class="flex flex-row items-center justify-start gap-2 mt-5 sm:mt-0">
                    <CommonButton
                        class="w-11 relative !h-11 border-none !rounded-full bg-whitesmoke-200 hover:!bg-whitesmoke-100"
                        @click="openTwitter"
                    >
                        <Icon name="base:twitter" class="size-4" />
                    </CommonButton>
                </div>
            </div>
            <div class="self-stretch h-11 flex flex-row items-center justify-between gap-0 text-[15px]">
                <div class="flex max-[1060px]:flex-col w-full items-center justify-start gap-3">
                    <!-- <CommonButton class="max-[1060px]:w-full" variant="primary" size="xs" icon="base:arrow">
                        Request Market Making
                    </CommonButton> -->
                    <CommonButton variant="outline" size="xs" icon="base:verified" class="max-[1060px]:w-full w-48" @click="navigateToVerify">
                        Verify Base1 Team
                    </CommonButton>
                </div>
                <CommonButton
                    class="w-11 relative !h-11 aspect-square p-0 rounded-2xl border-solid border-[1px] box-border max-[1060px]:hidden"
                    @click="scrollToTop"
                >
                    <Icon name="base:chevron-right" class="size-5 -rotate-90" />
                </CommonButton>
            </div>
        </div>
        <div
            class="w-full rounded-2xl bg-whitesmoke-100 min-[1060px]:h-[281px] flex flex-col items-start justify-start py-12 px-10 max-[1060px]:px-4 box-border gap-8 text-[13px]"
        >
            <div class="relative leading-[150%] font-medium">
                © 2025 Base1 Capital Ltd.
            </div>
            <div class="min-[1060px]:w-[1080px] relative text-xs tracking-[-0.2px] leading-[160%] text-darkgray inline-block">
                <p class="[margin-block-start:0] [margin-block-end:8px]">
                    Base1 does not provide investment advice to investors, and the information on this page should not
                    be relied upon as research, investment advice or a recommendation of any kind. Investments in
                    startups and early stage businesses are inherently risky and highly illiquid. These types of
                    investments are suitable only for qualified, sophisticated investors who can afford to bear the risk
                    of losing the entirety of their investment capital, and Base1 Services, including access to the
                    platform, are limited to these qualified investors.
                </p>
                <p class="[margin-block-start:0] [margin-block-end:8px]">
                    &nbsp;
                </p>
                <p class="m-0">
                    The content of this promotion has not been approved by an authorised person within the meaning of
                    the Financial Services and Markets Act 2000. Reliance on this promotion for the purpose of engaging
                    in any investment activity may expose an individual to a significant risk of losing all of the
                    property or other assets invested. The materials on this page are provided for informational and
                    educational purposes only. Nothing on this page shall constitute or imply, and should not be
                    interpreted as, an offer or solicitation of an offer to acquire an interest in any vehicle or other
                    security of any kind.
                </p>
            </div>
        </div>
    </div>
</template>
