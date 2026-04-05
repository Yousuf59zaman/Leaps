<script setup lang="ts">
import { computed } from 'vue'
import type { RequestSummaryData } from '../../../../types'
import { formatCount } from '../../../utils/dashboard-formatters'
import DashboardIcon from '../shared/DashboardIcon.vue'

const props = defineProps<{
  data: RequestSummaryData
}>()

interface SummaryRow {
  id: string
  label: string
  value: string
  background: string
  color: string
}

const totalRow = computed<SummaryRow>(() => ({
  id: 'total-requests',
  label: props.data.totalLabel,
  value: formatCount(props.data.totalRequests),
  background: '#3899FA',
  color: '#FFFFFF'
}))

const summaryRows = computed<SummaryRow[]>(() =>
  props.data.statuses.map((status) => {
    switch (status.id) {
      case 'open':
        return { id: status.id, label: status.label, value: formatCount(status.value), background: '#FF9330', color: '#FFFFFF' }
      case 'rejected':
        return { id: status.id, label: status.label, value: formatCount(status.value), background: '#F3F5F7', color: '#15191E' }
      case 'cancelled':
        return { id: status.id, label: status.label, value: formatCount(status.value), background: '#FF4343', color: '#FFFFFF' }
      case 'complete':
        return { id: status.id, label: status.label, value: formatCount(status.value), background: '#4FD463', color: '#FFFFFF' }
      default:
        return { id: status.id, label: status.label, value: formatCount(status.value), background: '#F4C533', color: '#FFFFFF' }
    }
  })
)

const donutBackground = computed(
  () =>
    'conic-gradient(from -90deg, #3899FA 0deg 76deg, #FFFFFF 76deg 84deg, #4FD463 84deg 236deg, #FFFFFF 236deg 244deg, #FF9330 244deg 296deg, #FFFFFF 296deg 304deg, #F3F5F7 304deg 360deg)'
)
</script>

<template>
  <article
    class="relative overflow-hidden rounded-[19px] border border-[#EFF0F6] bg-white shadow-[0px_6.66668px_26.6667px_rgba(0,0,0,0.05)] xl:h-[429px]"
  >
    <span class="absolute left-0 top-[21.67px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="border-b border-[#E4E5E7] px-5 pb-5 pt-6 sm:px-6 lg:px-[31.67px] lg:pb-[18px] lg:pt-[23px]">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <DashboardIcon :name="data.icon || 'map'" :size="24" class="text-[#3899FA]" />
          <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
            {{ data.title }}
          </h2>
        </div>

        <button class="inline-flex items-center gap-1 text-[14px] font-normal leading-[21px] text-[#1C3662]">
          <span>{{ data.periodLabel }}</span>
          <DashboardIcon name="chevron" :size="14" class="text-[#667085]" />
        </button>
      </div>
    </div>

    <div class="grid gap-6 px-5 py-5 sm:px-6 lg:grid-cols-[1fr_305px] lg:px-[31.67px] lg:py-[18px]">
      <div class="space-y-[18px] lg:pt-[2px]">
        <div class="flex items-center justify-between gap-4 text-[18px] leading-[27px] text-[#15191E] lg:text-[20px] lg:leading-[30px]">
          <span class="font-normal">{{ totalRow.label }}</span>
          <span
            class="inline-flex h-[24px] min-w-[74px] items-center justify-center rounded-[6px] px-3 text-[16px] font-semibold leading-[21px]"
            :style="{ backgroundColor: totalRow.background, color: totalRow.color }"
          >
            {{ totalRow.value }}
          </span>
        </div>

        <div
          v-for="row in summaryRows"
          :key="row.id"
          class="flex items-center justify-between gap-4 text-[18px] leading-[27px] text-[#15191E] lg:text-[20px] lg:leading-[30px]"
        >
          <span class="font-normal">{{ row.label }}</span>
          <span
            class="inline-flex h-[28px] min-w-[70px] items-center justify-center rounded-[6px] px-3 text-[16px] font-semibold leading-[21px]"
            :style="{ backgroundColor: row.background, color: row.color }"
          >
            {{ row.value }}
          </span>
        </div>
      </div>

      <div class="flex items-center justify-center lg:justify-end">
        <div class="relative size-[210px] lg:size-[292px]">
          <div class="absolute inset-0 rounded-full" :style="{ background: donutBackground }" />
          <div class="absolute inset-[31%] rounded-full bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.9)]" />
        </div>
      </div>
    </div>
  </article>
</template>
