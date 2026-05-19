import { Alert, Box, Button, FileInput, Group, Image, Stack, Text } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react'
import React, { useCallback, useRef, useState } from 'react'

interface ImageUploadFieldProps {
    value?: string
    onChange?: (url: string | null) => void
    uploadFunction?: (file: File) => Promise<{ success: boolean, url?: string, error?: string }>
    onUpload?: (file: File) => Promise<{ success: boolean, url?: string, error?: string }>
    accept?: string
    maxSize?: number
    disabled?: boolean
    label?: string
    description?: string
    placeholder?: string
}

export function ImageUploadField({
    value,
    onChange,
    uploadFunction,
    onUpload,
    accept = 'image/*',
    maxSize = 5 * 1024 * 1024, // 5MB
    disabled = false,
    label,
    description,
    placeholder = 'Select image to upload',
}: ImageUploadFieldProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLButtonElement>(null)

    const activeUploadFunction = uploadFunction || onUpload

    const handleFileChange = useCallback(async (file: File | null) => {
        if (!activeUploadFunction || !file)
            return

        if (file.size > maxSize) {
            setError(`File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`)
            return
        }

        setUploading(true)
        setError(null)

        try {
            const result = await activeUploadFunction(file)

            if (result.success && result.url) {
                onChange?.(result.url)
            }
            else {
                setError(result.error || 'Upload failed')
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed')
        }
        finally {
            setUploading(false)
        }
    }, [activeUploadFunction, onChange, maxSize])

    const handleRemove = useCallback(() => {
        onChange?.(null)
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }, [onChange])

    return (
        <Stack gap="xs">
            {label && <Text size="sm" fw={500}>{label}</Text>}
            {description && <Text size="xs" c="dimmed">{description}</Text>}

            {error && (
                <Alert color="red" radius="sm" p="xs">
                    {error}
                </Alert>
            )}

            {value
                ? (
                        <Box>
                            <Image
                                src={value}
                                alt="Uploaded image"
                                radius="md"
                                mah={200}
                                fit="contain"
                                fallbackSrc="data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f8f9fa'/%3e%3ctext x='50' y='50' font-size='14' text-anchor='middle' dy='.3em' fill='%23868e96'%3eNo image%3c/text%3e%3c/svg%3e"
                            />
                            <Group mt="xs">
                                <Button
                                    variant="light"
                                    color="red"
                                    size="xs"
                                    onClick={handleRemove}
                                    disabled={disabled || uploading}
                                >
                                    Remove
                                </Button>
                            </Group>
                        </Box>
                    )
                : (
                        <FileInput
                            ref={fileInputRef}
                            placeholder={placeholder}
                            accept={accept}
                            onChange={handleFileChange}
                            disabled={disabled || uploading}
                            leftSection={<IconPhoto size={18} />}
                            clearable
                        />
                    )}
        </Stack>
    )
}

export default ImageUploadField
