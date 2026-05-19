import { Group, Select } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

/**
 * Learn more about DatePickerInput component:
 * https://mantine.dev/dates/date-picker-input/
 */

enum Period {
    ThisWeek = 'This week',
    LastWeek = 'Last week',
    Last7Days = 'Last 7 days',
    ThisMonth = 'This month',
    LastMonth = 'Last month',
    Last30Days = 'Last 30 days',
    Last90Days = 'Last 90 days',
    CustomPeriod = 'Custom period',
}

interface PeriodPickerProps {
    value: [string | null, string | null]
    onChange: (value: [string | null, string | null]) => void
}

export function PeriodPicker({ value, onChange }: PeriodPickerProps) {
    const [period, setPeriod] = useState<Period>(Period.Last7Days)
    const [rawValue, setRawValue] = useState(value)

    useEffect(() => {
        if (rawValue[0] && rawValue[1]) {
            onChange(rawValue)
        }
    }, [rawValue])

    useEffect(() => {
        setRawValue(value)
    }, [value])

    useEffect(() => {
        switch (period) {
            case Period.ThisWeek:
                onChange([dayjs().startOf('week').format('YYYY-MM-DD'), dayjs().endOf('week').format('YYYY-MM-DD')])
                break
            case Period.LastWeek:
                onChange([
                    dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
                    dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD'),
                ])
                break
            case Period.Last7Days:
                onChange([dayjs().subtract(6, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
                break
            case Period.ThisMonth:
                onChange([dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().endOf('month').format('YYYY-MM-DD')])
                break
            case Period.LastMonth:
                onChange([
                    dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
                    dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
                ])
                break
            case Period.Last30Days:
                onChange([dayjs().subtract(29, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
                break
            case Period.Last90Days:
                onChange([dayjs().subtract(89, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
                break
        }
    }, [period])

    return (
        <Group gap="lg">
            <DatePickerInput
                readOnly={period !== Period.CustomPeriod}
                variant={period !== Period.CustomPeriod ? 'unstyled' : 'default'}
                type="range"
                placeholder="Select period"
                value={rawValue}
                onChange={setRawValue}
            />

            <Select
                data={Object.entries(Period).map(([_key, value]) => ({
                    value,
                    label: value,
                }))}
                allowDeselect={false}
                checkIconPosition="right"
                maxDropdownHeight={300}
                value={period}
                onChange={value => setPeriod(value as Period)}
                defaultValue="month"
                placeholder="Select period"
            />
        </Group>
    )
}
