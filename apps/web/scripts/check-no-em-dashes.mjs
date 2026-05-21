#!/usr/bin/env node
/**
 * Enforce the no-em-dash rule from docs/brand-voice.md §5 rule 9.
 *
 * Em-dashes (U+2014) are banned site-wide. Use a comma for parenthetical
 * asides, a colon for list-item labels, or split into two sentences with
 * a period for breaks.
 *
 * Allowed: en-dashes (U+2013) in number ranges like "6–12 weeks".
 *
 * Usage:
 *   pnpm lint:dashes
 *
 * Excluded:
 *   - This script itself.
 *   - Audit / action-plan markdown reports (historical artefacts).
 *   - node_modules, .nuxt, .output, dist.
 */
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const webRoot = resolve(__dirname, '..')

const BANNED = '—' // em-dash, U+2014

const EXCLUDED_BASENAMES = new Set([
    'check-no-em-dashes.mjs',
])

const EXCLUDED_PATH_FRAGMENTS = [
    '/website-audit-report-',
    '/redesign-action-plan-',
    '/ui-ux-analysis-report-',
    '/ui-ux-action-plan-',
]

function listSourceFiles(root) {
    try {
        const out = execSync(
            'git ls-files "*.vue" "*.ts" "*.tsx" "*.js" "*.jsx" "*.md"',
            { cwd: root, encoding: 'utf8' },
        )
        return out.split('\n').filter(Boolean).map(p => join(root, p))
    }
    catch {
        return []
    }
}

const files = listSourceFiles(webRoot)
const offenders = []

for (const f of files) {
    const base = f.split('/').pop() || ''
    if (EXCLUDED_BASENAMES.has(base)) continue
    if (EXCLUDED_PATH_FRAGMENTS.some(frag => f.includes(frag))) continue

    let content
    try {
        content = readFileSync(f, 'utf8')
    }
    catch {
        continue
    }

    if (!content.includes(BANNED)) continue

    const lines = content.split('\n')
    lines.forEach((line, i) => {
        if (line.includes(BANNED)) {
            offenders.push({
                file: f.replace(webRoot + '/', ''),
                line: i + 1,
                snippet: line.trim().slice(0, 100),
            })
        }
    })
}

if (offenders.length === 0) {
    console.log('✓ No em-dashes found. Brand voice rule §5.9 holds.')
    process.exit(0)
}

console.error('')
console.error(`✗ Found ${offenders.length} em-dash usage(s). See docs/brand-voice.md §5 rule 9.`)
console.error('')
for (const o of offenders.slice(0, 40)) {
    console.error(`  ${o.file}:${o.line}`)
    console.error(`    ${o.snippet}`)
}
if (offenders.length > 40) {
    console.error(`  …and ${offenders.length - 40} more`)
}
console.error('')
console.error('Replace with: comma for asides, colon for list labels, or split into two sentences.')
console.error('')
process.exit(1)
