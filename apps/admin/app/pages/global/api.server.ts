import { app } from '@/_server/app'
import { minioService } from '../../utils/minioService'

interface FileData {
    name: string
    size: number
    type: string
    data: string // base64 encoded file data
}

interface UploadInput {
    file: File | FileData
    folder?: string
}

interface UploadResponse {
    success: boolean
    url: string
    filename: string
    size: number
    contentType: string
    storage: string
    uploadedAt: string
}

interface ErrorResponse {
    success: false
    error: string
    code?: string
}

/**
 * Enhanced file upload handler for MinIO storage
 * Supports multiple file types and improved error handling
 */
const controller = app.defineCustomController({
    uploadFile: async (input: UploadInput): Promise<UploadResponse | ErrorResponse> => {
        console.log('🚀🚀🚀 GLOBAL API uploadFile procedure called!')
        const startTime = Date.now()
        console.log('🚀 Upload endpoint hit via upload.server.ts (MinIO CDN)!')

        try {
            const { file, folder = 'uploads' } = input

            if (!file) {
                throw new Error('No file provided')
            }

            console.log(`📁 Processing file for MinIO:`, {
                name: file.name,
                size: file.size,
                type: file.type,
                folder,
                isFileObject: file instanceof File,
                hasData: 'data' in file,
            })

            let arrayBuffer: ArrayBuffer

            if (file instanceof File) {
                // Handle actual File object
                console.log('📄 Converting File object to ArrayBuffer...')
                arrayBuffer = await file.arrayBuffer()
            }
            else if ('data' in file && typeof file.data === 'string') {
                // Handle base64 encoded file data
                console.log('📄 Converting base64 data to ArrayBuffer...')
                const base64Data = file.data
                const binaryString = atob(base64Data)
                const bytes = new Uint8Array(binaryString.length)
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i)
                }
                arrayBuffer = bytes.buffer
            }
            else {
                throw new Error('Invalid file format - must be File object or FileData with base64 data')
            }

            console.log(`📄 ArrayBuffer created, size: ${arrayBuffer.byteLength} bytes`)

            // Upload to remote MinIO
            console.log('🔧 Uploading to remote MinIO...')
            
            let uploadResult: any

            try {
                // Check if MinIO service is connected
                if (!minioService.isConnected()) {
                    throw new Error('MinIO service is not connected. Please check MinIO configuration and credentials.')
                }

                // Convert ArrayBuffer to File for new service
                const blob = new Blob([arrayBuffer], { type: file.type })
                const fileObj = new File([blob], file.name, { type: file.type })
                
                uploadResult = await minioService.uploadFile(fileObj, folder)
                console.log('☁️ MinIO upload result:', uploadResult)
                
                if (!uploadResult.success) {
                    throw new Error(uploadResult.error || 'MinIO upload failed')
                }
            }
            catch (minioError) {
                console.error('❌ MinIO upload failed:', minioError)
                const errorMessage = minioError instanceof Error ? minioError.message : 'MinIO connection failed'
                throw new Error(`Upload failed: ${errorMessage}. Please verify MinIO server is running and credentials are correct.`)
            }

            const processingTime = Date.now() - startTime
            console.log(`✅ File uploaded to MinIO in ${processingTime}ms: ${uploadResult.url}`)

            if (!uploadResult.success || !uploadResult.url) {
                throw new Error(uploadResult.error || 'Upload failed')
            }

            return {
                success: true,
                url: uploadResult.url,
                filename: uploadResult.filename || file.name,
                size: uploadResult.size || file.size,
                contentType: uploadResult.contentType || file.type,
                storage: 'MinIO Remote',
                uploadedAt: new Date().toISOString(),
            }
        }
        catch (error) {
            const processingTime = Date.now() - startTime
            console.error(`❌ MinIO upload error after ${processingTime}ms:`, error)

            const errorMessage = error instanceof Error ? error.message : 'Upload failed'
            const errorCode = errorMessage.includes('Invalid file type')
                ? 'INVALID_FILE_TYPE'
                : errorMessage.includes('File too large')
                    ? 'FILE_TOO_LARGE'
                    : 'UPLOAD_ERROR'

            return {
                success: false,
                error: errorMessage,
                code: errorCode,
            }
        }
    },

    deleteFile: async (input: { filename: string }): Promise<{ success: boolean, message?: string, error?: string }> => {
        console.log('🗑️ Delete file endpoint called')

        try {
            const { filename } = input

            if (!filename) {
                throw new Error('No filename provided')
            }

            console.log(`📁 Deleting file from MinIO: ${filename}`)

            const deleted = await minioService.deleteFile(filename)

            if (deleted) {
                console.log(`✅ File deleted successfully: ${filename}`)
                return {
                    success: true,
                    message: `File ${filename} deleted successfully`,
                }
            }
            else {
                throw new Error('Failed to delete file')
            }
        }
        catch (error) {
            console.error('❌ MinIO delete error:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Delete failed',
            }
        }
    },

    getStatus: async (): Promise<{ success: boolean, status?: any, error?: string }> => {
        console.log('📊 MinIO status endpoint called')

        try {
            const config = minioService.getConfig()
            const isConnected = minioService.isConnected()

            return {
                success: true,
                status: {
                    connected: isConnected,
                    endpoint: config.endpoint,
                    port: config.port,
                    bucketName: config.bucketName,
                    useSSL: config.useSSL,
                    message: isConnected
                        ? 'MinIO service is connected and ready'
                        : 'MinIO service is not connected. Check configuration.',
                },
            }
        }
        catch (error) {
            console.error('❌ MinIO status check error:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Status check failed',
            }
        }
    },
})

export default controller
export type Procedures = typeof controller.procedures
