import { events } from '@base1/database'
import { eq } from 'drizzle-orm'
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    try {
        const slug = getRouterParam(event, 'slug')

        if (!slug) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Event slug is required',
            })
        }

        const eventData = await db
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
            .where(eq(events.slug, slug))
            .limit(1)

        if (!eventData || eventData.length === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Event not found',
            })
        }

        const eventItem = eventData[0]

        return {
            success: true,
            data: eventItem,
        }
    }
    catch (error: any) {
        console.error('Error fetching event:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch event',
            data: {
                error: error instanceof Error ? error.message : 'Unknown database error',
            },
        })
    }
})
