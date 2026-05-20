import { analytics } from '@base1/database'
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        const clientIP = getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || getHeader(event, 'cf-connecting-ip') || 'unknown'
        const userAgent = getHeader(event, 'user-agent') || 'unknown'

        // country is VARCHAR(2) (ISO 3166-1 alpha-2). Writing 'unknown' (7 chars)
        // overflows and 500s every page view. Use null when no header is present.
        const country = getHeader(event, 'cf-ipcountry') || null
        const city = null

        await db.insert(analytics).values({
            eventType: body.eventType,
            userId: body.userId,
            sessionId: body.sessionId,
            pagePath: body.pagePath,
            referrer: body.referrer,
            userAgent,
            ipAddress: clientIP,
            country,
            city,
            deviceType: body.deviceType,
            browser: body.browser,
            os: body.os,
            duration: body.duration,
            metadata: body.metadata ? JSON.stringify(body.metadata) : null,
        })

        return { success: true }
    }
    catch (error) {
        console.error('Analytics tracking error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to track analytics event',
        })
    }
})
