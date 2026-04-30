<script setup lang="ts">
import RegionalOfficePerformancePanel from './service-performance/RegionalOfficePerformancePanel.vue'
import TopServicePopularityPanel from './service-performance/TopServicePopularityPanel.vue'

const data = {
  topServicePopularity: {
    title: 'Top 10 Service Popularity',
    subtitle: 'By total application volume',
    icon: 'badge-check',
    categories: [
      'Business Permit Registration',
      'Birth Certificate Request',
      'NBI Clearance',
      'Passport Renewal',
      'Driver License Renewal',
      'Tax Declaration',
      'Barangay Clearance',
      'Voter Registration',
      'PhilHealth ID',
      'SSS Loan Application'
    ],
    series: [
      {
        id: 'applications',
        name: 'Applications',
        type: 'bar',
        color: '#1DC973',
        data: [920000, 790000, 650000, 555000, 492000, 410000, 350000, 300000, 250000, 180000]
      }
    ]
  },
  regionalOfficePerformance: {
    title: 'Regional Office Performance',
    subtitle: 'Applications Received vs Completed vs Pending',
    icon: 'benchmark',
    categories: ['NCR North', 'Cebu City Hub', 'Davao Central', 'Iloilo Regional', 'Baguio District'],
    series: [
      { id: 'received', name: 'Received', type: 'bar', color: '#3899FA', data: [40000, 34500, 29800, 25900, 19800] },
      { id: 'completed', name: 'Completed', type: 'bar', color: '#22C358', data: [34000, 28900, 25400, 22100, 16700] },
      { id: 'pending', name: 'Pending', type: 'bar', color: '#FCB11D', data: [5200, 4300, 2900, 1800, 1500] }
    ],
    legend: [
      { id: 'received', label: 'Received', color: '#3899FA' },
      { id: 'completed', label: 'Completed', color: '#22C358' },
      { id: 'pending', label: 'Pending', color: '#FCB11D' }
    ]
  }
}
</script>

<template>
  <section
    class="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 min-[1400px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[1400px]:items-start min-[1400px]:gap-[31px]"
  >
    <TopServicePopularityPanel :data="data.topServicePopularity" />
    <RegionalOfficePerformancePanel :data="data.regionalOfficePerformance" />
  </section>
</template>
