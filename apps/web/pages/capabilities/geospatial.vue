<script setup lang="ts">
// Refactored to <CapabilityLayout> in P1.U7.
useSeoMeta({
    title: 'Geospatial analytics',
    description: 'Map, ground, and reason over location-aware data at operational scale. Assets, events, trajectories, anchored in space, inside your perimeter.',
    ogTitle: 'Davion · Geospatial analytics',
    ogDescription: 'Reasoning over location-aware data, assets, events, trajectories. Inside the perimeter, with raster, vector, and trajectory data fused into one ontology.',
})

const data = {
    eyebrow: 'Capability · Geospatial',
    headline: 'Where matters. Reason over location-aware data inside your perimeter',
    body: 'AlpOS Geospatial fuses raster, vector, and trajectory data, satellites, sensors, GIS, into one location-aware ontology. Anomalies, patterns of life, and tactical change become first-class signals on the operator\'s map.',

    whatItDoes: [
        'Fuses raster, vector, and trajectory data into one location-aware ontology.',
        'Resolves and tracks entities across satellite, aerial, and ground sensors.',
        'Detects anomalies on patterns of life, asset behaviour, and tactical change.',
        'Runs against your tile servers and geo-data infrastructure, no third-party cloud.',
    ],

    howItWorksTitle: 'Ingest · Ground · Reason · Render',
    howItWorks: [
        { n: '01', title: 'Ingest', body: 'Raster (satellite / aerial / drone), vector (GIS, OSM, internal), and trajectory (AIS, ADS-B, fleet telemetry) flow into the AlpOS pipeline.' },
        { n: '02', title: 'Ground', body: 'Every observation is geocoded, georeferenced, and bound to the ontology entity it describes.' },
        { n: '03', title: 'Reason', body: 'Graph and statistical methods detect patterns: convergence, dispersion, anomaly against historical baselines.' },
        { n: '04', title: 'Render', body: 'Operators see the case on the map, with the lineage from raw observation to decision.' },
    ],

    whenToUse: [
        'Grid and pipeline operators monitoring linear assets across thousands of kilometres',
        'Defense and intelligence analysts running pattern-of-life on contested geography',
        'Public-safety operators correlating incident reports with spatial demographics',
        'Maritime and aviation surveillance with multi-sensor trajectory fusion',
    ],

    industries: [
        { name: 'Defense & Intelligence', slug: 'defense-intelligence' },
        { name: 'Energy', slug: 'energy' },
        { name: 'Government', slug: 'government' },
        { name: 'Manufacturing', slug: 'manufacturing' },
    ],

    ctaHeadline: 'Bring the map. We\'ll bring the platform',
}
</script>

<template>
    <CapabilityLayout :data="data" />
</template>
