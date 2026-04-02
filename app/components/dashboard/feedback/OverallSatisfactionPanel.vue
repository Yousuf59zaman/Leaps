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
  <DashboardPanelShell :title="data.title" :icon="data.icon" :actions="data.actions">
    <div class="space-y-5">
      <DashboardChartFrame :option="chartOption" :height="220" />
      <DashboardLegendList :items="data.legend" :columns="2" />
    </div>
  </DashboardPanelShell>
</template>
