<script setup lang="ts">
import type { EChartsOption } from 'echarts'

const searchQuery = ref('')

const genderColors = {
  male: '#3899FA',
  female: '#D63875',
  others: '#4E1B8C',
  total: '#3899FA'
} as const

const rows = [
  { id: 'region-i', region: 'Region I', shortRegion: 'Region I', male: 3, female: 0, others: 0, total: 3 },
  { id: 'barmm', region: 'Bangsamoro (BARMM)', shortRegion: 'BARMM', male: 64, female: 1, others: 2, total: 67 },
  { id: 'unknown', region: 'Information Not Provided', shortRegion: 'Info N/A', male: 32, female: 16, others: 0, total: 48 },
  { id: 'region-xi', region: 'Region XI', shortRegion: 'Region XI', male: 2, female: 0, others: 0, total: 2 },
  { id: 'ncr', region: 'National Capital Region', shortRegion: 'NCR', male: 0, female: 1, others: 0, total: 1 },
  { id: 'region-x', region: 'Region X', shortRegion: 'Region X', male: 1, female: 0, others: 0, total: 1 },
  { id: 'region-viii', region: 'Region VIII', shortRegion: 'Region VIII', male: 2, female: 0, others: 0, total: 2 },
  { id: 'region-xii', region: 'Region XII', shortRegion: 'Region XII', male: 1, female: 0, others: 0, total: 1 }
]

const totals = computed(() => ({
  id: 'total',
  region: 'Total',
  male: 105,
  female: 17,
  others: 2,
  total: 124
}))

const metricCards = computed(() => [
  {
    label: 'Male',
    value: totals.value.male,
    icon: '&#9794;',
    color: genderColors.male,
    overlay: 'rgba(56,153,250,0.1)',
    iconClass: 'font-[Arial] text-[26.815px] leading-[31px]'
  },
  {
    label: 'Female',
    value: totals.value.female,
    icon: '&#9792;',
    color: genderColors.female,
    overlay: 'rgba(214,56,117,0.1)',
    iconClass: 'font-[Arial] text-[26.815px] leading-[31px]'
  },
  {
    label: 'Others',
    value: totals.value.others,
    icon: '&#9895;',
    color: genderColors.others,
    overlay: 'rgba(78,27,140,0.1)',
    iconClass: 'font-[Segoe_UI_Symbol] text-[21.9396px] leading-[29px]'
  },
  {
    label: 'Total',
    value: totals.value.total,
    icon: '',
    color: genderColors.total,
    overlay: 'rgba(56,153,250,0.1)',
    iconClass: ''
  }
])

const filteredRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return rows
  }

  return rows.filter(row => row.region.toLowerCase().includes(search) || row.shortRegion.toLowerCase().includes(search))
})

const chartOption = computed<EChartsOption>(() => ({
  animation: false,
  tooltip: { show: false },
  legend: {
    bottom: 0,
    left: 'center',
    icon: 'rect',
    itemWidth: 31,
    itemHeight: 6,
    itemGap: 14,
    textStyle: {
      color: '#8D97A5',
      fontSize: 12,
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['44%', '68%'],
      center: ['50%', '46%'],
      avoidLabelOverlap: true,
      label: { show: false },
      labelLine: { show: false },
      data: [
        { name: 'Male', value: totals.value.male, itemStyle: { color: genderColors.male } },
        { name: 'Female', value: totals.value.female, itemStyle: { color: genderColors.female } },
        { name: 'Others', value: totals.value.others, itemStyle: { color: genderColors.others } }
      ]
    }
  ]
}))

const sortIcon = '&#8645;'

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function segmentWidth(value: number, total: number) {
  if (total <= 0) {
    return '0%'
  }

  return `${Math.max(0, (value / total) * 100)}%`
}
</script>

