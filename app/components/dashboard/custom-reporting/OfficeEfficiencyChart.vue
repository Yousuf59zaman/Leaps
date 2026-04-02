<script setup lang="ts">
import { computed } from 'vue'
import type { ChartPanelData } from '../../../../types'
import { buildVerticalBarChartOption } from '../../../utils/dashboard-chart-options'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'

const props = defineProps<{
  data: ChartPanelData
}>()

const chartOption = computed(() => buildVerticalBarChartOption(props.data, { showLegend: false, barMaxWidth: 24, gridBottom: 16 }))
</script>

<template>
  <div class="space-y-4">
    <h4 class="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-text-muted)]">
      {{ data.title }}
    </h4>
    <DashboardChartFrame :option="chartOption" :height="280" />
  </div>
</template>
