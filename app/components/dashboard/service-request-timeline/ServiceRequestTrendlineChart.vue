<script setup lang="ts">
import { computed } from 'vue'
import type { ChartPanelData } from '../../../../types'
import { buildTimelineChartOption } from '../../../utils/dashboard-chart-options'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'

const props = defineProps<{
  data: ChartPanelData
}>()

const chartOption = computed(() => buildTimelineChartOption(props.data))
</script>

<template>
  <DashboardPanelShell :title="data.title" :icon="data.icon">
    <DashboardChartFrame :option="chartOption" :height="430" />
  </DashboardPanelShell>
</template>
