<script setup lang="ts">

type ReportExportFormat = 'csv' | 'pdf' | 'xlsx' | 'preview'

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface DateRangeValue {
  from: string | null
  to: string | null
}

interface CustomReportState {
  reportType: string | null
  layer: string | null
  office: string | null
  dateRange: DateRangeValue
  exportFormat: ReportExportFormat | null
  previewMode: boolean
}

interface CustomReportingFormData {
  title: string
  subtitle?: string
  icon?: string
  badgeLabel?: string
  actions?: Array<{ id: string, label: string, icon?: string }>
  state: CustomReportState
  reportTypeOptions: SelectOption[]
  layerOptions: SelectOption[]
  officeOptions: SelectOption[]
}

defineProps<{
  data: CustomReportingFormData
  state: CustomReportState
}>()
</script>

<template>
  <CustomReportingFormPanel :data="data" :state="state" />
</template>
