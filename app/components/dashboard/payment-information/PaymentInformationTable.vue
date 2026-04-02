<script setup lang="ts">
import { computed } from 'vue'
import type { PaymentInformationRow, TableColumn, TablePanelData } from '../../../../types'
import { formatCurrency } from '../../../utils/dashboard-formatters'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'
import DashboardTable from '../shared/DashboardTable.vue'

const props = defineProps<{
  data: TablePanelData<PaymentInformationRow>
}>()

const columns = computed<TableColumn<Record<string, unknown>>[]>(() =>
  props.data.columns.map((column) => {
    if (column.key === 'receivableAmount' || column.key === 'receivedAmount') {
      return {
        ...column,
        formatter: (value) => formatCurrency(Number(value))
      }
    }

    return column as TableColumn<Record<string, unknown>>
  })
)
</script>

<template>
  <DashboardPanelShell :title="data.title" :icon="data.icon">
    <DashboardTable :columns="columns" :rows="data.rows" row-key="serial" />
  </DashboardPanelShell>
</template>
