import { resolve } from 'node:path'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

// Load environment variables
config({ path: resolve(__dirname, '../../../.env') })

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
    console.error('DATABASE_URL environment variable is required')
    process.exit(1)
}

console.log('Starting database migration...')
console.log('Database URL:', connectionString.replace(/:[^:]*@/, ':***@'))

const pool = new Pool({
    connectionString,
    // Add connection timeout and retry logic
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 2, // Limit concurrent connections during migration
})

const db = drizzle({ client: pool })

async function main() {
    try {
        console.log('Running migrations...')
        await migrate(db, { migrationsFolder: './drizzle' })
        console.log('Migration completed successfully!')
    }
    catch (error) {
        console.error('Migration failed:', error)
        throw error
    }
    finally {
        await pool.end()
    }
}

main().catch((err) => {
    console.error('Migration process failed:', err)
    process.exit(1)
})
