interface ValidationRule {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    min?: number
    max?: number
    type?: 'string' | 'number' | 'email' | 'url' | 'boolean' | 'array' | 'object'
    custom?: (value: any) => string | null
}

interface ValidationSchema {
    [key: string]: ValidationRule
}

interface ValidationResult {
    isValid: boolean
    errors: Record<string, string[]>
}

class Validator {
    private readonly EMAIL_PATTERN = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    private readonly URL_PATTERN = /^https?:\/\/.+/

    validate(data: Record<string, any>, schema: ValidationSchema): ValidationResult {
        const errors: Record<string, string[]> = {}

        for (const [field, rule] of Object.entries(schema)) {
            const value = data[field]
            const fieldErrors: string[] = []

            // Required validation
            if (rule.required && (value === undefined || value === null || value === '')) {
                fieldErrors.push(`${field} is required`)
                continue
            }

            // Skip other validations if field is not required and empty
            if (!rule.required && (value === undefined || value === null || value === '')) {
                continue
            }

            // Type validation
            if (rule.type) {
                const typeError = this.validateType(value, rule.type, field)
                if (typeError) {
                    fieldErrors.push(typeError)
                    continue
                }
            }

            // String validations
            if (typeof value === 'string') {
                if (rule.minLength && value.length < rule.minLength) {
                    fieldErrors.push(`${field} must be at least ${rule.minLength} characters long`)
                }

                if (rule.maxLength && value.length > rule.maxLength) {
                    fieldErrors.push(`${field} must be at most ${rule.maxLength} characters long`)
                }

                if (rule.pattern && !rule.pattern.test(value)) {
                    fieldErrors.push(`${field} has invalid format`)
                }
            }

            // Number validations
            if (typeof value === 'number') {
                if (rule.min !== undefined && value < rule.min) {
                    fieldErrors.push(`${field} must be at least ${rule.min}`)
                }

                if (rule.max !== undefined && value > rule.max) {
                    fieldErrors.push(`${field} must be at most ${rule.max}`)
                }
            }

            // Custom validation
            if (rule.custom) {
                const customError = rule.custom(value)
                if (customError) {
                    fieldErrors.push(customError)
                }
            }

            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        }
    }

    private validateType(value: any, type: string, field: string): string | null {
        switch (type) {
            case 'string':
                if (typeof value !== 'string') {
                    return `${field} must be a string`
                }
                break

            case 'number':
                if (typeof value !== 'number' || Number.isNaN(value)) {
                    return `${field} must be a valid number`
                }
                break

            case 'email':
                if (typeof value !== 'string' || !this.EMAIL_PATTERN.test(value)) {
                    return `${field} must be a valid email address`
                }
                break

            case 'url':
                if (typeof value !== 'string' || !this.URL_PATTERN.test(value)) {
                    return `${field} must be a valid URL`
                }
                break

            case 'boolean':
                if (typeof value !== 'boolean') {
                    return `${field} must be a boolean`
                }
                break

            case 'array':
                if (!Array.isArray(value)) {
                    return `${field} must be an array`
                }
                break

            case 'object':
                if (typeof value !== 'object' || value === null || Array.isArray(value)) {
                    return `${field} must be an object`
                }
                break

            default:
                return `Unknown validation type: ${type}`
        }

        return null
    }

