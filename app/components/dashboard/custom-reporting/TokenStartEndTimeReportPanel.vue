<script setup lang="ts">
import type { EChartsOption } from 'echarts'

type TokenOfficeFilter = 'all' | 'Bulig' | 'Marantao'
type TokenTone = 'brand' | 'success' | 'danger'

interface TokenTimingMetric {
  key: string
  label: string
  value: string
  color: string
  overlay: string
}

interface TokenTimingRow {
  id: string
  tokenId: string
  office: 'Bulig' | 'Marantao'
  startTime: string
  endTime: string
  duration: string
  seconds: number
  timeOfDay: 'Morning' | 'Afternoon'
}

interface HourlyTokenRow {
  label: string
  bulig: number
  marantao: number
}

const activeOffice = ref<TokenOfficeFilter>('all')
const searchQuery = ref('')

const colors = {
  brand: '#3899FA',
  success: '#1DC973',
  danger: '#EF4343',
  warning: '#C9481D',
  purple: '#4E1B8C',
  green: '#75D337',
  buligBar: '#60A5FA',
  marantaoBar: '#97E06F',
  text: '#15191E',
  muted: '#8D97A5',
  panel: '#F9FAFB',
  border: '#EFF0F6',
  fieldBorder: '#DEE2E7'
} as const

const filterOptions: Array<{ label: string, value: TokenOfficeFilter, width: string }> = [
  { label: 'All Offices', value: 'all', width: '78.55px' },
  { label: 'Bulig', value: 'Bulig', width: '51.55px' },
  { label: 'Marantao', value: 'Marantao', width: '75.55px' }
]

const metrics: TokenTimingMetric[] = [
  {
    key: 'earliest',
    label: 'Earliest Token',
    value: '8:00 AM',
    color: colors.brand,
    overlay: 'rgba(56, 153, 250, 0.1)'
  },
  {
    key: 'latest',
    label: 'Latest Token',
    value: '5:15 PM',
    color: colors.warning,
    overlay: 'rgba(201, 72, 29, 0.1)'
  },
  {
    key: 'peak',
    label: 'Peak Hour',
    value: '10-11 AM',
    color: colors.purple,
    overlay: 'rgba(78, 27, 140, 0.1)'
  },
  {
    key: 'busiest',
    label: 'Busiest Day',
    value: 'Monday',
    color: colors.success,
    overlay: 'rgba(29, 201, 115, 0.1)'
  }
]

const hourlyRows: HourlyTokenRow[] = [
  { label: '8AM', bulig: 8, marantao: 2 },
  { label: '9AM', bulig: 14, marantao: 4 },
  { label: '10AM', bulig: 22, marantao: 5 },
  { label: '11AM', bulig: 19, marantao: 3 },
  { label: '12PM', bulig: 12, marantao: 1 },
  { label: '1PM', bulig: 18, marantao: 2 },
  { label: '2PM', bulig: 15, marantao: 1 },
  { label: '3PM', bulig: 11, marantao: 1 },
  { label: '4PM', bulig: 7, marantao: 0 },
  { label: '5PM', bulig: 3, marantao: 0 }
]

const rows: TokenTimingRow[] = [
  {
    id: 'r-001',
    tokenId: 'R-001',
    office: 'Bulig',
    startTime: '10/1/2025 1:13 PM',
    endTime: '10/1/2025 1:14 PM',
    duration: '00:01:02',
    seconds: 62,
    timeOfDay: 'Afternoon'
  },
  {
    id: 'r-012',
    tokenId: 'R-012',
    office: 'Bulig',
    startTime: '8/25/2025 3:25 PM',
    endTime: '8/25/2025 3:29 PM',
    duration: '00:03:12',
    seconds: 192,
    timeOfDay: 'Afternoon'
  },
  {
    id: 'r-06',
    tokenId: 'R-06',
    office: 'Bulig',
    startTime: '8/25/2025 1:05 PM',
    endTime: '8/25/2025 3:24 PM',
    duration: '02:19:01',
    seconds: 8341,
    timeOfDay: 'Afternoon'
  },
  {
    id: 'r-009',
    tokenId: 'R-009',
    office: 'Bulig',
    startTime: '8/25/2025 1:05 PM',
    endTime: '8/25/2025 1:05 PM',
    duration: '00:00:01',
    seconds: 1,
    timeOfDay: 'Afternoon'
  },
  {
    id: 'p-002',
    tokenId: 'P-002',
    office: 'Bulig',
    startTime: '8/25/2025 1:04 PM',
    endTime: '8/25/2025 1:04 PM',
    duration: '00:00:08',
    seconds: 8,
    timeOfDay: 'Afternoon'
  },
  {
    id: 'r-008',
    tokenId: 'R-008',
    office: 'Bulig',
    startTime: '8/25/2025 12:58 PM',
    endTime: '8/25/2025 12:57 PM',
    duration: '00:00:03',
    seconds: 3,
    timeOfDay: 'Morning'
  },
  {
    id: 'm-003',
    tokenId: 'M-003',
    office: 'Marantao',
    startTime: '8/20/2025 10:30 AM',
    endTime: '8/20/2025 10:45 AM',
    duration: '00:15:07',
    seconds: 907,
    timeOfDay: 'Morning'
  }
]

const visibleRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return rows.filter((row) => {
    const matchesOffice = activeOffice.value === 'all' || row.office === activeOffice.value
    const matchesSearch = !search
      || row.tokenId.toLowerCase().includes(search)
      || row.office.toLowerCase().includes(search)
      || row.startTime.toLowerCase().includes(search)
      || row.endTime.toLowerCase().includes(search)

    return matchesOffice && matchesSearch
  })
})

const officeStyle = (office: TokenTimingRow['office']) => {
  if (office === 'Marantao') {
    return {
      color: colors.green,
      backgroundColor: 'rgba(117, 211, 55, 0.1)'
    }
  }

  return {
    color: colors.purple,
    backgroundColor: 'rgba(78, 27, 140, 0.1)'
  }
}

const durationStyle = (row: TokenTimingRow) => {
  if (row.seconds < 60) {
    return toneStyle('success')
  }

  if (row.seconds > 1800) {
    return toneStyle('danger')
  }

  return toneStyle('brand')
}

const timeOfDayStyle = (row: TokenTimingRow) => (
  row.timeOfDay === 'Morning'
    ? toneStyle('success', 0.1)
    : toneStyle('brand', 0.08)
)

const toneStyle = (tone: TokenTone, alpha = 0.1) => {
  if (tone === 'success') {
    return {
      color: colors.success,
      backgroundColor: `rgba(29, 201, 115, ${alpha})`
    }
  }

  if (tone === 'danger') {
    return {
      color: colors.danger,
      backgroundColor: `rgba(239, 67, 67, ${alpha})`
    }
  }

  return {
    color: colors.brand,
    backgroundColor: `rgba(56, 153, 250, ${alpha})`
  }
}

