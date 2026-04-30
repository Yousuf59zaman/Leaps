<script setup lang="ts">

const data = {
  density: {
    title: 'Regional Registration Density',
    subtitle: 'Geographical distribution of active citizen registrations.',
    icon: 'map',
    badgeLabel: 'Live Data',
    legend: [
      { id: 'low', label: 'Low', color: '#D5E6FF' },
      { id: 'medium', label: 'Medium', color: '#87B6FF' },
      { id: 'high', label: 'High', color: '#4C96FF' }
    ],
    highlightedRegion: {
      name: 'BARMM',
      statusLabel: 'High',
      stats: [
        { id: 'total', label: 'Total Registrations', value: 452310 },
        { id: 'completed', label: 'Completed', value: 380100 },
        { id: 'pending', label: 'Pending', value: 45000, tone: 'warning' },
        { id: 'rejected', label: 'Rejected', value: 27210, tone: 'danger' }
      ]
    }
  },
  requestSummary: {
    title: 'System Overview',
    icon: 'map',
    totalRequests: 3088,
    totalLabel: 'Total Requests',
    periodLabel: 'Month',
    statuses: [
      { id: 'open', label: 'Open Requests', value: 27, color: '#FF9330' },
      { id: 'rejected', label: 'Rejected Requests', value: 212, color: '#F3F5F7' },
      { id: 'cancelled', label: 'Cancelled Requests', value: 83, color: '#FF4343' },
      { id: 'complete', label: 'Complete Requests', value: 1271, color: '#4FD463' },
      { id: 'overdue', label: 'Overdue Requests', value: 1495, color: '#F4C533' }
    ],
    legend: [
      { id: 'open', label: 'Open', color: '#4C96FF', value: 27 },
      { id: 'rejected', label: 'Rejected', color: '#FF9330', value: 212 },
      { id: 'complete', label: 'Complete', color: '#31C97A', value: 1271 },
      { id: 'overdue', label: 'Overdue', color: '#F4B548', value: 1495 }
    ],
    series: [
      {
        id: 'request-distribution',
        name: 'Request Distribution',
        type: 'donut',
        data: [
          { label: 'Open', value: 27, color: '#4C96FF' },
          { label: 'Rejected', value: 212, color: '#FF9330' },
          { label: 'Complete', value: 1271, color: '#31C97A' },
          { label: 'Overdue', value: 1495, color: '#F4B548' }
        ]
      }
    ]
  },
  monthlyRegistrationTrend: {
    title: 'Monthly Registration Trend',
    icon: 'calendar',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      {
        id: 'monthly-registrations',
        name: 'Registrations',
        type: 'line',
        color: '#3899FA',
        smooth: true,
        data: [120000, 138000, 132000, 180000, 215000, 198000, 248000, 264000, 220000, 286000, 320000, 356000]
      }
    ]
  }
}
</script>

<template>
  <section class="grid gap-5 sm:gap-6 min-[1400px]:grid-cols-[minmax(0,1.38fr)_minmax(320px,0.96fr)] min-[1400px]:items-start min-[1400px]:gap-[31px]">
    <RegionalRegistrationDensityPanel :data="data.density" />
    <RegionalInsightsRightColumn :request-summary="data.requestSummary" :monthly-registration-trend="data.monthlyRegistrationTrend" />
  </section>
</template>
