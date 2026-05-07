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

const props = defineProps<{
  data: CustomReportingFormData
  state: CustomReportState
}>()

const selectTypeModel = computed({
  get: () => props.state.selectType ?? '',
  set: (value: string) => {
    props.state.selectType = value || null
  }
})

const regionModel = computed({
  get: () => props.state.region ?? '',
  set: (value: string) => {
    props.state.region = value || null
  }
})

const provinceModel = computed({
  get: () => props.state.province ?? '',
  set: (value: string) => {
    props.state.province = value || null
  }
})

const municipalityModel = computed({
  get: () => props.state.municipality ?? '',
  set: (value: string) => {
    props.state.municipality = value || null
  }
})

const barangayModel = computed({
  get: () => props.state.barangay ?? '',
  set: (value: string) => {
    props.state.barangay = value || null
  }
})

const reportTypeModel = computed({
  get: () => props.state.reportType,
  set: (value: string) => {
    if (value) {
      props.state.reportType = value
    }
  }
})

const selectPlaceholder = 'Choose One'

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
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[var(--shadow-card)] min-[1400px]:min-h-[1023px]">
    <span class="absolute left-0 top-[21.67px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-[22.67px] xl:px-[33px] xl:pb-10">
      <div class="flex items-center gap-3">
        <DashboardIcon name="settings-2" :size="27" class="text-[#3899FA]" />
        <h3 class="text-[20px] font-semibold leading-[30px] text-[#15191E] sm:text-[24px] sm:leading-[37px]">
          {{ data.title }}
        </h3>
      </div>

      <div class="mt-5 space-y-3">
        <SharedSelectField
          v-model="selectTypeModel"
          label="Select Type"
          :placeholder="selectPlaceholder"
          placeholder-disabled
          :options="data.selectTypeOptions"
          variant="report-panel"
        />

        <SharedSelectField
          v-model="regionModel"
          label="Region"
          :placeholder="selectPlaceholder"
          placeholder-disabled
          :options="data.regionOptions"
          variant="report-panel"
        />

        <SharedSelectField
          v-model="provinceModel"
          label="Province"
          :placeholder="selectPlaceholder"
          placeholder-disabled
          :options="data.provinceOptions"
          variant="report-panel"
        />

        <SharedSelectField
          v-model="municipalityModel"
          label="Municipality"
          :placeholder="selectPlaceholder"
          placeholder-disabled
          :options="data.municipalityOptions"
          variant="report-panel"
        />

        <SharedSelectField
          v-model="barangayModel"
          label="Barangay"
          :placeholder="selectPlaceholder"
          placeholder-disabled
          :options="data.barangayOptions"
          variant="report-panel"
        />
      </div>

      <div class="mt-5 border-t border-[#DEE2E7] pt-5">
        <SharedSelectField
          v-model="reportTypeModel"
          label="Report Type"
          placeholder="Select Report Type"
          placeholder-disabled
          :options="data.reportTypeOptions"
          variant="report-panel"
        />
      </div>

      <div class="mt-5 border-b border-[#DEE2E7] pb-5">
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

      <div class="mt-[22px]">
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
