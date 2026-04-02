<script setup lang="ts">
import { computed } from 'vue'
import type { ChartPanelData } from '../../../../types'
import { buildLineChartOption } from '../../../utils/dashboard-chart-options'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'

const props = defineProps<{
  data: ChartPanelData
}>()

const chartOption = computed(() => buildLineChartOption(props.data, { showLegend: false, showSymbols: false, gridBottom: 16 }))
</script>

<template>
  <DashboardPanelShell :title="data.title" :icon="data.icon">
    <DashboardChartFrame :option="chartOption" :height="250" />
  </DashboardPanelShell>
</template>
