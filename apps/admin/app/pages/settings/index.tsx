import type { Procedures } from './api.server'
import { Page, useCallProcedure } from '@kottster/react'
import { Card, Input, Stack, Switch, Text, Textarea } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { SettingsBlock } from './ui/settingsBlock'

export interface Settings {
    id?: string | null
    // Site Configuration
    siteName: string
    siteDescription: string
    contactEmail: string

    // Maintenance
    maintenanceMode: boolean
    maintenanceMessage: string
}

export default () => {
    const callProcedure = useCallProcedure<Procedures>()
    const [settings, setSettings] = useState<Settings>()
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({})

    const fetchSettings = async () => {
        try {
            const data = await callProcedure('getSettings', {})
            setSettings(data)
        }
        catch (error) {
            console.error('Error fetching settings:', error)
        }
    }

    const showSuccessNotification = (message: string) => {
        notifications.show({
            title: 'Success',
            message,
            color: 'green',
        })
    }

    const updateSiteInfo = async (field: string, value: string) => {
        setLoading(prev => ({ ...prev, [field]: true }))
        try {
            await callProcedure('updateSiteInfo', { [field]: value })
            showSuccessNotification('Site information updated successfully')
            fetchSettings()
        }
        catch (error) {
            console.error('Error updating site info:', error)
        }
        finally {
            setLoading(prev => ({ ...prev, [field]: false }))
        }
    }

    const updateMaintenanceMode = async (maintenanceMode: boolean) => {
        setLoading(prev => ({ ...prev, maintenance: true }))
        try {
            await callProcedure('updateMaintenanceMode', { maintenanceMode })
            showSuccessNotification(`Maintenance mode ${maintenanceMode ? 'enabled' : 'disabled'}`)
            fetchSettings()
        }
        catch (error) {
            console.error('Error updating maintenance mode:', error)
        }
        finally {
            setLoading(prev => ({ ...prev, maintenance: false }))
        }
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    if (!settings) {
        return <Page maxContentWidth={800}><Text>Loading...</Text></Page>
    }

    return (
        <Page maxContentWidth={800}>
            <Stack gap="lg">
                <Card withBorder radius="md" p="md">
                    <Stack gap="md">
                        <SettingsBlock title="Site Name" description="The name of your website">
                            <Input
                                defaultValue={settings.siteName}
                                disabled={loading.siteName}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.value !== settings.siteName && updateSiteInfo('siteName', e.target.value)}
                                placeholder="Base1"
                            />
                        </SettingsBlock>

                        <SettingsBlock title="Site Description" description="Brief description of your website">
                            <Textarea
                                disabled={loading.siteDescription}
                                defaultValue={settings.siteDescription}
                                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => e.target.value !== settings.siteDescription && updateSiteInfo('siteDescription', e.target.value)}
                                placeholder="Market Makers. Capital Allocators On-Chain Operators"
                                rows={3}
                            />
                        </SettingsBlock>

                        <SettingsBlock title="Contact Email" description="Main contact email address">
                            <Input
                                type="email"
                                disabled={loading.contactEmail}
                                defaultValue={settings.contactEmail}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.target.value !== settings.contactEmail && updateSiteInfo('contactEmail', e.target.value)}
                                placeholder="info@base1.io"
                            />
                        </SettingsBlock>
                    </Stack>
                </Card>

                {/* Maintenance Mode */}
                <Card withBorder radius="md" p="md">
                    <SettingsBlock
                        title="Maintenance Mode"
                        description="Enable maintenance mode to temporarily disable public access"
                    >
                        <Switch
                            checked={settings.maintenanceMode}
                            disabled={loading.maintenance}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateMaintenanceMode(event.currentTarget.checked)}
                            label="Enable maintenance mode"
                            color={settings.maintenanceMode ? 'red' : 'blue'}
                        />
                    </SettingsBlock>
                </Card>
            </Stack>
        </Page>
    )
}
