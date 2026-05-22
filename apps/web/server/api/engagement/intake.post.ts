// P2.U3: Engagement intake POST endpoint.
//
// Accepts a structured form submission, validates server-side, persists to
// the engagement_intake table, returns a public ticket code the user can
// reference. Honest about what we do with the data; the route mirrors the
// fields and the Privacy Policy clauses.
//
// Defence-in-depth:
//   - Honeypot field `companyName` (real label is `organisation`); bots that
//     fill every input get rejected silently with a fake-success response.
//   - Per-IP soft rate limit via an in-memory map (good enough for the
//     single-instance dev / early-prod footprint; swap for Redis when we
//     deploy multi-node).
//   - IP is SHA-256 hashed (with a salt from env) before persistence so we
//     never store raw addresses.

import { createHash } from 'node:crypto'
import { eq } from 'drizzle-orm'
import { ENGAGEMENT_INTENTS, engagementIntake } from '@base1/database'
import { db } from '~/server/utils/db'

// Simple per-IP rate limit. 5 submissions / hour / IP.
const RATE_WINDOW_MS = 60 * 60 * 1000
const RATE_MAX = 5
const rateMap = new Map<string, number[]>() // ipHash → timestamps

function isRateLimited(ipHash: string): boolean {
    const now = Date.now()
    const hits = (rateMap.get(ipHash) || []).filter(t => now - t < RATE_WINDOW_MS)
    if (hits.length >= RATE_MAX) {
        rateMap.set(ipHash, hits)
        return true
    }
    hits.push(now)
    rateMap.set(ipHash, hits)
    return false
}

function makeTicketCode(): string {
    // Short, human-friendly, 8 chars. Mix uppercase + digits, no confusing 0/O/1/I/L.
    const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
    let code = ''
    for (let i = 0; i < 8; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)]
    return code
}

function hashIp(ip: string): string {
    const salt = process.env.IP_HASH_SALT || 'davion-default-salt'
    return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)
}

function isValidEmail(s: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254
}

interface SubmitBody {
    name?: unknown
    email?: unknown
    organisation?: unknown
    role?: unknown
    intent?: unknown
    message?: unknown
    /** Honeypot: real users leave this empty. */
    companyName?: unknown
}

export default defineEventHandler(async (event) => {
    const body = await readBody<SubmitBody>(event)

    // Honeypot: pretend-success for bots.
    if (typeof body.companyName === 'string' && body.companyName.trim().length > 0) {
        // No DB write. Wait a small random delay to mimic real processing.
        await new Promise(r => setTimeout(r, 250 + Math.random() * 400))
        return { ok: true, ticketCode: 'XXXXXXXX' }
    }

    // Trim string inputs.
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const organisation = typeof body.organisation === 'string' ? body.organisation.trim() : ''
    const role = typeof body.role === 'string' ? body.role.trim() : ''
    const intent = typeof body.intent === 'string' ? body.intent.trim().toLowerCase() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    // Validate.
    const errors: Record<string, string> = {}
    if (name.length < 2) errors.name = 'Tell us your name (at least 2 characters).'
    if (name.length > 160) errors.name = 'Name is too long.'
    if (!isValidEmail(email)) errors.email = 'Please provide a valid email address.'
    if (organisation && organisation.length > 200) errors.organisation = 'Organisation name is too long.'
    if (role && role.length > 120) errors.role = 'Role is too long.'
    if (!(ENGAGEMENT_INTENTS as readonly string[]).includes(intent)) errors.intent = 'Please pick an intent.'
    if (message.length < 20) errors.message = 'Tell us a bit more about what you are trying to decide (at least 20 characters).'
    if (message.length > 4000) errors.message = 'Message is too long (max 4000 characters). Email engagement@davion.com instead.'

    if (Object.keys(errors).length > 0) {
        throw createError({
            statusCode: 422,
            statusMessage: 'Validation failed',
            data: { errors },
        })
    }

    // Rate limit by IP hash.
    const rawIp = getHeader(event, 'x-forwarded-for')?.split(',')[0].trim()
        || getRequestIP(event, { xForwardedFor: true })
        || 'unknown'
    const ipHash = hashIp(rawIp)
    if (isRateLimited(ipHash)) {
        throw createError({
            statusCode: 429,
            statusMessage: 'Too many submissions',
            data: { errors: { _form: 'You have submitted several times recently. Try again in an hour, or email engagement@davion.com directly.' } },
        })
    }

    // Persist.
    const ticketCode = makeTicketCode()
    const userAgent = getHeader(event, 'user-agent')?.slice(0, 512) || null
    const referer = getHeader(event, 'referer')?.slice(0, 500) || null

    try {
        await db.insert(engagementIntake).values({
            ticketCode,
            name,
            email,
            organisation: organisation || null,
            role: role || null,
            intent,
            message,
            ipHash,
            userAgent,
            referer,
        })
    }
    catch (err) {
        // Extremely unlikely ticketCode collision; retry once.
        if (err instanceof Error && err.message.toLowerCase().includes('unique')) {
            const retry = makeTicketCode()
            await db.insert(engagementIntake).values({
                ticketCode: retry,
                name, email,
                organisation: organisation || null,
                role: role || null,
                intent, message,
                ipHash, userAgent, referer,
            })
            return { ok: true, ticketCode: retry }
        }
        console.error('engagement_intake insert failed:', err)
        throw createError({
            statusCode: 500,
            statusMessage: 'We could not save your submission. Email engagement@davion.com instead.',
        })
    }

    return { ok: true, ticketCode }
})
