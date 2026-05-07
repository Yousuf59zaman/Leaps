<script setup lang="ts">
const searchQuery = ref('')

const turnoverColors = {
  brand: '#3899FA',
  success: '#1DC973',
  warning: '#C9481D',
  danger: '#EF4343',
  muted: '#8D97A5',
  text: '#15191E'
} as const

const services = [
  {
    id: 'barangay-members-regular',
    service: 'Issuance \u2014 Barangay Members (Regular)',
    avgTurnover: '00:09:58',
    progress: 10.99,
    status: 'Excellent',
    color: turnoverColors.success,
    barColor: turnoverColors.success,
    background: 'rgba(29, 201, 115, 0.1)',
    statusColor: turnoverColors.success,
    statusBackground: 'rgba(29, 201, 115, 0.1)'
  },
  {
    id: 'building-permit-new-advisory',
    service: 'Building Permit \u2014 New Advisory',
    avgTurnover: '00:09:08',
    progress: 10,
    status: 'Excellent',
    color: turnoverColors.success,
    barColor: turnoverColors.success,
    background: 'rgba(29, 201, 115, 0.1)',
    statusColor: turnoverColors.success,
    statusBackground: 'rgba(29, 201, 115, 0.1)'
  },
  {
    id: 'building-permit-new-application',
    service: 'Building Permit \u2014 New Application',
    avgTurnover: '00:29:40',
    progress: 36.99,
    status: 'Good',
    color: turnoverColors.brand,
    barColor: turnoverColors.brand,
    background: 'rgba(56, 153, 250, 0.1)',
    statusColor: turnoverColors.brand,
    statusBackground: 'rgba(56, 153, 250, 0.1)'
  },
  {
    id: 'barangay-members-discrepancy',
    service: 'Issuance \u2014 Barangay Members (Discrepancy)',
    avgTurnover: '00:33:15',
    progress: 41.99,
    status: 'Good',
    color: turnoverColors.brand,
    barColor: turnoverColors.brand,
    background: 'rgba(56, 153, 250, 0.1)',
    statusColor: turnoverColors.brand,
    statusBackground: 'rgba(56, 153, 250, 0.1)'
  },
  {
    id: 'building-permit-renewal',
    service: 'Building Permit Renewal Application',
    avgTurnover: '00:43:10',
    progress: 54,
    status: 'Average',
    color: turnoverColors.brand,
    barColor: turnoverColors.brand,
    background: 'rgba(56, 153, 250, 0.1)',
    statusColor: turnoverColors.brand,
    statusBackground: 'rgba(56, 153, 250, 0.1)'
  },
  {
    id: 'motorized-vehicle-govt',
    service: 'Motorized Vehicle Ops Permit \u2014 New (Govt)',
    avgTurnover: '00:43:07',
    progress: 54,
    status: 'Average',
    color: turnoverColors.brand,
    barColor: turnoverColors.brand,
    background: 'rgba(56, 153, 250, 0.1)',
    statusColor: turnoverColors.brand,
    statusBackground: 'rgba(56, 153, 250, 0.1)'
  },
  {
    id: 'kasama-default',
    service: 'KASAMA Program Default',
    avgTurnover: '01:29:00',
    progress: 100,
    status: 'Slow',
    color: turnoverColors.warning,
    barColor: turnoverColors.danger,
    background: 'rgba(201, 72, 29, 0.1)',
    statusColor: turnoverColors.danger,
    statusBackground: 'rgba(239, 67, 67, 0.1)'
  },
  {
    id: 'health-services-alt',
    service: 'Appointment for Health Services (Alt.)',
    avgTurnover: '01:30:03',
    progress: 100,
    status: 'Slow',
    color: turnoverColors.warning,
    barColor: turnoverColors.danger,
    background: 'rgba(201, 72, 29, 0.1)',
    statusColor: turnoverColors.danger,
    statusBackground: 'rgba(239, 67, 67, 0.1)'
  }
]

const filteredServices = computed(() => {
  const search = searchQuery.value.trim().toLowerCase()

  if (!search) {
    return services
  }

  return services.filter(item =>
    item.service.toLowerCase().includes(search)
    || item.avgTurnover.toLowerCase().includes(search)
    || item.status.toLowerCase().includes(search)
  )
})
</script>

