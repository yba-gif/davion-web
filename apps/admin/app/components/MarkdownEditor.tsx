import { Box, Text } from '@mantine/core'
import MDEditor from '@uiw/react-md-editor'
import React, { useEffect, useState } from 'react'

interface MarkdownEditorProps {
    value: string
    onChange: (value: string) => void
    label?: string
    description?: string
    placeholder?: string
    required?: boolean
    error?: string
    height?: number
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    value,
    onChange,
    label,
    description,
    placeholder,
    required,
    error,
    height = 400,
}) => {
    const [editorValue, setEditorValue] = useState(value || '')

    useEffect(() => {
        setEditorValue(value || '')
    }, [value])

    const handleChange = (val?: string) => {
        const newValue = val || ''
        setEditorValue(newValue)
        onChange(newValue)
    }

    return (
        <Box>
            {label && (
                <Text size="sm" fw={500} mb={4}>
                    {label}
                    {required && <span style={{ color: 'red' }}> *</span>}
                </Text>
            )}
            {description && (
                <Text size="xs" c="dimmed" mb={8}>
                    {description}
                </Text>
            )}

            <div data-color-mode="light">
                <MDEditor
                    value={editorValue}
                    onChange={handleChange}
                    preview="edit"
                    height={height}
                    visibleDragBar={false}
                    textareaProps={{
                        placeholder: placeholder || 'Write your content here using Markdown...\n\n# Heading 1\n## Heading 2\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2\n\n[Link text](https://example.com)',
                        style: {
                            fontSize: '14px',
                            lineHeight: '1.5',
                            fontFamily: 'Inter, sans-serif',
                        },
                    }}
                    previewOptions={{
                        rehypePlugins: [],
                    }}
                    data-color-mode="light"
                    style={{
                        borderRadius: '8px',
                        border: '1px solid #e9ecef',
                        overflow: 'hidden',
                    }}
                />
            </div>

            {error && (
                <Text size="xs" c="red" mt={4}>
                    {error}
                </Text>
            )}
        </Box>
    )
}

export default MarkdownEditor
