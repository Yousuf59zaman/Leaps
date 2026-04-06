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
  <article class="overflow-hidden rounded-[19px] bg-white shadow-[var(--shadow-card)] min-[1400px]:min-h-[979px]">
    <div class="relative border-b border-[#DEE2E7] bg-[rgba(243,245,247,0.3)] pb-[27px] pt-[20.67px]">
      <span class="absolute left-0 top-[20.67px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

      <div class="flex flex-wrap items-start justify-between gap-4 px-5 sm:px-8 xl:px-[33px]">
        <div class="flex items-start gap-3">
          <DashboardIcon name="benchmark" :size="27" class="mt-1 text-[#3899FA]" />
          <div>
            <h3 class="text-[20px] font-semibold leading-[30px] text-[#15191E] sm:text-[24px] sm:leading-[37px]">
              {{ data.title }}
            </h3>
            <p v-if="data.subtitle" class="text-[15px] font-normal leading-[22px] text-[#8D97A5] sm:text-[18.6667px] sm:leading-[27px]">
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

    <div class="px-5 pb-6 pt-[16px] sm:px-6 xl:px-[34px] xl:pb-[27px]">
      <OfficeEfficiencyChart :data="data.chart" />
      <div class="mt-[14px]">
        <OfficeEfficiencyTable :data="data.table" />
      </div>
    </div>
  </article>
</template>
