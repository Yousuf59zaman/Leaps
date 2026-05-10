<script setup lang="ts">
import type { EChartsOption } from 'echarts'

const searchQuery = ref('')
const activePeriod = ref<'monthly' | 'quarterly'>('monthly')

const growthColors = {
  brand: '#3899FA',
  success: '#1DC973',
  lightSuccess: '#75D337',
  grid: '#EFF0F6',
  axis: '#DEE2E7',
  text: '#15191E',
  muted: '#8D97A5'
} as const

const periodOptions = [
  { key: 'monthly', label: 'Monthly' },
  { key: 'quarterly', label: 'Quarterly' }
] as const

const chartValues = [
  { month: 'Jan', value: 1 },
  { month: 'Feb', value: 1 },
  { month: 'Mar', value: 2 },
  { month: 'Apr', value: 1 },
  { month: 'May', value: 0 },
  { month: 'Jun', value: 1 },
  { month: 'Jul', value: 0 },
  { month: 'Aug', value: 4 },
  { month: 'Sep', value: 1 },
  { month: 'Oct', value: 2 },
  { month: 'Nov', value: 3 },
  { month: 'Dec', value: 1 }
]

const rows = [
  { id: 'barmm-aug', region: 'Bangsamoro (BARMM)', period: '2025 August', count: 4 },
  { id: 'barmm-dec', region: 'Bangsamoro (BARMM)', period: '2025 December', count: 1 },
  { id: 'barmm-jan', region: 'Bangsamoro (BARMM)', period: '2025 January', count: 1 },
  { id: 'barmm-feb', region: 'Bangsamoro (BARMM)', period: '2025 February', count: 1 },
  { id: 'region-i-mar', region: 'Region I', period: '2025 March', count: 2 },
  { id: 'ncr-jun', region: 'NCR', period: '2025 June', count: 1 }
]

const sortIcon = '&#8645;'
const maxCount = 4

const growthTrendOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: growthColors.brand,
        opacity: 0.45,
        type: 'dashed'
      }
    },
    valueFormatter: value => `${value} new registrations`
  },
  grid: {
    left: 42,
    right: 9,
    top: 14,
    bottom: 38
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: chartValues.map(point => point.month),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: growthColors.muted,
      fontSize: 14.7601
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: maxCount,
    interval: 1,
    axisLine: {
      lineStyle: { color: growthColors.axis }
    },
    axisTick: { show: false },
    axisLabel: {
      color: growthColors.muted,
      fontSize: 14.7601
    },
    splitLine: {
      lineStyle: { color: growthColors.grid }
    }
  },
  series: [
    {
      name: 'New Registrations',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 9,
      data: chartValues.map(point => point.value),
      lineStyle: {
        color: growthColors.brand,
        width: 3
      },
      itemStyle: {
        color: growthColors.brand
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(56,153,250,0.16)' },
            { offset: 1, color: 'rgba(56,153,250,0.06)' }
          ]
        }
      },
      emphasis: {
        focus: 'series',
        scale: true
      }
    }
  ]
}))

const filteredRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return rows
  }

  return rows.filter(row => row.region.toLowerCase().includes(search) || row.period.toLowerCase().includes(search))
})

function barWidth(value: number) {
  return `${(value / maxCount) * 100}%`
}

function barColor(value: number) {
  if (value === maxCount) {
    return growthColors.success
  }

  if (value === 2) {
    return growthColors.lightSuccess
  }

  return growthColors.brand
}

</script>

