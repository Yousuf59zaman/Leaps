<script setup lang="ts">
import type { EChartsOption } from 'echarts'

type ServiceFilter = 'all' | 'within' | 'over'
type ServiceTone = 'brand' | 'success' | 'warning' | 'danger'
type ServiceStatus = 'within' | 'near' | 'over'

interface ServiceMetric {
  key: string
  label: string
  value: string
  detail?: string
  icon: string
  color: string
  overlay: string
  compact?: boolean
}

interface ServiceRow {
  id: string
  service: string
  chartLabel: string
  tokens: number
  avgDuration: string
  minutes: number
  volumeShare: number
  slaPercent: number
  status: ServiceStatus
  statusLabel: string
  timeTone: ServiceTone
  slaTone: ServiceTone
  volumeColor: string
  serviceBarColor: string
}

const activeFilter = ref<ServiceFilter>('all')
const searchQuery = ref('')

const colors = {
  brand: '#3899FA',
  success: '#1DC973',
  warning: '#C9481D',
  danger: '#EF4343',
  text: '#15191E',
  muted: '#8D97A5',
  green: '#4CD486',
  lime: '#BCE53F',
  purple: '#8B63B6',
  coral: '#E38968',
  redSoft: '#F76B6B',
  panel: '#F9FAFB',
  border: '#EFF0F6',
  fieldBorder: '#DEE2E7'
} as const

const filterOptions: Array<{ label: string, value: ServiceFilter, width: string }> = [
  { label: 'All', value: 'all', width: '38.36px' },
  { label: 'Within SLA', value: 'within', width: '85.36px' },
  { label: 'Over SLA', value: 'over', width: '77.36px' }
]

const metrics: ServiceMetric[] = [
  {
    key: 'total-services',
    label: 'Total Services',
    value: '6',
    icon: 'settings-2',
    color: colors.brand,
    overlay: 'rgba(56, 153, 250, 0.1)'
  },
  {
    key: 'most-used',
    label: 'Most Used Service',
    value: 'Inquiry',
    detail: '150 tokens',
    icon: 'ticket',
    color: colors.success,
    overlay: 'rgba(29, 201, 115, 0.1)',
    compact: true
  },
  {
    key: 'within-sla',
    label: 'Within SLA',
    value: '4',
    icon: 'circle-check',
    color: colors.success,
    overlay: 'rgba(29, 201, 115, 0.1)'
  },
  {
    key: 'over-sla',
    label: 'Over SLA',
    value: '2',
    icon: 'circle-x',
    color: colors.danger,
    overlay: 'rgba(239, 67, 67, 0.1)'
  }
]

const serviceRows: ServiceRow[] = [
  {
    id: 'inquiry',
    service: 'Inquiry',
    chartLabel: 'Inquiry',
    tokens: 150,
    avgDuration: '14:30',
    minutes: 14.5,
    volumeShare: 100,
    slaPercent: 73,
    status: 'within',
    statusLabel: 'Within SLA',
    timeTone: 'brand',
    slaTone: 'success',
    volumeColor: colors.brand,
    serviceBarColor: '#60A5FA'
  },
  {
    id: 'registration',
    service: 'Registration',
    chartLabel: 'Registration',
    tokens: 42,
    avgDuration: '08:12',
    minutes: 8.2,
    volumeShare: 28,
    slaPercent: 41,
    status: 'within',
    statusLabel: 'Within SLA',
    timeTone: 'success',
    slaTone: 'success',
    volumeColor: colors.brand,
    serviceBarColor: colors.green
  },
  {
    id: 'business-permit',
    service: 'Business Permit',
    chartLabel: 'Biz Permit',
    tokens: 28,
    avgDuration: '17:45',
    minutes: 17.75,
    volumeShare: 19,
    slaPercent: 89,
    status: 'near',
    statusLabel: 'Near Limit',
    timeTone: 'brand',
    slaTone: 'warning',
    volumeColor: colors.brand,
    serviceBarColor: colors.lime
  },
  {
    id: 'clearance',
    service: 'Clearance',
    chartLabel: 'Clearance',
    tokens: 15,
    avgDuration: '11:20',
    minutes: 11.33,
    volumeShare: 10,
    slaPercent: 57,
    status: 'within',
    statusLabel: 'Within SLA',
    timeTone: 'success',
    slaTone: 'success',
    volumeColor: colors.brand,
    serviceBarColor: colors.purple
  },
  {
    id: 'certificate',
    service: 'Certificate',
    chartLabel: 'Certificate',
    tokens: 11,
    avgDuration: '32:15',
    minutes: 32.25,
    volumeShare: 7,
    slaPercent: 161,
    status: 'over',
    statusLabel: 'Over SLA',
    timeTone: 'danger',
    slaTone: 'danger',
    volumeColor: colors.brand,
    serviceBarColor: colors.redSoft
  },
  {
    id: 'health-services',
    service: 'Health Services',
    chartLabel: 'Health Svc',
    tokens: 4,
    avgDuration: '41:08',
    minutes: 41.13,
    volumeShare: 3,
    slaPercent: 206,
    status: 'over',
    statusLabel: 'Over SLA',
    timeTone: 'danger',
    slaTone: 'danger',
    volumeColor: colors.brand,
    serviceBarColor: colors.coral
  }
]

