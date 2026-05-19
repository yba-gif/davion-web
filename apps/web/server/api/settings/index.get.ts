import { settings } from '@base1/database'
import { desc } from 'drizzle-orm'
import { db } from '~/server/utils/db'

export default defineEventHandler(async () => {
    try {
    // Get the latest settings from database
        const result = await db
            .select()
            .from(settings)
            .orderBy(desc(settings.createdAt))
            .limit(1)

        // Return first settings record or default values
        const siteSettings = result[0] || {
            siteName: 'Base1',
            siteDescription: 'Market Makers. Capital Allocators On-Chain Operators',
            contactEmail: 'info@base1.io',
            maintenanceMode: false,
            maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',
        }

        return siteSettings
    }
    catch (error) {
        console.error('Error fetching settings:', error)
        // Return default settings if database fails
        return {
            siteName: 'Base1',
            siteDescription: 'Market Makers. Capital Allocators On-Chain Operators',
            contactEmail: 'info@base1.io',
            maintenanceMode: false,
            maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',
        }
    }
})
