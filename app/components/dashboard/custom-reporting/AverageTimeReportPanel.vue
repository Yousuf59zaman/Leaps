<script setup lang="ts">
import type { EChartsOption } from 'echarts'

type AverageTimeTone = 'success' | 'brand' | 'warning' | 'danger'

interface AverageMetric {
  key: string
  label: string
  value: string
  detail?: string
  icon: string
  color: string
  overlay: string
  compact?: boolean
}

interface OfficeTimeRow {
  id: string
  office: string
  avgServiceTime: string
  avgWaitTime: string
  waitPercent: number
  status: AverageTimeTone
  statusLabel: string
  serviceTone: AverageTimeTone
  waitTone: AverageTimeTone
}

interface ServiceChartRow {
  label: string
  value: number
  color: string
}

interface MonthlyWaitRow {
  label: string
  value: number
}

const searchQuery = ref('')

const colors = {
  brand: '#3899FA',
  success: '#1DC973',
  warning: '#C9481D',
  danger: '#EF4343',
  serviceGreen: '#4CD486',
  lime: '#BCE53F',
  blueSoft: '#60A5FA',
  redSoft: '#F76B6B',
  line: '#D9572E',
  text: '#15191E',
  muted: '#8D97A5',
  panel: '#F9FAFB',
  border: '#EFF0F6',
  fieldBorder: '#DEE2E7'
} as const

const metrics: AverageMetric[] = [
  {
    key: 'avg-service',
    label: 'Avg Service Time',
    value: '14m 30s',
    icon: 'settings-2',
    color: colors.brand,
    overlay: 'rgba(56, 153, 250, 0.1)'
  },
  {
    key: 'avg-wait',
    label: 'Avg Wait Time',
    value: '28m 15s',
    detail: 'Above 20min SLA',
    icon: 'timer',
    color: colors.warning,
    overlay: 'rgba(201, 72, 29, 0.1)'
  },
  {
    key: 'best-office',
    label: 'Best Office',
    value: 'Marantao',
    detail: 'Avg 8m 12s',
    icon: 'badge-check',
    color: colors.success,
    overlay: 'rgba(29, 201, 115, 0.1)',
    compact: true
  },
  {
    key: 'needs-attention',
    label: 'Needs Attention',
    value: 'Bulig',
    detail: 'Avg 32m 44s',
    icon: 'circle-alert',
    color: colors.danger,
    overlay: 'rgba(239, 67, 67, 0.1)',
    compact: true
  }
]

const officeRows: OfficeTimeRow[] = [
  {
    id: 'marantao',
    office: 'Marantao',
    avgServiceTime: '08:12',
    avgWaitTime: '11:30',
    waitPercent: 58,
    status: 'success',
    statusLabel: 'Within SLA',
    serviceTone: 'success',
    waitTone: 'success'
  },
  {
    id: 'shariff-aguak',
    office: 'Shariff Aguak',
    avgServiceTime: '09:05',
    avgWaitTime: '17:45',
    waitPercent: 89,
    status: 'brand',
    statusLabel: 'Near Limit',
    serviceTone: 'success',
    waitTone: 'brand'
  },
  {
    id: 'pagapu',
    office: 'Pagapu',
    avgServiceTime: '12:18',
    avgWaitTime: '19:20',
    waitPercent: 97,
    status: 'warning',
    statusLabel: 'Near SLA',
    serviceTone: 'brand',
    waitTone: 'brand'
  },
  {
    id: 'bulig',
    office: 'Bulig',
    avgServiceTime: '32:44',
    avgWaitTime: '28:15',
    waitPercent: 141,
    status: 'danger',
    statusLabel: 'Over SLA',
    serviceTone: 'danger',
    waitTone: 'danger'
  }
]

const serviceChartRows: ServiceChartRow[] = [
  { label: 'Marantao', value: 8.2, color: colors.serviceGreen },
  { label: 'Shariff Aguak', value: 9.08, color: colors.lime },
  { label: 'Pagapu', value: 12.3, color: colors.blueSoft },
  { label: 'Bulig', value: 32.73, color: colors.redSoft }
]

