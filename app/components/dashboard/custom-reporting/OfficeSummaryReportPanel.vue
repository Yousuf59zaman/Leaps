<script setup lang="ts">
import type { EChartsOption } from 'echarts'

interface OfficeSummaryRow {
  id: string
  office: string
  tokens: number
  share: number
  shareLabel: string
  color: string
  tag?: string
}

interface OfficeMetricCard {
  label: string
  value: string
  color: string
  subtext?: string
  valueClass?: string
}

const searchQuery = ref('')

const officeColors = {
  brand: '#3899FA',
  green: '#75D337',
  success: '#1DC973',
  purple: '#4E1B8C',
  orange: '#E89A7A',
  muted: '#8D97A5',
  text: '#15191E',
  border: '#EFF0F6',
  fieldBorder: '#DEE2E7',
  panel: '#F9FAFB'
} as const

const officeRows: OfficeSummaryRow[] = [
  {
    id: 'bulig',
    office: 'Bulig',
    tokens: 129,
    share: 86,
    shareLabel: '86%',
    color: officeColors.brand,
    tag: 'Top'
  },
  {
    id: 'marantao',
    office: 'Marantao',
    tokens: 19,
    share: 13,
    shareLabel: '13%',
    color: officeColors.green
  },
  {
    id: 'pagapu',
    office: 'Pagapu',
    tokens: 1,
    share: 0.67,
    shareLabel: '<1%',
    color: officeColors.muted
  },
  {
    id: 'shariff-aguak',
    office: 'Shariff Aguak',
    tokens: 1,
    share: 0.67,
    shareLabel: '<1%',
    color: officeColors.muted
  }
]

const legendRows = [
  { ...officeRows[0], color: '#60A5FA' },
  { ...officeRows[1], color: '#88E05D' },
  { ...officeRows[2], color: officeColors.orange },
  { ...officeRows[3], color: '#8C68AD' }
] as const

const totalTokens = officeRows.reduce((sum, row) => sum + row.tokens, 0)
const busiestOffice = officeRows.reduce((current, row) => (row.tokens > current.tokens ? row : current), officeRows[0])
const averageTokens = totalTokens / officeRows.length

const metricCards: OfficeMetricCard[] = [
  {
    label: 'Total Offices',
    value: String(officeRows.length),
    color: officeColors.purple
  },
  {
    label: 'Total Tokens',
    value: String(totalTokens),
    color: officeColors.brand
  },
  {
    label: 'Busiest Office',
    value: busiestOffice.office,
    subtext: `${busiestOffice.tokens} tokens`,
    color: officeColors.success,
    valueClass: 'text-[16.889px] leading-[19px]'
  },
  {
    label: 'Avg Tokens/Office',
    value: averageTokens.toFixed(1),
    color: officeColors.success
  }
] as const

const visibleRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return officeRows
  }

  return officeRows.filter((row) => row.office.toLowerCase().includes(search))
})

const tokenDistributionOption = computed<EChartsOption>(() => ({
  color: legendRows.map((row) => row.color),
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} tokens ({d}%)'
  },
  legend: {
    bottom: 0,
    left: 'center',
    itemWidth: 38,
    itemHeight: 7,
    icon: 'rect',
    textStyle: {
      color: officeColors.muted,
      fontSize: 11,
      fontWeight: 500
    }
  },
  series: [
    {
      name: 'Token Distribution',
      type: 'pie',
      radius: ['42%', '67%'],
      center: ['50%', '42%'],
      selectedMode: 'multiple',
      avoidLabelOverlap: true,
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      emphasis: {
        scale: true,
        scaleSize: 6,
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.16)'
        }
      },
      data: legendRows.map((row) => ({
        name: row.office,
        value: row.tokens
      }))
    }
  ]
}))

const officeLoadOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: 104,
    right: 44,
    top: 14,
    bottom: 18
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: totalTokens,
    axisLabel: {
      color: officeColors.muted,
      fontSize: 12
    },
    splitLine: {
      lineStyle: {
        color: officeColors.border
      }
    }
  },
  yAxis: {
    type: 'category',
    inverse: true,
    data: visibleRows.value.map((row) => row.office),
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#000000',
      fontSize: 14,
      fontWeight: 500
    }
  },
  series: [
    {
      name: 'Tokens',
      type: 'bar',
      barWidth: 8,
      data: visibleRows.value.map((row) => ({
        value: row.tokens,
        itemStyle: {
          color: row.color,
          borderRadius: 3
        }
      })),
      label: {
        show: true,
        position: 'right',
        formatter: (params: unknown) => {
          const dataIndex = typeof params === 'object' && params && 'dataIndex' in params
            ? Number((params as { dataIndex: number }).dataIndex)
            : -1
          const row = visibleRows.value[dataIndex]

          return row ? `${row.tokens} (${row.shareLabel})` : ''
        },
        color: officeColors.muted,
        fontSize: 12
      },
      emphasis: {
        focus: 'series'
      }
    }
  ]
}))

const getBarWidth = (row: OfficeSummaryRow) => `${Math.max(row.share, row.tokens > 0 ? 1 : 0)}%`
</script>

