<script setup lang="ts">
type StatusFilter = 'all' | 'has-open' | 'has-overdue'

const searchQuery = ref('')
const statusFilter = ref<StatusFilter>('all')

const statusColors = {
  brand: '#3899FA',
  success: '#1DC973',
  danger: '#EF4343',
  muted: '#8D97A5',
  text: '#15191E'
} as const

const filterOptions: Array<{ label: string, value: StatusFilter, width: string }> = [
  { label: 'All', value: 'all', width: '43.34px' },
  { label: 'Has Open', value: 'has-open', width: '89.34px' },
  { label: 'Has Overdue', value: 'has-overdue', width: '108.34px' }
]

const metricCards = [
  {
    label: 'Open',
    value: 1,
    icon: 'folder',
    color: statusColors.brand,
    overlay: 'rgba(56, 153, 250, 0.1)'
  },
  {
    label: 'Rejected',
    value: 12,
    icon: 'circle-x',
    color: statusColors.danger,
    overlay: 'rgba(239, 67, 67, 0.1)'
  },
  {
    label: 'Cancelled',
    value: 14,
    icon: 'ban',
    color: statusColors.muted,
    overlay: 'rgba(0, 0, 0, 0.05)'
  },
  {
    label: 'Completed',
    value: 1028,
    icon: 'circle-check',
    color: statusColors.success,
    overlay: 'rgba(29, 201, 115, 0.1)'
  },
  {
    label: 'Overdue',
    value: 519,
    icon: 'circle-alert',
    color: statusColors.danger,
    overlay: 'rgba(239, 67, 67, 0.1)'
  }
]

const statusRows = [
  {
    id: 'information-not-provided',
    service: 'Information Not Provided',
    open: 1,
    rejected: 0,
    cancelled: 0,
    completed: 0,
    overdue: 0,
    total: 2,
    completionRate: 0,
    rateColor: statusColors.muted,
    rateBar: statusColors.muted
  },
  {
    id: 'appointment-health',
    service: 'Appointment for Health Services',
    open: 0,
    rejected: 0,
    cancelled: 14,
    completed: 940,
    overdue: 460,
    total: 1414,
    completionRate: 66,
    rateColor: statusColors.success,
    rateBar: statusColors.success
  },
  {
    id: 'authority-travel',
    service: 'Authority to Travel',
    open: 0,
    rejected: 12,
    cancelled: 0,
    completed: 88,
    overdue: 59,
    total: 159,
    completionRate: 55,
    rateColor: statusColors.text,
    rateBar: statusColors.brand
  },
  {
    id: 'business-permit',
    service: 'Business Permit Registration',
    open: 0,
    rejected: 0,
    cancelled: 0,
    completed: 87,
    overdue: 0,
    total: 87,
    completionRate: 100,
    rateColor: statusColors.success,
    rateBar: statusColors.success
  },
  {
    id: 'live-birth',
    service: 'Certificate of Live Birth',
    open: 0,
    rejected: 0,
    cancelled: 0,
    completed: 3,
    overdue: 0,
    total: 3,
    completionRate: 100,
    rateColor: statusColors.success,
    rateBar: statusColors.success
  }
]

const statusStyles = {
  open: { color: statusColors.brand, background: 'rgba(56, 153, 250, 0.1)' },
  rejected: { color: statusColors.danger, background: 'rgba(239, 67, 67, 0.1)' },
  cancelled: { color: statusColors.muted, background: 'rgba(0, 0, 0, 0.05)' },
  completed: { color: statusColors.success, background: 'rgba(29, 201, 115, 0.1)' },
  overdue: { color: statusColors.danger, background: 'rgba(239, 67, 67, 0.1)' }
} as const

const sortableHeaders = ['Service Name', 'Open', 'Rejected', 'Cancelled', 'Completed', 'Overdue']
const statusKeys = ['open', 'rejected', 'cancelled', 'completed', 'overdue'] as const

const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(value)

