<script setup lang="ts">
import { computed } from 'vue'
import type { RequestSummaryData } from '../../../../types'
import { buildDonutChartOption } from '../../../utils/dashboard-chart-options'
import { formatCount } from '../../../utils/dashboard-formatters'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'

const props = defineProps<{
  data: RequestSummaryData
}>()

const donutOption = computed(() => buildDonutChartOption(props.data))

function toneClass(tone?: string) {
  switch (tone) {
    case 'success':
      return 'bg-[rgba(49,201,122,0.14)] text-[color:var(--color-success-500)]'
    case 'warning':
      return 'bg-[rgba(244,181,72,0.18)] text-[color:var(--color-warning-500)]'
    case 'danger':
      return 'bg-[rgba(244,106,106,0.16)] text-[color:var(--color-danger-500)]'
    default:
      return 'bg-[rgba(76,150,255,0.14)] text-[color:var(--color-brand-500)]'
  }
}
</script>

<template>
  <DashboardPanelShell :title="data.title" :icon="data.icon" :badge-label="data.periodLabel">
    <div class="grid gap-6 xl:grid-cols-[0.9fr_1fr] xl:items-center">
      <div class="space-y-4">
        <div class="flex items-center justify-between rounded-[var(--radius-card)] bg-[var(--color-surface-muted)] px-4 py-3">
          <span class="text-sm font-semibold text-[color:var(--color-text-muted)]">{{ data.totalLabel }}</span>
          <span class="rounded-full bg-[rgba(76,150,255,0.14)] px-3 py-1 text-sm font-semibold text-[color:var(--color-brand-500)]">
            {{ formatCount(data.totalRequests) }}
          </span>
        </div>

        <div class="space-y-3">
          <div v-for="status in data.statuses" :key="status.id" class="flex items-center justify-between gap-3">
            <span class="text-sm text-[color:var(--color-text-muted)]">{{ status.label }}</span>
            <span class="rounded-full px-3 py-1 text-sm font-semibold" :class="toneClass(status.tone)">
              {{ formatCount(status.value) }}
            </span>
          </div>
        </div>
      </div>

      <DashboardChartFrame :option="donutOption" :height="220" />
    </div>
  </DashboardPanelShell>
</template>
