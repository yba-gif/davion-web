import { Client } from 'minio'
import { config } from 'dotenv'
import path from 'node:path'
import fs from 'node:fs/promises'

// Load environment variables
const workspaceRoot = path.resolve(process.cwd(), '../../')
config({
    path: [
        path.join(process.cwd(), '.env'),
        path.join(workspaceRoot, '.env'),
    ],
    override: false,
})

interface MinIOConfig {
    endpoint: string
    port: number
    useSSL: boolean
    accessKey: string
    secretKey: string
    bucketName: string
    publicUrl: string
}

interface UploadResponse {
    success: boolean
    url?: string
    filename?: string
    size?: number
    contentType?: string
    error?: string
}

class MinIOService {
    private client: Client | null = null
    private config: MinIOConfig
    private connected: boolean = false

    constructor() {
        this.config = this.loadConfig()
        this.initialize()
    }

    private loadConfig(): MinIOConfig {
        return {
            endpoint: process.env.MINIO_ENDPOINT || 's3.dw3tr.com',
            port: Number.parseInt(process.env.MINIO_PORT || '443', 10),
            useSSL: process.env.MINIO_USE_SSL !== 'false',
            accessKey: process.env.MINIO_ACCESS_KEY || 'dw3tr',
            secretKey: (process.env.MINIO_SECRET_KEY || 'DevOpsRul3z!@#').replace(/"/g, ''),
            bucketName: process.env.MINIO_BUCKET_NAME || 'base1',
            publicUrl: process.env.MINIO_PUBLIC_URL || 'https://s3.dw3tr.com',
        }
    }

    private async initialize(): Promise<void> {
        try {
            console.log('🔧 Initializing MinIO service...')
            console.log('📝 Config:', {
                endpoint: this.config.endpoint,
                port: this.config.port,
                useSSL: this.config.useSSL,
                bucketName: this.config.bucketName,
                publicUrl: this.config.publicUrl,
            })

            this.client = new Client({
                endPoint: this.config.endpoint,
                port: this.config.port,
                useSSL: this.config.useSSL,
                accessKey: this.config.accessKey,
                secretKey: this.config.secretKey,
            })

            // Test connection
            await this.testConnection()
            await this.ensureBucket()

            console.log('✅ MinIO service initialized successfully')
        } catch (error) {
            console.error('❌ MinIO initialization failed:', error)
            this.connected = false
        }
    }

    private async testConnection(): Promise<void> {
        if (!this.client) {
            throw new Error('MinIO client not initialized')
        }

        try {
            console.log('🔄 Testing MinIO connection...')
            await this.client.listBuckets()
            this.connected = true
            console.log('✅ MinIO connection successful')
        } catch (error) {
            this.connected = false
            throw new Error(`MinIO connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    private async ensureBucket(): Promise<void> {
        if (!this.client || !this.connected) {
            throw new Error('MinIO not connected')
        }

        try {
            const bucketExists = await this.client.bucketExists(this.config.bucketName)
            if (!bucketExists) {
                console.log(`🔄 Creating bucket: ${this.config.bucketName}`)
                await this.client.makeBucket(this.config.bucketName, 'us-east-1')
                console.log(`✅ Bucket created: ${this.config.bucketName}`)
            } else {
                console.log(`✅ Bucket exists: ${this.config.bucketName}`)
            }
        } catch (error) {
            throw new Error(`Failed to ensure bucket: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    private generateFileName(originalName: string, folder: string = 'uploads'): string {
        const timestamp = Date.now()
        const randomId = Math.random().toString(36).substring(2, 8)
        const sanitizedName = originalName
            .toLowerCase()
            .replace(/[^a-z0-9.-]/g, '_')
            .replace(/_{2,}/g, '_')
            .replace(/^_|_$/g, '')

        return `${folder}/${timestamp}_${randomId}_${sanitizedName}`
    }

    async uploadFile(file: File, folder: string = 'uploads'): Promise<UploadResponse> {
        console.log('🚀 MinIO upload started:', {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            folder,
        })

        if (!this.client || !this.connected) {
            return {
                success: false,
                error: 'MinIO service not available'
            }
        }

        try {
            // Convert file to buffer
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            // Generate unique filename
            const fileName = this.generateFileName(file.name, folder)

            console.log('📤 Uploading to MinIO:', {
                bucket: this.config.bucketName,
                fileName,
                size: buffer.length,
            })

            // Upload to MinIO
            await this.client.putObject(
                this.config.bucketName,
                fileName,
                buffer,
                buffer.length,
                {
                    'Content-Type': file.type,
                    'Cache-Control': 'public, max-age=31536000',
                }
            )

            const url = `${this.config.publicUrl}/${this.config.bucketName}/${fileName}`

            console.log('✅ MinIO upload successful:', url)

            return {
                success: true,
                url,
                filename: fileName,
                size: file.size,
                contentType: file.type,
            }
        } catch (error) {
            console.error('❌ MinIO upload failed:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Upload failed',
            }
        }
    }

    async deleteFile(fileName: string): Promise<boolean> {
        if (!this.client || !this.connected) {
            return false
        }

        try {
            await this.client.removeObject(this.config.bucketName, fileName)
            console.log('🗑️ File deleted:', fileName)
            return true
        } catch (error) {
            console.error('❌ Delete failed:', error)
            return false
        }
    }

    isConnected(): boolean {
        return this.connected
    }

    getConfig(): Readonly<MinIOConfig> {
        return Object.freeze({ ...this.config })
    }

    getPublicUrl(fileName: string): string {
        return `${this.config.publicUrl}/${this.config.bucketName}/${fileName}`
    }
}

// Export singleton instance
export const minioService = new MinIOService()
export default minioService