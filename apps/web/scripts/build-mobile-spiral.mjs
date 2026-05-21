#!/usr/bin/env node
/**
 * P2.U7 — Generate a mobile-tight crop of the spiral master.
 *
 * Strategy: take the 2400w master and crop the centre 65% (which captures
 * the spiral focal point and drops the empty bottom-right region that
 * forces the 3× overscale on mobile). Output at 720w (max iPhone Pro Max
 * width × 2 for retina) as `section_background-mobile.webp`.
 *
 * Wired into the hero via <picture><source media="(max-width: 768px)">.
 *
 * Run: node apps/web/scripts/build-mobile-spiral.mjs
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.resolve(__dirname, '..', 'public', 'section_background-2400.webp')
const out = path.resolve(__dirname, '..', 'public', 'section_background-mobile.webp')

const meta = await sharp(src).metadata()
const W = meta.width || 2400
const H = meta.height || 2400

// Centre crop: keep the middle 65% of both dimensions.
const cropW = Math.round(W * 0.65)
const cropH = Math.round(H * 0.65)
const left = Math.round((W - cropW) / 2)
const top = Math.round((H - cropH) / 2)

await sharp(src)
    .extract({ left, top, width: cropW, height: cropH })
    .resize({ width: 720, withoutEnlargement: false })
    .webp({ quality: 82, effort: 6 })
    .toFile(out)

const outMeta = await sharp(out).metadata()
console.log(`section_background-mobile.webp: ${outMeta.width}×${outMeta.height} → ${out}`)
