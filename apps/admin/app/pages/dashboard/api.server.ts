import { app } from '@/_server/app'
import { analyticsService } from '@/_server/services/analyticsService'

/**
 * Custom server procedures for your page
 *
 * These functions run on the server and can be called from your React components
 * using callProcedure('procedureName', input)
 *
 * Learn more: https://kottster.app/docs/custom-pages/api
 */

const controller = app.defineCustomController({
    getMetrics: async () => {
        try {
            console.log('🔍 Fetching analytics metrics for all time')
            const realData = await analyticsService.getAllTimeMetrics()
            console.log('📊 Analytics real data:', realData)

            return {
                totalRevenue: realData.totalPageViews * 2.5,
                totalRevenueChange: realData.totalPageViewsChange,
                newUsers: realData.uniqueVisitors,
                newUsersChange: realData.uniqueVisitorsChange,
                growthRate: realData.uniqueVisitorsChange,
                purchasedItems: realData.verificationChecks,
            }
        }
        catch (error) {
            console.error('Analytics service error:', error)
            return {
                totalRevenue: 0,
                totalRevenueChange: 0,
                newUsers: 0,
                newUsersChange: 0,
                growthRate: 0,
                purchasedItems: 0,
            }
        }
    },
    getGrowthChartData: async () => {
        try {
            const realData = await analyticsService.getAllTimeGrowthChartData()

            return realData.map(item => ({
                date: item.date,
                users: item.uniqueVisitors,
                purchasedItems: Math.round(item.pageViews * 0.1),
            }))
        }
        catch (error) {
            console.error('Analytics service error:', error)
            return []
        }
    },
    getSourceChartData: async () => {
        try {
            const realData = await analyticsService.getAllTimeSourceChartData()

            return realData.map(item => ({
                name: item.name,
                visitors: item.visitors,
                newUsers: Math.round(item.visitors * 0.3),
            }))
        }
        catch (error) {
            console.error('Analytics service error:', error)
            return []
        }
    },
    getDailyReportsData: async () => {
        try {
            const realData = await analyticsService.getAllTimeDailyReportsData()

            return realData.map(item => ({
                date: item.date,
                newUsers: item.uniqueVisitors,
                conversionRate: item.bounceRate,
                visitors: item.pageViews,
            }))
        }
        catch (error) {
            console.error('Analytics service error:', error)
            return []
        }
    },
})

export default controller
export type Procedures = typeof controller.procedures
