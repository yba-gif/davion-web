// One-shot smoke test: connect to Neon via the same code path the Cloudflare
// Pages build uses. Run from the package:
//   NEON_URL='postgresql://...' pnpm exec tsx src/test-neon.ts
import { blogPosts, engagementIntake } from './db/schema'
import { createEdgeDatabase } from './db/database'

const url = process.env.NEON_URL
if (!url) {
    console.error('Set NEON_URL env var before running.')
    process.exit(1)
}

const db = createEdgeDatabase(url)

async function main() {
    const posts = await db.select({ slug: blogPosts.slug, category: blogPosts.category }).from(blogPosts).limit(10)
    const intakes = await db.select({ ticket: engagementIntake.ticketCode }).from(engagementIntake)
    console.log('✓ blog_posts (first 10):')
    for (const p of posts) console.log(`    ${p.category.padEnd(14)} ${p.slug}`)
    console.log(`✓ engagement_intake rows: ${intakes.length}`)
}

main().catch((err) => {
    console.error('✗ Neon query failed:', err instanceof Error ? err.message : err)
    process.exit(1)
})