const durationChartRows = computed(() => [
  serviceRows[1],
  serviceRows[3],
  serviceRows[0],
  serviceRows[2],
  serviceRows[4],
  serviceRows[5]
])

const visibleRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return serviceRows.filter((row) => {
    const matchesFilter = activeFilter.value === 'all'
      || (activeFilter.value === 'within' && row.status !== 'over')
      || (activeFilter.value === 'over' && row.status === 'over')
    const matchesSearch = !search || row.service.toLowerCase().includes(search)

    return matchesFilter && matchesSearch
  })
})

const toneStyle = (tone: ServiceTone) => {
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

const toneColor = (tone: ServiceTone) => toneStyle(tone).color

const statusTone = (status: ServiceStatus): ServiceTone => {
  if (status === 'within') {
    return 'success'
  }

  if (status === 'near') {
    return 'brand'
  }

  return 'danger'
}

const serviceVolumeOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: 50,
    right: 22,
    top: 22,
    bottom: 36
  },
  xAxis: {
    type: 'category',
    data: serviceRows.map((row) => row.chartLabel),
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#D6DDE8'
      }
    },
    axisLabel: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 160,
    interval: 40,
    axisLabel: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    },
    splitLine: {
      lineStyle: {
        color: colors.border
      }
    }
  },
  series: [
    {
      name: 'Token Count',
      type: 'bar',
      barWidth: 72,
      data: serviceRows.map((row) => ({
        value: row.tokens,
        itemStyle: {
          color: row.serviceBarColor,
          borderRadius: [5, 5, 0, 0]
        }
      })),
      emphasis: {
        focus: 'series'
      }
    }
  ]
}))

const processingTimeOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: 118,
    right: 24,
    top: 22,
    bottom: 36
  },
  xAxis: {
    type: 'value',
    name: 'Minutes',
    min: 0,
    max: 45,
    interval: 5,
    nameLocation: 'middle',
    nameGap: 28,
    nameTextStyle: {
      color: '#A1AAB7',
      fontSize: 11,
      fontWeight: 600
    },
    axisLabel: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    },
    splitLine: {
      lineStyle: {
        color: colors.border
      }
    }
  },
  yAxis: {
    type: 'category',
    data: durationChartRows.value.map((row) => row.chartLabel),
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    }
  },
  series: [
    {
      name: 'Avg Duration',
      type: 'bar',
      barWidth: 15,
      data: durationChartRows.value.map((row) => ({
        value: row.minutes,
        itemStyle: {
          color: row.minutes > 20
            ? row.serviceBarColor === colors.lime ? colors.coral : colors.redSoft
            : row.serviceBarColor,
          borderRadius: 4
        }
      })),
      emphasis: {
        focus: 'series'
      }
    }
  ]
}))
</script>

