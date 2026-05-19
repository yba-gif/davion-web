import type { Procedures } from './api.server'
import type { DailyReportsDataItem, GrowthChartDataItem, Metrics, SourcesChartDataItem } from './mockup'
import { Page, useCallProcedure } from '@kottster/react'
import { Grid, Space } from '@mantine/core'
import { useEffect, useState } from 'react'
import { DailyReportsTable } from './ui/dailyReportsTable'
import { GrowthChart } from './ui/growthChart'
import { SourcesChart } from './ui/sourcesChart'
import { Stat } from './ui/stat'
import '@mantine/charts/styles.css'

/**
 * Learn more about building custom pages:
 * https://kottster.app/docs/custom-pages/introduction
 */

export default () => {
    const callProcedure = useCallProcedure<Procedures>()

    const [metricsLoading, setMetricsLoading] = useState(false)
    const [metricsData, setMetricsData] = useState<Metrics | null>(null)

    const [growthChartLoading, setGrowthChartLoading] = useState(false)
    const [growthChartData, setGrowthChartData] = useState<GrowthChartDataItem[]>([])

    const [sourceChartLoading, setSourceChartLoading] = useState(false)
    const [sourceChartData, setSourceChartData] = useState<SourcesChartDataItem[]>([])

    const [dailyReportsLoading, setDailyReportsLoading] = useState(false)
    const [dailyReportsData, setDailyReportsData] = useState<DailyReportsDataItem[]>([])

    const fetchMetrics = async () => {
        setMetricsLoading(true)
        try {
            const data = await callProcedure('getMetrics', {})
            setMetricsData(data)
        }
        catch (error) {
            console.error('Error fetching metrics:', error)
        }
        finally {
            setMetricsLoading(false)
        }
    }

    const fetchGrowthChartData = async () => {
        setGrowthChartLoading(true)
        try {
            const data = await callProcedure('getGrowthChartData', {})
            setGrowthChartData(data)
        }
        catch (error) {
            console.error('Error fetching growth chart data:', error)
        }
        finally {
            setGrowthChartLoading(false)
        }
    }

    const fetchSourceChartData = async () => {
        setSourceChartLoading(true)
        try {
            const data = await callProcedure('getSourceChartData', {})
            setSourceChartData(data)
        }
        catch (error) {
            console.error('Error fetching sources data:', error)
        }
        finally {
            setSourceChartLoading(false)
        }
    }

    const fetchDailyReportsData = async () => {
        setDailyReportsLoading(true)
        try {
            const data = await callProcedure('getDailyReportsData', {})
            setDailyReportsData(data)
        }
        catch (error) {
            console.error('Error fetching daily reports data:', error)
        }
        finally {
            setDailyReportsLoading(false)
        }
    }

    useEffect(() => {
        fetchMetrics()
        fetchGrowthChartData()
        fetchSourceChartData()
        fetchDailyReportsData()
    }, [])

    return (
        <Page>
            <Grid>
                <Grid.Col span={3}>
                    <Stat
                        label="Total Page Views"
                        value={metricsData?.totalRevenue ? Math.round(metricsData.totalRevenue / 2.5) : 0}
                        loading={metricsLoading}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Stat
                        label="Unique Visitors"
                        value={metricsData?.newUsers || 0}
                        loading={metricsLoading}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Stat
                        label="Verification Checks"
                        value={metricsData?.purchasedItems || 0}
                        loading={metricsLoading}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Stat
                        label="Growth Rate"
                        value={`${((metricsData?.growthRate || 0) * 100).toFixed(1)}%`}
                        loading={metricsLoading}
                    />
                </Grid.Col>
            </Grid>

            <Space h="xl" />

            <Grid>
                <Grid.Col span={8}>
                    <GrowthChart data={growthChartData} loading={growthChartLoading} />
                </Grid.Col>

                <Grid.Col span={4}>
                    <SourcesChart data={sourceChartData} loading={sourceChartLoading} />
                </Grid.Col>
            </Grid>

            <Space h="xl" />

            <Grid>
                <Grid.Col span={12}>
                    <DailyReportsTable data={dailyReportsData} loading={dailyReportsLoading} />
                </Grid.Col>
            </Grid>
        </Page>
    )
}
