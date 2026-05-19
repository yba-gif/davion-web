import { DataSourceType } from '@kottster/common'
import { createDataSource, KnexPgAdapter } from '@kottster/server'
import knex from 'knex'
import { getDatabaseConfig, getEnvironmentInfo } from '../utils/config'
import { logger } from '../utils/logger'

function createKnexInstance(): knex.Knex {
    const dbConfig = getDatabaseConfig()
    const envInfo = getEnvironmentInfo()

    // Build connection URL
    const dbUrl = process.env.DATABASE_URL
        || `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`

    console.log('🔧 Database Endpoint Detection:', envInfo)

    logger.info('Initializing PostgreSQL connection', {
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        user: dbConfig.user,
        ssl: !!dbConfig.ssl,
        poolMin: dbConfig.pool.min,
        poolMax: dbConfig.pool.max,
    })

    const knexInstance = knex({
        client: 'pg',
        connection: dbUrl,
        pool: {
            ...dbConfig.pool,
            // Add connection validation
            afterCreate: (conn: any, cb: any) => {
                conn.query('SELECT 1 as test', (err: any) => {
                    cb(err, conn)
                })
            },
            // Add proper error handling
            propagateCreateError: false,
        },
        acquireConnectionTimeout: dbConfig.pool.acquireTimeoutMillis,
        debug: process.env.NODE_ENV === 'development' && process.env.DB_DEBUG === 'true',
        postProcessResponse: (result: any, queryContext: any) => {
            // Add query timeout for long-running schema queries
            if (queryContext && queryContext.timeout) {
                return result
            }
            return result
        },
        wrapIdentifier: (value: string, origImpl: any) => {
            return origImpl(value)
        },
    })

    // Add connection management event listeners
    knexInstance.on('query', (query) => {
        if (process.env.NODE_ENV === 'development') {
            const startTime = Date.now()
            logger.debug('Database Query', {
                sql: query.sql,
                bindings: query.bindings,
            })

            query.response = (response: any) => {
                const duration = Date.now() - startTime
                logger.database('SELECT', 'unknown', duration, Array.isArray(response) ? response.length : 1)
            }
        }
    })

    knexInstance.on('query-error', (error, query) => {
        logger.error('Database Query Error', {
            sql: query.sql,
            bindings: query.bindings,
            error: error.message,
        }, error)
    })

    // Add connection pool monitoring
    setInterval(() => {
        const pool = (knexInstance as any).client?.pool
        if (pool) {
            const poolInfo = {
                used: pool.numUsed(),
                free: pool.numFree(),
                pending: pool.numPendingAcquires(),
                min: pool.min,
                max: pool.max,
            }

            // Log only if there are issues
            if (poolInfo.pending > 0 || poolInfo.used > poolInfo.max * 0.8) {
                console.log('🔍 Connection Pool Status:', poolInfo)
            }
        }
    }, 10000) // Check every 10 seconds

    // Add connection cleanup on process termination
    const cleanup = () => {
        console.log('📤 Closing database connections...')
        knexInstance.destroy().catch(console.error)
    }

    process.on('SIGTERM', cleanup)
    process.on('SIGINT', cleanup)
    process.on('exit', cleanup)

    return knexInstance
}

