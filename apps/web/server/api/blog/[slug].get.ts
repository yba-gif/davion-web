import { blogPosts } from '@base1/database'
import { and, eq } from 'drizzle-orm'
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    try {
        const slug = getRouterParam(event, 'slug')

        if (!slug) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Blog post slug is required',
            })
        }

        console.log(`Fetching blog post with slug: ${slug}`)

        const post = await db
            .select({
                id: blogPosts.id,
                title: blogPosts.title,
                slug: blogPosts.slug,
                excerpt: blogPosts.excerpt,
                content: blogPosts.content,
                author: blogPosts.author,
                readTime: blogPosts.readTime,
                featuredImage: blogPosts.featuredImage,
                publishedAt: blogPosts.publishedAt,
                createdAt: blogPosts.createdAt,
                updatedAt: blogPosts.updatedAt,
            })
            .from(blogPosts)
            .where(and(
                eq(blogPosts.slug, slug),
                eq(blogPosts.published, true),
            ))
            .limit(1)

        if (!post[0]) {
            console.warn(`Blog post not found: ${slug}`)
            throw createError({
                statusCode: 404,
                statusMessage: 'Blog post not found',
            })
        }

        return {
            success: true,
            data: post[0],
        }
    }
    catch (error) {
        if (error && typeof error === 'object' && 'statusCode' in error) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch blog post',
            data: {
                error: error instanceof Error ? error.message : 'Unknown database error',
            },
        })
    }
})