<template>
  <article class="min-h-[860px] w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex min-w-0 flex-col gap-[12.18px] pt-[21.9261px]">
      <header class="flex min-h-[39.44px] min-w-0 flex-wrap items-start justify-between gap-4">
        <div class="w-full min-w-0 max-w-[309px]">
          <h3 class="text-[17.0536px] font-semibold leading-[21px] text-[#15191E]">
            LGU Service Specific
          </h3>
          <p class="mt-[2.44px] text-[13.3993px] font-normal leading-4 text-[#8D97A5]">
            Token and time breakdown per LGU service type
          </p>
        </div>

        <div class="flex w-full min-w-0 flex-wrap items-center gap-x-[7.3087px] gap-y-2 sm:w-auto">
          <div class="flex h-[26.18px] items-start gap-[3.65px]" aria-label="Filter by SLA status">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              type="button"
              class="inline-flex h-[26.18px] items-center justify-center rounded-[6.09058px] border px-[10.9631px] py-[4.87247px] font-['Arial'] text-[12.1812px] font-normal leading-[14px]"
              :class="activeFilter === option.value ? 'border-[#3899FA] bg-[#3899FA] text-white' : 'border-[#DEE2E7] bg-white text-[#8D97A5]'"
              :style="{ width: option.width }"
              :aria-pressed="activeFilter === option.value"
              @click="activeFilter = option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <label class="relative block w-full sm:w-[194.9px]">
            <span class="sr-only">Search service</span>
            <DashboardIcon name="search" :size="13.4" :stroke-width="1.4" class="pointer-events-none absolute left-[8.53px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
            <input
              id="lgu-service-search"
              v-model="searchQuery"
              type="search"
              name="lgu-service-search"
              aria-label="Search service"
              placeholder="Search service..."
              class="h-[32.62px] w-full rounded-[7.3087px] border border-[#DEE2E7] bg-[#F9FAFB] py-[6.09058px] pl-[30.4529px] pr-[9.74494px] text-[14.6174px] font-normal leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
            >
          </label>
        </div>
      </header>

      <section class="grid min-h-[79.67px] min-w-0 gap-[9.74494px] pt-[4.87247px] md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="metric in metrics"
          :key="metric.key"
          class="flex h-[74.8px] min-w-0 items-center gap-[10.96px] rounded-[10.9631px] border border-[#EFF0F6] bg-[#F9FAFB] px-[14.6174px] py-[12.1812px]"
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
              :class="metric.compact ? 'text-[15.8355px] leading-[18px]' : 'text-[24.3623px] leading-[27px]'"
              :style="{ color: metric.color }"
            >
              {{ metric.value }}
            </span>
            <span
              v-if="metric.detail"
              class="block text-[12.1812px] font-normal leading-[15px] text-[#8D97A5]"
            >
              {{ metric.detail }}
            </span>
          </span>
        </article>
      </section>

      <section class="grid min-h-[296px] min-w-0 gap-[12px] pt-[2.44px] xl:grid-cols-2">
        <article class="min-h-[278.46px] overflow-hidden rounded-[10.9631px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.58px] items-center border-b border-[#EFF0F6] px-[17.0536px] py-[12.1812px]">
            <h4 class="text-[15.8355px] font-semibold leading-[19px] text-[#15191E]">
              Token Volume by Service
            </h4>
          </header>

          <div class="px-[17.0536px] py-[17.0536px]">
            <DashboardChartFrame :option="serviceVolumeOption" height="197.33px" />
          </div>
        </article>

        <article class="min-h-[278.46px] overflow-hidden rounded-[10.9631px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.58px] items-center border-b border-[#EFF0F6] px-[17.0536px] py-[12.1812px]">
            <h4 class="text-[15.8355px] font-semibold leading-[19px] text-[#15191E]">
              Avg Processing Time by Service
            </h4>
          </header>

          <div class="px-[17.0536px] py-[17.0536px]">
            <DashboardChartFrame :option="processingTimeOption" height="197.33px" />
          </div>
        </article>
      </section>

      <section class="min-h-[348.18px] min-w-0 overflow-hidden rounded-[10.9631px] border border-[#EFF0F6] bg-white">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1120px] table-fixed border-collapse">
            <colgroup>
              <col class="w-[16.77%]">
              <col class="w-[16.52%]">
              <col class="w-[16.84%]">
              <col class="w-[17.63%]">
              <col class="w-[17.63%]">
              <col class="w-[14.61%]">
            </colgroup>
            <thead class="bg-[#F9FAFB]">
              <tr>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-left text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Service Name <span class="opacity-35">&#8645;</span>
                </th>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-right text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Token Count <span class="opacity-35">&#8645;</span>
                </th>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-right text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Avg Duration <span class="opacity-35">&#8645;</span>
                </th>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-left text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Volume Share
                </th>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-left text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  vs SLA
                </th>
                <th class="h-[38.14px] px-[15.8355px] py-[10.9631px] text-center text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in visibleRows"
                :key="row.id"
                class="border-t border-[#EFF0F6]"
              >
                <td
                  class="h-[45.23px] px-[15.8355px] py-[13.3993px] text-[14.6174px] leading-[18px] text-[#15191E]"
                  :class="row.id === 'inquiry' ? 'font-bold' : 'font-normal'"
                >
                  {{ row.service }}
                </td>
                <td
                  class="h-[45.23px] px-[15.8355px] py-[13.3993px] text-right text-[14.6174px] leading-[18px]"
                  :class="row.id === 'inquiry' ? 'font-bold text-[#3899FA]' : 'font-medium text-[#15191E]'"
                >
                  {{ row.tokens }}
                </td>
                <td class="h-[45.23px] px-[15.8355px] py-[10.9631px] text-right">
                  <span
                    class="inline-flex h-[20.87px] items-center rounded-[4.87247px] px-[7.3087px] font-['Consolas'] text-[13.3993px] font-bold leading-4"
                    :style="toneStyle(row.timeTone)"
                  >
                    {{ row.avgDuration }}
                  </span>
                </td>
                <td class="h-[45.23px] px-[15.8355px] py-[13px]">
                  <div class="flex items-center gap-[6.09px]">
                    <span class="h-[4.87px] flex-1 overflow-hidden rounded-[2.43623px] bg-[#EFF0F6]">
                      <span
                        class="block h-full rounded-[2.43623px] bg-[#3899FA]"
                        :style="{ width: `${row.volumeShare}%` }"
                      />
                    </span>
                    <span class="w-[36.54px] shrink-0 text-right text-[12.1812px] font-semibold leading-[15px] text-[#15191E]">
                      {{ row.volumeShare }}%
                    </span>
                  </div>
                </td>
                <td class="h-[45.23px] px-[15.8355px] py-[13px]">
                  <div class="flex items-center gap-[6.1px]">
                    <span class="h-[4.87px] flex-1 overflow-hidden rounded-[2.43623px] bg-[#EFF0F6]">
                      <span
                        class="block h-full rounded-[2.43623px]"
                        :style="{ width: `${Math.min(row.slaPercent, 100)}%`, backgroundColor: toneColor(row.slaTone) }"
                      />
                    </span>
                    <span
                      class="w-[36.54px] shrink-0 text-right text-[12.1812px] font-semibold leading-[15px]"
                      :style="{ color: toneColor(row.slaTone) }"
                    >
                      {{ row.slaPercent }}%
                    </span>
                  </div>
                </td>
                <td class="h-[45.23px] px-[15.8355px] py-[11px] text-center">
                  <span
                    class="inline-flex h-[22.31px] min-w-[86px] items-center justify-center rounded-[24.3623px] px-[8.52682px] text-[12.1812px] font-medium leading-[15px]"
                    :style="toneStyle(statusTone(row.status))"
                  >
                    <span v-if="row.status === 'within'">&#10003;&nbsp;</span>
                    <span v-else-if="row.status === 'near'">&#9889;&nbsp;</span>
                    <span v-else>&#10005;&nbsp;</span>
                    {{ row.statusLabel }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="flex min-h-[35.71px] flex-wrap items-start justify-between gap-[19.49px] border-t border-[#EFF0F6] px-[15.8355px] py-[9.74494px] text-[12.1812px] font-normal leading-[15px] text-[#8D97A5]">
          <span>SLA bar = % of 20-min target <span class="px-1">&middot;</span> &gt;100% = over SLA</span>
          <span class="inline-flex flex-wrap items-center justify-end gap-[19.49px]">
            <span class="inline-flex items-center gap-[4.87px]">
              <span class="h-[4.87px] w-[9.74px] rounded-[2.43623px] bg-[#1DC973]" />
              Within SLA
            </span>
            <span class="inline-flex items-center gap-[4.87px]">
              <span class="h-[4.87px] w-[9.74px] rounded-[2.43623px] bg-[#EF4343]" />
              Over SLA
            </span>
          </span>
        </footer>
      </section>
    </div>
  </article>
</template>
