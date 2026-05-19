import { getAppConfig, getLoggingConfig } from './config'

export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
}

interface LogEntry {
    timestamp: string
    level: string
    message: string
    context?: Record<string, any>
    stack?: string
}

interface LoggerConfig {
    level: LogLevel
    enableConsole: boolean
    enableFile: boolean
    enableJson: boolean
    includeTimestamp: boolean
    includeStack: boolean
}

class Logger {
    private config: LoggerConfig
    private readonly LOG_COLORS = {
        ERROR: '\x1B[31m', // Red
        WARN: '\x1B[33m', // Yellow
        INFO: '\x1B[36m', // Cyan
        DEBUG: '\x1B[37m', // White
        RESET: '\x1B[0m', // Reset
    }

    constructor() {
        this.config = this.initializeConfig()
    }

    private initializeConfig(): LoggerConfig {
        const loggingConfig = getLoggingConfig()
        const appConfig = getAppConfig()

        const logLevelStr = loggingConfig.level.toUpperCase()
        const logLevel = LogLevel[logLevelStr as keyof typeof LogLevel] ?? LogLevel.INFO

        return {
            level: logLevel,
            enableConsole: loggingConfig.enableConsole,
            enableFile: loggingConfig.enableFile,
            enableJson: loggingConfig.format === 'json',
            includeTimestamp: !appConfig.isDevelopment, // Always include in production
            includeStack: appConfig.isDevelopment,
        }
    }

    private shouldLog(level: LogLevel): boolean {
        return level <= this.config.level
    }

    private formatMessage(level: string, message: string, context?: Record<string, any>): string {
        const timestamp = this.config.includeTimestamp ? new Date().toISOString() : ''
        const contextStr = context ? ` ${JSON.stringify(context)}` : ''

        if (this.config.enableJson) {
            const logEntry: LogEntry = {
                timestamp,
                level: level.toLowerCase(),
                message,
                ...(context && { context }),
            }
            return JSON.stringify(logEntry)
        }

        const timestampStr = timestamp ? `[${timestamp}] ` : ''
        return `${timestampStr}${level}: ${message}${contextStr}`
    }

    private writeLog(level: string, message: string, context?: Record<string, any>, error?: Error): void {
        if (this.config.enableConsole) {
            const color = this.LOG_COLORS[level as keyof typeof this.LOG_COLORS] || this.LOG_COLORS.RESET
            const formattedMessage = this.formatMessage(level, message, context)

            console.log(`${color}${formattedMessage}${this.LOG_COLORS.RESET}`)

            if (error && this.config.includeStack && error.stack) {
                console.log(`${color}Stack: ${error.stack}${this.LOG_COLORS.RESET}`)
            }
        }

        // File logging would be implemented here if needed
        if (this.config.enableFile) {
            // TODO: Implement file logging
            // fs.appendFileSync(logFile, formattedMessage + '\n')
        }
    }

    error(message: string, context?: Record<string, any>, error?: Error): void {
        if (this.shouldLog(LogLevel.ERROR)) {
            this.writeLog('ERROR', message, context, error)
        }
    }

    warn(message: string, context?: Record<string, any>): void {
        if (this.shouldLog(LogLevel.WARN)) {
            this.writeLog('WARN', message, context)
        }
    }

    info(message: string, context?: Record<string, any>): void {
        if (this.shouldLog(LogLevel.INFO)) {
            this.writeLog('INFO', message, context)
        }
    }

    debug(message: string, context?: Record<string, any>): void {
        if (this.shouldLog(LogLevel.DEBUG)) {
            this.writeLog('DEBUG', message, context)
        }
    }

    // Convenience methods for common logging patterns
    request(method: string, url: string, statusCode: number, duration: number, userInfo?: Record<string, any>): void {
        this.info('HTTP Request', {
            method,
            url,
            statusCode,
            duration: `${duration}ms`,
            ...userInfo,
        })
    }

    database(operation: string, table: string, duration: number, recordCount?: number): void {
        this.debug('Database Operation', {
            operation,
            table,
            duration: `${duration}ms`,
            ...(recordCount !== undefined && { recordCount }),
        })
    }

    upload(filename: string, size: number, contentType: string, duration: number, destination: string): void {
        this.info('File Upload', {
            filename,
            size: `${size} bytes`,
            contentType,
            duration: `${duration}ms`,
            destination,
        })
    }

    security(event: string, userId?: string, ip?: string, userAgent?: string, details?: Record<string, any>): void {
        this.warn('Security Event', {
            event,
            userId,
            ip,
            userAgent,
            ...details,
        })
    }

    performance(operation: string, duration: number, details?: Record<string, any>): void {
        const level = duration > 5000 ? 'warn' : duration > 1000 ? 'info' : 'debug'
        this[level]('Performance Metric', {
            operation,
            duration: `${duration}ms`,
            ...details,
        })
    }

    // Method to change log level at runtime
    setLogLevel(level: LogLevel): void {
        this.config.level = level
        this.info('Log level changed', { newLevel: LogLevel[level] })
    }

    // Method to get current configuration
    getConfig(): Readonly<LoggerConfig> {
        return Object.freeze({ ...this.config })
    }
}

// Export singleton instance
export const logger = new Logger()

// Export class for testing or custom instances
export { Logger }

// Convenience exports
export const log = {
    error: (message: string, context?: Record<string, any>, error?: Error) => logger.error(message, context, error),
    warn: (message: string, context?: Record<string, any>) => logger.warn(message, context),
    info: (message: string, context?: Record<string, any>) => logger.info(message, context),
    debug: (message: string, context?: Record<string, any>) => logger.debug(message, context),
    request: (method: string, url: string, statusCode: number, duration: number, userInfo?: Record<string, any>) =>
        logger.request(method, url, statusCode, duration, userInfo),
    database: (operation: string, table: string, duration: number, recordCount?: number) =>
        logger.database(operation, table, duration, recordCount),
    upload: (filename: string, size: number, contentType: string, duration: number, destination: string) =>
        logger.upload(filename, size, contentType, duration, destination),
    security: (event: string, userId?: string, ip?: string, userAgent?: string, details?: Record<string, any>) =>
        logger.security(event, userId, ip, userAgent, details),
    performance: (operation: string, duration: number, details?: Record<string, any>) =>
        logger.performance(operation, duration, details),
}
