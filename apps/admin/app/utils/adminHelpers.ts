/**
 * Auto-generate URL slug from title
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-|-$/g, '')
}

/**
 * Calculate reading time based on content length
 */
export function calculateReadTime(content: string, wordsPerMinute: number = 200): string {
    const wordCount = content.trim().split(/\s+/).length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
}

/**
 * Generate excerpt from markdown content
 */
export function generateExcerpt(content: string, maxLength: number = 150): string {
    // Remove markdown syntax
    let plainText = content
        .replace(/#{1,6}\s+/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/^\s*[-*+]\s+/gm, '') // Remove bullet points
        .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
        .replace(/^\s*>\s+/gm, '') // Remove blockquotes
        .replace(/\n\s*\n/g, ' ') // Replace multiple newlines with space
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim()

    if (plainText.length <= maxLength)
        return plainText

    // Find the best cut-off point that doesn't exceed maxLength
    let cutOffPoint = maxLength
    const lastSpace = plainText.lastIndexOf(' ', maxLength)
    const lastSentence = plainText.lastIndexOf('.', maxLength)
    
    // Try to end at a sentence if it's not too far back
    if (lastSentence > maxLength - 50 && lastSentence < maxLength) {
        return plainText.substring(0, lastSentence + 1)
    }
    
    // Otherwise end at a word boundary, but ensure we don't exceed maxLength
    if (lastSpace > 0 && lastSpace < maxLength) {
        return `${plainText.substring(0, lastSpace)}...`
    }
    
    // Last resort: hard cut at maxLength - 3 to make room for "..."
    return `${plainText.substring(0, maxLength - 3)}...`
}

/**
 * Calculate event status based on dates
 */
export function calculateEventStatus(eventDate: string, endDate?: string): string {
    const now = new Date()
    const startDate = new Date(eventDate)
    const finishDate = endDate ? new Date(endDate) : startDate

    if (now < startDate)
        return 'upcoming'
    if (now > finishDate)
        return 'completed'
    return 'ongoing'
}

/**
 * Format date for datetime-local input
 */
export function formatDateForInput(date?: Date): string {
    if (!date)
        return ''
    const d = new Date(date)
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    return d.toISOString().slice(0, 16)
}

/**
 * Auto-capitalize first letter of each word
 */
export function capitalizeWords(text: string): string {
    return text.replace(/\b\w/g, char => char.toUpperCase())
}

/**
 * Clean and format phone number
 */
export function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
    try {
        void new URL(url)
        return true
    }
    catch {
        return false
    }
}

/**
 * Generate random hex color
 */
export function generateRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0)
        return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}
