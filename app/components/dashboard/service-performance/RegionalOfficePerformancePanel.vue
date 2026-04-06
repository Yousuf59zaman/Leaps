<script setup lang="ts">
import { computed } from 'vue'
import type { ChartDataPoint, ChartPanelData, LegendItem } from '../../../../types'
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

const maxValue = 60000
const plotHeight = 390.86
const yAxisLabels = ['60k', '45k', '30k', '15k', '0k']
const gridLinePositions = [0, 25, 50, 75, 100]

const legendItems = computed<LegendItem[]>(() =>
  props.data.legend?.length
    ? props.data.legend
    : props.data.series.map((series) => ({
        id: series.id,
        label: series.name,
        color: series.color || '#3899FA'
      }))
)

const categoryGroups = computed(() => {
  const categories = props.data.categories ?? []

  return categories.map((label, index) => ({
    label,
    bars: props.data.series.map((series) => {
      const value = getNumericValue(series.data[index] ?? 0)

      return {
        id: series.id,
        color: series.color || '#3899FA',
        height: (value / maxValue) * plotHeight
      }
    })
  }))
})
</script>

<template>
  <article class="relative w-full overflow-hidden rounded-[19px] bg-white px-5 pb-6 pt-8 shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)] sm:px-7 lg:px-[33px] lg:pb-[28px] lg:pt-[31px] min-[1400px]:h-[650px]">
    <span class="absolute left-0 top-[31px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="flex items-start gap-[12px]">
      <DashboardIcon :name="data.icon || 'benchmark'" :size="27" class="mt-[4px] shrink-0 text-[#3899FA]" />

      <div class="min-w-0">
        <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
          {{ data.title }}
        </h2>
        <p
          v-if="data.subtitle"
          class="text-[15px] font-normal leading-[22px] text-[#8D97A5] lg:text-[18.6667px] lg:leading-[27px]"
        >
          {{ data.subtitle }}
        </p>
      </div>
    </div>

    <div class="mt-6 overflow-x-auto lg:mt-[22px]">
      <div class="min-w-[700px] sm:min-w-[760px] lg:min-w-[830px]">
        <div class="relative ml-10 w-[calc(100%-40px)] sm:ml-[45px] sm:w-[785px]">
          <div class="relative h-[390px]">
            <div class="pointer-events-none absolute inset-0">
              <div
                v-for="(pos, index) in gridLinePositions"
                :key="index"
                class="absolute left-0 right-0 border-t border-dashed border-[#DEE2E7]"
                :style="{ top: `${pos}%` }"
              />
            </div>

            <div class="absolute -left-10 top-0 flex h-[390px] w-[30px] flex-col justify-between sm:-left-[45px] sm:w-[34px]">
              <span
                v-for="label in yAxisLabels"
                :key="label"
                class="text-sm font-normal leading-5 text-[#8D97A5] sm:text-[16px] sm:leading-[24px]"
              >
                {{ label }}
              </span>
            </div>

            <div class="absolute inset-0 flex justify-between">
              <div
                v-for="group in categoryGroups"
                :key="group.label"
                class="flex w-[96px] flex-col items-center justify-end sm:w-[118.67px]"
              >
                <div class="flex h-[390px] items-end gap-1 sm:gap-[5.33px]">
                  <div
                    v-for="bar in group.bars"
                    :key="bar.id"
                    class="w-[28px] rounded-t-[4px] sm:w-[36px]"
                    :style="{ height: `${bar.height}px`, backgroundColor: bar.color }"
                  />
                </div>

                <p class="mt-[11px] text-center text-[13px] font-normal leading-5 text-[#8D97A5] sm:text-[16px] sm:leading-[24px]">
                  {{ group.label }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-[30px] flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-[41px] sm:gap-x-[24px]">
            <div
              v-for="item in legendItems"
              :key="item.id"
              class="inline-flex items-center gap-[6px] whitespace-nowrap"
            >
              <span class="inline-block h-[18.67px] w-[18.67px] rounded-[2px]" :style="{ backgroundColor: item.color }" />
              <span class="text-sm font-normal leading-6 sm:text-[21.3333px] sm:leading-[32px]" :style="{ color: item.color }">
                {{ item.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
