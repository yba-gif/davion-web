<script setup lang="ts">
const { getVerifiedMembers } = useVerified()
const { trackPageView, trackContactVerification } = useAnalytics()
const inputEl = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const searchQuery = ref('')

interface Member {
    telegram: string
    email: string
    twitter?: string
    website?: string
    notFound?: boolean
}

const searchResult = ref<Member | null>(null)
const verifiedMembers = ref<Member[]>([])
const isSearching = ref(false)
const pageStartTime = ref(Date.now())

const securityCards = [
    {
        icon: 'base:message-remove',
        text: 'Base1 <span class="text-drygray-default whitespace-nowrap text-4xl tracking-[-0.5px] leading-[100%] font-degular">never asks</span> for private keys or wallet access',
    },
    {
        icon: 'base:information',
        text: 'If a contact isn\'t verified here, <span class="text-drygray-default whitespace-nowrap text-4xl tracking-[-0.5px] leading-[100%] font-degular">do not engage</span>',
    },
    {
        icon: 'base:sms-tracking',
        text: 'If in doubt, contact us at <span class="text-drygray-default whitespace-nowrap text-4xl tracking-[-0.5px] leading-[100%] font-degular">verify@base1.xyz</span>',
    },
]

function focusInput() {
    inputEl.value?.focus()
}

function handleFocus() {
    isFocused.value = true
}

function handleBlur() {
    isFocused.value = false
}

function normalizeUsername(username: string): string {
    // Remove @ symbol, trim whitespace, and convert to lowercase
    return username.toLowerCase().trim().replace(/^@/, '')
}

async function searchMember() {
    const query = normalizeUsername(searchQuery.value)
    if (!query) {
        searchResult.value = null
        return
    }

    isSearching.value = true

    const found = verifiedMembers.value.find(member => {
        const telegram = normalizeUsername(member.telegram)
        const email = normalizeUsername(member.email)
        const twitter = member.twitter ? normalizeUsername(member.twitter) : null

        return telegram === query
            || email === query
            || (twitter && twitter === query)
    })

    searchResult.value = found || { notFound: true, telegram: '', email: '' }
    isSearching.value = false

    trackContactVerification(!!found, query)
}

onMounted(async () => {
    verifiedMembers.value = await getVerifiedMembers()
    trackPageView()
})

onBeforeUnmount(() => {
    const duration = Math.round((Date.now() - pageStartTime.value) / 1000)
    trackPageView(undefined, duration)
})
</script>