    // Predefined validation schemas
    static schemas = {
        blogPost: {
            title: {
                required: true,
                type: 'string' as const,
                minLength: 3,
                maxLength: 200,
            },
            slug: {
                required: true,
                type: 'string' as const,
                pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                maxLength: 200,
            },
            content: {
                required: true,
                type: 'string' as const,
                minLength: 10,
            },
            excerpt: {
                type: 'string' as const,
                maxLength: 500,
            },
            author: {
                required: true,
                type: 'string' as const,
                minLength: 2,
                maxLength: 100,
            },
            published: {
                type: 'boolean' as const,
            },
            featuredImage: {
                type: 'string' as const,
                pattern: /^https?:\/\/.+/,
            },
        },

        event: {
            title: {
                required: true,
                type: 'string' as const,
                minLength: 3,
                maxLength: 200,
            },
            description: {
                type: 'string' as const,
                maxLength: 2000,
            },
            location: {
                required: true,
                type: 'string' as const,
                minLength: 2,
                maxLength: 200,
            },
            eventDate: {
                required: true,
                custom: (value: any) => {
                    const date = new Date(value)
                    if (Number.isNaN(date.getTime())) {
                        return 'eventDate must be a valid date'
                    }
                    if (date < new Date()) {
                        return 'eventDate cannot be in the past'
                    }
                    return null
                },
            },
            maxAttendees: {
                type: 'number' as const,
                min: 1,
                max: 10000,
            },
            registrationUrl: {
                type: 'url' as const,
            },
        },

        fileUpload: {
            file: {
                required: true,
                custom: (value: any) => {
                    if (!value || typeof value !== 'object') {
                        return 'file is required'
                    }
                    if (!value.name || !value.type || !value.size) {
                        return 'file must have name, type, and size properties'
                    }
                    return null
                },
            },
            folder: {
                type: 'string' as const,
                pattern: /^[a-z0-9-_/]+$/,
                maxLength: 100,
            },
        },

        userSettings: {
            siteName: {
                required: true,
                type: 'string' as const,
                minLength: 1,
                maxLength: 100,
            },
            siteDescription: {
                type: 'string' as const,
                maxLength: 500,
            },
            contactEmail: {
                type: 'email' as const,
            },
            maintenanceMode: {
                type: 'boolean' as const,
            },
        },

        verifiedTeam: {
            telegram: {
                required: true,
                type: 'string' as const,
                pattern: /^@?\w{5,32}$/,
            },
            twitter: {
                type: 'string' as const,
                pattern: /^@?\w{1,15}$/,
            },
            email: {
                required: true,
                type: 'email' as const,
            },
            website: {
                type: 'url' as const,
            },
        },
    }

    // Utility methods for common validations
    static isValidSlug(slug: string): boolean {
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
    }

    static isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)
    }

    static isValidUrl(url: string): boolean {
        return /^https?:\/\/.+/.test(url)
    }

    static sanitizeSlug(input: string): string {
        return input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
    }

    static sanitizeFilename(filename: string): string {
        return filename
            .replace(/[^a-z0-9.-]/gi, '_')
            .replace(/_{2,}/g, '_')
            .replace(/^_|_$/g, '')
    }

    // File validation helpers
    static validateFileType(file: { type: string }, allowedTypes: string[]): string | null {
        if (!allowedTypes.includes(file.type)) {
            return `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
        }
        return null
    }

    static validateFileSize(file: { size: number }, maxSize: number): string | null {
        if (file.size > maxSize) {
            return `File size ${file.size} bytes exceeds maximum allowed size of ${maxSize} bytes`
        }
        return null
    }

    // Security validation helpers
    static containsSqlInjection(input: string): boolean {
        const sqlPatterns = [
            /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
            /(--|\/\*|\*\/|[;'"])/g,
            /(\b(OR|AND)\b.*[=<>])/gi,
        ]

        return sqlPatterns.some(pattern => pattern.test(input))
    }

    static containsXss(input: string): boolean {
        const xssPatterns = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
        ]

        return xssPatterns.some(pattern => pattern.test(input))
    }
}

// Export singleton instance
export const validator = new Validator()

// Export class for custom instances
export { Validator }
export type { ValidationResult, ValidationRule, ValidationSchema }

// Convenience function for common validation
export function validateData(data: Record<string, any>, schema: ValidationSchema): ValidationResult {
    return validator.validate(data, schema)
}

// Convenience function for throwing validation errors
export function assertValid(data: Record<string, any>, schema: ValidationSchema): void {
    const result = validator.validate(data, schema)
    if (!result.isValid) {
        const errorMessages = Object.entries(result.errors)
            .flatMap(([_field, errors]) => errors)
            .join(', ')
        throw new Error(`Validation failed: ${errorMessages}`)
    }
}
