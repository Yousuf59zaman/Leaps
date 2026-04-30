<script setup lang="ts">

type TableAlign = 'left' | 'center' | 'right'

interface PanelAction {
  id: string
  label: string
  icon?: string
}

interface TableColumn<T extends object> {
  key: keyof T | (string & {})
  label: string
  align?: TableAlign
  width?: string
  sortable?: boolean
  emphasize?: boolean
  formatter?: (value: unknown, row: T, index: number) => string
}

interface TablePanelData<T extends object> {
  title: string
  subtitle?: string
  icon?: string
  badgeLabel?: string
  actions?: PanelAction[]
  columns: TableColumn<T>[]
  rows: T[]
}

interface AgeGroupRow {
  serial: number
  groupedAge: string
  male: number
  female: number
  common: number
  total: number
}

interface VulnerabilityRow {
  serial: number
  vulnerability: string
  male: number
  female: number
  common: number
  grandTotal: number
}

defineProps<{
  ageGroups: TablePanelData<AgeGroupRow>
  vulnerabilityMatrix: TablePanelData<VulnerabilityRow>
}>()
</script>

<template>
  <div class="grid gap-[31px]">
    <ReportingTableCard
      :title="ageGroups.title"
      :icon="ageGroups.icon"
      :actions="ageGroups.actions"
      :columns="ageGroups.columns"
      :rows="ageGroups.rows"
      variant="age"
    />

    <ReportingTableCard
      :title="vulnerabilityMatrix.title"
      :icon="vulnerabilityMatrix.icon"
      :actions="vulnerabilityMatrix.actions"
      :columns="vulnerabilityMatrix.columns"
      :rows="vulnerabilityMatrix.rows"
      variant="vulnerability"
    />
  </div>
</template>