<template>
  <article class="min-h-[740px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[14.76px] pt-[22.1401px]">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 class="text-[17.2201px] font-semibold leading-[21px] text-[#15191E]">
            Monthly User Growth
          </h3>
          <p class="mt-[2.46px] text-[13.5301px] leading-4 text-[#8D97A5]">
            New user registrations over time
          </p>
        </div>

        <div class="flex w-full flex-wrap items-center gap-x-[7.38003px] gap-y-2 sm:w-auto">
          <div class="flex h-[30.76px] items-start gap-[4.92px]">
            <button
              v-for="period in periodOptions"
              :key="period.key"
              type="button"
              class="inline-flex h-[30.76px] items-center justify-center rounded-[6.15002px] border px-[12.3px] py-[6.15002px] font-[Arial] text-[13.5301px] leading-4"
              :class="activePeriod === period.key ? 'border-[#3899FA] bg-[#3899FA] text-white' : 'border-[#DEE2E7] bg-white text-[#8D97A5]'"
              :style="{ width: period.key === 'monthly' ? '75.06px' : '83.06px' }"
              :aria-pressed="activePeriod === period.key"
              @click="activePeriod = period.key"
            >
              {{ period.label }}
            </button>
          </div>

          <label class="relative block w-full sm:w-[219.4px]">
            <span class="sr-only">Filter region</span>
            <DashboardIcon name="search" :size="14.63" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Filter region..."
              class="h-[35.22px] w-full rounded-[7.38003px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.38003px] pl-[33.2101px] pr-[12.3px] text-[14.7601px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
            />
          </label>
        </div>
      </header>

      <section class="h-[302.92px] overflow-hidden rounded-[12.3px] border border-[#EFF0F6] bg-white pt-[2.46001px]">
        <header class="flex h-[49.75px] items-center px-[19.6801px] py-[14.7601px]">
          <h4 class="text-[15.9901px] font-semibold leading-[19px] text-[#15191E]">
            Growth Trend
          </h4>
        </header>

        <div class="h-[248.25px] px-[19.6801px] py-[19.6801px]">
          <DashboardChartFrame
            :option="growthTrendOption"
            height="208.53px"
          />
        </div>
      </section>

      <section class="h-[305.04px] overflow-hidden rounded-[12.3px] border border-[#EFF0F6] bg-white">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[780px] border-separate border-spacing-0">
            <colgroup>
              <col class="w-[32.33%]" />
              <col class="w-[24.62%]" />
              <col class="w-[16.65%]" />
              <col class="w-[26.4%]" />
            </colgroup>

            <thead>
              <tr>
                <th class="h-[40.83px] bg-[#F9FAFB] px-[17.2201px] py-[12.3px] text-left text-[12.3px] font-semibold uppercase leading-[15px] tracking-[0.615002px] text-[#8D97A5]">
                  <span class="inline-flex items-center gap-[3.69px]">
                    Region <span class="font-[Cambria_Math] text-[11.07px] font-normal leading-[13px] opacity-35" v-html="sortIcon" />
                  </span>
                </th>
                <th class="h-[40.83px] bg-[#F9FAFB] px-[17.2201px] py-[12.3px] text-left text-[12.3px] font-semibold uppercase leading-[15px] tracking-[0.615002px] text-[#8D97A5]">
                  <span class="inline-flex items-center gap-[3.69px]">
                    Period <span class="font-[Cambria_Math] text-[11.07px] font-normal leading-[13px] opacity-35" v-html="sortIcon" />
                  </span>
                </th>
                <th class="h-[40.83px] bg-[#F9FAFB] px-[17.2201px] py-[12.3px] text-right text-[12.3px] font-semibold uppercase leading-[15px] tracking-[0.615002px] text-[#8D97A5]">
                  <span class="inline-flex items-center justify-end gap-[3.69px]">
                    Count <span class="font-[Cambria_Math] text-[11.07px] font-normal leading-[13px] opacity-35" v-html="sortIcon" />
                  </span>
                </th>
                <th class="h-[40.83px] bg-[#F9FAFB] px-[17.2201px] py-[12.3px] text-left text-[12.3px] font-semibold uppercase leading-[15px] tracking-[0.615002px] text-[#8D97A5]">
                  Relative Volume
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in filteredRows" :key="row.id">
                <td class="border-b border-[#EFF0F6] px-[17.2201px] py-[12.9151px] text-[14.7601px] font-normal leading-[18px] text-[#15191E]">
                  {{ row.region }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.2201px] py-[12.9151px] text-[14.7601px] font-normal leading-[18px] text-[#15191E]">
                  {{ row.period }}
                </td>
                <td
                  class="border-b border-[#EFF0F6] px-[17.2201px] py-[12.9151px] text-right text-[14.7601px] leading-[18px]"
                  :class="row.count === maxCount ? 'font-bold text-[#3899FA]' : 'font-medium text-[#15191E]'"
                >
                  {{ row.count }}
                </td>
                <td class="border-b border-[#EFF0F6] py-[19.97px] pl-[17.2324px] pr-[17.2201px]">
                  <span class="flex h-[4.96px] overflow-hidden rounded-[2.46001px] bg-[#EFF0F6]">
                    <span
                      class="h-full rounded-[2.46001px]"
                      :style="{ width: barWidth(row.count), backgroundColor: barColor(row.count) }"
                    />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </article>
</template>
