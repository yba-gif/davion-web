#!/usr/bin/env node
/**
 * P3.10 — Enforce the P0.2 WCAG-AA token rule.
 *
 * The brand has two greens:
 *   - `primary`       (#60E576) — DECORATION only (fills, dots, borders)
 *   - `primary-text`  (#2A8B3C) — TEXT (AA-safe contrast on white)
 *
 * `text-primary` and any hover/group/focus variant of it (like
 * `hover:text-primary` or `group-hover:text-primary`) is BANNED for
 * production text use. This script scans the codebase for offenders
 * and exits non-zero if any are found.
 *
 * Allowed:
 *   - bg-primary, border-primary, ring-primary, outline-primary, fill-primary
 *   - text-primary-text (the AA-safe shade)
 *
 * Banned (script exits 1 if any of these appear in source):
 *   - text-primary
 *   - !text-primary
 *   - hover:text-primary
 *   - group-hover:text-primary
 *   - focus:text-primary, focus-visible:text-primary
 *   - any-other-prefix:text-primary
 *
 * Usage:
 *   node apps/web/scripts/check-aa-contrast.mjs                # scans apps/web
 *   node apps/web/scripts/check-aa-contrast.mjs path/to/file   # scans one file
 *
 * Wire into pre-commit / CI by adding this to package.json scripts:
 *   "lint:aa": "node scripts/check-aa-contrast.mjs"
 */
import { readFileSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const webRoot = resolve(__dirname, '..')

// Match `text-primary` NOT followed by `-text` and NOT followed by other
// identifier chars (so we don't catch e.g. `text-primary-text` or a future
// `text-primary-something`).
//
// The lookahead `(?!-text|[\w-])` allows the token to be terminated by a
// quote, space, `}`, or any non-identifier char.
const BANNED = /\btext-primary(?!-text|[\w-])/g

function listSourceFiles(root) {
    // Use `git ls-files` so we automatically respect .gitignore and skip
    // node_modules, .nuxt, etc. Fall back to a recursive walk if git isn't
    // available.
    try {
        const out = execSync(
            'git ls-files "*.vue" "*.ts" "*.tsx" "*.js" "*.jsx"',
            { cwd: root, encoding: 'utf8' },
        )
        return out.split('\n').filter(Boolean).map(p => join(root, p))
    }
    catch {
        // Fall-back: walk synchronously.
        const out = []
        const walk = (dir) => {
            const { readdirSync } = require('node:fs')
            for (const e of readdirSync(dir, { withFileTypes: true })) {
                if (e.name === 'node_modules' || e.name === '.nuxt' || e.name === '.output') continue
                const p = join(dir, e.name)
                if (e.isDirectory()) walk(p)
                else if (/\.(vue|tsx?|jsx?)$/.test(e.name)) out.push(p)
            }
        }
        walk(root)
        return out
    }
}

const target = process.argv[2]
const files = target
    ? (statSync(target).isDirectory() ? listSourceFiles(target) : [target])
    : listSourceFiles(webRoot)

const offenders = []

for (const f of files) {
    // Skip the lint rule itself + the brand-voice doc (which references the
    // banned class on purpose, in code-fenced examples).
    if (f.endsWith('scripts/check-aa-contrast.mjs')) continue
    if (f.endsWith('tailwind.config.ts')) continue
    if (f.includes('/docs/brand-voice.md')) continue
    if (f.includes('/docs/brand-identity.md')) continue

    let content
    try {
        content = readFileSync(f, 'utf8')
    }
    catch {
        continue
    }

    const matches = [...content.matchAll(BANNED)]
    if (matches.length === 0) continue

    for (const m of matches) {
        // Line number for reporting.
        const upTo = content.slice(0, m.index)
        const line = upTo.split('\n').length
        offenders.push({ file: f.replace(webRoot + '/', ''), line, match: m[0] })
    }
}

if (offenders.length === 0) {
    console.log('✓ AA contrast check passed — 0 banned `text-primary` text uses found.')
    process.exit(0)
}

console.error('')
console.error(`✗ AA contrast check failed — ${offenders.length} banned text-primary usage(s) found:`)
console.error('')
for (const o of offenders) {
    console.error(`  ${o.file}:${o.line}  →  ${o.match}`)
}
console.error('')
console.error('Use `text-primary-text` (AA-safe #2A8B3C) instead. See docs/brand-voice.md §7.')
console.error('Decoration (bg-primary, border-primary, ring-primary) is still allowed.')
console.error('')
process.exit(1)
