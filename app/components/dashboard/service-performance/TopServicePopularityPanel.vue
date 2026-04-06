<script setup lang="ts">
import { computed } from 'vue'
import type { ChartDataPoint, ChartPanelData } from '../../../../types'
import DashboardIcon from '../shared/DashboardIcon.vue'

const props = defineProps<{
  data: ChartPanelData
}>()

function getNumericValue(point: number | null | ChartDataPoint) {
  if (typeof point === 'number') {
    return point
  }

  if (point === null) {
    return 0
  }

  return Number(point.value)
}

const maxValue = 1000000

const barItems = computed(() => {
  const categories = props.data.categories ?? []
  const series = props.data.series[0]

  if (!series) {
    return []
  }

  return categories.map((label, index) => ({
    label,
    value: getNumericValue(series.data[index] ?? 0),
    percent: (getNumericValue(series.data[index] ?? 0) / maxValue) * 100
  }))
})

const xAxisLabels = ['0k', '250k', '500k', '750k', '1000k']
const gridLinePositions = [0, 25, 50, 75, 100]
</script>

<template>
  <article class="relative w-full overflow-hidden rounded-[19px] bg-white shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)] min-[1400px]:h-[651px]">
    <span class="absolute left-0 top-[31px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="px-5 pt-7 sm:px-6 lg:px-[33px] lg:pt-[31px]">
      <div class="flex items-start gap-[12px]">
        <DashboardIcon :name="data.icon || 'badge-check'" :size="27" class="mt-[6px] shrink-0 text-[#3899FA]" />

        <div class="min-w-0">
          <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
            {{ data.title }}
          </h2>
          <p
            v-if="data.subtitle"
            class="mt-[1px] text-[15px] font-normal leading-[22px] text-[#8D97A5] lg:text-[18.6667px] lg:leading-[27px]"
          >
            {{ data.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-5 px-5 pb-6 sm:px-6 lg:mt-[23px] lg:px-[33px] lg:pb-[29px]">
      <div class="overflow-x-auto">
        <div class="relative min-w-[640px] sm:min-w-[720px] lg:min-w-[840px]">
          <div class="pointer-events-none absolute inset-x-0 bottom-[37px] top-[28px]">
            <div
              v-for="(pos, index) in gridLinePositions"
              :key="index"
              class="absolute top-0 bottom-0 border-l border-dashed border-[#DEE2E7]"
              :style="{ left: `${pos}%` }"
            />
          </div>

          <div class="relative">
            <div
              v-for="(item, index) in barItems"
              :key="index"
              class="h-[44px] lg:h-[46.33px]"
            >
              <p class="truncate pr-4 text-[11px] font-normal leading-[18px] text-[#15191E] sm:text-[12px] sm:leading-[20px] lg:text-[14.6667px] lg:leading-[23px]">
                {{ item.label }}
              </p>
              <div class="mt-[3px] pr-[12px]">
                <div
                  class="h-[20px] rounded-r-[6px] bg-[#1DC973] transition-all duration-500"
                  :style="{ width: `${item.percent}%` }"
                />
              </div>
            </div>
          </div>

          <div class="mt-[8px] flex items-center justify-between pr-[12px]">
            <span
              v-for="(label, index) in xAxisLabels"
              :key="index"
              class="text-[14px] font-normal leading-[22px] text-[#8D97A5] lg:text-[16px] lg:leading-[24px]"
            >
              {{ label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
