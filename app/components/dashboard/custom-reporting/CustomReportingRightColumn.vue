<script setup lang="ts">
import OfficeEfficiencyReportPanel from './OfficeEfficiencyReportPanel.vue'

interface ChartDataPoint {
  label: string
  value: number | string
  color?: string
  meta?: Record<string, string | number | boolean | null>
}

interface ChartSeriesData {
  id: string
  name: string
  type: string
  color?: string
  stack?: string
  smooth?: boolean
  area?: boolean
  data: Array<number | null | ChartDataPoint>
}

interface ChartPanelData {
  title: string
  subtitle?: string
  icon?: string
  badgeLabel?: string
  actions?: Array<{ id: string, label: string, icon?: string }>
  categories?: string[]
  series: ChartSeriesData[]
}

interface TableColumn<T extends object> {
  key: keyof T | (string & {})
  label: string
  align?: 'left' | 'center' | 'right'
  width?: string
  sortable?: boolean
  emphasize?: boolean
  formatter?: (value: unknown, row: T, index: number) => string
}

interface TablePanelData<T extends object> {
  title: string
  subtitle?: string
  icon?: string
  badgeLabel?: string
  actions?: Array<{ id: string, label: string, icon?: string }>
  columns: TableColumn<T>[]
  rows: T[]
}

interface OfficeEfficiencyRow {
  officeName: string
  totalTokens: number
  averageServiceTime: string
  averageWaitingTime: string
  status: string
}

interface OfficeEfficiencyReportData {
  title: string
  subtitle?: string
  icon?: string
  badgeLabel?: string
  actions?: Array<{ id: string, label: string, icon?: string }>
  generatedAt?: string
  chart: ChartPanelData
  table: TablePanelData<OfficeEfficiencyRow>
}

defineProps<{
  data: OfficeEfficiencyReportData
}>()
</script>

<template>
  <OfficeEfficiencyReportPanel :data="data" />
</template>