export const postgres = createDataSource({
    type: DataSourceType.postgres,
    name: 'postgres',
    init: () => {
        const knexInstance = createKnexInstance()
        return new KnexPgAdapter(knexInstance)
    },
    tablesConfig: {
        blog_posts: {
            displayName: 'Blog Posts',
            columns: {
                id: { visible: false },
                title: { displayName: 'Title', required: true },
                slug: { displayName: 'Slug', required: true, readonly: true },
                excerpt: {
                    displayName: 'Excerpt',
                    type: 'textarea',
                },
                content: {
                    displayName: 'Content',
                    required: true,
                    type: 'richtext',
                },
                author: { displayName: 'Author', required: true },
                read_time: { displayName: 'Read Time' },
                published: {
                    displayName: 'Published',
                    type: 'boolean',
                },
                featured_image: { displayName: 'Featured Image' },
                published_at: {
                    displayName: 'Published At',
                    type: 'datetime-local',
                },
                created_at: { displayName: 'Created At', visible: false },
                updated_at: { displayName: 'Updated At', visible: false },
            },
        },
        events: {
            displayName: 'Events',
            columns: {
                id: { visible: false },
                title: { displayName: 'Title', required: true },
                slug: { displayName: 'Slug', required: true, readonly: true },
                description: {
                    displayName: 'Description',
                    type: 'richtext',
                },
                location: { displayName: 'Location', required: true },
                country: { displayName: 'Country' },
                event_date: {
                    displayName: 'Start Date & Time',
                    required: false,
                    type: 'datetime-local',
                    visible: true,
                    hiddenInForm: false,
                },
                end_date: {
                    displayName: 'End Date & Time',
                    type: 'datetime-local',
                    visible: true,
                    hiddenInForm: false,
                },
                max_attendees: {
                    displayName: 'Max Attendees',
                    type: 'integer',
                    visible: true,
                    hiddenInForm: false,
                },
                current_attendees: {
                    displayName: 'Current Attendees',
                    type: 'integer',
                    visible: true,
                    hiddenInForm: false,
                },
                registration_url: {
                    displayName: 'Registration URL',
                    type: 'url',
                },
                status: {
                    displayName: 'Status',
                    type: 'select',
                    options: [
                        { value: 'upcoming', label: 'Upcoming' },
                        { value: 'ongoing', label: 'Ongoing' },
                        { value: 'completed', label: 'Completed' },
                        { value: 'cancelled', label: 'Cancelled' },
                    ],
                },
                created_at: { displayName: 'Created At', visible: false },
                updated_at: { displayName: 'Updated At', visible: false },
            },
        },
        settings: {
            displayName: 'Settings',
            columns: {
                id: { visible: false },
                site_name: { displayName: 'Site Name', required: true },
                site_description: {
                    displayName: 'Site Description',
                    type: 'textarea',
                },
                contact_email: {
                    displayName: 'Contact Email',
                    type: 'email',
                },
                maintenance_mode: {
                    displayName: 'Maintenance Mode',
                    type: 'boolean',
                },
                maintenance_message: {
                    displayName: 'Maintenance Message',
                    type: 'textarea',
                },
                created_at: { displayName: 'Created At', visible: false },
                updated_at: { displayName: 'Updated At', visible: false },
            },
        },
        verified: {
            displayName: 'Verified Team',
            columns: {
                id: { visible: false },
                telegram: { displayName: 'Telegram', required: true },
                twitter: { displayName: 'Twitter/X' },
                email: { displayName: 'Email', required: true, type: 'email' },
                website: { displayName: 'Website', type: 'url' },
                created_at: { displayName: 'Created At', visible: false },
                updated_at: { displayName: 'Updated At', visible: false },
            },
        },
        analytics: {
            displayName: 'Analytics',
            columns: {
                id: { visible: false },
                event_type: { displayName: 'Event Type', required: true },
                user_id: { displayName: 'User ID' },
                session_id: { displayName: 'Session ID' },
                page_path: { displayName: 'Page Path' },
                referrer: { displayName: 'Referrer' },
                user_agent: { displayName: 'User Agent', visible: false },
                ip_address: { displayName: 'IP Address' },
                country: { displayName: 'Country' },
                city: { displayName: 'City' },
                device_type: { displayName: 'Device Type' },
                browser: { displayName: 'Browser' },
                os: { displayName: 'OS' },
                duration: { displayName: 'Duration (seconds)', type: 'integer' },
                metadata: { displayName: 'Metadata', type: 'textarea', visible: false },
                created_at: { displayName: 'Created At', readonly: true },
            },
        },
    } as any,
})
