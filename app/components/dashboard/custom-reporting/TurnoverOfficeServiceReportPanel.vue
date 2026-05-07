<script setup lang="ts">
const searchQuery = ref('')
const expanded = ref(false)

const turnoverColors = {
  brand: '#3899FA',
  success: '#1DC973',
  warning: '#C9481D',
  purple: '#4E1B8C',
  muted: '#8D97A5',
  text: '#15191E'
} as const

const metricCards = [
  {
    label: 'Fastest Office',
    value: 'Bulaon',
    caption: '00:24:47 avg',
    icon: 'trophy',
    color: turnoverColors.success,
    overlay: 'rgba(29, 201, 115, 0.1)'
  },
  {
    label: 'Slowest Office',
    value: 'Bonga',
    caption: '01:21:05 avg',
    icon: 'alert',
    color: turnoverColors.warning,
    overlay: 'rgba(201, 72, 29, 0.1)'
  },
  {
    label: 'Offices',
    value: '3',
    caption: '',
    icon: 'building-2',
    color: turnoverColors.brand,
    overlay: 'rgba(56, 153, 250, 0.1)',
    largeValue: true
  },
  {
    label: 'Services',
    value: '9',
    caption: '',
    icon: 'settings-2',
    color: turnoverColors.purple,
    overlay: 'rgba(78, 27, 140, 0.1)',
    largeValue: true
  }
]

const rows = [
  {
    id: 'bacolor',
    office: 'Bacolor',
    services: 2,
    avgTurnover: '00:28:51',
    status: 'Good',
    progress: 36,
    color: turnoverColors.brand,
    background: 'rgba(56, 153, 250, 0.1)'
  },
  {
    id: 'bonga',
    office: 'Bonga',
    services: 4,
    avgTurnover: '01:21:05',
    status: 'Slow',
    progress: 100,
    color: turnoverColors.warning,
    background: 'rgba(201, 72, 29, 0.1)'
  },
  {
    id: 'bulaon',
    office: 'Bulaon',
    services: 3,
    avgTurnover: '00:24:47',
    status: 'Excellent',
    progress: 30,
    color: turnoverColors.success,
    background: 'rgba(29, 201, 115, 0.1)'
  }
]

const filteredRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return rows
  }

  return rows.filter(row =>
    row.office.toLowerCase().includes(search)
    || row.status.toLowerCase().includes(search)
    || row.avgTurnover.toLowerCase().includes(search)
  )
})
</script>

