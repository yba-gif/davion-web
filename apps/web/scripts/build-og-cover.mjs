// One-shot generator for the default OG card.
// Runs at: `node apps/web/scripts/build-og-cover.mjs` from repo root, or `node scripts/build-og-cover.mjs` from apps/web.
// Output: apps/web/public/og-cover.png (1200x630, ~25KB).
//
// This is a placeholder image until P2.3 identity refresh lands.
// Per-page OG cards (with the page's specific headline) are P2 work via Satori.
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const out = path.resolve(__dirname, '..', 'public', 'og-cover.png')

// Brand-aligned SVG card.
// Colors match Davion tokens: bg = azure (#e0f1f3), text = drygray-100 (#212121),
// accent = primary-text (#2A8B3C — the AA-safe shade introduced in P0.2).
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e0f1f3"/>
      <stop offset="100%" stop-color="#dceff3"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Davion mark + wordmark -->
  <g transform="translate(80,80)">
    <rect width="44" height="44" rx="10" fill="#60E576"/>
    <text x="22" y="32" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="700" fill="#FFFFFF" text-anchor="middle">D</text>
    <text x="64" y="33" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" fill="#212121">Davion</text>
  </g>

  <!-- Headline. Update in lock-step with pages.hero.headline (en.json) and the
       nuxt.config.ts og:title fallback. Re-run this script to regenerate
       og-cover.png after any headline change. -->
  <text x="80" y="280" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="800" fill="#212121">Decision infrastructure</text>
  <text x="80" y="360" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="800" fill="#212121">for data that can't leave<tspan fill="#2A8B3C">.</tspan></text>

  <!-- Subhead -->
  <text x="80" y="450" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="500" fill="#212121" opacity="0.75">The platform banks, ministries, and energy operators</text>
  <text x="80" y="488" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="500" fill="#212121" opacity="0.75">use when decisions must be defensible<tspan fill="#2A8B3C">.</tspan></text>

  <!-- Footer mark -->
  <text x="80" y="580" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#212121" letter-spacing="3" opacity="0.55">DAVION · SOVEREIGN BY DEPLOYMENT</text>
</svg>
`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out)
const stats = await sharp(out).metadata()
console.log(`og-cover.png written: ${stats.width}x${stats.height} → ${out}`)
