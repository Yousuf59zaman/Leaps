<script setup lang="ts">
import { computed } from 'vue'
import type { DonutPanelData } from '../../../../types'
import { buildDonutChartOption } from '../../../utils/dashboard-chart-options'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'
import DashboardLegendList from '../shared/DashboardLegendList.vue'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'

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
