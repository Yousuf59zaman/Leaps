<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import type { ChartDataPoint, ChartPanelData } from '../../../../types'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'

const props = defineProps<{
  data: ChartPanelData
}>()

const monthlyTrendIcon = '/figma-assets/monthly-registration-trend-icon.svg'

function getNumericValue(point: number | null | ChartDataPoint) {
  if (typeof point === 'number') {
    return point
  }

  if (point === null) {
    return 0
  }

  return Number(point.value)
}

const chartValues = computed(() => props.data.series[0]?.data.map(getNumericValue) ?? [])

const chartOption = computed<EChartsOption>(() => ({
  animationDuration: 600,
  tooltip: { show: false },
  grid: {
    left: 36,
    right: 20,
    top: 10,
    bottom: 44
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.data.categories ?? [],
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    axisLabel: {
      color: '#8D97A5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 16,
      margin: 16,
      interval: 0
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 360000,
    interval: 90000,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#8D97A5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 16,
      margin: 12,
      formatter: (value: number) => `${Math.round(value / 1000)}k`
    },
    splitLine: {
      lineStyle: {
        color: '#DEE2E7',
        type: 'dashed',
        width: 1.33333
      }
    }
  },
  series: [
    {
      type: 'line',
      data: chartValues.value,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        color: props.data.series[0]?.color ?? '#3899FA',
        width: 4,
        cap: 'round'
      }
    }
  ]
}))
</script>

<template>
  <article
    class="relative overflow-hidden rounded-[19px] border border-[#EFF0F6] bg-white shadow-[0px_6.66668px_26.6667px_rgba(0,0,0,0.05)] min-[1400px]:h-[421px]"
  >
    <span class="absolute left-[-1.33px] top-[21.67px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="flex items-center gap-3 px-5 pt-6 sm:px-6 lg:px-[33px] lg:pt-[23px]">
      <img :src="monthlyTrendIcon" alt="" class="size-6" />
      <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
        {{ data.title }}
      </h2>
    </div>

    <div class="mt-[18px] px-4 pb-5 sm:px-6 lg:px-[24px] lg:pb-[16px]">
      <div class="overflow-x-auto">
        <div class="min-w-[560px] sm:min-w-0">
          <DashboardChartFrame :option="chartOption" height="clamp(260px, 42vw, 318px)" />
        </div>
      </div>
    </div>
  </article>
</template>
