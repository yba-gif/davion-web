import {
    Alert,
    Box,
    Button,
    FileInput,
    Group,
    Image,
    Paper,
    Progress,
    Stack,
    Text,
} from '@mantine/core'
import { IconPhoto, IconTrash } from '@tabler/icons-react'
import React, { useCallback, useState } from 'react'

interface UploadResult {
    success: boolean
    url?: string
    filename?: string
    size?: number
    contentType?: string
    error?: string
}

interface MinIOImageUploadProps<T = any> {
    value?: string
    onChange?: (url: string | null) => void
    folder?: string
    label?: string
    description?: string
    placeholder?: string
    disabled?: boolean
    maxSize?: number // in bytes
    accept?: string
    callProcedure?: T
}

// Browser-side upload function that calls global API using callProcedure
async function uploadFileToMinIO(
    file: File,
    folder: string = 'uploads',
    callProcedure?: any,
): Promise<UploadResult> {
    try {
        console.log('📤 Uploading to MinIO via global API:', { fileName: file.name, folder })

        if (!callProcedure) {
            throw new Error('callProcedure function is required')
        }

        // Convert File to base64 FileData format for procedure call
        // For large files (>5MB), use chunks to avoid memory issues
        let fileData: any

        if (file.size > 5 * 1024 * 1024) { // 5MB threshold
            console.log('📦 Large file detected, using chunked processing...')
            // For very large files, we should fallback to direct API upload
            throw new Error('File too large for procedure call, please use direct upload')
        }
        else {
            console.log('📦 Converting file to base64...')

            // Use FileReader for more reliable base64 conversion
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => {
                    const result = reader.result as string
                    // Remove data URL prefix (data:mime/type;base64,)
                    const base64Data = result.split(',')[1]
                    resolve(base64Data)
                }
                reader.onerror = () => reject(new Error('Failed to read file'))
                reader.readAsDataURL(file)
            })

            fileData = {
                name: file.name,
                size: file.size,
                type: file.type,
                data: base64,
            }
        }

        console.log('📦 File converted to FileData format:', {
            name: fileData.name,
            size: fileData.size,
            type: fileData.type,
            dataLength: fileData.data.length,
        })

        // Call global API uploadFile procedure with FileData
        const result = await callProcedure('uploadFile', {
            file: fileData,
            folder,
        })

        console.log('✅ Global API result:', result)

        if (result && result.success) {
            return {
                success: true,
                url: result.url,
                filename: result.filename,
                size: result.size,
                contentType: result.contentType,
            }
        }
        else {
            return {
                success: false,
                error: result?.error || 'Upload failed via global API',
            }
        }
    }
    catch (error) {
        console.error('❌ Global API upload error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Global API upload failed',
        }
    }
}

export function MinIOImageUpload({
    value,
    onChange,
    folder = 'images',
    label,
    description,
    placeholder = 'Select image to upload',
    disabled = false,
    maxSize = 10 * 1024 * 1024, // 10MB default
    accept = 'image/*',
    callProcedure,
}: MinIOImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [progress, setProgress] = useState(0)

    const validateFile = (file: File): string | null => {
        if (file.size > maxSize) {
            return `File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`
        }

        if (!file.type.startsWith('image/')) {
            return 'Only image files are allowed'
        }

        return null
    }

    const handleFileUpload = useCallback(async (file: File | null) => {
        if (!file)
            return

        console.log('🚀 Starting file upload:', file.name)

        // Validate file
        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            return
        }

        setUploading(true)
        setError(null)
        setProgress(0)

        try {
            // Simulate progress for better UX
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90))
            }, 200)

            // Upload via global API to MinIO
            let result: UploadResult

            try {
                result = await uploadFileToMinIO(file, folder, callProcedure)
            }
            catch (uploadError) {
                clearInterval(progressInterval)

                // If it's a large file error, show a more specific message
                if (uploadError instanceof Error && uploadError.message.includes('too large for procedure call')) {
                    setError('File is too large. Please use a smaller image (under 5MB) or try compressing it.')
                    setProgress(0)
                    return
                }
                else {
                    throw uploadError // Re-throw other errors
                }
            }

            clearInterval(progressInterval)
            setProgress(100)

            if (result.success && result.url) {
                console.log('✅ Upload successful:', result.url)
                onChange?.(result.url)
                setTimeout(() => setProgress(0), 1000) // Reset progress after 1 second
            }
            else {
                console.log('❌ Upload failed with result:', result)
                setError(result.error || 'Upload failed')
                setProgress(0)
            }
        }
        catch (err) {
            console.error('❌ Upload error:', err)
            setError(err instanceof Error ? err.message : 'Upload failed')
            setProgress(0)
        }
        finally {
            setUploading(false)
        }
    }, [folder, maxSize, onChange])

    const handleRemove = useCallback(() => {
        console.log('🗑️ Removing uploaded image')
        onChange?.(null)
        setError(null)
        setProgress(0)
    }, [onChange])

    return (
        <Stack gap="xs">
            {label && (
                <Text size="sm" fw={500}>
                    {label}
                </Text>
            )}

            {description && (
                <Text size="xs" c="dimmed">
                    {description}
                </Text>
            )}

            {error && (
                <Alert color="red" withCloseButton onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {value
                ? (
                        <Paper p="md" withBorder>
                            <Stack gap="md">
                                <Image
                                    src={value}
                                    alt="Uploaded image"
                                    radius="md"
                                    mah={300}
                                    fit="contain"
                                    fallbackSrc="data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f8f9fa'/%3e%3ctext x='50' y='50' font-size='12' text-anchor='middle' dy='.3em' fill='%23868e96'%3eImage failed to load%3c/text%3e%3c/svg%3e"
                                />
                                <Group>
                                    <Button
                                        variant="light"
                                        color="red"
                                        size="sm"
                                        leftSection={<IconTrash size={16} />}
                                        onClick={handleRemove}
                                        disabled={disabled || uploading}
                                    >
                                        Remove
                                    </Button>
                                    <Text size="xs" c="dimmed">
                                        Click to remove this image
                                    </Text>
                                </Group>
                            </Stack>
                        </Paper>
                    )
                : (
                        <Stack gap="sm">
                            <FileInput
                                placeholder={placeholder}
                                accept={accept}
                                onChange={handleFileUpload}
                                disabled={disabled || uploading}
                                leftSection={<IconPhoto size={18} />}
                                clearable
                                description={`Maximum file size: ${Math.round(maxSize / 1024 / 1024)}MB`}
                            />

                            {uploading && (
                                <Box>
                                    <Group justify="space-between" mb={5}>
                                        <Text size="sm" c="blue">
                                            Uploading to MinIO...
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            {progress}
                                            %
                                        </Text>
                                    </Group>
                                    <Progress value={progress} color="blue" size="sm" animated />
                                </Box>
                            )}
                        </Stack>
                    )}

        </Stack>
    )
}

export default MinIOImageUpload
