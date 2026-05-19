import { sql } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description'),
    location: varchar('location', { length: 255 }).notNull(),
    country: varchar('country', { length: 100 }),
    eventDate: timestamp('event_date').notNull().default(sql`now()`),
    endDate: timestamp('end_date'),
    registrationUrl: varchar('registration_url', { length: 500 }),
    maxAttendees: integer('max_attendees'),
    currentAttendees: integer('current_attendees').default(0),
    status: varchar('status', { length: 20 }).default('upcoming'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})