<template>
  <ReportPreviewShell
    title="User Gender Distribution"
    subtitle="Gender breakdown per region"
  >
    <template #actions>
      <label class="relative block w-full sm:w-[219.4px]">
        <span class="sr-only">Search region</span>
        <DashboardIcon name="search" :size="14.63" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search region..."
          class="h-[35.06px] w-full rounded-[7.31319px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.31319px] pl-[32.9093px] pr-[12.1886px] text-[14.6264px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
        />
      </label>
    </template>

    <div class="mt-[14.63px] grid gap-[12.1886px] pt-[2.43773px] sm:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="metric in metricCards"
        :key="metric.label"
        class="flex min-h-[80.45px] min-w-[158.45px] items-center gap-[12.19px] rounded-[12.1886px] border border-[#EFF0F6] bg-[#F9FAFB] px-[17.0641px] py-[14.6264px]"
      >
        <span
          class="inline-flex h-[48.75px] w-[48.75px] shrink-0 items-center justify-center rounded-[12.1886px] text-[#15191E]"
          :style="{ backgroundColor: metric.overlay }"
        >
          <span
            v-if="metric.icon"
            class="inline-flex items-center justify-center text-center"
            :class="metric.iconClass"
            v-html="metric.icon"
          />
          <DashboardIcon v-else name="users" :size="24.38" />
        </span>

        <span class="min-w-0">
          <span class="block text-[13.4075px] font-medium leading-4 text-[#8D97A5]">
            {{ metric.label }}
          </span>
          <span class="block text-[26.815px] font-bold leading-[30px]" :style="{ color: metric.color }">
            {{ metric.value }}
          </span>
        </span>
      </article>
    </div>

    <div class="mt-[14.63px] grid gap-[14.63px] xl:grid-cols-2">
      <section class="min-h-[354.19px] overflow-hidden rounded-[12.1886px] border border-[#EFF0F6] bg-white">
        <header class="flex h-[49.47px] items-center px-[19.5018px] py-[14.6264px]">
          <h4 class="text-[15.8452px] font-semibold leading-[19px] text-[#15191E]">
            Ratio
          </h4>
        </header>

        <div class="px-[19.5018px] pb-[70.6941px] pt-[19.5018px]">
          <DashboardChartFrame :option="chartOption" height="192.58px" />
        </div>
      </section>

      <section class="min-h-[345.67px] overflow-hidden rounded-[12.1886px] border border-[#EFF0F6] bg-white">
        <header class="flex h-[49.47px] items-center px-[19.5018px] py-[14.6264px]">
          <h4 class="text-[15.8452px] font-semibold leading-[19px] text-[#15191E]">
            By Region
          </h4>
        </header>

        <div>
          <div
            v-for="row in filteredRows"
            :key="`region-${row.id}`"
            class="grid min-h-[36.72px] grid-cols-[minmax(110px,1fr)_30px_30px_minmax(116px,1fr)_30px] items-center gap-[9.75px] border-t border-[#EFF0F6] px-[14.6264px] py-[9.75092px]"
          >
            <span class="min-w-0 truncate text-[13.4075px] font-medium leading-4 text-black">
              {{ row.shortRegion }}
            </span>
            <span class="text-right text-[13.4075px] font-normal leading-4 text-[#3899FA]">
              {{ row.male }}
            </span>
            <span class="text-right text-[13.4075px] font-normal leading-4 text-[#D63875]">
              {{ row.female }}
            </span>
            <span class="flex h-[7.31px] overflow-hidden rounded-[3.65659px] bg-[#EFF0F6]">
              <span class="h-full" :style="{ width: segmentWidth(row.male, row.total), backgroundColor: genderColors.male }" />
              <span class="h-full" :style="{ width: segmentWidth(row.female, row.total), backgroundColor: genderColors.female }" />
            </span>
            <span class="text-right text-[13.4075px] font-semibold leading-4 text-black">
              {{ row.total }}
            </span>
          </div>
        </div>
      </section>
    </div>

    <div class="mt-[14.63px] overflow-hidden rounded-[12.1886px] border border-[#EFF0F6] bg-white">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] border-separate border-spacing-0">
          <colgroup>
            <col class="w-[28.18%]" />
            <col class="w-[11.94%]" />
            <col class="w-[14.08%]" />
            <col class="w-[14.15%]" />
            <col class="w-[21.23%]" />
            <col class="w-[10.42%]" />
          </colgroup>

          <thead>
            <tr>
              <th class="bg-[#F9FAFB] px-[17.0641px] py-[12.1886px] text-left text-[12.1886px] font-semibold uppercase leading-[15px] tracking-[0.609432px] text-[#8D97A5]">
                <span class="inline-flex items-center gap-[3.66px]">
                  Region <span class="font-normal opacity-35" v-html="sortIcon" />
                </span>
              </th>
              <th class="bg-[#F9FAFB] px-[17.0641px] py-[12.1886px] text-right text-[12.1886px] font-semibold uppercase leading-[15px] tracking-[0.609432px] text-[#8D97A5]">
                <span class="inline-flex items-center justify-end gap-[3.67px]">
                  Male <span class="font-normal opacity-35" v-html="sortIcon" />
                </span>
              </th>
              <th class="bg-[#F9FAFB] px-[17.0641px] py-[12.1886px] text-right text-[12.1886px] font-semibold uppercase leading-[15px] tracking-[0.609432px] text-[#8D97A5]">
                <span class="inline-flex items-center justify-end gap-[3.67px]">
                  Female <span class="font-normal opacity-35" v-html="sortIcon" />
                </span>
              </th>
              <th class="bg-[#F9FAFB] px-[17.0641px] py-[12.1886px] text-right text-[12.1886px] font-semibold uppercase leading-[15px] tracking-[0.609432px] text-[#8D97A5]">
                <span class="inline-flex items-center justify-end gap-[3.64px]">
                  Others <span class="font-normal opacity-35" v-html="sortIcon" />
                </span>
              </th>
              <th class="bg-[#F9FAFB] px-[17.0641px] py-[12.1886px] text-left text-[12.1886px] font-semibold uppercase leading-[15px] tracking-[0.609432px] text-[#8D97A5]">
                Distribution
              </th>
              <th class="bg-[#F9FAFB] px-[17.0641px] py-[12.1886px] text-right text-[12.1886px] font-semibold uppercase leading-[15px] tracking-[0.609432px] text-[#8D97A5]">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="row in filteredRows" :key="`table-${row.id}`">
              <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[12.7981px] text-[14.6264px] font-normal leading-[18px] text-[#15191E]">
                {{ row.region }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[12.7981px] text-right text-[14.6264px] font-medium leading-[18px] text-[#15191E]">
                {{ formatNumber(row.male) }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[12.7981px] text-right text-[14.6264px] font-medium leading-[18px] text-[#15191E]">
                {{ formatNumber(row.female) }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[12.7981px] text-right text-[14.6264px] font-medium leading-[18px] text-[#15191E]">
                {{ formatNumber(row.others) }}
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[19.97px]">
                <span class="flex h-[4.88px] overflow-hidden rounded-[2.43773px] bg-[#EFF0F6]">
                  <span class="h-full rounded-l-[2.43773px]" :style="{ width: segmentWidth(row.male, row.total), backgroundColor: genderColors.male }" />
                  <span class="h-full" :style="{ width: segmentWidth(row.female, row.total), backgroundColor: genderColors.female }" />
                </span>
              </td>
              <td class="border-b border-[#EFF0F6] px-[17.0641px] py-[12.7981px] text-right text-[14.6264px] font-bold leading-[18px] text-[#3899FA]">
                {{ formatNumber(row.total) }}
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr class="bg-[#F9FAFB]">
              <td class="border-t-[2.43773px] border-[#DEE2E7] px-[17.0641px] py-[10.9698px] text-[14.6264px] font-semibold leading-[18px] text-black">
                Total
              </td>
              <td class="border-t-[2.43773px] border-[#DEE2E7] px-[17.0641px] py-[10.9698px] text-right text-[14.6264px] font-medium leading-[18px] text-black">
                {{ formatNumber(totals.male) }}
              </td>
              <td class="border-t-[2.43773px] border-[#DEE2E7] px-[17.0641px] py-[10.9698px] text-right text-[14.6264px] font-medium leading-[18px] text-black">
                {{ formatNumber(totals.female) }}
              </td>
              <td class="border-t-[2.43773px] border-[#DEE2E7] px-[17.0641px] py-[10.9698px] text-right text-[14.6264px] font-medium leading-[18px] text-black">
                {{ formatNumber(totals.others) }}
              </td>
              <td class="border-t-[2.43773px] border-[#DEE2E7]" />
              <td class="border-t-[2.43773px] border-[#DEE2E7] px-[17.0641px] py-[10.9698px] text-right text-[14.6264px] font-bold leading-[18px] text-[#3899FA]">
                {{ formatNumber(totals.total) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </ReportPreviewShell>
</template>
