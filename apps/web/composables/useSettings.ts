export interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  maintenanceMode: boolean
  maintenanceMessage: string
}

export const useSettings = () => {
  const settings = ref<SiteSettings | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchSettings = async () => {
    try {
      loading.value = true
      const data = await $fetch<SiteSettings>('/api/settings')
      settings.value = data
      error.value = null
    } catch (err) {
      console.error('Error fetching settings:', err)
      error.value = 'Failed to fetch settings'
      // Fallback to default settings
      settings.value = {
        siteName: 'Base1',
        siteDescription: 'Market Makers. Capital Allocators On-Chain Operators',
        contactEmail: 'info@base1.io',
        maintenanceMode: false,
        maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',
      }
    } finally {
      loading.value = false
    }
  }

  // Auto-fetch on composable creation
  onMounted(() => {
    fetchSettings()
  })

  return {
    settings: readonly(settings),
    loading: readonly(loading),
    error: readonly(error),
    fetchSettings,
  }
}