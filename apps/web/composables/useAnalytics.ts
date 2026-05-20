import { v4 as uuidv4 } from 'uuid'

interface TrackEventParams {
    eventType: string
    pagePath?: string
    metadata?: any
    duration?: number
}

export function useAnalytics() {
    // Get or create session ID
    const getSessionId = (): string => {
        if (process.client) {
            let sessionId = sessionStorage.getItem('analytics_session_id')
            if (!sessionId) {
                sessionId = uuidv4()
                sessionStorage.setItem('analytics_session_id', sessionId || '')
            }
            return sessionId || ''
        }
        return uuidv4()
    }

    // Get device info
    const getDeviceInfo = () => {
        if (!process.client)
            return {}

        const userAgent = navigator.userAgent
        let deviceType = 'desktop'
        let browser = 'unknown'
        let os = 'unknown'

        // Device type detection
        if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
            if (/iPad/.test(userAgent)) {
                deviceType = 'tablet'
            }
            else {
                deviceType = 'mobile'
            }
        }

        // Browser detection
        if (userAgent.includes('Chrome'))
            browser = 'Chrome'
        else if (userAgent.includes('Firefox'))
            browser = 'Firefox'
        else if (userAgent.includes('Safari'))
            browser = 'Safari'
        else if (userAgent.includes('Edge'))
            browser = 'Edge'

        // OS detection
        if (userAgent.includes('Windows'))
            os = 'Windows'
        else if (userAgent.includes('Mac'))
            os = 'macOS'
        else if (userAgent.includes('Linux'))
            os = 'Linux'
        else if (userAgent.includes('Android'))
            os = 'Android'
        else if (userAgent.includes('iOS'))
            os = 'iOS'

        return { deviceType, browser, os, userAgent }
    }

    // Track analytics event
    const trackEvent = async (params: TrackEventParams) => {
        if (!process.client)
            return

        // P3.5: respect cookie consent. Only track if the user has explicitly
        // opted in via the consent banner. Strictly-necessary mode = no events.
        try {
            const consent = window.localStorage.getItem('davion_cookie_consent')
            if (consent !== 'accept') return
        }
        catch {
            // localStorage unavailable (private mode, etc.) — default to no tracking.
            return
        }

        try {
            const sessionId = getSessionId()
            const deviceInfo = getDeviceInfo()
            const currentRoute = useRoute()

            const eventData = {
                eventType: params.eventType,
                sessionId,
                pagePath: params.pagePath || currentRoute.fullPath,
                referrer: document.referrer || undefined,
                duration: params.duration,
                metadata: params.metadata,
                ...deviceInfo,
            }

            await $fetch('/api/analytics/track', {
                method: 'POST',
                body: eventData,
            })
        }
        catch (error) {
            console.error('Analytics tracking error:', error)
        }
    }

    // Track page view
    const trackPageView = (pagePath?: string, duration?: number) => {
        trackEvent({
            eventType: 'page_view',
            pagePath,
            duration,
        })
    }

    // Track user signup
    const trackUserSignup = (metadata?: any) => {
        trackEvent({
            eventType: 'user_signup',
            metadata,
        })
    }

    // Track contact verification
    const trackContactVerification = (isVerified: boolean, searchQuery: string) => {
        trackEvent({
            eventType: 'contact_verify',
            metadata: {
                isVerified,
                searchQuery,
            },
        })
    }

    // Track blog read
    const trackBlogRead = (blogId: string, blogTitle: string, duration?: number) => {
        trackEvent({
            eventType: 'blog_read',
            duration,
            metadata: {
                blogId,
                blogTitle,
            },
        })
    }

    // Track event view
    const trackEventView = (eventId: string, eventTitle: string) => {
        trackEvent({
            eventType: 'event_view',
            metadata: {
                eventId,
                eventTitle,
            },
        })
    }

    return {
        trackEvent,
        trackPageView,
        trackUserSignup,
        trackContactVerification,
        trackBlogRead,
        trackEventView,
    }
}
