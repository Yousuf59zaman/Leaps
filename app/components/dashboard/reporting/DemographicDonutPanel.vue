<script setup lang="ts">
import { computed } from 'vue'
import { buildDonutChartOption } from '../../../utils/dashboard-chart-options'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'
import DashboardLegendList from '../shared/DashboardLegendList.vue'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'

interface LegendItem {
  id: string
  label: string
  color: string
  value?: number | string
  percentage?: number
  tone?: string
}

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

interface DonutPanelData {
  title: string
  subtitle?: string
  icon?: string
  badgeLabel?: string
  actions?: Array<{ id: string, label: string, icon?: string }>
  series: ChartSeriesData[]
  legend: LegendItem[]
  centerLabel?: string
}

const props = defineProps<{
  data: DonutPanelData
}>()

const chartOption = computed(() => buildDonutChartOption(props.data))
</script>

<template>
  <DashboardPanelShell :title="data.title" :icon="data.icon">
    <div class="grid gap-5 xl:grid-cols-[0.75fr_1fr] xl:items-center">
      <DashboardLegendList :items="data.legend" />
      <DashboardChartFrame :option="chartOption" :height="220" />
    </div>
  </DashboardPanelShell>
</template>
