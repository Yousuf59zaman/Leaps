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

const props = defineProps<{
  data: CustomReportingFormData
  state: CustomReportState
}>()

const officeModel = computed({
  get: () => props.state.office ?? '',
  set: (value: string) => {
    props.state.office = value || null
  }
})

const layerModel = computed({
  get: () => props.state.layer ?? '',
  set: (value: string) => {
    props.state.layer = value || null
  }
})

const reportTypeModel = computed({
  get: () => props.state.reportType ?? '',
  set: (value: string) => {
    props.state.reportType = value || null
  }
})

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
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[var(--shadow-card)] min-[1400px]:min-h-[979px]">
    <span class="absolute left-0 top-[21.67px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-[22.67px] xl:px-[33px] xl:pb-10">
      <div class="flex items-center gap-3">
        <DashboardIcon name="settings-2" :size="27" class="text-[#3899FA]" />
        <h3 class="text-[20px] font-semibold leading-[30px] text-[#15191E] sm:text-[24px] sm:leading-[37px]">
          {{ data.title }}
        </h3>
      </div>

      <div class="mt-8 space-y-8 sm:mt-[33px] sm:space-y-[47px]">
        <SharedSelectField
          v-model="officeModel"
          label="Select Type"
          :options="data.officeOptions"
          variant="report-panel"
        />

        <SharedSelectField
          v-model="layerModel"
          label="Select Layer"
          :options="data.layerOptions"
          variant="report-panel"
        />

        <div>
          <span class="mb-3 block text-[16px] font-semibold uppercase leading-[21px] tracking-[0.8px] text-[#8D97A5]">
            Date Range
          </span>
          <div class="grid gap-3 sm:grid-cols-2">
            <SharedDateField
              v-model="state.dateRange.from"
              label="From date"
              variant="report-panel"
              hide-label
            />
            <SharedDateField
              v-model="state.dateRange.to"
              label="To date"
              variant="report-panel"
              hide-label
            />
          </div>
        </div>

        <SharedSelectField
          v-model="reportTypeModel"
          label="Report Type"
          :options="data.reportTypeOptions"
          variant="report-panel"
        />
      </div>

      <div class="mt-10 border-t border-[#DEE2E7] pt-[22px] sm:mt-[67px]">
        <button
          type="button"
          class="flex h-12 w-full items-center justify-center gap-3 rounded-[13.3333px] bg-[#3899FA] text-[18.6667px] font-medium leading-[29px] text-white transition-colors hover:bg-[#2f8ef0]"
          @click="setPreviewMode"
        >
          <DashboardIcon name="list-filter" :size="21" class="text-white" />
          <span>Generate Report</span>
        </button>

        <div class="mt-4 grid gap-[10.6667px] sm:grid-cols-2">
          <button
            type="button"
            class="flex h-12 items-center justify-center gap-2.5 rounded-[13.3333px] border border-[#DEE2E7] bg-[#F9FAFB] text-[16px] font-medium leading-[27px] text-[#15191E] transition-colors hover:bg-[#f1f4f7]"
            @click="selectExport('csv')"
          >
            <DashboardIcon name="download" :size="16" class="text-[#15191E]" />
            <span>CSV</span>
          </button>

          <button
            type="button"
            class="flex h-12 items-center justify-center gap-2.5 rounded-[13.3333px] border border-[#DEE2E7] bg-[#F9FAFB] text-[16px] font-medium leading-[27px] text-[#15191E] transition-colors hover:bg-[#f1f4f7]"
            @click="selectExport('pdf')"
          >
            <DashboardIcon name="file-text" :size="16" class="text-[#15191E]" />
            <span>PDF</span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
