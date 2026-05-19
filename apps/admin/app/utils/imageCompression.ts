interface CompressionOptions {
    maxWidth?: number
    maxHeight?: number
    quality?: number
    format?: 'jpeg' | 'webp' | 'png'
}

interface CompressionResult {
    file: File
    originalSize: number
    compressedSize: number
    compressionRatio: number
}

export class ImageCompressor {
    private static createCanvas(width: number, height: number): HTMLCanvasElement {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        return canvas
    }

    private static calculateDimensions(
        originalWidth: number,
        originalHeight: number,
        maxWidth: number,
        maxHeight: number,
    ): { width: number, height: number } {
        let { width, height } = { width: originalWidth, height: originalHeight }

        // Calculate scaling factor
        const widthRatio = maxWidth / width
        const heightRatio = maxHeight / height
        const ratio = Math.min(widthRatio, heightRatio, 1) // Don't scale up

        width = Math.round(width * ratio)
        height = Math.round(height * ratio)

        return { width, height }
    }

    static async compressImage(
        file: File,
        options: CompressionOptions = {},
    ): Promise<CompressionResult> {
        const {
            maxWidth = 1920,
            maxHeight = 1080,
            quality = 0.8,
            format = 'jpeg',
        } = options

        return new Promise((resolve, reject) => {
            const img = new Image()

            img.onload = () => {
                try {
                    // Calculate optimal dimensions
                    const { width, height } = this.calculateDimensions(
                        img.width,
                        img.height,
                        maxWidth,
                        maxHeight,
                    )

                    // Create canvas and draw resized image
                    const canvas = this.createCanvas(width, height)
                    const ctx = canvas.getContext('2d')

                    if (!ctx) {
                        reject(new Error('Failed to get canvas context'))
                        return
                    }

                    // Enable image smoothing for better quality
                    ctx.imageSmoothingEnabled = true
                    ctx.imageSmoothingQuality = 'high'

                    // Draw the resized image
                    ctx.drawImage(img, 0, 0, width, height)

                    // Convert to blob
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Failed to compress image'))
                                return
                            }

                            const compressedFile = new File(
                                [blob],
                                file.name.replace(/\.[^/.]+$/, `.${format === 'jpeg' ? 'jpg' : format}`),
                                {
                                    type: `image/${format}`,
                                    lastModified: Date.now(),
                                },
                            )

                            const compressionRatio = (file.size - blob.size) / file.size

                            resolve({
                                file: compressedFile,
                                originalSize: file.size,
                                compressedSize: blob.size,
                                compressionRatio,
                            })
                        },
                        `image/${format}`,
                        quality,
                    )
                }
                catch (error) {
                    reject(error)
                }
            }

            img.onerror = () => {
                reject(new Error('Failed to load image'))
            }

            img.src = URL.createObjectURL(file)
        })
    }

    static async shouldCompress(file: File): Promise<boolean> {
        // Compress if file is larger than 1MB or dimensions are too large
        if (file.size > 1024 * 1024)
            return true

        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                resolve(img.width > 1920 || img.height > 1080)
            }
            img.onerror = () => resolve(false)
            img.src = URL.createObjectURL(file)
        })
    }

    static formatFileSize(bytes: number): string {
        if (bytes === 0)
            return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
    }
}