const monthlyWaitRows: MonthlyWaitRow[] = [
  { label: 'Jan', value: 5 },
  { label: 'Feb', value: 32 },
  { label: 'Mar', value: 19 },
  { label: 'Jul', value: 24 },
  { label: 'Aug', value: 28 },
  { label: 'Sep', value: 14 },
  { label: 'Oct', value: 12 }
]

const waitSlaLimit = 20

const visibleOfficeRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return officeRows
  }

  return officeRows.filter(row => row.office.toLowerCase().includes(search))
})

const toneStyle = (tone: AverageTimeTone) => {
  if (tone === 'success') {
    return {
      color: colors.success,
      backgroundColor: 'rgba(29, 201, 115, 0.1)'
    }
  }

  if (tone === 'brand') {
    return {
      color: colors.brand,
      backgroundColor: 'rgba(56, 153, 250, 0.1)'
    }
  }

  if (tone === 'warning') {
    return {
      color: colors.warning,
      backgroundColor: 'rgba(201, 72, 29, 0.1)'
    }
  }

  return {
    color: colors.danger,
    backgroundColor: 'rgba(239, 67, 67, 0.1)'
  }
}

const toneColor = (tone: AverageTimeTone) => toneStyle(tone).color

const serviceTimeOption = computed<EChartsOption>(() => ({
  color: serviceChartRows.map(row => row.color),
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    valueFormatter: value => `${value} min`
  },
  grid: {
    left: 96,
    right: 28,
    top: 24,
    bottom: 32
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: 35,
    interval: 5,
    name: 'Minutes',
    nameLocation: 'middle',
    nameGap: 26,
    axisLabel: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    },
    axisLine: { lineStyle: { color: '#E8ECF2' } },
    splitLine: { lineStyle: { color: colors.border } }
  },
  yAxis: {
    type: 'category',
    data: serviceChartRows.map(row => row.label),
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    }
  },
  series: [
    {
      name: 'Avg Service Time',
      type: 'bar',
      barWidth: 19,
      data: serviceChartRows.map(row => ({
        value: row.value,
        itemStyle: { color: row.color, borderRadius: 5 }
      })),
      emphasis: {
        focus: 'series'
      }
    }
  ]
}))

const monthlyWaitOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    valueFormatter: value => `${value} min`
  },
  legend: {
    top: 8,
    left: 'center',
    icon: 'rect',
    itemWidth: 48,
    itemHeight: 12,
    textStyle: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    }
  },
  grid: {
    left: 44,
    right: 28,
    top: 44,
    bottom: 24
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: monthlyWaitRows.map(row => row.label),
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 35,
    interval: 10,
    axisLabel: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: colors.border } }
  },
  series: [
    {
      name: 'Avg Wait (min)',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: { color: colors.line, width: 3 },
      itemStyle: { color: colors.line },
      areaStyle: { color: 'rgba(201, 72, 29, 0.08)' },
      emphasis: { focus: 'series' },
      data: monthlyWaitRows.map(row => row.value)
    },
    {
      name: 'SLA Limit (20min)',
      type: 'line',
      symbol: 'none',
      lineStyle: {
        color: '#F7B5AE',
        width: 2,
        type: 'dashed'
      },
      emphasis: { focus: 'series' },
      data: monthlyWaitRows.map(() => waitSlaLimit)
    }
  ]
}))
</script>

