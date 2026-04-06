<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import type { ChartPanelData } from '../../../../types'
import DashboardChartFrame from '../shared/DashboardChartFrame.vue'

const props = defineProps<{
  data: ChartPanelData
}>()

const chartOption = computed<EChartsOption>(() => ({
  animationDuration: 500,
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 34,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: props.data.categories,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#8D97A5',
      fontSize: 14.6667,
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      interval: 0,
      margin: 12
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 16000,
    interval: 4000,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#8D97A5',
      fontSize: 14.6667,
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      formatter: (value: number) => String(value)
    },
    splitLine: {
      lineStyle: {
        color: '#DEE2E7',
        type: 'dashed'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    backgroundColor: '#FFFFFF',
    borderColor: '#EFF0F6',
    borderWidth: 1,
    textStyle: {
      color: '#15191E',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    }
  },
  series: [
    {
      type: 'bar',
      data: props.data.series[0]?.data ?? [],
      barWidth: 40,
      itemStyle: {
        color: '#3899FA',
        borderRadius: [4, 4, 0, 0]
      }
    }
  ]
}))
</script>

<template>
  <div class="space-y-4">
    <h4 class="text-center text-[18.6667px] font-semibold leading-[27px] text-[#8D97A5]">
      {{ data.title }}
    </h4>
    <div class="overflow-x-auto">
      <div class="min-w-[620px]">
        <DashboardChartFrame :option="chartOption" :height="333" />
      </div>
    </div>
  </div>
</template>
