import { index, integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const analytics = pgTable('analytics', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  userId: varchar('user_id', { length: 255 }),
  sessionId: varchar('session_id', { length: 255 }),
  pagePath: varchar('page_path', { length: 500 }),
  referrer: varchar('referrer', { length: 500 }),
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 45 }),
  country: varchar('country', { length: 2 }),
  city: varchar('city', { length: 100 }),
  deviceType: varchar('device_type', { length: 50 }),
  browser: varchar('browser', { length: 50 }),
  os: varchar('os', { length: 50 }),
  duration: integer('duration'),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  sessionIdIdx: index('idx_analytics_session_id').on(table.sessionId),
  createdAtIdx: index('idx_analytics_created_at').on(table.createdAt),
  eventTypeIdx: index('idx_analytics_event_type').on(table.eventType),
  pagePathIdx: index('idx_analytics_page_path').on(table.pagePath),
  referrerIdx: index('idx_analytics_referrer').on(table.referrer),
  compositeIdx: index('idx_analytics_composite').on(table.createdAt, table.sessionId, table.eventType),
}))