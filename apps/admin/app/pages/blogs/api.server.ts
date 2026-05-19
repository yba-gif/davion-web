import { app } from '@/_server/app'
import { postgres } from '@/_server/data-sources/postgres'
import { minioService } from '../../utils/minioService'
import pageSettings from './settings.json'

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

const controller = app.defineTableController(postgres, {
    ...pageSettings,
    rootTable: {
        ...pageSettings.rootTable,

        beforeInsert: async (data: any) => {
            if (!data.slug && data.title) {
                data.slug = data.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '')
            }

            data.created_at = data.created_at || new Date().toISOString()
            data.published = data.published !== undefined ? data.published : false

            return data
        },

        beforeUpdate: async (data: any) => {
            if (data.title && !data.slug) {
                data.slug = data.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '')
            }

            data.updated_at = new Date().toISOString()
            return data
        },
        /**
         * Need more customization? Adjust the table configuration here.
         * Learn more: https://kottster.app/docs/table/configuration/api#parameters
         */
    },
}, {
    // Custom procedures
    uploadFile: async (input: UploadInput): Promise<UploadResponse | ErrorResponse> => {
        console.log('🚀 Upload endpoint hit from blogs API!')
        console.log('Input received:', { ...input, file: input.file ? { name: input.file.name, size: input.file.size, type: input.file.type } : null })
        const startTime = Date.now()

        try {
            const { file, folder = 'blog' } = input

            if (!file) {
                console.error('❌ No file provided in input')
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

            console.log('☁️ Uploading to MinIO...')
            let uploadResult: any

            try {
                // Convert ArrayBuffer to File for new service
                const blob = new Blob([arrayBuffer], { type: file.type })
                const fileObj = new File([blob], file.name, { type: file.type })
                
                uploadResult = await minioService.uploadFile(fileObj, folder)
                console.log('☁️ MinIO upload result:', uploadResult)
            }
            catch (minioError) {
                console.error('❌ MinIO upload failed, trying fallback:', minioError)

                // Fallback: Try alternative upload method
                // This could be a direct file system save or another cloud provider
                throw new Error(`Upload failed: ${minioError instanceof Error ? minioError.message : 'MinIO connection failed'}. Please check MinIO configuration.`)
            }

            const processingTime = Date.now() - startTime
            console.log(`✅ File uploaded to MinIO CDN in ${processingTime}ms: ${uploadResult.url}`)

            if (!uploadResult.success || !uploadResult.url) {
                throw new Error(uploadResult.error || 'Upload failed')
            }

            const response = {
                success: true,
                url: uploadResult.url,
                filename: uploadResult.filename || file.name,
                size: uploadResult.size || file.size,
                contentType: uploadResult.contentType || file.type,
                storage: 'MinIO CDN',
                uploadedAt: new Date().toISOString(),
            }
            console.log('📤 Returning response:', response)
            return response
        }
        catch (error) {
            const processingTime = Date.now() - startTime
            console.error(`❌ MinIO upload error after ${processingTime}ms:`, error)
            console.error('Error details:', {
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
                name: error instanceof Error ? error.name : undefined,
            })

            const errorMessage = error instanceof Error ? error.message : 'Upload failed'
            const errorCode = errorMessage.includes('Invalid file type')
                ? 'INVALID_FILE_TYPE'
                : errorMessage.includes('File too large')
                    ? 'FILE_TOO_LARGE'
                    : 'UPLOAD_ERROR'

            const errorResponse: ErrorResponse = {
                success: false,
                error: errorMessage,
                code: errorCode,
            }
            console.log('📤 Returning error response:', errorResponse)
            return errorResponse
        }
    },
})

export default controller
export type Procedures = typeof controller.procedures
