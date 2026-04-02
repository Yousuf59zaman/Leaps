<script setup lang="ts">
import type { OfficeEfficiencyReportData } from '../../../../types'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'
import OfficeEfficiencyChart from './OfficeEfficiencyChart.vue'
import OfficeEfficiencyTable from './OfficeEfficiencyTable.vue'

defineProps<{
  data: OfficeEfficiencyReportData
}>()
</script>

<template>
  <DashboardPanelShell :title="data.title" :subtitle="data.subtitle" :icon="data.icon" :badge-label="data.badgeLabel">
    <div class="space-y-8">
      <OfficeEfficiencyChart :data="data.chart" />
      <OfficeEfficiencyTable :data="data.table" />
    </div>
  </DashboardPanelShell>
</template>
