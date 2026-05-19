import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const verified = pgTable('verified', {
  id: uuid('id').defaultRandom().primaryKey(),
  telegram: varchar('telegram', { length: 255 }).notNull(),
  twitter: varchar('twitter', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  website: varchar('website', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})