<template>
    <section
        id="team-section"
        class="w-full relative flex flex-col-reverse lg:flex-col rounded-3xl bg-white px-0 lg:px-24 pb-6 pt-0 lg:py-24 md:p-12 lg:p-24 box-border text-left text-sm text-drygray-200 font-switzer overflow-hidden"
    >
        <div class="z-20 gap-6 md:gap-8 lg:gap-12 flex flex-col relative px-4 lg:px-0">
            <CommonSup title="Verify a Base1 Team Member" />

            <div
                class="max-w-[621px] relative text-5xl tracking-[-0.5px] leading-[100%] font-semibold font-degular text-left inline-block text-gray"
            >
                <span class="text-drygray-100">Confirm you</span>
                <span class="text-primary">’</span>
                <span class="text-drygray-100">re speaking with an official contact</span>
                <span class="text-primary">.</span>
            </div>

            <div class="leading-[150%] font-medium text-drygray-100">
                In Web3, identity matters. Use this page to check if the person contacting you is a verified member of
                Base1.
            </div>

            <div class="flex flex-col gap-4">
                <div
                    class="w-full relative rounded-xl bg-white border-gray-200 border-solid border-[1px] box-border h-[52px] text-left text-sm text-gray-100 font-switzer flex items-center overflow-hidden group focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-within:drop-shadow-[0_0_5px_rgba(var(--color-primary),0.3)]"
                    @click="focusInput"
                >
                    <Icon
                        name="base:user" class="z-10 size-5 w-12 transition-colors"
                        :class="isFocused ? 'text-primary' : 'text-drygray-default'"
                    />
                    <input
                        ref="inputEl"
                        v-model="searchQuery"
                        type="text"
                        placeholder="Enter Telegram username, Twitter handle, or email"
                        class="flex-1 text-drygray-100 h-full pr-4 outline-none text-sm tracking-[-0.3px] leading-[150%] font-medium font-switzer placeholder:text-drygray-100"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @input="searchMember"
                    >
                    <div class="p-1 h-full">
                        <CommonButton
                            variant="primary" class="text-drygray-100 h-full w-36"
                            :disabled="isSearching || !searchQuery"
                            @click="searchMember"
                        >
                            {{ isSearching ? 'Searching...' : 'Verify Contact' }}
                        </CommonButton>
                    </div>
                </div>

                <!-- Search Results -->
                <div v-if="searchResult" class="w-full">
                    <!-- Member Found -->
                    <div v-if="!searchResult.notFound" class="w-full gap-2 relative flex items-center px-4 text-drygray-100 bg-whitesmoke h-[53px] text-left text-[15px] font-medium shadow-[0px_9px_80px_rgba(0,_0,_0,_0.07),_0px_1.1269396543502808px_10.02px_rgba(0,_0,_0,_0.04)] rounded-xl bg-white font-switzer border-l-4 border-l-green-500">
                        <Icon name="base:status-verified" class="flex-shrink-0 size-5 text-green-600" />
                        <span class="text-sm font-medium flex gap-2 items-center">
                            <span class="font-semibold text-green-700">Verified</span>
                            <span class="ml-1">Official Base1 contact</span>
                        </span>
                    </div>

                    <!-- Member Not Found -->
                    <div v-else class="w-full gap-2 relative flex items-center px-4 text-drygray-100 bg-whitesmoke h-[53px] text-left text-[15px] font-medium shadow-[0px_9px_80px_rgba(0,_0,_0,_0.07),_0px_1.1269396543502808px_10.02px_rgba(0,_0,_0,_0.04)] rounded-xl bg-white font-switzer border-l-4 border-l-[#FF4184]">
                        <Icon name="base:status-unverified" class="flex-shrink-0 size-5" />
                        <span class="text-sm font-medium flex gap-2 items-center">
                            <span class="font-semibold text-[#FF4184]">Not Verified</span>
                            <span class="ml-1">Not associated with Base1</span>
                        </span>
                    </div>
                </div>

                <!-- Default state -->
                <div v-else class="w-full gap-2 relative flex items-center px-4 text-drygray-100 bg-whitesmoke h-[53px] text-left text-[15px] font-medium shadow-[0px_9px_80px_rgba(0,_0,_0,_0.07),_0px_1.1269396543502808px_10.02px_rgba(0,_0,_0,_0.04)] rounded-xl bg-white font-switzer border-l-4 border-l-gray-300">
                    <Icon name="base:user" class="flex-shrink-0 size-5 text-gray-500" />
                    <span class="text-sm font-medium text-gray-600">
                        Enter a contact to verify their identity
                    </span>
                </div>
            </div>

            <CommonSup title="Security Reminder" />

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    v-for="(card, index) in securityCards" :key="index"
                    class="w-full relative h-[300px] text-left flex flex-col text-4xl text-drygray-200 shadow-[0px_9px_80px_rgba(0,_0,_0,_0.07),_0px_1.1269396543502808px_10.02px_rgba(0,_0,_0,_0.04)] rounded-xl px-10 py-12 gap-6"
                >
                    <Icon :name="card.icon" class="size-9" />

                    <span
                        class="font-degular text-drygray-100 max-w-[235px] relative text-4xl tracking-[-0.5px] leading-[100%] font-semibold"
                        v-html="card.text"
                    />
                </div>
            </div>
        </div>

        <div
            class="z-0 w-full flex items-center justify-start lg:justify-center max-w-full max-h-full lg:overflow-hidden lg:absolute -right-1/3 top-0 h-[250px] lg:h-[477px]"
        >
            <img
                src="/search_user.svg"
                class="z-20 drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] absolute lg:w-full max-w-full h-[170.1px] px-4 lg:px-0"
                alt="search user"
            >
            <img class=" object-cover opacity-50" src="/page_section_background.png" alt="Page section background">
        </div>
    </section>
</template>
