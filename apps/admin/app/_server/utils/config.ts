import path from 'node:path'
import { config } from 'dotenv'

// Centralized environment configuration loader
class ConfigService {
    private static instance: ConfigService
    private isLoaded: boolean = false

    private constructor() {
        this.loadEnvironment()
    }

    static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService()
        }
        return ConfigService.instance
    }

    private loadEnvironment(): void {
        if (this.isLoaded)
            return

        const workspaceRoot = path.resolve(process.cwd(), '../../')

        config({
            path: [
                path.join(process.cwd(), '.env'),
                path.join(workspaceRoot, '.env'),
                '/app/.env',
            ],
            override: false,
        })

        this.isLoaded = true
    }

    /**
     * Detects if the application is running in a Docker container
     */
    isDockerEnvironment(): boolean {
        return (process.env.DOCKER_CONTAINER === 'true')
            || (process.env.HOSTNAME?.includes('base1-') && process.env.HOSTNAME?.includes('-dev'))
            || process.cwd().startsWith('/app')
    }

    /**
     * Gets database configuration
     */
    getDatabaseConfig() {
        const isDocker = this.isDockerEnvironment()

        return {
            host: isDocker ? 'postgres' : 'localhost',
            port: Number.parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
            user: process.env.POSTGRES_USER ?? 'postgres',
            password: process.env.POSTGRES_PASSWORD ?? 'dev_password_2025',
            database: process.env.POSTGRES_DB ?? 'base1',
            isDocker,
            ssl: false, // Disable SSL for Docker internal network
            pool: {
                min: 3,
                max: 12,
                acquireTimeoutMillis: 30000,
                idleTimeoutMillis: 30000,
                createTimeoutMillis: 15000,
                destroyTimeoutMillis: 5000,
                reapIntervalMillis: 1000,
                createRetryIntervalMillis: 200,
            },
        }
    }

    /**
     * Gets MinIO configuration
     */
    getMinIOConfig() {
        return {
            endpoint: process.env.MINIO_ENDPOINT || 's3.dw3tr.com',
            port: Number.parseInt(process.env.MINIO_PORT || '443', 10),
            useSSL: process.env.MINIO_USE_SSL !== 'false',
            accessKey: process.env.MINIO_ACCESS_KEY || process.env.MINIO_ROOT_USER || 'apiuser',
            secretKey: process.env.MINIO_SECRET_KEY || process.env.MINIO_ROOT_PASSWORD || 'Kx9mP2#vL8qW$nR5',
            bucketName: process.env.MINIO_BUCKET_NAME || 'uploads',
            publicUrl: process.env.MINIO_PUBLIC_URL || 'https://s3.dw3tr.com',
            isDocker: this.isDockerEnvironment(),
        }
    }

    /**
     * Gets logging configuration
     */
    getLoggingConfig() {
        return {
            level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
            format: process.env.LOG_FORMAT || 'text',
            enableConsole: process.env.LOG_CONSOLE !== 'false',
            enableFile: process.env.LOG_FILE === 'true',
            filePath: process.env.LOG_FILE_PATH || './logs/app.log',
            enableDatabase: process.env.LOG_DATABASE === 'true',
            maxFiles: Number.parseInt(process.env.LOG_MAX_FILES ?? '5', 10),
            maxSize: process.env.LOG_MAX_SIZE || '10m',
        }
    }

    /**
     * Gets general application configuration
     */
    getAppConfig() {
        return {
            nodeEnv: process.env.NODE_ENV || 'development',
            port: Number.parseInt(process.env.PORT ?? '3000', 10),
            host: process.env.HOST || 'localhost',
            secretKey: process.env.SECRET_KEY || 'dev_secret_key_change_in_production',
            isProduction: process.env.NODE_ENV === 'production',
            isDevelopment: process.env.NODE_ENV === 'development',
            isDocker: this.isDockerEnvironment(),
        }
    }

    /**
     * Gets environment detection info for debugging
     */
    getEnvironmentInfo() {
        return {
            NODE_ENV: process.env.NODE_ENV,
            DOCKER_CONTAINER: process.env.DOCKER_CONTAINER,
            HOSTNAME: process.env.HOSTNAME,
            CWD: process.cwd(),
            isDocker: this.isDockerEnvironment(),
            workspaceRoot: path.resolve(process.cwd(), '../../'),
        }
    }
}

// Export singleton instance
export const configService = ConfigService.getInstance()

// Export convenience functions
export function loadEnvironment(): void {
    void configService // This will trigger the constructor and load environment
}

export function isDockerEnvironment(): boolean {
    return configService.isDockerEnvironment()
}

export function getDatabaseConfig() {
    return configService.getDatabaseConfig()
}

export function getMinIOConfig() {
    return configService.getMinIOConfig()
}

export function getLoggingConfig() {
    return configService.getLoggingConfig()
}

export function getAppConfig() {
    return configService.getAppConfig()
}

export function getEnvironmentInfo() {
    return configService.getEnvironmentInfo()
}
