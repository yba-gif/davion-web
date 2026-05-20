<script setup lang="ts">
useSeoMeta({ title: 'Careers', description: 'Davion hires for the mission. If you build infrastructure institutions can trust, we want to meet you.' })
</script>

<template>
    <div class="flex flex-col gap-4">
        <section class="bg-white rounded-3xl px-6 md:px-12 lg:px-16 py-20 md:py-28">
            <CommonSup title="Company · Careers" />
            <h1 class="font-degular font-bold text-drygray-100 mt-6 text-[44px] leading-[1.05] md:text-[64px] md:leading-[0.98] lg:text-[80px] tracking-tight max-w-4xl">
                Work on consequential problems.
            </h1>
            <p class="text-b2 text-drygray-default mt-8 max-w-3xl">
                Davion hires for the mission. If you build infrastructure that institutions can trust, we want to meet you.
            </p>
            <p class="text-b1 text-drygray-default mt-8">Open roles, hiring process, and EVP land in a subsequent slice.</p>
            <div class="mt-10">
                <NuxtLink to="/contact"><CommonButton variant="primary" icon="base:arrow">Get in touch</CommonButton></NuxtLink>
            </div>
        </section>
    </div>
</template>
