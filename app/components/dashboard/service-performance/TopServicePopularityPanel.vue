<script setup lang="ts">
import { computed } from 'vue'
import type { ChartPanelData } from '../../../../types'
import { buildHorizontalBarChartOption } from '../../../utils/dashboard-chart-options'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'

const props = defineProps<{
  data: ChartPanelData
}>()

const chartOption = computed(() =>
  buildHorizontalBarChartOption(props.data, {
    showLegend: false,
    barMaxWidth: 16
  })
)
</script>

<template>
  <DashboardPanelShell :title="data.title" :subtitle="data.subtitle" :icon="data.icon">
    <DashboardChartFrame :option="chartOption" :height="340" />
  </DashboardPanelShell>
</template>
