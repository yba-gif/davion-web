import type { Ref } from 'vue'

export interface Event {
    id: string
    title: string
    slug: string
    description: string | null
    location: string | null
    country: string | null
    eventDate: string
    endDate: string | null
    registrationUrl: string | null
    maxAttendees: number | null
    currentAttendees: number | null
    status: 'upcoming' | 'live' | 'completed' | 'cancelled'
    createdAt: string
}

export interface EventsResponse {
    success: boolean
    data: Event[]
    pagination: {
        limit: number
        offset: number
        count: number
        type: string
    }
}

export function useEvents() {
    const events: Ref<Event[]> = ref([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchEvents = async (options: {
        type?: 'all' | 'upcoming' | 'past'
        limit?: number
        offset?: number
    } = {}) => {
        try {
            loading.value = true
            error.value = null

            const { type = 'all', limit = 20, offset = 0 } = options

            const { data } = await $fetch<EventsResponse>('/api/events', {
                query: {
                    type,
                    limit,
                    offset,
                },
            })

            events.value = data
        }
        catch (err) {
            console.error('Error fetching events:', err)
            error.value = err instanceof Error ? err.message : 'Failed to fetch events'
        }
        finally {
            loading.value = false
        }
    }

    const getUpcomingEvents = async (limit = 6) => {
        await fetchEvents({ type: 'upcoming', limit })
        return events.value
    }

    const getPastEvents = async (limit = 6) => {
        await fetchEvents({ type: 'past', limit })
        return events.value
    }

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    const calculateDaysLeft = (eventDate: string) => {
        const now = new Date()
        const event = new Date(eventDate)
        const diffTime = event.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays < 0)
            return null
        if (diffDays === 0)
            return 'Today'
        if (diffDays === 1)
            return 'Tomorrow'
        return `${diffDays} days left`
    }

    const getEventStatus = (eventDate: string, endDate?: string | null): 'upcoming' | 'past' => {
        const now = new Date()
        const start = new Date(eventDate)
        const end = endDate ? new Date(endDate) : start

        if (now < start)
            return 'upcoming'
        if (now > end)
            return 'past'
        return 'upcoming' // Live events treated as upcoming for display purposes
    }

    return {
        events: readonly(events),
        loading: readonly(loading),
        error: readonly(error),
        fetchEvents,
        getUpcomingEvents,
        getPastEvents,
        formatEventDate,
        calculateDaysLeft,
        getEventStatus,
    }
}
