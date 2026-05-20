import { blogPosts, BLOG_CATEGORIES } from '@base1/database'
import { and, desc, eq } from 'drizzle-orm'
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const limit = Math.min(Number(query.limit) || 10, 50) // Max 50 posts
    const offset = Math.max(Number(query.offset) || 0, 0)

    // P2.7: optional category filter (validated against the known set).
    const categoryParam = typeof query.category === 'string' ? query.category : null
    const category = categoryParam && (BLOG_CATEGORIES as readonly string[]).includes(categoryParam)
      ? categoryParam
      : null

    const baseWhere = eq(blogPosts.published, true)
    const where = category ? and(baseWhere, eq(blogPosts.category, category)) : baseWhere

    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        author: blogPosts.author,
        readTime: blogPosts.readTime,
        category: blogPosts.category,
        featuredImage: blogPosts.featuredImage,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(where)
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset)

    return {
      success: true,
      data: posts,
      pagination: {
        limit,
        offset,
        count: posts.length,
        category,
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blog posts',
      data: {
        error: error instanceof Error ? error.message : 'Unknown database error'
      }
    })
  }
})
