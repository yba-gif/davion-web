import type { DailyReportsDataItem } from '../mockup'
import { Card, Group, LoadingOverlay, RingProgress, Table, Text, Title } from '@mantine/core'

import dayjs from 'dayjs'

/**
 * Learn more about Table component:
 * https://mantine.dev/core/table/
 */

interface DailyReportsTableProps {
    data: DailyReportsDataItem[]
    loading?: boolean
}

export function DailyReportsTable({ data, loading }: DailyReportsTableProps) {
    return (
        <Card withBorder radius="md" padding="lg">
            <Title order={4} mb="md">
                Daily Reports
            </Title>

            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="xs" horizontalSpacing="xs" highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Date</Table.Th>
                            <Table.Th>Visitors</Table.Th>
                            <Table.Th>New Users</Table.Th>
                            <Table.Th>Conversion Rate</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data.map(row => (
                            <Table.Tr key={row.date}>
                                <Table.Td>{dayjs(row.date).format('DD MMMM (dddd)')}</Table.Td>
                                <Table.Td>{row.visitors.toLocaleString('en-US')}</Table.Td>
                                <Table.Td>{row.newUsers.toLocaleString('en-US')}</Table.Td>
                                <Table.Td>
                                    <Group gap="xs" align="center">
                                        <RingProgress
                                            size={24}
                                            roundCaps
                                            thickness={3}
                                            sections={[{ value: row.conversionRate * 100, color: 'blue' }]}
                                        />
                                        <Text fw="500">
                                            {row.conversionRate.toLocaleString('en-US', {
                                                style: 'percent',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 2,
                                            })}
                                        </Text>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            <LoadingOverlay visible={loading} loaderProps={{ size: 'sm', color: 'gray' }} />
        </Card>
    )
}
