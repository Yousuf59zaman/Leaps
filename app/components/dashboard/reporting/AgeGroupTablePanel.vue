<script setup lang="ts">
import type { AgeGroupRow, TablePanelData } from '../../../../types'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'
import DashboardTable from '../shared/DashboardTable.vue'

defineProps<{
  data: TablePanelData<AgeGroupRow>
}>()
</script>

<template>
  <DashboardPanelShell :title="data.title" :icon="data.icon" :actions="data.actions">
    <DashboardTable :columns="data.columns" :rows="data.rows" row-key="serial" compact />
  </DashboardPanelShell>
</template>
