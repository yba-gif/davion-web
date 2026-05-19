import { createDatabase } from '@base1/database'

const config = useRuntimeConfig()

function getDatabaseUrl(): string {
    const envUrl = config.databaseUrl

    let dbUrl = envUrl || process.env.DATABASE_URL || 'postgresql://postgres:prod_secure_password_2025@postgres:5432/base1'

    const isInContainer = process.env.HOSTNAME?.includes('base1')
        || process.env.DOCKER_CONTAINER === 'true'

    if (!isInContainer && (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV)) {
        dbUrl = dbUrl.replace('@postgres:', '@localhost:')
    }

    return dbUrl
}

export const db = createDatabase(getDatabaseUrl())