const visibleRows = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  return statusRows.filter((row) => {
    const matchesSearch = !search || row.service.toLowerCase().includes(search)
    const matchesFilter = statusFilter.value === 'all'
      || (statusFilter.value === 'has-open' && row.open > 0)
      || (statusFilter.value === 'has-overdue' && row.overdue > 0)

    return matchesSearch && matchesFilter
  })
})

const getStatusStyle = (key: keyof typeof statusStyles, value: number) => {
  if (value <= 0) {
    return null
  }

  return statusStyles[key]
}
</script>

<template>
  <article class="min-h-[522px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[17.4px] pt-[22.3721px]">
      <header class="flex min-h-[40.49px] flex-wrap items-center justify-between gap-4">
        <div class="w-full max-w-[333px]">
          <h3 class="text-[17.4005px] font-semibold leading-[21px] text-[#15191E]">
            Application Status Summary by Service
          </h3>
          <p class="mt-[2.49px] text-[13.6718px] leading-[17px] text-[#8D97A5]">
            Status breakdown for each service type
          </p>
        </div>

        <div class="flex w-full flex-wrap items-center gap-x-[7.45737px] gap-y-2 lg:w-auto">
          <div class="flex h-[30.91px] items-start gap-[4.97px]">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              type="button"
              class="h-[30.91px] rounded-[6.21448px] border px-[12.429px] py-[6.21448px] font-['Arial'] text-[13.6718px] font-normal leading-4 transition-colors"
              :class="statusFilter === option.value ? 'border-[#3899FA] bg-[#3899FA] text-white' : 'border-[#DEE2E7] bg-white text-[#8D97A5]'"
              :style="{ width: option.width }"
              :aria-pressed="statusFilter === option.value"
              @click="statusFilter = option.value"
            >
              {{ option.label }}
            </button>
          </div>

          <label class="relative block w-full sm:w-[219.4px]">
            <span class="sr-only">Search service</span>
            <DashboardIcon name="search" :size="14.63" :stroke-width="1.55" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search service..."
              class="h-[35.4px] w-full rounded-[7.45737px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.45737px] pl-[33.5582px] pr-[12.429px] text-[14.9147px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
            />
          </label>
        </div>
      </header>

      <div class="flex min-h-[106.02px] flex-wrap justify-center gap-x-[12.429px] gap-y-3 py-[11.1861px]">
        <article
          v-for="metric in metricCards"
          :key="metric.label"
          class="flex h-[83.65px] min-w-[157.74px] max-w-[252.3px] flex-1 basis-[157.74px] items-center gap-[12.43px] rounded-[12.429px] border border-[#EFF0F6] bg-[#F9FAFB] px-[17.4005px] py-[14.9147px]"
        >
          <span
            class="inline-flex h-[50.7px] w-[48.75px] shrink-0 items-center justify-center rounded-[12.429px] text-[#15191E]"
            :style="{ backgroundColor: metric.overlay }"
          >
            <svg
              v-if="metric.icon === 'folder'"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M3.5 7.5h6.2l2 2H20.5v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-10Z" />
              <path d="M3.5 9.5V6a2 2 0 0 1 2-2h4.3l2 2h6.7a2 2 0 0 1 2 2v1.5" />
            </svg>
            <DashboardIcon v-else :name="metric.icon" :size="24" :stroke-width="1.75" />
          </span>

          <span class="min-w-0">
            <span class="block text-[13.6718px] font-medium leading-[17px] text-[#8D97A5]">
              {{ metric.label }}
            </span>
            <span
              class="block text-[27.3437px] font-bold leading-[30px]"
              :style="{ color: metric.color }"
            >
              {{ formatNumber(metric.value) }}
            </span>
          </span>
        </article>
      </div>

      <section class="h-[272.71px] overflow-hidden rounded-[12.429px] border border-[#EFF0F6] bg-white">
        <div class="thin-status-scrollbar overflow-x-auto">
          <table class="w-full min-w-[980px] table-fixed border-separate border-spacing-0 xl:min-w-0">
            <colgroup>
              <col style="width: 24.08%" />
              <col style="width: 8.1%" />
              <col style="width: 11.04%" />
              <col style="width: 12.03%" />
              <col style="width: 12.29%" />
              <col style="width: 10.54%" />
              <col style="width: 7.11%" />
              <col style="width: 14.81%" />
            </colgroup>

            <thead>
              <tr>
                <th
                  v-for="header in sortableHeaders"
                  :key="header"
                  class="h-[41.1px] bg-[#F9FAFB] px-[17.4005px] py-[12.429px] text-[12.429px] font-semibold uppercase leading-[15px] tracking-[0.621448px] text-[#8D97A5]"
                  :class="header === 'Service Name' ? 'text-left' : 'text-right'"
                >
                  {{ header }} <span class="font-['Cambria_Math'] text-[11.1861px] opacity-35">&#8645;</span>
                </th>
                <th class="h-[41.1px] bg-[#F9FAFB] px-[17.4005px] py-[12.429px] text-right text-[12.429px] font-semibold uppercase leading-[15px] tracking-[0.621448px] text-[#8D97A5]">
                  Total
                </th>
                <th class="h-[41.1px] bg-[#F9FAFB] px-[17.4005px] py-[12.429px] text-left text-[12.429px] font-semibold uppercase leading-[15px] tracking-[0.621448px] text-[#8D97A5]">
                  Completion Rate
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in visibleRows"
                :key="row.id"
                class="h-[45.34px]"
              >
                <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[13.6718px] text-[14.9147px] font-normal leading-[18px] text-[#15191E]">
                  {{ row.service }}
                </td>

                <td
                  v-for="statusKey in statusKeys"
                  :key="statusKey"
                  class="border-b border-[#EFF0F6] px-[17.4005px] py-[13.0504px] text-right text-[14.9147px] font-medium leading-[18px] text-[#15191E]"
                >
                  <span
                    v-if="getStatusStyle(statusKey, row[statusKey])"
                    class="inline-flex h-[19.97px] min-w-[25.89px] items-center justify-end rounded-[24.8579px] px-[9.94316px] py-[2.48579px] text-[12.429px] font-medium leading-[15px]"
                    :style="{ color: getStatusStyle(statusKey, row[statusKey])?.color, backgroundColor: getStatusStyle(statusKey, row[statusKey])?.background }"
                  >
                    {{ formatNumber(row[statusKey]) }}
                  </span>
                  <span v-else>
                    0
                  </span>
                </td>

                <td class="border-b border-[#EFF0F6] px-[17.4005px] py-[13.6718px] text-right text-[14.9147px] font-bold leading-[18px] text-[#3899FA]">
                  {{ formatNumber(row.total) }}
                </td>

                <td class="border-b border-[#EFF0F6] py-[14px] pl-[17.4005px] pr-[17.3881px]">
                  <span class="flex h-[15px] items-center gap-[7.44px]">
                    <span class="flex h-[5.07px] flex-1 overflow-hidden rounded-[2.48579px] bg-[#EFF0F6]">
                      <span
                        class="h-full rounded-[2.48579px]"
                        :style="{ width: `${row.completionRate}%`, backgroundColor: row.rateBar }"
                      />
                    </span>
                    <span
                      class="min-w-[38.83px] text-right text-[12.429px] font-semibold leading-[15px]"
                      :style="{ color: row.rateColor }"
                    >
                      {{ row.completionRate }}%
                    </span>
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

<style scoped>
.thin-status-scrollbar {
  scrollbar-color: rgba(141, 151, 165, 0.45) transparent;
  scrollbar-width: thin;
}

.thin-status-scrollbar::-webkit-scrollbar {
  height: 1px;
  width: 1px;
}

.thin-status-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.thin-status-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(141, 151, 165, 0.45);
  border-radius: 999px;
}

.thin-status-scrollbar::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}
</style>
