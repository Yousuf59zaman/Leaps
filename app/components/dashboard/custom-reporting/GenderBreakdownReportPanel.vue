<script setup lang="ts">
import type { EChartsOption } from 'echarts'

type GenderMetricKey = 'male' | 'female' | 'pwd' | 'pregnant' | 'senior'

interface GenderMetric {
  key: GenderMetricKey
  label: string
  value: number
  suffix: string
  color: string
  overlay: string
}

interface GenderOfficeRow {
  id: string
  office: string
  male: number
  female: number
  special: number
  total: number
}

interface DonutSegment {
  label: string
  value: number
  color: string
}

const colors = {
  male: '#60A5FA',
  maleValue: '#3899FA',
  female: '#D63875',
  pwd: '#D97855',
  pregnant: '#7A5CA8',
  ip: '#BCE53F',
  senior: '#4CD486',
  seniorValue: '#75D337',
  regular: '#EFF0F6',
  specialValue: '#C9481D',
  text: '#15191E',
  muted: '#8D97A5',
  panel: '#F9FAFB',
  border: '#EFF0F6',
  fieldBorder: '#DEE2E7',
  purple: '#4E1B8C'
} as const

const totalVisitors = 150
const totalMale = 83
const totalFemale = 67
const totalSpecial = 80

const metricCards: GenderMetric[] = [
  {
    key: 'male',
    label: 'Male',
    value: totalMale,
    suffix: '55.3% of total',
    color: colors.maleValue,
    overlay: 'rgba(56, 153, 250, 0.1)'
  },
  {
    key: 'female',
    label: 'Female',
    value: totalFemale,
    suffix: '44.7% of total',
    color: colors.female,
    overlay: 'rgba(214, 56, 117, 0.1)'
  },
  {
    key: 'pwd',
    label: 'PWD',
    value: 28,
    suffix: 'of 150',
    color: colors.specialValue,
    overlay: 'rgba(201, 72, 29, 0.1)'
  },
  {
    key: 'pregnant',
    label: 'Pregnant',
    value: 12,
    suffix: 'of 150',
    color: colors.purple,
    overlay: 'rgba(78, 27, 140, 0.1)'
  },
  {
    key: 'senior',
    label: 'Senior Citizen',
    value: 40,
    suffix: 'of 150',
    color: colors.seniorValue,
    overlay: 'rgba(117, 211, 55, 0.1)'
  }
]

const genderSegments: DonutSegment[] = [
  { label: 'Male (83)', value: totalMale, color: colors.male },
  { label: 'Female (67)', value: totalFemale, color: colors.female }
]

const classificationSegments: DonutSegment[] = [
  { label: 'PWD (28)', value: 28, color: colors.pwd },
  { label: 'Pregnant (12)', value: 12, color: colors.pregnant },
  { label: 'IP (8)', value: 8, color: colors.ip },
  { label: 'Senior Citizen (32)', value: 32, color: colors.senior },
  { label: 'Regular (70)', value: 70, color: colors.regular }
]

const officeRows: GenderOfficeRow[] = [
  { id: 'bulig', office: 'Bulig', male: 74, female: 55, special: 62, total: 129 },
  { id: 'marantao', office: 'Marantao', male: 8, female: 11, special: 16, total: 19 },
  { id: 'pagapu', office: 'Pagapu', male: 1, female: 0, special: 1, total: 1 },
  { id: 'shariff-aguak', office: 'Shariff Aguak', male: 0, female: 1, special: 1, total: 1 }
]

const genderDonutOption = computed<EChartsOption>(() => ({
  color: genderSegments.map(segment => segment.color),
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}'
  },
  legend: {
    bottom: 0,
    left: 'center',
    icon: 'rect',
    itemWidth: 38,
    itemHeight: 8,
    itemGap: 18,
    textStyle: {
      color: colors.muted,
      fontSize: 10.8,
      fontWeight: 500
    }
  },
  graphic: [
    {
      type: 'group',
      left: 'center',
      top: '43%',
      children: [
        {
          type: 'text',
          left: 'center',
          top: -18,
          style: {
            text: String(totalVisitors),
            fill: colors.text,
            fontSize: 26,
            fontWeight: 700,
            textAlign: 'center'
          }
        },
        {
          type: 'text',
          left: 'center',
          top: 14,
          style: {
            text: 'Total',
            fill: colors.muted,
            fontSize: 12,
            fontWeight: 500,
            textAlign: 'center'
          }
        }
      ]
    }
  ],
  series: [
    {
      name: 'Gender',
      type: 'pie',
      radius: ['47%', '74%'],
      center: ['50%', '43%'],
      avoidLabelOverlap: true,
      label: { show: false },
      labelLine: { show: false },
      emphasis: {
        scale: true,
        scaleSize: 6,
        itemStyle: {
          shadowBlur: 12,
          shadowColor: 'rgba(21, 25, 30, 0.18)'
        }
      },
      data: genderSegments.map(segment => ({
        name: segment.label,
        value: segment.value
      }))
    }
  ]
}))