<template>
  <article class="min-h-[775px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[12.06px] pt-[21.7144px]">
      <header class="flex min-h-[38.41px] flex-wrap items-start justify-between gap-4">
        <div class="w-full max-w-[305px]">
          <h3 class="text-[16.889px] font-semibold leading-5 text-[#15191E]">
            Office Summary
          </h3>
          <p class="mt-[2.41px] text-[13.2699px] font-normal leading-4 text-[#8D97A5]">
            Token count and workload distribution per office
          </p>
        </div>

        <label class="relative block w-full sm:w-[191.68px]">
          <span class="sr-only">Search office</span>
          <DashboardIcon name="search" :size="13.18" :stroke-width="1.38" class="pointer-events-none absolute left-[8.39px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search office..."
            class="h-[32.48px] w-full rounded-[7.23814px] border border-[#DEE2E7] bg-[#F9FAFB] py-[6.03178px] pl-[30.1589px] pr-[9.65085px] text-[14.4763px] font-normal leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
          />
        </label>
      </header>

      <section class="grid min-h-[80.37px] gap-[9.65085px] pt-[4.82542px] md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="metric in metricCards"
          :key="metric.label"
          class="flex h-[75.54px] min-w-[143.76px] items-center rounded-[10.8572px] border border-[#EFF0F6] bg-[#F9FAFB] px-[14.4763px] py-[12.0636px]"
        >
          <span class="block min-w-0">
            <span class="block text-[12.0636px] font-medium leading-[15px] text-[#8D97A5]">
              {{ metric.label }}
            </span>
            <span
              class="block font-bold"
              :class="metric.valueClass || 'text-[24.1271px] leading-[27px]'"
              :style="{ color: metric.color }"
            >
              {{ metric.value }}
            </span>
            <span
              v-if="'subtext' in metric"
              class="block text-[12.0636px] font-normal leading-[15px] text-[#8D97A5]"
            >
              {{ metric.subtext }}
            </span>
          </span>
        </article>
      </section>

      <section class="grid min-h-[307.33px] gap-[12.06px] pt-[2.41px] xl:grid-cols-2">
        <article class="h-[289.7px] overflow-hidden rounded-[10.8572px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.33px] items-center px-[16.889px] py-[12.0636px]">
            <h4 class="text-[15.6826px] font-semibold leading-[19px] text-[#15191E]">
              Token Distribution
            </h4>
          </header>

          <div class="flex h-[242.95px] flex-col items-center justify-center px-[16.889px] pb-[16.889px] pt-[8px]">
            <DashboardChartFrame :option="tokenDistributionOption" height="206px" class="w-full" />
          </div>
        </article>

        <article class="h-[287.84px] overflow-hidden rounded-[10.8572px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.33px] items-center px-[16.889px] py-[12.0636px]">
            <h4 class="text-[15.6826px] font-semibold leading-[19px] text-[#15191E]">
              Office Load
            </h4>
          </header>

          <div class="h-[197.66px] px-[16.889px] py-[14.4763px]">
            <DashboardChartFrame :option="officeLoadOption" height="168.7px" />
          </div>
        </article>
      </section>

      <section class="h-[247.75px] overflow-hidden rounded-[10.8572px] border border-[#EFF0F6] bg-white">
        <div class="thin-office-scrollbar h-full overflow-x-auto">
          <table class="w-full min-w-[920px] table-fixed border-separate border-spacing-0 xl:min-w-0">
            <colgroup>
              <col style="width: 27.43%" />
              <col style="width: 26.92%" />
              <col style="width: 28.52%" />
              <col style="width: 17.13%" />
            </colgroup>

            <thead>
              <tr class="h-[37.92px]">
                <th class="bg-[#F9FAFB] px-[15.6826px] py-[10.8572px] text-left text-[12.0636px] font-semibold uppercase leading-[15px] tracking-[0.603178px] text-[#8D97A5]">
                  <span class="inline-flex items-center gap-[2.41px]">
                    Office Name <span class="text-[10.8572px] opacity-35">&#8645;</span>
                  </span>
                </th>
                <th class="bg-[#F9FAFB] px-[15.6826px] py-[10.8572px] text-right text-[12.0636px] font-semibold uppercase leading-[15px] tracking-[0.603178px] text-[#8D97A5]">
                  <span class="inline-flex items-center justify-end gap-[2.41px]">
                    Token Count <span class="text-[10.8572px] opacity-35">&#8645;</span>
                  </span>
                </th>
                <th class="bg-[#F9FAFB] px-[15.6826px] py-[10.8572px] text-left text-[12.0636px] font-semibold uppercase leading-[15px] tracking-[0.603178px] text-[#8D97A5]">
                  Share of Total
                </th>
                <th class="bg-[#F9FAFB] px-[15.6826px] py-[10.8572px] text-center text-[12.0636px] font-semibold uppercase leading-[15px] tracking-[0.603178px] text-[#8D97A5]">
                  Ranking
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(row, index) in visibleRows"
                :key="row.id"
                class="h-[42.13px]"
              >
                <td class="border-b border-[#EFF0F6] px-[15.6826px] py-[11.4604px] text-[14.4763px] font-normal leading-[18px] text-[#15191E]">
                  <span class="inline-flex items-center gap-[6px]">
                    <span
                      v-if="row.tag"
                      class="inline-flex h-[19.83px] items-center rounded-[24.1271px] bg-[rgba(117,211,55,0.1)] px-[8.44449px] py-[2.41271px] text-[12.0636px] font-medium leading-[15px] text-[#75D337]"
                    >
                      {{ row.tag }}
                    </span>
                    {{ row.office }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.6826px] py-[11.4604px] text-right text-[14.4763px] font-medium leading-[18px] text-[#15191E]">
                  <span
                    :class="row.id === 'bulig' ? 'font-bold text-[#3899FA]' : ''"
                  >
                    {{ row.tokens }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.6826px] py-[13.565px]">
                  <div class="flex h-[15px] items-center gap-[6.03px]">
                    <span class="relative block h-[4.86px] flex-1 overflow-hidden rounded-[2.41271px] bg-[#EFF0F6]">
                      <span
                        class="absolute inset-y-0 left-0 rounded-[2.41271px]"
                        :style="{ width: getBarWidth(row), backgroundColor: row.color }"
                      />
                    </span>
                    <span class="min-w-[35.94px] text-right text-[12.0636px] font-semibold leading-[15px] text-[#15191E]">
                      {{ row.shareLabel }}
                    </span>
                  </div>
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.6826px] py-[11.4604px] text-center text-[14.4763px] font-normal leading-[18px] text-[#15191E]">
                  #{{ index + 1 }}
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr class="h-[41.3px] bg-[#F9FAFB]">
                <td class="border-t-[2.41271px] border-[#DEE2E7] px-[15.6826px] py-[9.65085px] text-[14.4763px] font-semibold leading-[18px] text-black">
                  Total
                </td>
                <td class="border-t-[2.41271px] border-[#DEE2E7] px-[15.6826px] py-[9.65085px] text-right text-[14.4763px] font-bold leading-[18px] text-[#3899FA]">
                  {{ totalTokens }}
                </td>
                <td class="border-t-[2.41271px] border-[#DEE2E7]" />
                <td class="border-t-[2.41271px] border-[#DEE2E7]" />
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.thin-office-scrollbar {
  scrollbar-color: rgba(141, 151, 165, 0.35) transparent;
  scrollbar-width: thin;
}

.thin-office-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.thin-office-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.thin-office-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(141, 151, 165, 0.35);
  border-radius: 999px;
}
</style>
