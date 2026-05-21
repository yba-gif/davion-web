// P1.U5 — Single source of truth for date formatting site-wide.
// ISO format (YYYY-MM-DD) reads institutional and is internationally
// unambiguous — picked over the previous `en-US` short-month style.
//
// Used by: home (Newsroom showcase), Newsroom hub, Newsroom post pages,
// any future surface that surfaces a date.
//
// For longer-form contexts that want "May 21, 2026" we can add a
// `formatDateLong(d)` here later; v1 only ships the ISO variant.
export function formatDate(d: string | Date | null | undefined): string {
    if (!d) return ''
    const date = typeof d === 'string' ? new Date(d) : d
    if (Number.isNaN(date.getTime())) return ''
    const y = date.getUTCFullYear()
    const m = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
}
