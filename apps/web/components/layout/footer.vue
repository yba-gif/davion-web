<script setup lang="ts">
// Minimal Davion footer — foundation slice.
// Full footer (legal links, contact, sitemap, presence) lands with the Company tree.
const year = new Date().getFullYear()
</script>

<template>
    <footer class="bg-ink-50 border-t border-ink-200 mt-24">
        <div class="mx-auto max-w-7xl px-6 py-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
                <div class="flex items-center gap-3">
                    <NuxtImg src="/icon.svg" alt="" width="20" height="20" class="h-5 w-5" />
                    <span class="font-display font-semibold text-bone-bright text-lg tracking-display-tight">Davion</span>
                </div>
                <p class="text-body-s mt-3 max-w-md">
                    Sovereign software for data intelligence and artificial intelligence. Innovate. Secure. Perform.
                </p>
            </div>
            <p class="text-label">© {{ year }} Davion. All rights reserved.</p>
        </div>
    </footer>
</template>
