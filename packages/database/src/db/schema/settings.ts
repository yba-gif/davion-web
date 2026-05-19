import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const settings = pgTable('settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  siteName: varchar('site_name', { length: 255 }).notNull().default('Base1'),
  siteDescription: text('site_description').default('Market Makers. Capital Allocators On-Chain Operators'),
  contactEmail: varchar('contact_email', { length: 255 }).default('info@base1.io'),
  maintenanceMode: boolean('maintenance_mode').default(false),
  maintenanceMessage: text('maintenance_message').default('We are currently performing maintenance. Please check back soon.'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})