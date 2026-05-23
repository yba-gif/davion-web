#!/usr/bin/env node
/**
 * Build the Davion "D." logo variants from the source PNG.
 *
 * Input:  apps/web/public/logo-source.png  (1000x1000, sharp corners)
 * Output: apps/web/public/logo.png         (1024, rounded, master)
 *         apps/web/public/logo-512.png     (PWA / OG inset)
 *         apps/web/public/logo-192.png     (PWA)
 *         apps/web/public/logo-64.png      (header retina, dense displays)
 *         apps/web/public/logo-32.png      (favicon)
 *         apps/web/public/apple-touch-icon.png (180, iOS home-screen)
 *
 * Rounding: 22% of side (mirrors iOS app-icon silhouette).
 *
 * Usage:
 *   pnpm --filter web exec node scripts/build-logo.mjs
 */
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')
const source = join(publicDir, 'logo-source.png')

const VARIANTS = [
    { name: 'logo.png', size: 1024 },
    { name: 'logo-512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'logo-192.png', size: 192 },
    { name: 'logo-64.png', size: 64 },
    { name: 'logo-32.png', size: 32 },
]

const RADIUS_RATIO = 0.22 // 22% of side, ~iOS app-icon silhouette

async function buildVariant({ name, size }) {
    const rx = Math.round(size * RADIUS_RATIO)
    const mask = Buffer.from(
        `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`
        + `<rect x="0" y="0" width="${size}" height="${size}" rx="${rx}" ry="${rx}" fill="white"/>`
        + `</svg>`,
    )

    const out = join(publicDir, name)
    await sharp(source)
        .resize(size, size, { fit: 'cover' })
        .composite([{ input: mask, blend: 'dest-in' }])
        .png({ compressionLevel: 9 })
        .toFile(out)

    const { size: bytes } = await sharp(out).metadata().then(m => ({ size: 0 })).catch(() => ({ size: 0 }))
    return { name, size, bytes }
}

async function main() {
    console.log(`Source: ${source}`)
    console.log(`Output: ${publicDir}\n`)

    for (const variant of VARIANTS) {
        await buildVariant(variant)
        console.log(`  + ${variant.name.padEnd(28)} ${variant.size}x${variant.size}`)
    }

    console.log(`\nDone. ${VARIANTS.length} variants written.`)
}

main().catch((err) => {
    console.error('build-logo failed:', err)
    process.exit(1)
})
