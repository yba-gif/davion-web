import { Badge, Card, Group, LoadingOverlay, Text, Title } from '@mantine/core'

interface StatProps {
    label: string
    value: string | number
    change?: {
        direction: 'up' | 'down'
        value: string
    }
    loading?: boolean
}

export function Stat({ label, value, change, loading }: StatProps) {
    return (
        <Card withBorder radius="md" padding="lg" pos="relative">
            <Text color="dimmed" size="sm" mb={4}>
                {label}
            </Text>
            <Title order={2}>{value}</Title>
            {change && (
                <Badge
                    color={change.direction === 'up' ? 'teal' : 'red'}
                    variant="light"
                    pos="absolute"
                    top={20}
                    right={20}
                    fw="medium"
                >
                    <Group gap={6}>
                        <Text size="10px">{change.direction === 'up' ? '▲' : '▼'}</Text>
                        {change.value}
                    </Group>
                </Badge>
            )}

            <LoadingOverlay visible={loading} loaderProps={{ size: 'sm', color: 'gray' }} />
        </Card>
    )
}
