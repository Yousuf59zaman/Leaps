<script setup lang="ts">
import { computed } from 'vue'
import type { CustomReportState, CustomReportingFormData } from '../../../../types'
import DashboardIcon from '../shared/DashboardIcon.vue'

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
        <label class="block">
          <span class="mb-3 block text-[16px] font-semibold uppercase leading-[21px] tracking-[0.8px] text-[#8D97A5]">
            Select Type
          </span>
          <div class="relative">
            <select
              v-model="officeModel"
              class="h-[53.33px] w-full appearance-none rounded-[13.3333px] border border-[#DEE2E7] bg-[#F9FAFB] px-[21px] pr-14 text-[18px] font-normal leading-[27px] text-[rgba(0,0,0,0.7)] outline-none transition-colors focus:border-[rgba(56,153,250,0.45)] xl:text-[21.3334px] xl:tracking-[-0.400001px]"
            >
              <option value="">Choose One</option>
              <option v-for="option in data.officeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <span class="pointer-events-none absolute inset-y-0 right-[18px] flex items-center text-black">
              <DashboardIcon name="chevron" :size="18" />
            </span>
          </div>
        </label>

        <label class="block">
          <span class="mb-3 block text-[16px] font-semibold uppercase leading-[21px] tracking-[0.8px] text-[#8D97A5]">
            Select Layer
          </span>
          <div class="relative">
            <select
              v-model="layerModel"
              class="h-[53.33px] w-full appearance-none rounded-[13.3333px] border border-[#DEE2E7] bg-[#F9FAFB] px-[21px] pr-14 text-[18px] font-normal leading-[27px] text-[rgba(0,0,0,0.7)] outline-none transition-colors focus:border-[rgba(56,153,250,0.45)] xl:text-[21.3334px] xl:tracking-[-0.400001px]"
            >
              <option value="">Choose One</option>
              <option v-for="option in data.layerOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <span class="pointer-events-none absolute inset-y-0 right-[18px] flex items-center text-black">
              <DashboardIcon name="chevron" :size="18" />
            </span>
          </div>
        </label>

        <div>
          <span class="mb-3 block text-[16px] font-semibold uppercase leading-[21px] tracking-[0.8px] text-[#8D97A5]">
            Date Range
          </span>
          <div class="grid gap-3 sm:grid-cols-2">
            <input
              v-model="state.dateRange.from"
              type="text"
              class="h-[46.67px] min-w-0 rounded-[13.3333px] border border-[#DEE2E7] bg-[#F9FAFB] px-[19px] text-[18.6667px] font-normal leading-[29px] text-[#15191E] outline-none transition-colors focus:border-[rgba(56,153,250,0.45)]"
              placeholder="YYYY-MM-DD"
            />
            <input
              v-model="state.dateRange.to"
              type="text"
              class="h-[46.67px] min-w-0 rounded-[13.3333px] border border-[#DEE2E7] bg-[#F9FAFB] px-[19px] text-[18.6667px] font-normal leading-[29px] text-[#15191E] outline-none transition-colors focus:border-[rgba(56,153,250,0.45)]"
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>

        <label class="block">
          <span class="mb-3 block text-[16px] font-semibold uppercase leading-[21px] tracking-[0.8px] text-[#8D97A5]">
            Report Type
          </span>
          <div class="relative">
            <select
              v-model="reportTypeModel"
              class="h-[53.33px] w-full appearance-none rounded-[13.3333px] border border-[#DEE2E7] bg-[#F9FAFB] px-[21px] pr-14 text-[18px] font-normal leading-[27px] text-[rgba(0,0,0,0.7)] outline-none transition-colors focus:border-[rgba(56,153,250,0.45)] xl:text-[21.3334px] xl:tracking-[-0.400001px]"
            >
              <option value="">Choose One</option>
              <option v-for="option in data.reportTypeOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <span class="pointer-events-none absolute inset-y-0 right-[18px] flex items-center text-black">
              <DashboardIcon name="chevron" :size="18" />
            </span>
          </div>
        </label>
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
