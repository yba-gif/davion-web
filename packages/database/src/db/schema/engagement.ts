import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

// P2.U3 — Engagement intake. Replaces the P0.U3 mailto fallback for visitors
// who prefer a structured form. Submissions land in this table; the team
// triages from a future admin surface (Kottster) or via a simple read API.
//
// Intents are kept in code (not Postgres enum) so additions don't need a
// migration. Match the canonical list on /contact page.
export const ENGAGEMENT_INTENTS = [
    'briefing',
    'partnership',
    'press',
    'careers',
    'venture',
] as const
export type EngagementIntent = typeof ENGAGEMENT_INTENTS[number]

export const ENGAGEMENT_STATUSES = [
    'new',        // Just landed, not yet routed.
    'routed',     // Triaged and assigned to a team inbox.
    'in-progress',
    'closed-won', // Engagement signed.
    'closed-lost',
    'spam',
] as const
export type EngagementStatus = typeof ENGAGEMENT_STATUSES[number]

export const engagementIntake = pgTable('engagement_intake', {
    id: uuid('id').defaultRandom().primaryKey(),
    // Public-facing short id (8 chars) shown in the success state so users can
    // reference their submission.
    ticketCode: varchar('ticket_code', { length: 12 }).notNull().unique(),

    // Submitted fields.
    name: varchar('name', { length: 160 }).notNull(),
    email: varchar('email', { length: 254 }).notNull(),
    organisation: varchar('organisation', { length: 200 }),
    role: varchar('role', { length: 120 }),
    intent: varchar('intent', { length: 32 }).notNull(),
    message: text('message').notNull(),

    // Diagnostic metadata. IP is best-effort; null is fine if anonymised.
    ipHash: varchar('ip_hash', { length: 64 }),
    userAgent: varchar('user_agent', { length: 512 }),
    referer: varchar('referer', { length: 500 }),

    // Triage workflow.
    status: varchar('status', { length: 32 }).default('new').notNull(),
    routedTo: varchar('routed_to', { length: 80 }),
    notes: text('notes'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
