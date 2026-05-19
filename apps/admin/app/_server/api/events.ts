import { app } from '../app'
import { dataSourceRegistry } from '../data-sources/registry'
import { generateSlug } from '../utils/slug'

interface Event {
    id?: string
    title: string
    slug?: string
    description?: string
    location: string
    country?: string
    event_date: Date
    end_date?: Date
    image?: string
    registration_url?: string
    max_attendees?: number
    current_attendees?: number
    status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
    created_at?: Date
    updated_at?: Date
}

export default app.defineCustomController({
    // Get all events
    GET: async (req: Request) => {
        try {
            const url = new URL(req.url)
            const limit = Number.parseInt(url.searchParams.get('limit') || '10')
            const offset = Number.parseInt(url.searchParams.get('offset') || '0')
            const status = url.searchParams.get('status')
            const upcoming = url.searchParams.get('upcoming')

            const dataSource = dataSourceRegistry.dataSources.postgres
            if (!dataSource?.adapter) {
                throw new Error('Database not available')
            }

            let query = dataSource.adapter.select('events')

            if (status) {
                query = query.where('status', status)
            }

            if (upcoming === 'true') {
                query = query.where('event_date', '>=', new Date().toISOString())
            }

            const events = await query
                .orderBy('event_date', 'asc')
                .limit(limit)
                .offset(offset)

            const total = await dataSource.adapter.count('events')

            return new Response(JSON.stringify({
                events,
                total: total[0].count,
                limit,
                offset,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        catch (error) {
            console.error('Events GET error:', error)
            return new Response(JSON.stringify({
                error: 'Failed to fetch events',
                details: error instanceof Error ? error.message : 'Unknown error',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    },

    // Create new event
    POST: async (req: Request) => {
        try {
            const data: Event = await req.json()

            // Validate required fields
            if (!data.title || !data.location || !data.event_date) {
                return new Response(JSON.stringify({
                    error: 'Missing required fields: title, location, event_date',
                    received: {
                        title: !!data.title,
                        location: !!data.location,
                        event_date: !!data.event_date,
                    },
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            if (data.event_date && typeof data.event_date === 'string') {
                data.event_date = new Date(data.event_date)
            }
            if (data.end_date && typeof data.end_date === 'string') {
                data.end_date = new Date(data.end_date)
            }

            if (!data.slug) {
                data.slug = generateSlug(data.title)
            }

            if (!data.status) {
                const eventDate = new Date(data.event_date)
                const now = new Date()

                if (eventDate < now) {
                    data.status = 'completed'
                }
                else {
                    data.status = 'upcoming'
                }
            }

            if (data.current_attendees === undefined) {
                data.current_attendees = 0
            }

            const dataSource = dataSourceRegistry.dataSources.postgres
            if (!dataSource?.adapter) {
                throw new Error('Database not available')
            }

            const existingEvent = await dataSource.adapter
                .select('events')
                .where('slug', data.slug)
                .first()

            if (existingEvent) {
                data.slug = `${data.slug}-${Date.now()}`
            }

            const [newEvent] = await dataSource.adapter
                .insert('events', {
                    ...data,
                    created_at: new Date(),
                    updated_at: new Date(),
                })

            return new Response(JSON.stringify({
                success: true,
                event: newEvent,
            }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        catch (error) {
            console.error('Events POST error:', error)
            return new Response(JSON.stringify({
                error: 'Failed to create event',
                details: error instanceof Error ? error.message : 'Unknown error',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    },

    // Update event
    PUT: async (req: Request) => {
        try {
            const url = new URL(req.url)
            const id = url.searchParams.get('id')

            if (!id) {
                return new Response(JSON.stringify({ error: 'Event ID required' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            const data: Partial<Event> = await req.json()

            const dataSource = dataSourceRegistry.dataSources.postgres
            if (!dataSource?.adapter) {
                throw new Error('Database not available')
            }

            // Generate slug if title changed
            if (data.title && !data.slug) {
                data.slug = generateSlug(data.title)
            }

            // Auto-update status based on event date
            if (data.event_date && !data.status) {
                const eventDate = new Date(data.event_date)
                const now = new Date()

                if (eventDate < now) {
                    data.status = 'completed'
                }
                else {
                    data.status = 'upcoming'
                }
            }

            const [updatedEvent] = await dataSource.adapter
                .update('events', {
                    ...data,
                    updated_at: new Date(),
                }, { id })

            return new Response(JSON.stringify({
                success: true,
                event: updatedEvent,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        catch (error) {
            console.error('Events PUT error:', error)
            return new Response(JSON.stringify({
                error: 'Failed to update event',
                details: error instanceof Error ? error.message : 'Unknown error',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    },

    // Delete event
    DELETE: async (req: Request) => {
        try {
            const url = new URL(req.url)
            const id = url.searchParams.get('id')

            if (!id) {
                return new Response(JSON.stringify({ error: 'Event ID required' }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            const dataSource = dataSourceRegistry.dataSources.postgres
            if (!dataSource?.adapter) {
                throw new Error('Database not available')
            }

            await dataSource.adapter.delete('events', { id })

            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        catch (error) {
            console.error('Events DELETE error:', error)
            return new Response(JSON.stringify({
                error: 'Failed to delete event',
                details: error instanceof Error ? error.message : 'Unknown error',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    },

    // Update attendee count
    PATCH: async (req: Request) => {
        try {
            const url = new URL(req.url)
            const id = url.searchParams.get('id')
            const action = url.searchParams.get('action') // 'register' or 'unregister'

            if (!id || !action) {
                return new Response(JSON.stringify({
                    error: 'Event ID and action required',
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            const dataSource = dataSourceRegistry.dataSources.postgres
            if (!dataSource?.adapter) {
                throw new Error('Database not available')
            }

            // Get current event
            const event = await dataSource.adapter
                .select('events')
                .where('id', id)
                .first()

            if (!event) {
                return new Response(JSON.stringify({ error: 'Event not found' }), {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                })
            }

            let newCount = event.current_attendees || 0

            if (action === 'register') {
                if (event.max_attendees && newCount >= event.max_attendees) {
                    return new Response(JSON.stringify({
                        error: 'Event is full',
                    }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    })
                }
                newCount += 1
            }
            else if (action === 'unregister') {
                newCount = Math.max(0, newCount - 1)
            }

            const [updatedEvent] = await dataSource.adapter
                .update('events', {
                    current_attendees: newCount,
                    updated_at: new Date(),
                }, { id })

            return new Response(JSON.stringify({
                success: true,
                event: updatedEvent,
                attendees: newCount,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        catch (error) {
            console.error('Events PATCH error:', error)
            return new Response(JSON.stringify({
                error: 'Failed to update attendee count',
                details: error instanceof Error ? error.message : 'Unknown error',
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
    },
})
