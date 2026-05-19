import { app } from '@/_server/app'
import { dataSourceRegistry } from '@/_server/data-sources/registry'

const controller = app.defineCustomController({

    getSettings: async () => {
        const dataSource = dataSourceRegistry.dataSources.postgres
        if (!dataSource?.adapter) {
            throw new Error('Database not available')
        }

        const knex = dataSource.adapter.client
        const result = await knex('settings')
            .orderBy('created_at', 'desc')
            .limit(1)

        const settings = result[0]
        if (settings) {
            return {
                id: settings.id,
                siteName: settings.site_name,
                siteDescription: settings.site_description,
                contactEmail: settings.contact_email,
                maintenanceMode: settings.maintenance_mode,
                maintenanceMessage: settings.maintenance_message,
            }
        }

        return {
            id: null,
            siteName: 'Base1',
            siteDescription: 'Market Makers. Capital Allocators On-Chain Operators',
            contactEmail: 'info@base1.io',
            maintenanceMode: false,
            maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',
        }
    },

    updateSiteInfo: async ({ siteName, siteDescription, contactEmail }: {
        siteName?: string
        siteDescription?: string
        contactEmail?: string
    }) => {
        const dataSource = dataSourceRegistry.dataSources.postgres
        if (!dataSource?.adapter) {
            throw new Error('Database not available')
        }

        const knex = dataSource.adapter.client
        const currentSettings = await knex('settings')
            .orderBy('created_at', 'desc')
            .limit(1)

        const updates: any = { updated_at: new Date() }
        if (siteName !== undefined)
            updates.site_name = siteName
        if (siteDescription !== undefined)
            updates.site_description = siteDescription
        if (contactEmail !== undefined)
            updates.contact_email = contactEmail

        if (currentSettings[0]) {
            await knex('settings')
                .where('id', currentSettings[0].id)
                .update(updates)
        }
        else {
            await knex('settings').insert({
                ...updates,
                site_name: siteName,
                site_description: siteDescription,
                contact_email: contactEmail,
                maintenance_mode: false,
                created_at: new Date(),
            })
        }

        return true
    },

    updateMaintenanceMode: async ({ maintenanceMode, maintenanceMessage }: {
        maintenanceMode?: boolean
        maintenanceMessage?: string
    }) => {
        const dataSource = dataSourceRegistry.dataSources.postgres
        if (!dataSource?.adapter) {
            throw new Error('Database not available')
        }

        const updateData: any = { updated_at: new Date() }
        if (maintenanceMode !== undefined)
            updateData.maintenance_mode = maintenanceMode
        if (maintenanceMessage !== undefined)
            updateData.maintenance_message = maintenanceMessage

        const knex = dataSource.adapter.client
        const currentSettings = await knex('settings')
            .orderBy('created_at', 'desc')
            .limit(1)

        if (currentSettings[0]) {
            await knex('settings')
                .where('id', currentSettings[0].id)
                .update(updateData)
        }

        return true
    },

    exportData: async () => {
        // Placeholder for export logic
        return true
    },
})

export default controller
export type Procedures = typeof controller.procedures
