<script setup lang="ts">
import type { DashboardPageData } from '../../../types'
import RegionalOfficePerformancePanel from './service-performance/RegionalOfficePerformancePanel.vue'
import TopServicePopularityPanel from './service-performance/TopServicePopularityPanel.vue'

defineProps<{
  data: DashboardPageData['servicePerformance']
}>()
</script>

<template>
  <section
    class="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 min-[1400px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[1400px]:items-start min-[1400px]:gap-[31px]"
  >
    <TopServicePopularityPanel :data="data.topServicePopularity" />
    <RegionalOfficePerformancePanel :data="data.regionalOfficePerformance" />
  </section>
</template>
