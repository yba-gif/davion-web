<script setup lang="ts">
// P1.6 (2026-05-24 audit): the green-dot trailing-punctuation accent is a core
// Davion brand signature (docs/brand-voice.md §5 rule 7). Was inlined as
// <DotAccent /> 92 times across pages + components.
// One component now owns the pattern; future changes (color token, semantic
// markup, ARIA tweak) happen in one place.
//
// Usage:
//   <h1>Decision infrastructure for data that can't leave<DotAccent /></h1>
//
// The dot is decorative — screen readers should announce the headline period
// as part of natural prose, so we leave the character visible to AT. If a
// pattern emerges where we want to swap it for a different glyph globally
// (the punctuation that closes some claims is ? or ,), pass `char`:
//   <DotAccent char="?" />
</script>

<template>
    <DotAccent />
</template>
