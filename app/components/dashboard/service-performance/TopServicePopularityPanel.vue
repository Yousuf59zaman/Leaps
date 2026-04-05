<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import type { ChartDataPoint, ChartPanelData } from '../../../../types'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'
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

const chartValues = computed(() => props.data.series[0]?.data.map(getNumericValue) ?? [])

const chartOption = computed<EChartsOption>(() => ({
  animationDuration: 600,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(34, 195, 88, 0.08)'
      }
    },
    backgroundColor: '#FFFFFF',
    borderColor: '#DEE2E7',
    borderWidth: 1,
    padding: [10, 12],
    textStyle: {
      color: '#171A1F',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 12
    },
    formatter: (params: Array<{ axisValue: string; value: number }>) => {
      const point = params[0]

      if (!point) {
        return ''
      }

      return `${point.axisValue}<br />${point.value.toLocaleString()}`
    }
  },
  grid: {
    left: 4,
    right: 6,
    top: 8,
    bottom: 6,
    containLabel: true
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: 1000000,
    interval: 250000,
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: {
      lineStyle: {
        color: '#DEE2E7',
        type: 'dashed',
        width: 1
      }
    },
    axisLabel: {
      color: '#8D97A5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 12,
      margin: 14,
      formatter: (value: number) => `${Math.round(value / 1000)}k`
    }
  },
  yAxis: {
    type: 'category',
    inverse: true,
    data: props.data.categories ?? [],
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    axisLabel: {
      color: '#171A1F',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 12,
      margin: 10,
      width: 170,
      overflow: 'truncate'
    }
  },
  series: [
    {
      type: 'bar',
      data: chartValues.value,
      barWidth: 11,
      itemStyle: {
        color: props.data.series[0]?.color ?? '#22C358',
        borderRadius: 999
      },
      emphasis: {
        itemStyle: {
          color: props.data.series[0]?.color ?? '#22C358'
        }
      }
    }
  ]
}))
</script>

<template>
  <article
    class="relative w-full overflow-hidden rounded-[19px] bg-white px-5 pb-6 pt-8 shadow-[0px_2.5px_5.5px_rgba(0,0,0,0.06)] sm:px-7 lg:px-[33px] lg:pb-[30px] lg:pt-[31px] xl:h-[651px]"
  >
    <span class="absolute left-0 top-[31px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="flex items-start gap-[12px]">
      <DashboardIcon :name="data.icon || 'indicator'" :size="27" class="mt-[4px] text-[#3899FA]" />

      <div>
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

    <div class="mt-5 lg:mt-[26px]">
      <DashboardChartFrame :option="chartOption" :height="500" />
    </div>
  </article>
</template>
