import { app } from '../app'
import { dataSourceRegistry } from '../data-sources/registry'
import { generateSlug } from '../utils/slug'

interface BlogPost {
    id?: string
    title: string
    slug?: string
    excerpt?: string
    content: string
    author: string
    read_time?: string
    published?: boolean
    featured_image?: string
    published_at?: Date
    created_at?: Date
    updated_at?: Date
}

export default app.defineCustomController({

    GET: async (req: Request) => {
        try {
            const url = new URL(req.url)
            const limit = Number.parseInt(url.searchParams.get('limit') || '10')
            const offset = Number.parseInt(url.searchParams.get('offset') || '0')
            const published = url.searchParams.get('published')

            const dataSource = dataSourceRegistry.dataSources.postgres
            if (!dataSource?.adapter) {
                throw new Error('Database not available')
            }

            let query = dataSource.adapter.client('blog_posts')

            if (published !== null) {
                query = query.where('published', published === 'true')
            }

            const posts = await query
                .orderBy('created_at', 'desc')
                .limit(limit)
                .offset(offset)

            const total = await dataSource.adapter.client('blog_posts').count('* as count')

            return new Response(JSON.stringify({
                posts,
                total: total[0].count,
                limit,
                offset,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        catch (error) {
            console.error('Blog GET error:', error)
            return new Response(JSON.stringify({
                error: 'Failed to fetch blog posts',
                details: error instanceof Error ? error.message : 'Unknown error',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    },

    POST: async (req: Request) => {
        try {
            const data: BlogPost = await req.json()

            if (!data.title || !data.content || !data.author) {
                return new Response(JSON.stringify({
                    error: 'Missing required fields: title, content, author',
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            if (!data.slug) {
                data.slug = generateSlug(data.title)
            }

            if (!data.read_time) {
                const wordCount = data.content.split(' ').length
                const readTimeMinutes = Math.ceil(wordCount / 200)
                data.read_time = `${readTimeMinutes} min read`
            }

            const dataSource = dataSourceRegistry.dataSources.postgres
            if (!dataSource?.adapter) {
                throw new Error('Database not available')
            }

            const existingPost = await dataSource.adapter.client('blog_posts')
                .where('slug', data.slug)
                .first()

            if (existingPost) {
                data.slug = `${data.slug}-${Date.now()}`
            }

            if (data.published && !data.published_at) {
                data.published_at = new Date()
            }

            const [newPost] = await dataSource.adapter.client('blog_posts')
                .insert({
                    ...data,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
                .returning('*')

            return new Response(JSON.stringify({
                success: true,
                post: newPost,
            }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        catch (error) {
            console.error('Blog POST error:', error)
            return new Response(JSON.stringify({
                error: 'Failed to create blog post',
                details: error instanceof Error ? error.message : 'Unknown error',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    },

    PUT: async (req: Request) => {
        try {
            const url = new URL(req.url)
            const id = url.searchParams.get('id')

            if (!id) {
                return new Response(JSON.stringify({ error: 'Post ID required' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            const data: Partial<BlogPost> = await req.json()

            const dataSource = dataSourceRegistry.dataSources.postgres
            if (!dataSource?.adapter) {
                throw new Error('Database not available')
            }

            if (data.title && !data.slug) {
                data.slug = generateSlug(data.title)
            }

            if (data.content && !data.read_time) {
                const wordCount = data.content.split(' ').length
                const readTimeMinutes = Math.ceil(wordCount / 200)
                data.read_time = `${readTimeMinutes} min read`
            }

            if (data.published && !data.published_at) {
                data.published_at = new Date()
            }

            const [updatedPost] = await dataSource.adapter.client('blog_posts')
                .where('id', id)
                .update({
                    ...data,
                    updated_at: new Date(),
                })
                .returning('*')

            return new Response(JSON.stringify({
                success: true,
                post: updatedPost,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        catch (error) {
            console.error('Blog PUT error:', error)
            return new Response(JSON.stringify({
                error: 'Failed to update blog post',
                details: error instanceof Error ? error.message : 'Unknown error',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    },

    DELETE: async (req: Request) => {
        try {
            const url = new URL(req.url)
            const id = url.searchParams.get('id')

            if (!id) {
                return new Response(JSON.stringify({ error: 'Post ID required' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            const dataSource = dataSourceRegistry.dataSources.postgres
            if (!dataSource?.adapter) {
                throw new Error('Database not available')
            }

            await dataSource.adapter.client('blog_posts').where('id', id).del()

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        catch (error) {
            console.error('Blog DELETE error:', error)
            return new Response(JSON.stringify({
                error: 'Failed to delete blog post',
                details: error instanceof Error ? error.message : 'Unknown error',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    },
})
