import { events } from '@base1/database'
import { desc, gte, lt } from 'drizzle-orm'
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    try {
        console.log('🎪 Fetching events...')

        // Get query parameters
        const query = getQuery(event)
        const type = query.type as string || 'all'
        const limit = Math.min(Number(query.limit) || 20, 100) // Max 100 events
        const offset = Math.max(Number(query.offset) || 0, 0)

        // Build query
        let dbQuery = db
            .select({
                id: events.id,
                title: events.title,
                slug: events.slug,
                description: events.description,
                location: events.location,
                country: events.country,
                eventDate: events.eventDate,
                endDate: events.endDate,
                registrationUrl: events.registrationUrl,
                maxAttendees: events.maxAttendees,
                currentAttendees: events.currentAttendees,
                status: events.status,
                createdAt: events.createdAt,
            })
            .from(events)

        // Filter by type
        if (type === 'upcoming') {
            dbQuery = dbQuery.where(gte(events.eventDate, new Date())) as typeof dbQuery
            console.log('🔮 Filtering for upcoming events')
        }
        else if (type === 'past') {
            dbQuery = dbQuery.where(lt(events.eventDate, new Date())) as typeof dbQuery
            console.log('📅 Filtering for past events')
        }

        // Execute query with proper ordering by event date
        const eventsList = await dbQuery
            .orderBy(desc(events.eventDate))
            .limit(limit)
            .offset(offset)

        return {
            success: true,
            data: eventsList,
            pagination: {
                limit,
                offset,
                count: eventsList.length,
                type,
            },
        }
    }
    catch (error) {
        console.error('Error fetching events:', error)

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch events',
            data: {
                error: error instanceof Error ? error.message : 'Unknown database error',
            },
        })
    }
})