<template>
  <article class="min-h-[1026px] w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex min-w-0 flex-col gap-[12.18px] pt-[21.9261px]">
      <header class="flex min-h-[39.44px] min-w-0 flex-wrap items-start justify-between gap-4">
        <div class="w-full min-w-0 max-w-[349px]">
          <h3 class="text-[17.0536px] font-semibold leading-[21px] text-[#15191E]">
            Average Time
          </h3>
          <p class="mt-[2.44px] text-[13.3993px] font-normal leading-4 text-[#8D97A5]">
            Service and waiting time averages by office and month
          </p>
        </div>

        <label class="relative block w-full sm:w-[194.9px]">
          <span class="sr-only">Search office</span>
          <DashboardIcon name="search" :size="13.4" :stroke-width="1.4" class="pointer-events-none absolute left-[8.53px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
          <input
            id="average-time-office-search"
            v-model="searchQuery"
            type="search"
            name="average-time-office-search"
            aria-label="Search office"
            placeholder="Search office..."
            class="h-[32.62px] w-full rounded-[7.3087px] border border-[#DEE2E7] bg-[#F9FAFB] py-[6.09058px] pl-[30.4529px] pr-[9.74494px] text-[14.6174px] font-normal leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
          >
        </label>
      </header>

      <section class="grid min-h-[86.67px] min-w-0 gap-[9.74494px] pt-[4.87247px] md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="metric in metrics"
          :key="metric.key"
          class="flex h-[81.8px] min-w-0 items-center gap-[10.96px] rounded-[10.9631px] border border-[#EFF0F6] bg-[#F9FAFB] px-[14.6174px] py-[12.1812px]"
        >
          <span
            class="inline-flex h-[43.85px] w-[43.85px] shrink-0 items-center justify-center rounded-[10.9631px] text-[#15191E]"
            :style="{ backgroundColor: metric.overlay }"
          >
            <DashboardIcon :name="metric.icon" :size="19.49" :stroke-width="2" />
          </span>

          <span class="block min-w-0">
            <span class="block text-[12.1812px] font-medium leading-[15px] text-[#8D97A5]">
              {{ metric.label }}
            </span>
            <span
              class="block truncate font-bold"
              :class="metric.compact ? 'text-[17.0536px] leading-[19px]' : 'text-[24.3623px] leading-[27px]'"
              :style="{ color: metric.color }"
            >
              {{ metric.value }}
            </span>
            <span
              v-if="metric.detail"
              class="block text-[12.1812px] font-normal leading-[15px] text-[#8D97A5]"
              :class="{ '!text-[10.9631px] !font-semibold !leading-[13px] !text-[#EF4343]': metric.key === 'avg-wait' }"
            >
              <span v-if="metric.key === 'avg-wait'">&#8593; </span>{{ metric.detail }}
            </span>
          </span>
        </article>
      </section>

      <section class="flex min-h-[69.23px] min-w-0 items-center gap-[12.18px] rounded-[10.9631px] border border-[rgba(201,72,29,0.2)] bg-[rgba(201,72,29,0.04)] px-[17.0536px] pb-[12.1812px] pt-[14.6174px]">
        <span class="h-[7.31px] w-[7.31px] shrink-0 rounded-full bg-[#C9481D]" />
        <div class="min-w-0 flex-1">
          <p class="text-[13.3993px] font-semibold leading-4 text-[#C9481D]">
            Average Waiting Time exceeds SLA threshold
          </p>
          <p class="mt-[2.44px] text-[12.1812px] font-normal leading-[15px] text-[#8D97A5]">
            Current: 28m 15s <span class="px-1">&middot;</span> SLA Target: &le; 20 minutes <span class="px-1">&middot;</span> Overage: +8m 15s
          </p>
        </div>
        <span class="hidden h-[24.36px] w-[1.22px] shrink-0 bg-[#DEE2E7] sm:block" />
        <div class="hidden w-[60px] shrink-0 text-right sm:block">
          <span class="block text-[21.9261px] font-bold leading-[27px] text-[#C9481D]">
            141%
          </span>
          <span class="block text-[10.9631px] font-normal leading-[13px] text-[#8D97A5]">
            of SLA limit
          </span>
        </div>
      </section>

      <section class="grid min-h-[296px] min-w-0 gap-[12px] pt-[2.44px] xl:grid-cols-2">
        <article class="min-h-[278.46px] overflow-hidden rounded-[10.9631px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.58px] items-center border-b border-[#EFF0F6] px-[17.0536px] py-[12.1812px]">
            <h4 class="text-[15.8355px] font-semibold leading-[19px] text-[#15191E]">
              Avg Service Time by Office
            </h4>
          </header>

          <div class="px-[17.0536px] py-[17.0536px]">
            <DashboardChartFrame
              :option="serviceTimeOption"
              height="197.33px"
            />
          </div>
        </article>

        <article class="min-h-[278.46px] overflow-hidden rounded-[10.9631px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.58px] items-center border-b border-[#EFF0F6] px-[17.0536px] py-[12.1812px]">
            <h4 class="text-[15.8355px] font-semibold leading-[19px] text-[#15191E]">
              Monthly Avg Wait Time
            </h4>
          </header>

          <div class="px-[17.0536px] py-[17.0536px]">
            <DashboardChartFrame
              :option="monthlyWaitOption"
              height="197.33px"
            />
          </div>
        </article>
      </section>

      <section class="min-h-[257.27px] min-w-0 overflow-hidden rounded-[10.9631px] border border-[#EFF0F6] bg-white">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1000px] table-fixed border-collapse">
            <colgroup>
              <col class="w-[17.25%]">
              <col class="w-[22.73%]">
              <col class="w-[19.85%]">
              <col class="w-[23.18%]">
              <col class="w-[16.99%]">
            </colgroup>
            <thead class="bg-[#F9FAFB]">
              <tr>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-left text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Office <span class="opacity-35">&#8645;</span>
                </th>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-right text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Avg Service Time <span class="opacity-35">&#8645;</span>
                </th>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-right text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Avg Wait Time <span class="opacity-35">&#8645;</span>
                </th>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-left text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Wait vs SLA (20min)
                </th>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-center text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  SLA Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in visibleOfficeRows"
                :key="row.id"
                class="border-t border-[#EFF0F6]"
              >
                <td class="h-[45.23px] px-[15.8355px] py-[13.3993px] text-[14.6174px] font-bold leading-[18px] text-[#15191E]">
                  {{ row.office }}
                </td>
                <td class="h-[45.23px] px-[15.8355px] py-[10.9631px] text-right">
                  <span
                    class="inline-flex h-[20.87px] items-center rounded-[4.87247px] px-[7.3087px] font-['Consolas'] text-[13.3993px] font-bold leading-4"
                    :style="toneStyle(row.serviceTone)"
                  >
                    {{ row.avgServiceTime }}
                  </span>
                </td>
                <td class="h-[45.23px] px-[15.8355px] py-[10.9631px] text-right">
                  <span
                    class="inline-flex h-[20.87px] items-center rounded-[4.87247px] px-[7.3087px] font-['Consolas'] text-[13.3993px] font-bold leading-4"
                    :style="toneStyle(row.waitTone)"
                  >
                    {{ row.avgWaitTime }}
                  </span>
                </td>
                <td class="h-[45.23px] px-[15.8355px] py-[13px]">
                  <div class="flex items-center gap-[6.09px]">
                    <span class="h-[4.87px] flex-1 overflow-hidden rounded-[2.43623px] bg-[#EFF0F6]">
                      <span
                        class="block h-full rounded-[2.43623px]"
                        :style="{ width: `${Math.min(row.waitPercent, 100)}%`, backgroundColor: toneColor(row.status) }"
                      />
                    </span>
                    <span
                      class="w-[36.54px] shrink-0 text-right text-[12.1812px] font-semibold leading-[15px]"
                      :style="{ color: toneColor(row.status) }"
                    >
                      {{ row.waitPercent }}%
                    </span>
                  </div>
                </td>
                <td class="h-[45.23px] px-[15.8355px] py-[11px] text-center">
                  <span
                    class="inline-flex h-[22.31px] min-w-[86px] items-center justify-center rounded-[24.3623px] px-[8.52682px] text-[12.1812px] font-medium leading-[15px]"
                    :style="toneStyle(row.status)"
                  >
                    <span v-if="row.status === 'success'">&#10003;&nbsp;</span>
                    <span v-else-if="row.status === 'brand'">&#9889;&nbsp;</span>
                    <span v-else-if="row.status === 'warning'">&#9650;&nbsp;</span>
                    <span v-else>&#10005;&nbsp;</span>
                    {{ row.statusLabel }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="flex min-h-[35.71px] flex-wrap items-start gap-[19.49px] border-t border-[#EFF0F6] px-[15.8355px] py-[9.74494px] text-[12.1812px] font-normal leading-[15px] text-[#8D97A5]">
          <span>SLA bar = % of 20-minute target</span>
          <span class="inline-flex items-center gap-[4.87px]">
            <span class="h-[4.87px] w-[9.74px] rounded-[2.43623px] bg-[#1DC973]" />
            Within SLA (&lt;100%)
          </span>
          <span class="inline-flex items-center gap-[4.87px]">
            <span class="h-[4.87px] w-[9.74px] rounded-[2.43623px] bg-[#EF4343]" />
            Over SLA (&gt;100%)
          </span>
        </footer>
      </section>
    </div>
  </article>
</template>
