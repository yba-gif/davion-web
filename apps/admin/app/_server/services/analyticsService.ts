import path from 'node:path'
import { analytics } from '@base1/database'
import dayjs from 'dayjs'
import { config } from 'dotenv'
import { and, count, desc, gte, lte, sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

// Load environment variables
const workspaceRoot = path.resolve(process.cwd(), '../../')
config({
    path: [
        path.join(process.cwd(), '.env'),
        path.join(workspaceRoot, '.env'),
        '/app/.env',
    ],
    override: false,
})

function getDatabaseUrl(): string {
    let dbUrl = process.env.DATABASE_URL

    if (!dbUrl) {
        const host = process.env.POSTGRES_HOST ?? 'postgres'
        const port = process.env.POSTGRES_PORT ?? '5432'
        const user = process.env.POSTGRES_USER ?? 'postgres'
        const password = process.env.POSTGRES_PASSWORD ?? 'prod_secure_password_2025'
        const database = process.env.POSTGRES_DB ?? 'base1'
        dbUrl = `postgresql://${user}:${password}@${host}:${port}/${database}`
    }

    const isNativeDev = !process.env.DOCKER_CONTAINER
        && !process.env.HOSTNAME?.includes('base1')
        && process.env.NODE_ENV !== 'production'

    // Never replace postgres with localhost in production
    if (isNativeDev && dbUrl && process.env.NODE_ENV !== 'production') {
        dbUrl = dbUrl.replace('@postgres:', '@localhost:')
    }

    return dbUrl!
}

// Initialize database connection
const pool = new Pool({ connectionString: getDatabaseUrl() })
const db = drizzle(pool)

export interface AnalyticsMetrics {
    totalPageViews: number
    totalPageViewsChange: number
    uniqueVisitors: number
    uniqueVisitorsChange: number
    verificationChecks: number
    averageSessionDuration: number
}

export interface AnalyticsGrowthData {
    date: string
    pageViews: number
    uniqueVisitors: number
}

export interface AnalyticsSourceData {
    name: string
    visitors: number
    pageViews: number
}

export interface AnalyticsDailyReport {
    date: string
    pageViews: number
    uniqueVisitors: number
    verificationChecks: number
    avgSessionDuration: number
    topPages: string[]
    bounceRate: number
}

export class AnalyticsService {
    // Get all-time metrics
    async getAllTimeMetrics(): Promise<AnalyticsMetrics> {
        console.log('🔍 AnalyticsService.getAllTimeMetrics called')

        // Get total count first
        const totalCount = await db.select({ count: count() }).from(analytics)
        console.log('📊 Total analytics records in database:', totalCount[0]?.count || 0)

        // All-time metrics
        const [allTimeMetrics] = await db
            .select({
                totalPageViews: count(),
                uniqueVisitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId})`,
                verificationChecks: sql<number>`COUNT(CASE WHEN ${analytics.eventType} = 'contact_verify' THEN 1 END)`,
                averageSessionDuration: sql<number>`COALESCE(AVG(${analytics.duration}), 0)`,
            })
            .from(analytics)

        console.log('📈 All-time metrics raw:', allTimeMetrics)

        return {
            totalPageViews: allTimeMetrics.totalPageViews,
            totalPageViewsChange: 0, // No comparison for all-time
            uniqueVisitors: allTimeMetrics.uniqueVisitors,
            uniqueVisitorsChange: 0, // No comparison for all-time
            verificationChecks: allTimeMetrics.verificationChecks,
            averageSessionDuration: Math.round(allTimeMetrics.averageSessionDuration),
        }
    }

    // Get metrics for the given period
    async getMetrics(startDate: string, endDate: string): Promise<AnalyticsMetrics> {
        console.log('🔍 AnalyticsService.getMetrics called with:', { startDate, endDate })

        const currentPeriodStart = dayjs(startDate)
        const currentPeriodEnd = dayjs(endDate)
        const previousPeriodStart = currentPeriodStart.subtract(currentPeriodEnd.diff(currentPeriodStart), 'ms')
        const previousPeriodEnd = currentPeriodStart.subtract(1, 'day')

        console.log('📅 Period ranges:', {
            current: { start: currentPeriodStart.format(), end: currentPeriodEnd.format() },
            previous: { start: previousPeriodStart.format(), end: previousPeriodEnd.format() },
        })

        // First, check if there's any data in analytics table
        const totalCount = await db.select({ count: count() }).from(analytics)
        console.log('📊 Total analytics records in database:', totalCount[0]?.count || 0)

        // Current period metrics
        const [currentMetrics] = await db
            .select({
                totalPageViews: count(),
                uniqueVisitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId})`,
                verificationChecks: sql<number>`COUNT(CASE WHEN ${analytics.eventType} = 'contact_verify' THEN 1 END)`,
                averageSessionDuration: sql<number>`COALESCE(AVG(${analytics.duration}), 0)`,
            })
            .from(analytics)
            .where(
                and(
                    gte(analytics.createdAt, currentPeriodStart.toDate()),
                    lte(analytics.createdAt, currentPeriodEnd.toDate()),
                ),
            )

        console.log('📈 Current metrics raw:', currentMetrics)

        // Previous period metrics for comparison
        const [previousMetrics] = await db
            .select({
                totalPageViews: count(),
                uniqueVisitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId})`,
            })
            .from(analytics)
            .where(
                and(
                    gte(analytics.createdAt, previousPeriodStart.toDate()),
                    lte(analytics.createdAt, previousPeriodEnd.toDate()),
                ),
            )

        const totalPageViewsChange = previousMetrics.totalPageViews > 0
            ? (currentMetrics.totalPageViews - previousMetrics.totalPageViews) / previousMetrics.totalPageViews
            : 0

        const uniqueVisitorsChange = previousMetrics.uniqueVisitors > 0
            ? (currentMetrics.uniqueVisitors - previousMetrics.uniqueVisitors) / previousMetrics.uniqueVisitors
            : 0

        return {
            totalPageViews: currentMetrics.totalPageViews,
            totalPageViewsChange: Math.round(totalPageViewsChange * 100) / 100,
            uniqueVisitors: currentMetrics.uniqueVisitors,
            uniqueVisitorsChange: Math.round(uniqueVisitorsChange * 100) / 100,
            verificationChecks: currentMetrics.verificationChecks,
            averageSessionDuration: Math.round(currentMetrics.averageSessionDuration),
        }
    }

    // Get all-time growth chart data
    async getAllTimeGrowthChartData(): Promise<AnalyticsGrowthData[]> {
        const result = await db
            .select({
                date: sql<string>`DATE(${analytics.createdAt})`,
                pageViews: count(),
                uniqueVisitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId})`,
            })
            .from(analytics)
            .groupBy(sql`DATE(${analytics.createdAt})`)
            .orderBy(desc(sql`DATE(${analytics.createdAt})`))
            .limit(90)

        return result.map((row: { date: string, pageViews: number, uniqueVisitors: number }) => ({
            date: row.date,
            pageViews: row.pageViews,
            uniqueVisitors: row.uniqueVisitors,
        }))
    }

    // Get growth chart data
    async getGrowthChartData(startDate: string, endDate: string): Promise<AnalyticsGrowthData[]> {
        const result = await db
            .select({
                date: sql<string>`DATE(${analytics.createdAt})`,
                pageViews: count(),
                uniqueVisitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId})`,
            })
            .from(analytics)
            .where(
                and(
                    gte(analytics.createdAt, dayjs(startDate).toDate()),
                    lte(analytics.createdAt, dayjs(endDate).toDate()),
                ),
            )
            .groupBy(sql`DATE(${analytics.createdAt})`)
            .orderBy(sql`DATE(${analytics.createdAt})`)

        return result.map((row: { date: string, pageViews: number, uniqueVisitors: number }) => ({
            date: row.date,
            pageViews: row.pageViews,
            uniqueVisitors: row.uniqueVisitors,
        }))
    }

    // Get all-time traffic sources data
    async getAllTimeSourceChartData(): Promise<AnalyticsSourceData[]> {
        const result = await db
            .select({
                name: sql<string>`COALESCE(${analytics.referrer}, 'Direct')`,
                visitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId})`,
                pageViews: count(),
            })
            .from(analytics)
            .groupBy(sql`COALESCE(${analytics.referrer}, 'Direct')`)
            .orderBy(desc(sql`COUNT(DISTINCT ${analytics.sessionId})`))
            .limit(10)

        return result.map((row: { name: string, visitors: number, pageViews: number }) => ({
            name: this.cleanReferrerName(row.name),
            visitors: row.visitors,
            pageViews: row.pageViews,
        }))
    }

    // Get traffic sources data
    async getSourceChartData(startDate: string, endDate: string): Promise<AnalyticsSourceData[]> {
        const result = await db
            .select({
                name: sql<string>`COALESCE(${analytics.referrer}, 'Direct')`,
                visitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId})`,
                pageViews: count(),
            })
            .from(analytics)
            .where(
                and(
                    gte(analytics.createdAt, dayjs(startDate).toDate()),
                    lte(analytics.createdAt, dayjs(endDate).toDate()),
                ),
            )
            .groupBy(sql`COALESCE(${analytics.referrer}, 'Direct')`)
            .orderBy(desc(sql`COUNT(DISTINCT ${analytics.sessionId})`))
            .limit(10)

        return result.map((row: { name: string, visitors: number, pageViews: number }) => ({
            name: this.cleanReferrerName(row.name),
            visitors: row.visitors,
            pageViews: row.pageViews,
        }))
    }

    // Get all-time daily reports data
    async getAllTimeDailyReportsData(): Promise<AnalyticsDailyReport[]> {
        const result = await db
            .select({
                date: sql<string>`DATE(${analytics.createdAt})`,
                pageViews: count(),
                uniqueVisitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId})`,
                verificationChecks: sql<number>`COUNT(CASE WHEN ${analytics.eventType} = 'contact_verify' THEN 1 END)`,
                avgSessionDuration: sql<number>`COALESCE(AVG(${analytics.duration}), 0)`,
            })
            .from(analytics)
            .groupBy(sql`DATE(${analytics.createdAt})`)
            .orderBy(desc(sql`DATE(${analytics.createdAt})`))
            .limit(30)

        // Get top page for each date separately
        const topPagesQuery = await db
            .select({
                date: sql<string>`DATE(${analytics.createdAt})`,
                topPage: analytics.pagePath,
                count: count(),
            })
            .from(analytics)
            .groupBy(sql`DATE(${analytics.createdAt})`, analytics.pagePath)
            .orderBy(desc(count()))
            .limit(500)

        // Group top pages by date
        const topPagesByDate: Record<string, string> = {}
        topPagesQuery.forEach((row: { date: string, topPage: string | null, count: number }) => {
            if (!topPagesByDate[row.date]) {
                topPagesByDate[row.date] = row.topPage || '/'
            }
        })

        return result.map((row: {
            date: string
            pageViews: number
            uniqueVisitors: number
            verificationChecks: number
            avgSessionDuration: number
        }) => ({
            date: row.date,
            pageViews: row.pageViews,
            uniqueVisitors: row.uniqueVisitors,
            verificationChecks: row.verificationChecks,
            avgSessionDuration: Math.round(row.avgSessionDuration),
            topPages: [topPagesByDate[row.date] || '/'],
            bounceRate: this.calculateBounceRate(row.uniqueVisitors, row.pageViews), // Real calculation
        }))
    }

    // Get daily reports data
    async getDailyReportsData(startDate: string, endDate: string): Promise<AnalyticsDailyReport[]> {
        const result = await db
            .select({
                date: sql<string>`DATE(${analytics.createdAt})`,
                pageViews: count(),
                uniqueVisitors: sql<number>`COUNT(DISTINCT ${analytics.sessionId})`,
                verificationChecks: sql<number>`COUNT(CASE WHEN ${analytics.eventType} = 'contact_verify' THEN 1 END)`,
                avgSessionDuration: sql<number>`COALESCE(AVG(${analytics.duration}), 0)`,
            })
            .from(analytics)
            .where(
                and(
                    gte(analytics.createdAt, dayjs(startDate).toDate()),
                    lte(analytics.createdAt, dayjs(endDate).toDate()),
                ),
            )
            .groupBy(sql`DATE(${analytics.createdAt})`)
            .orderBy(desc(sql`DATE(${analytics.createdAt})`))

        // Get top page for each date separately
        const topPagesQuery = await db
            .select({
                date: sql<string>`DATE(${analytics.createdAt})`,
                topPage: analytics.pagePath,
                count: count(),
            })
            .from(analytics)
            .where(
                and(
                    gte(analytics.createdAt, dayjs(startDate).toDate()),
                    lte(analytics.createdAt, dayjs(endDate).toDate()),
                ),
            )
            .groupBy(sql`DATE(${analytics.createdAt})`, analytics.pagePath)
            .orderBy(desc(count()))
            .limit(200)

        // Group top pages by date
        const topPagesByDate: Record<string, string> = {}
        topPagesQuery.forEach((row: { date: string, topPage: string | null, count: number }) => {
            if (!topPagesByDate[row.date]) {
                topPagesByDate[row.date] = row.topPage || '/'
            }
        })

        return result.map((row: {
            date: string
            pageViews: number
            uniqueVisitors: number
            verificationChecks: number
            avgSessionDuration: number
        }) => ({
            date: row.date,
            pageViews: row.pageViews,
            uniqueVisitors: row.uniqueVisitors,
            verificationChecks: row.verificationChecks,
            avgSessionDuration: Math.round(row.avgSessionDuration),
            topPages: [topPagesByDate[row.date] || '/'],
            bounceRate: this.calculateBounceRate(row.uniqueVisitors, row.pageViews), // Real calculation
        }))
    }

    // Track analytics event
    async trackEvent(eventData: {
        eventType: string
        userId?: string
        sessionId: string
        pagePath?: string
        referrer?: string
        userAgent?: string
        ipAddress?: string
        country?: string
        city?: string
        deviceType?: string
        browser?: string
        os?: string
        duration?: number
        metadata?: any
    }) {
        await db.insert(analytics).values({
            ...eventData,
            metadata: eventData.metadata ? JSON.stringify(eventData.metadata) : null,
        })
    }

    private calculateBounceRate(uniqueVisitors: number, pageViews: number): number {
        if (pageViews === 0)
            return 0
        // Bounce rate = sessions with only 1 page view / total sessions
        // Approximation: if pageViews/uniqueVisitors is close to 1, high bounce rate
        const pagesPerSession = pageViews / uniqueVisitors
        const bounceRate = Math.max(0, Math.min(1, 2 - pagesPerSession))
        return Math.round(bounceRate * 100) / 100
    }

    private cleanReferrerName(referrer: string): string {
        if (!referrer || referrer === 'Direct')
            return 'Direct'

        try {
            const url = new URL(referrer)
            const hostname = url.hostname.toLowerCase()

            if (hostname.includes('google'))
                return 'Google'
            if (hostname.includes('twitter') || hostname.includes('t.co'))
                return 'Twitter'
            if (hostname.includes('linkedin'))
                return 'LinkedIn'
            if (hostname.includes('facebook'))
                return 'Facebook'
            if (hostname.includes('instagram'))
                return 'Instagram'
            if (hostname.includes('youtube'))
                return 'YouTube'
            if (hostname.includes('telegram'))
                return 'Telegram'

            return hostname.replace('www.', '')
        }
        catch {
            return referrer
        }
    }
}

export const analyticsService = new AnalyticsService()
