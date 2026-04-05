<script setup lang="ts">
import type { DashboardPageData } from '../../../types'
import RegionalOfficePerformancePanel from './service-performance/RegionalOfficePerformancePanel.vue'
import TopServicePopularityPanel from './service-performance/TopServicePopularityPanel.vue'

defineProps<{
  data: DashboardPageData['servicePerformance']
}>()
</script>

<template>
  <section class="grid gap-6 xl:grid-cols-[minmax(0,906px)_minmax(0,895px)] xl:justify-between xl:gap-[31px]">
    <TopServicePopularityPanel :data="data.topServicePopularity" />
    <RegionalOfficePerformancePanel :data="data.regionalOfficePerformance" />
  </section>
</template>
