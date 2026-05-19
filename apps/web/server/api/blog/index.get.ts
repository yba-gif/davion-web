import { blogPosts } from '@base1/database'
import { desc, eq } from 'drizzle-orm'
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const limit = Math.min(Number(query.limit) || 10, 50) // Max 50 posts
    const offset = Math.max(Number(query.offset) || 0, 0)
    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
        author: blogPosts.author,
        readTime: blogPosts.readTime,
        featuredImage: blogPosts.featuredImage,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit)
      .offset(offset)

    return {
      success: true,
      data: posts,
      pagination: {
        limit,
        offset,
        count: posts.length
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
