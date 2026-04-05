<script setup lang="ts">
import type { OfficeEfficiencyReportData } from '../../../../types'
import DashboardIcon from '../shared/DashboardIcon.vue'
import OfficeEfficiencyChart from './OfficeEfficiencyChart.vue'
import OfficeEfficiencyTable from './OfficeEfficiencyTable.vue'

defineProps<{
  data: OfficeEfficiencyReportData
}>()
</script>

<template>
  <article class="overflow-hidden rounded-[19px] bg-white shadow-[var(--shadow-card)] xl:min-h-[979px]">
    <div class="relative border-b border-[#DEE2E7] bg-[rgba(243,245,247,0.3)] pb-[27px] pt-[20.67px]">
      <span class="absolute left-0 top-[20.67px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

      <div class="flex flex-wrap items-start justify-between gap-4 px-8 xl:px-[33px]">
        <div class="flex items-start gap-3">
          <DashboardIcon name="benchmark" :size="27" class="mt-1 text-[#3899FA]" />
          <div>
            <h3 class="text-[24px] font-semibold leading-[37px] text-[#15191E]">
              {{ data.title }}
            </h3>
            <p v-if="data.subtitle" class="text-[18.6667px] font-normal leading-[27px] text-[#8D97A5]">
              {{ data.subtitle }}
            </p>
          </div>
        </div>

        <span
          v-if="data.badgeLabel"
          class="mt-[11px] inline-flex h-[29.33px] items-center rounded-[13.3333px] bg-[#F3F5F7] px-[14.67px] text-[16px] font-semibold leading-[21px] text-[#1C2027] [font-family:var(--font-ui-accent)]"
        >
          {{ data.badgeLabel }}
        </span>
      </div>
    </div>

    <div class="px-6 pb-6 pt-[16px] xl:px-[34px] xl:pb-[27px]">
      <OfficeEfficiencyChart :data="data.chart" />
      <div class="mt-[14px]">
        <OfficeEfficiencyTable :data="data.table" />
      </div>
    </div>
  </article>
</template>
