<script setup lang="ts">
import type { CustomReportState, CustomReportingFormData } from '../../../../types'
import DashboardActionButton from '../shared/DashboardActionButton.vue'
import DashboardField from '../shared/DashboardField.vue'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'

const props = defineProps<{
  data: CustomReportingFormData
  state: CustomReportState
}>()

function selectExport(format: 'csv' | 'pdf') {
  props.state.exportFormat = format
  props.state.previewMode = false
}

function setPreviewMode() {
  props.state.exportFormat = 'preview'
  props.state.previewMode = true
}
</script>

<template>
  <DashboardPanelShell :title="data.title" :icon="data.icon">
    <div class="space-y-5">
      <DashboardField label="Select Type" :model-value="state.office" :options="data.officeOptions" @update:model-value="state.office = $event" />
      <DashboardField label="Select Layer" :model-value="state.layer" :options="data.layerOptions" @update:model-value="state.layer = $event" />

      <div class="space-y-2">
        <p class="text-sm font-medium text-[color:var(--color-text-strong)]">Date Range</p>
        <div class="grid gap-3 sm:grid-cols-2">
          <DashboardField type="date" label="From" :model-value="state.dateRange.from" @update:model-value="state.dateRange.from = $event" />
          <DashboardField type="date" label="To" :model-value="state.dateRange.to" @update:model-value="state.dateRange.to = $event" />
        </div>
      </div>

      <DashboardField label="Report Type" :model-value="state.reportType" :options="data.reportTypeOptions" @update:model-value="state.reportType = $event" />

      <div class="border-t border-[color:var(--app-surface-border)] pt-5">
        <div class="space-y-3">
          <DashboardActionButton label="Generate Report" variant="primary" class="w-full justify-center" @click="setPreviewMode" />
          <div class="grid gap-3 sm:grid-cols-2">
            <DashboardActionButton label="CSV" icon="download" variant="secondary" class="justify-center" @click="selectExport('csv')" />
            <DashboardActionButton label="PDF" icon="file-text" variant="secondary" class="justify-center" @click="selectExport('pdf')" />
          </div>
        </div>
      </div>
    </div>
  </DashboardPanelShell>
</template>
