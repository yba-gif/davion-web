import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

// Newsroom categories (P2.7). Used to filter the /company/newsroom hub.
// Values are kept in code rather than as a Postgres enum so future additions
// can ship without a schema migration.
export const BLOG_CATEGORIES = ['announcement', 'insight', 'technical', 'recognition'] as const
export type BlogCategory = typeof BLOG_CATEGORIES[number]

export const blogPosts = pgTable('blog_posts', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    excerpt: text('excerpt'),
    content: text('content').notNull(),
    author: varchar('author', { length: 100 }).notNull(),
    readTime: varchar('read_time', { length: 20 }),
    // P2.7: category column added 2026-05-21. Defaults to 'insight' so any
    // pre-existing rows have a sensible bucket. Per `BLOG_CATEGORIES` above.
    category: varchar('category', { length: 32 }).default('insight').notNull(),
    published: boolean('published').default(false),
    featuredImage: varchar('featured_image', { length: 500 }),
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})
