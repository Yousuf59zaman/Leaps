<script setup lang="ts">
type ReportExportFormat = 'csv' | 'pdf' | 'preview'

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface CustomReportState {
  selectType: string | null
  region: string | null
  province: string | null
  municipality: string | null
  barangay: string | null
  reportType: string
  dateRange: {
    from: string | null
    to: string | null
  }
  exportFormat: ReportExportFormat | null
  previewMode: boolean
}

interface CustomReportingFormData {
  title: string
  subtitle?: string
  icon?: string
  selectTypeOptions: SelectOption[]
  regionOptions: SelectOption[]
  provinceOptions: SelectOption[]
  municipalityOptions: SelectOption[]
  barangayOptions: SelectOption[]
  reportTypeOptions: SelectOption[]
}

defineProps<{
  data: CustomReportingFormData
  state: CustomReportState
}>()
</script>

<template>
  <CustomReportingFormPanel :data="data" :state="state" />
</template>
