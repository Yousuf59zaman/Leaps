<script setup lang="ts">
import { computed } from 'vue'
import type { OfficeEfficiencyRow, TableColumn, TablePanelData } from '../../../../types'
import { formatCount } from '../../../utils/dashboard-formatters'
import DashboardTable from '../shared/DashboardTable.vue'

const props = defineProps<{
  data: TablePanelData<OfficeEfficiencyRow>
}>()

const columns = computed<TableColumn<Record<string, unknown>>[]>(() =>
  props.data.columns.map((column) => {
    if (column.key === 'totalTokens') {
      return {
        ...column,
        formatter: (value) => formatCount(Number(value))
      }
    }

    return column as TableColumn<Record<string, unknown>>
  })
)

function statusClass(status: unknown) {
  return status === 'Review Needed'
    ? 'bg-[rgba(244,181,72,0.18)] text-[color:var(--color-warning-500)]'
    : 'bg-[rgba(49,201,122,0.14)] text-[color:var(--color-success-500)]'
}
</script>

<template>
  <div class="space-y-4">
    <DashboardTable :columns="columns" :rows="data.rows" row-key="officeName" compact>
      <template #cell-status="{ value }">
        <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold" :class="statusClass(value)">
          {{ value }}
        </span>
      </template>
    </DashboardTable>
  </div>
</template>