const classificationDonutOption = computed<EChartsOption>(() => ({
  color: classificationSegments.map(segment => segment.color),
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}'
  },
  legend: {
    bottom: 0,
    left: 'center',
    icon: 'rect',
    itemWidth: 38,
    itemHeight: 8,
    itemGap: 14,
    textStyle: {
      color: colors.muted,
      fontSize: 10.8,
      fontWeight: 500
    }
  },
  series: [
    {
      name: 'Special Classification',
      type: 'pie',
      radius: ['36%', '64%'],
      center: ['50%', '42%'],
      selectedMode: 'multiple',
      avoidLabelOverlap: true,
      label: { show: false },
      labelLine: { show: false },
      emphasis: {
        scale: true,
        scaleSize: 6,
        itemStyle: {
          shadowBlur: 12,
          shadowColor: 'rgba(21, 25, 30, 0.18)'
        }
      },
      data: classificationSegments.map(segment => ({
        name: segment.label,
        value: segment.value
      }))
    }
  ]
}))

const segmentWidth = (value: number, total: number) => (
  total > 0 ? `${(value / total) * 100}%` : '0%'
)
</script>

<template>
  <article class="min-h-[1026px] w-full max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex min-w-0 flex-col gap-[11.99px] pt-[21.5822px]">
      <header class="flex min-h-[38.4px] min-w-0 flex-wrap items-start">
        <div class="w-full min-w-0 max-w-[510px]">
          <h3 class="text-[16.7862px] font-semibold leading-5 text-[#15191E]">
            Gender Breakdown
          </h3>
          <p class="mt-[2.4px] text-[13.1892px] font-normal leading-4 text-[#8D97A5]">
            Visitor classification analysis &mdash; Male, Female, PWD / Pregnant / IP / Senior Citizen
          </p>
        </div>
      </header>

      <section class="grid min-h-[88.17px] min-w-0 gap-[9.59211px] pt-[4.79605px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <article
          v-for="metric in metricCards"
          :key="metric.key"
          class="flex h-[83.38px] min-w-[143.76px] items-center gap-[10.79px] rounded-[10.7911px] border border-[#EFF0F6] bg-[#F9FAFB] px-[14.3882px] py-[11.9901px]"
        >
          <span
            class="inline-flex h-[43.2px] w-[43.13px] shrink-0 items-center justify-center rounded-[10.7911px] text-black"
            :style="{ backgroundColor: metric.overlay }"
          >
            <span v-if="metric.key === 'male'" class="font-['Arial'] text-[21.5822px] leading-[25px]">&#9794;</span>
            <span v-else-if="metric.key === 'female'" class="font-['Arial'] text-[21.5822px] leading-[25px]">&#9792;</span>
            <span v-else-if="metric.key === 'pwd'" class="font-['Segoe_UI_Symbol'] text-[19.1842px] leading-[21px] text-black grayscale">&#9855;&#65038;</span>
            <span v-else-if="metric.key === 'pregnant'" class="font-['Segoe_UI_Symbol'] text-[19.1842px] leading-[21px] text-black grayscale">&#129328;&#65038;</span>
            <span v-else class="font-['Segoe_UI_Symbol'] text-[19.1842px] leading-[21px] text-black grayscale">&#129491;&#65038;</span>
          </span>

          <span class="block min-w-0">
            <span class="block text-[11.9901px] font-medium leading-[15px] text-[#8D97A5]">
              {{ metric.label }}
            </span>
            <span
              class="block text-[23.9803px] font-bold leading-[26px]"
              :style="{ color: metric.color }"
            >
              {{ metric.value }}
            </span>
            <span class="block text-[11.9901px] font-normal leading-[15px] text-[#8D97A5]">
              {{ metric.suffix }}
            </span>
          </span>
        </article>
      </section>

      <section class="grid min-h-[303.6px] min-w-0 gap-[12px] pt-[2.4px] xl:grid-cols-2">
        <article class="min-h-[286.58px] overflow-hidden rounded-[10.7911px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.18px] items-center border-b border-[#EFF0F6] px-[16.7862px] py-[11.9901px]">
            <h4 class="text-[15.5872px] font-semibold leading-[19px] text-[#15191E]">
              Male vs Female
            </h4>
          </header>

          <div class="flex min-h-[240px] items-center justify-center px-[16.7862px] pb-[16.7862px] pt-[16.7862px]">
            <DashboardChartFrame
              :option="genderDonutOption"
              height="206.4px"
              class="w-full"
            />
          </div>
        </article>

        <article class="min-h-[286.58px] overflow-hidden rounded-[10.7911px] border border-[#EFF0F6] bg-white">
          <header class="flex h-[44.18px] items-center border-b border-[#EFF0F6] px-[16.7862px] py-[11.9901px]">
            <h4 class="text-[15.5872px] font-semibold leading-[19px] text-[#15191E]">
              Special Classification
            </h4>
          </header>

          <div class="flex min-h-[240px] items-center justify-center px-[16.7862px] pb-[16.7862px] pt-[16.7862px]">
            <DashboardChartFrame
              :option="classificationDonutOption"
              height="206.4px"
              class="w-full"
            />
          </div>
        </article>
      </section>

      <section class="min-h-[284.88px] min-w-0 overflow-hidden rounded-[10.7911px] border border-[#EFF0F6] bg-white">
        <header class="flex h-[44.18px] items-center border-b border-[#EFF0F6] px-[16.7862px] py-[11.9901px]">
          <h4 class="text-[15.5872px] font-semibold leading-[19px] text-[#15191E]">
            Gender by Office
          </h4>
        </header>

        <div class="thin-gender-breakdown-scrollbar min-w-0 overflow-x-auto">
          <table class="w-full min-w-[1040px] table-fixed border-separate border-spacing-0 xl:min-w-0">
            <colgroup>
              <col style="width: 16.82%" />
              <col style="width: 11.27%" />
              <col style="width: 13.38%" />
              <col style="width: 26.27%" />
              <col style="width: 20.59%" />
              <col style="width: 11.67%" />
            </colgroup>

            <thead>
              <tr class="h-[37.78px]">
                <th
                  v-for="header in ['Office', 'Male', 'Female', 'PWD/Pregnant/IP/SC', 'Gender Split', 'Total']"
                  :key="header"
                  class="bg-[#F9FAFB] px-[15.5872px] py-[10.7911px] text-[11.9901px] font-semibold uppercase leading-[15px] tracking-[0.599507px] text-[#8D97A5]"
                  :class="header === 'Office' || header === 'Gender Split' ? 'text-left' : 'text-right'"
                >
                  {{ header }}
                  <span
                    v-if="header !== 'Gender Split' && header !== 'Total'"
                    class="font-['Cambria_Math'] text-[10.7911px] font-normal leading-[13px] opacity-35"
                  >
                    &#8645;
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in officeRows"
                :key="row.id"
                class="h-[40.98px]"
              >
                <td class="border-b border-[#EFF0F6] px-[15.5872px] py-[11.3906px] text-[14.3882px] font-normal leading-[17px] text-[#15191E]">
                  {{ row.office }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.5872px] py-[11.3906px] text-right text-[14.3882px] font-medium leading-[17px] text-[#15191E]">
                  {{ row.male }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.5872px] py-[11.3906px] text-right text-[14.3882px] font-medium leading-[17px] text-[#15191E]">
                  {{ row.female }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.5872px] py-[11.3906px] text-right text-[14.3882px] font-medium leading-[17px] text-[#15191E]">
                  {{ row.special }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.5752px] py-[17.39px]">
                  <div class="flex h-[4.8px] overflow-hidden rounded-[2.39803px] bg-[#EFF0F6]">
                    <span
                      class="h-full rounded-l-[2.39803px]"
                      :style="{ width: segmentWidth(row.male, row.male + row.female), backgroundColor: colors.maleValue }"
                    />
                    <span
                      class="h-full"
                      :class="row.male === 0 ? 'rounded-l-[2.39803px]' : ''"
                      :style="{ width: segmentWidth(row.female, row.male + row.female), backgroundColor: colors.female }"
                    />
                  </div>
                </td>
                <td class="border-b border-[#EFF0F6] px-[15.5872px] py-[11.3906px] text-right text-[14.3882px] font-bold leading-[17px] text-[#3899FA]">
                  {{ row.total }}
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr class="h-[40.8px] bg-[#F9FAFB]">
                <td class="border-t-[2.39803px] border-[#DEE2E7] px-[15.5872px] py-[9.59211px] text-[14.3882px] font-semibold leading-[17px] text-black">
                  Total
                </td>
                <td class="border-t-[2.39803px] border-[#DEE2E7] px-[15.5872px] py-[9.59211px] text-right text-[14.3882px] font-medium leading-[17px] text-black">
                  {{ totalMale }}
                </td>
                <td class="border-t-[2.39803px] border-[#DEE2E7] px-[15.5872px] py-[9.59211px] text-right text-[14.3882px] font-medium leading-[17px] text-black">
                  {{ totalFemale }}
                </td>
                <td class="border-t-[2.39803px] border-[#DEE2E7] px-[15.5872px] py-[9.59211px] text-right text-[14.3882px] font-medium leading-[17px] text-black">
                  {{ totalSpecial }}
                </td>
                <td class="border-t-[2.39803px] border-[#DEE2E7]" />
                <td class="border-t-[2.39803px] border-[#DEE2E7] px-[15.5872px] py-[9.59211px] text-right text-[14.3882px] font-bold leading-[17px] text-[#3899FA]">
                  {{ totalVisitors }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>
.thin-gender-breakdown-scrollbar {
  scrollbar-color: rgba(141, 151, 165, 0.35) transparent;
  scrollbar-width: thin;
}

.thin-gender-breakdown-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.thin-gender-breakdown-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.thin-gender-breakdown-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(141, 151, 165, 0.35);
  border-radius: 999px;
}
</style>