const hourlyTokenOption = computed<EChartsOption>(() => ({
  color: [colors.buligBar, colors.marantaoBar],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: 0,
    left: 'center',
    itemWidth: 45,
    itemHeight: 11,
    icon: 'rect',
    textStyle: {
      color: '#A1AAB7',
      fontSize: 12,
      fontWeight: 600
    }
  },
  grid: {
    left: 54,
    right: 24,
    top: 36,
    bottom: 36
  },
  xAxis: {
    type: 'category',
    data: hourlyRows.map((row) => row.label),
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#E8ECF2'
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
    name: 'Tokens',
    min: 0,
    max: 30,
    interval: 5,
    nameLocation: 'middle',
    nameGap: 34,
    nameTextStyle: {
      color: '#A1AAB7',
      fontSize: 12,
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
  series: [
    {
      name: 'Bulig',
      type: 'bar',
      stack: 'tokens',
      barWidth: 75,
      data: hourlyRows.map((row) => row.bulig),
      itemStyle: {
        color: colors.buligBar
      },
      emphasis: {
        focus: 'series'
      }
    },
    {
      name: 'Marantao',
      type: 'bar',
      stack: 'tokens',
      barWidth: 75,
      data: hourlyRows.map((row) => row.marantao),
      itemStyle: {
        color: colors.marantaoBar,
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        focus: 'series'
      }
    }
  ]
}))
</script>

<template>
  <article class="min-h-[1026px] w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex min-w-0 flex-col gap-[13.76px] pt-[21.9261px]">
      <header class="flex min-h-[39.44px] min-w-0 flex-wrap items-start justify-between gap-4">
        <div class="w-full min-w-0 max-w-[387px]">
          <h3 class="text-[17.0536px] font-semibold leading-[21px] text-[#15191E]">
            Token Start &amp; End Time
          </h3>
          <p class="mt-[2.44px] text-[13.3993px] font-normal leading-4 text-[#8D97A5]">
            Peak hour analysis &mdash; when tokens are issued and completed
          </p>
        </div>

        <div class="flex w-full min-w-0 flex-wrap items-center gap-[7.31px] sm:w-auto">
          <div class="flex min-h-[25.37px] flex-wrap items-start gap-[3.65px]">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              type="button"
              class="h-[25.37px] rounded-[6.09058px] border px-[10.557px] py-[4.46643px] font-['Arial'] text-[12.1812px] font-normal leading-[14px] transition-colors"
              :class="activeOffice === option.value ? 'border-[#3899FA] bg-[#3899FA] text-white' : 'border-[#DEE2E7] bg-white text-[#8D97A5]'"
              :style="{ width: option.width }"
              :aria-pressed="activeOffice === option.value"
              @click="activeOffice = option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <label class="relative block w-full sm:w-[194.9px]">
            <span class="sr-only">Search ID</span>
            <DashboardIcon name="search" :size="13.4" :stroke-width="1.4" class="pointer-events-none absolute left-[8.53px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
            <input
              id="token-start-end-search"
              v-model="searchQuery"
              type="search"
              name="token-start-end-search"
              aria-label="Search ID"
              placeholder="Search ID..."
              class="h-[31.81px] w-full rounded-[7.3087px] border border-[#DEE2E7] bg-[#F9FAFB] py-[5.68455px] pl-[30.0469px] pr-[9.3389px] text-[14.6174px] font-normal leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
            >
          </label>
        </div>
      </header>

      <section class="grid min-h-[73.13px] min-w-0 gap-[9.74px] pt-[3.28892px] md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="metric in metrics"
          :key="metric.key"
          class="flex h-[69.84px] min-w-0 items-center gap-[10.96px] rounded-[10.9631px] border border-[#EFF0F6] bg-[#F9FAFB] px-[14.2114px] py-[11.7751px]"
        >
          <span
            class="inline-flex h-[43.85px] w-[43.85px] shrink-0 items-center justify-center rounded-[10.9631px] text-[19.4899px] leading-6"
            :style="{ backgroundColor: metric.overlay }"
          >
            <span v-if="metric.key === 'earliest'">&#127749;</span>
            <span v-else-if="metric.key === 'latest'">&#127750;</span>
            <span v-else-if="metric.key === 'peak'">&#128293;</span>
            <span v-else>&#128197;</span>
          </span>

          <span class="block min-w-0">
            <span class="block text-[12.1812px] font-medium leading-[15px] text-[#8D97A5]">
              {{ metric.label }}
            </span>
            <span
              class="block truncate text-[17.0536px] font-bold leading-[19px]"
              :style="{ color: metric.color }"
            >
              {{ metric.value }}
            </span>
          </span>
        </article>
      </section>

      <section class="min-h-[278.05px] min-w-0 overflow-hidden rounded-[10.9631px] border border-[#EFF0F6] bg-white">
        <header class="flex h-[44.17px] items-center border-b border-[#EFF0F6] px-[17.0536px] py-[12.1812px]">
          <h4 class="text-[15.8355px] font-semibold leading-[19px] text-[#15191E]">
            Hourly Token Volume (Heat Map)
          </h4>
        </header>

        <div class="px-[17.0536px] py-[17.0536px]">
          <DashboardChartFrame :option="hourlyTokenOption" height="197.33px" />
        </div>
      </section>

      <section class="min-h-[398.75px] min-w-0 overflow-hidden rounded-[10.9631px] border border-[#EFF0F6] bg-white">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1000px] table-fixed border-collapse">
            <colgroup>
              <col class="w-[14.43%]">
              <col class="w-[13.6%]">
              <col class="w-[21.6%]">
              <col class="w-[21.56%]">
              <col class="w-[13.74%]">
              <col class="w-[15.07%]">
            </colgroup>
            <thead class="bg-[#F9FAFB]">
              <tr>
                <th class="h-[37.74px] border-b border-[#EFF0F6] px-[15.8355px] py-[10.9631px] text-left text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Token ID <span class="opacity-35">&#8645;</span>
                </th>
                <th class="h-[37.74px] border-b border-[#EFF0F6] px-[15.8355px] py-[10.9631px] text-left text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Office
                </th>
                <th class="h-[37.74px] border-b border-[#EFF0F6] px-[15.8355px] py-[10.9631px] text-left text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Start Time <span class="opacity-35">&#8645;</span>
                </th>
                <th class="h-[37.74px] border-b border-[#EFF0F6] px-[15.8355px] py-[10.9631px] text-left text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  End Time <span class="opacity-35">&#8645;</span>
                </th>
                <th class="h-[37.74px] border-b border-[#EFF0F6] px-[15.8355px] py-[10.9631px] text-right text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Duration
                </th>
                <th class="h-[37.74px] border-b border-[#EFF0F6] px-[15.8355px] py-[10.9631px] text-center text-[12.1812px] font-semibold uppercase leading-[15px] tracking-[0.609058px] text-[#8D97A5]">
                  Time of Day
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in visibleRows"
                :key="row.id"
                class="border-b border-[#EFF0F6] last:border-b-0"
              >
                <td class="h-[42.8px] px-[15.8355px] py-[11px] text-left">
                  <span class="inline-flex h-[18.06px] items-center rounded-[3.65435px] border border-[#EFF0F6] bg-[#F9FAFB] px-[4.46643px] font-['Consolas'] text-[12.1812px] font-normal leading-[14px] text-[#15191E]">
                    {{ row.tokenId }}
                  </span>
                </td>
                <td class="h-[42.8px] px-[15.8355px] py-[11px] text-left">
                  <span
                    class="inline-flex h-[19.87px] items-center rounded-[24.3623px] px-[8.52682px] text-[12.1812px] font-medium leading-[15px]"
                    :style="officeStyle(row.office)"
                  >
                    {{ row.office }}
                  </span>
                </td>
                <td class="h-[42.8px] px-[15.8355px] py-[13.3993px] text-[13.3993px] font-normal leading-4 text-[#15191E]">
                  {{ row.startTime }}
                </td>
                <td class="h-[42.8px] px-[15.8355px] py-[13.3993px] text-[13.3993px] font-normal leading-4 text-[#15191E]">
                  {{ row.endTime }}
                </td>
                <td class="h-[42.8px] px-[15.8355px] py-[10.9631px] text-right">
                  <span
                    class="inline-flex h-[20.87px] items-center rounded-[4.87247px] px-[7.3087px] font-['Consolas'] text-[13.3993px] font-bold leading-4"
                    :style="durationStyle(row)"
                  >
                    {{ row.duration }}
                  </span>
                </td>
                <td class="h-[42.8px] px-[15.8355px] py-[10.9631px] text-center">
                  <span
                    class="inline-flex h-[19.87px] items-center justify-center rounded-[4.87247px] px-[7.3087px] text-[12.1812px] font-normal leading-[15px]"
                    :style="timeOfDayStyle(row)"
                  >
                    {{ row.timeOfDay }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer class="flex min-h-[54.41px] flex-wrap items-center justify-between gap-4 border-t border-[#EFF0F6] bg-white px-[15.8355px] py-[10.9631px]">
          <p class="text-[13.3993px] font-normal leading-4 text-[#8D97A5]">
            Showing {{ visibleRows.length }} of 150 tokens
          </p>

          <nav class="flex h-[31.67px] items-center gap-[2.44px]" aria-label="Token timing pagination">
            <button
              type="button"
              disabled
              class="h-[31.67px] min-w-[31.67px] rounded-[6.09058px] border border-[#DEE2E7] bg-white px-[11.92px] text-[13.3993px] font-medium leading-4 text-[#15191E] opacity-30"
              aria-label="Previous page"
            >
              &#8249;
            </button>
            <button
              type="button"
              class="h-[31.67px] min-w-[33.1px] rounded-[6.09058px] border border-[#3899FA] bg-[#3899FA] px-[11.8279px] text-[13.3993px] font-medium leading-4 text-white"
              aria-current="page"
            >
              1
            </button>
            <button
              type="button"
              class="h-[31.67px] min-w-[32.41px] rounded-[6.09058px] border border-[#DEE2E7] bg-white px-[10.4758px] text-[13.3993px] font-medium leading-4 text-[#15191E]"
            >
              2
            </button>
            <button
              type="button"
              class="h-[31.67px] min-w-[31.67px] rounded-[6.09058px] border border-[#DEE2E7] bg-white px-[11.92px] text-[13.3993px] font-medium leading-4 text-[#15191E]"
              aria-label="Next page"
            >
              &#8250;
            </button>
          </nav>
        </footer>
      </section>
    </div>
  </article>
</template>
