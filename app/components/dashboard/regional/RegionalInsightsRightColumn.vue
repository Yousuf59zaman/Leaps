<script setup lang="ts">

type DashboardMetricValue = number | string

interface ChartDataPoint {
  label: string
  value: DashboardMetricValue
  color?: string
}

interface ChartSeriesData {
  id: string
  name: string
  type: string
  color?: string
  smooth?: boolean
  data: Array<number | null | ChartDataPoint>
}

interface LegendItem {
  id: string
  label: string
  color: string
  value?: DashboardMetricValue
}

interface ChartPanelData {
  title: string
  icon?: string
  categories?: string[]
  series: ChartSeriesData[]
  legend?: LegendItem[]
}

interface RequestSummaryData {
  title: string
  icon?: string
  totalRequests: number
  totalLabel: string
  periodLabel: string
  statuses: Array<{
    id: string
    label: string
    value: DashboardMetricValue
    color?: string
  }>
  legend: LegendItem[]
  series: ChartSeriesData[]
}

defineProps<{
  requestSummary: RequestSummaryData
  monthlyRegistrationTrend: ChartPanelData
}>()
</script>

<template>
  <div class="grid gap-5 sm:gap-6 xl:gap-[31px]">
    <RequestSummaryPanel :data="requestSummary" />
    <MonthlyRegistrationTrendPanel :data="monthlyRegistrationTrend" />
  </div>
</template>
