<script setup lang="ts">
import type { DashboardPageData } from '../../../types'
import RegionalOfficePerformancePanel from './service-performance/RegionalOfficePerformancePanel.vue'
import TopServicePopularityPanel from './service-performance/TopServicePopularityPanel.vue'

defineProps<{
  data: DashboardPageData['servicePerformance']
}>()
</script>

<template>
  <section class="grid gap-6 xl:grid-cols-2">
    <TopServicePopularityPanel :data="data.topServicePopularity" />
    <RegionalOfficePerformancePanel :data="data.regionalOfficePerformance" />
  </section>
</template>