<template>
  <article class="min-h-[535px] rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-col gap-[17.39px] pt-[22.3564px]">
      <header class="flex min-h-[40.48px] flex-wrap items-center justify-between gap-4">
        <div class="w-full max-w-[324px]">
          <h3 class="text-[17.3883px] font-semibold leading-[21px] text-[#15191E]">
            Average Turnover Time by Service
          </h3>
          <p class="mt-[2.48px] text-[13.6622px] leading-[17px] text-[#8D97A5]">
            Processing time per service type across all offices
          </p>
        </div>

        <label class="relative block w-full sm:w-[219.4px]">
          <span class="sr-only">Search service</span>
          <DashboardIcon name="search" :size="14.63" :stroke-width="1.55" class="pointer-events-none absolute left-[9.75px] top-1/2 -translate-y-1/2 text-[#8D97A5]" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search service..."
            class="h-[35.39px] w-full rounded-[7.45213px] border border-[#DEE2E7] bg-[#F9FAFB] py-[7.45213px] pl-[33.5346px] pr-[12.4202px] text-[14.9043px] leading-[18px] text-[#15191E] outline-none placeholder:text-[#757575] focus:border-[rgba(56,153,250,0.45)]"
          />
        </label>
      </header>

      <section class="h-[410.87px] overflow-hidden rounded-[12.4202px] border border-[#EFF0F6] bg-white">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1328.52px] table-fixed border-separate border-spacing-0">
            <colgroup>
              <col style="width: 610.71px" />
              <col style="width: 265.51px" />
              <col style="width: 268.82px" />
              <col style="width: 183.54px" />
            </colgroup>

            <thead>
              <tr>
                <th class="h-[41.08px] bg-[#F9FAFB] px-[17.3883px] py-[12.4202px] text-left text-[12.4202px] font-semibold uppercase leading-[15px] tracking-[0.621011px] text-[#8D97A5]">
                  Service Name <span class="font-['Cambria_Math'] text-[11.1782px] opacity-35">&#8645;</span>
                </th>
                <th class="h-[41.08px] bg-[#F9FAFB] px-[17.3883px] py-[12.4202px] text-right text-[12.4202px] font-semibold uppercase leading-[15px] tracking-[0.621011px] text-[#8D97A5]">
                  Avg Turnover <span class="font-['Cambria_Math'] text-[11.1782px] opacity-35">&#8645;</span>
                </th>
                <th class="h-[41.08px] bg-[#F9FAFB] px-[17.3883px] py-[12.4202px] text-left text-[12.4202px] font-semibold uppercase leading-[15px] tracking-[0.621011px] text-[#8D97A5]">
                  Performance
                </th>
                <th class="h-[41.08px] bg-[#F9FAFB] px-[17.3883px] py-[12.4202px] text-center text-[12.4202px] font-semibold uppercase leading-[15px] tracking-[0.621011px] text-[#8D97A5]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="item in filteredServices"
                :key="item.id"
                class="h-[41px]"
              >
                <td class="border-b border-[#EFF0F6] px-[17.3883px] py-[11.5px] text-[14.9043px] font-normal leading-[18px] text-[#15191E]">
                  {{ item.service }}
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.3883px] py-[9.54px] text-right">
                  <span
                    class="inline-flex h-[21.97px] items-center justify-end rounded-[4.96809px] px-[8.69416px] py-[2.48404px] text-[13.6622px] font-semibold leading-[17px]"
                    :style="{ color: item.color, backgroundColor: item.background }"
                  >
                    {{ item.avgTurnover }}
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] py-[18px] pl-[17.3883px] pr-[17.3883px]">
                  <span class="flex h-[5.06px] overflow-hidden rounded-[2.48404px] bg-[#EFF0F6]">
                    <span
                      class="h-full rounded-[2.48404px]"
                      :style="{ width: `${item.progress}%`, backgroundColor: item.barColor }"
                    />
                  </span>
                </td>
                <td class="border-b border-[#EFF0F6] px-[17.3883px] py-[10.5px] text-center">
                  <span
                    class="inline-flex h-[19.97px] items-center justify-center rounded-[24.8404px] px-[9.93618px] py-[2.48404px] text-[12.4202px] font-medium leading-[15px]"
                    :style="{ color: item.statusColor, backgroundColor: item.statusBackground }"
                  >
                    {{ item.status }}
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