<template>
  <article class="min-h-[445px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[18.25px] pt-[23.4607px]">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 class="text-[18.2472px] font-semibold leading-[22px] text-[#15191E]">
            Average Turnover Time — Office / Service
          </h3>
          <p class="mt-[2.61px] text-[14.3371px] leading-[17px] text-[#8D97A5]">
            Click an office row to expand its services
          </p>
        </div>

        <div class="flex w-full flex-wrap items-center gap-x-[7.82025px] gap-y-2 sm:w-auto">
          <button
            type="button"
            class="h-[35.25px] w-[112.1px] rounded-[5.2135px] border border-[#DEE2E7] bg-white px-[18.2472px] py-[7.82025px] font-['Public_Sans'] text-[14.3371px] font-medium leading-[17px] text-[#8D97A5]"
            :aria-pressed="expanded"
            @click="expanded = true"
          >
            Expand All
          </button>
          <button
            type="button"
            class="h-[35.25px] w-[98.1px] rounded-[5.2135px] border border-[#DEE2E7] bg-white px-[18.2472px] py-[7.82025px] font-['Public_Sans'] text-[14.3371px] font-medium leading-[17px] text-[#8D97A5]"
            :aria-pressed="!expanded"
            @click="expanded = false"
          >
            Collapse
          </button>

          <label class="relative block w-full sm:w-[219.4px]">
            <span class="sr-only">Search</span>
            <DashboardIcon name="search" :size="14.63" :stroke-width="1.63" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search..."
              class="h-[37.25px] w-full rounded-[7.82025px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.82025px] pl-[35.1911px] pr-[13.0337px] text-[15.6405px] leading-[19px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
            />
          </label>
        </div>
      </header>

      <div class="grid gap-[13.0337px] sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="metric in metricCards"
          :key="metric.label"
          class="flex min-h-[89.64px] min-w-[158.45px] items-center gap-[13.03px] rounded-[13.0337px] border border-[#EFF0F6] bg-[#F9FAFB] px-[18.2472px] py-[15.6405px]"
        >
          <span
            class="inline-flex h-[55.75px] w-[48.75px] shrink-0 items-center justify-center rounded-[13.0337px] text-[#15191E]"
            :style="{ backgroundColor: metric.overlay }"
          >
            <svg
              v-if="metric.icon === 'trophy'"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M8 4h8v3.5a4 4 0 0 1-8 0V4Z" />
              <path d="M8 6H5.5A2.5 2.5 0 0 0 8 10.5" />
              <path d="M16 6h2.5a2.5 2.5 0 0 1-2.5 4.5" />
              <path d="M12 11.5V17" />
              <path d="M8.5 20h7" />
              <path d="M10 17h4l1 3H9l1-3Z" />
            </svg>
            <svg
              v-else-if="metric.icon === 'alert'"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 4.5 21 20H3L12 4.5Z" />
              <path d="M12 9.5v4.5" />
              <path d="M12 17.5h.01" />
            </svg>
            <DashboardIcon v-else :name="metric.icon" :size="24" :stroke-width="1.8" />
          </span>

          <span class="min-w-0">
            <span
              class="block text-[14.3371px] font-medium leading-[17px] text-[#8D97A5]"
              :class="metric.caption ? '-mb-[1.30337px]' : ''"
            >
              {{ metric.label }}
            </span>
            <span
              class="block font-bold"
              :class="metric.largeValue ? 'text-[28.6742px] leading-[32px]' : 'text-[20.854px] leading-[23px]'"
              :style="{ color: metric.color }"
            >
              {{ metric.value }}
            </span>
            <span v-if="metric.caption" class="block pt-[1.30337px] text-[13.0337px] font-normal leading-4 text-[#8D97A5]">
              {{ metric.caption }}
            </span>
          </span>
        </article>
      </div>

      <section class="h-[201.99px] overflow-hidden rounded-[13.0337px] border border-[#EFF0F6] bg-white">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[860px] border-separate border-spacing-0">
            <colgroup>
              <col class="w-[31.52%]" />
              <col class="w-[23.03%]" />
              <col class="w-[27.6%]" />
              <col class="w-[17.85%]" />
            </colgroup>

            <thead>
              <tr>
                <th class="h-[43.37px] bg-[#F9FAFB] px-[18.2472px] py-[13.0337px] text-left text-[13.0337px] font-semibold uppercase leading-4 tracking-[0.651687px] text-[#8D97A5]">
                  Office / Service
                </th>
                <th class="h-[43.37px] bg-[#F9FAFB] px-[18.2472px] py-[13.0337px] text-right text-[13.0337px] font-semibold uppercase leading-4 tracking-[0.651687px] text-[#8D97A5]">
                  Avg Turnover
                </th>
                <th class="h-[43.37px] bg-[#F9FAFB] px-[18.2472px] py-[13.0337px] text-left text-[13.0337px] font-semibold uppercase leading-4 tracking-[0.651687px] text-[#8D97A5]">
                  Performance Bar
                </th>
                <th class="h-[43.37px] bg-[#F9FAFB] px-[18.2472px] py-[13.0337px] text-center text-[13.0337px] font-semibold uppercase leading-4 tracking-[0.651687px] text-[#8D97A5]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in filteredRows"
                :key="row.id"
                class="h-[52.87px] bg-[rgba(56,153,250,0.03)]"
              >
                <td class="border-b border-[#EFF0F6] px-[26.54px] py-[16.02px] text-[15.6405px] leading-[19px]">
                  <span class="font-semibold text-[#15191E]">
                    {{ row.office }}
                  </span>
                  <span class="ml-[4px] text-[13.0337px] font-normal leading-4 text-[#8D97A5]">
                    ({{ row.services }} services)
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[18.2472px] py-[13.0337px] text-right">
                  <span
                    class="inline-flex h-[22.21px] items-center justify-end rounded-[5.2135px] px-[9.12362px] py-[2.60675px] text-[14.3371px] font-semibold leading-[17px]"
                    :style="{ color: row.color, backgroundColor: row.background }"
                  >
                    {{ row.avgTurnover }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] py-[23.6px] pl-[18.2472px] pr-[18.2472px]">
                  <span class="flex h-[5.57px] overflow-hidden rounded-[2.60675px] bg-[#EFF0F6]">
                    <span
                      class="h-full rounded-[2.60675px]"
                      :style="{ width: `${row.progress}%`, backgroundColor: row.color }"
                    />
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[18.2472px] py-[13.6854px] text-center">
                  <span
                    class="inline-flex h-[21.21px] items-center justify-center rounded-[26.0675px] px-[10.427px] py-[2.60675px] text-[13.0337px] font-medium leading-4"
                    :style="{ color: row.color, backgroundColor: row.background }"
                  >
                    {{ row.status }}
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
