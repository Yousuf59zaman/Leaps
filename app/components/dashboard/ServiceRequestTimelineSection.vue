<script setup lang="ts">
import type { ChartPanelData } from '../../../types'
import ServiceRequestTrendlineChart from './service-request-timeline/ServiceRequestTrendlineChart.vue'

defineProps<{
  data: ChartPanelData
}>()
</script>

<template>
  <section>
    <ServiceRequestTrendlineChart :data="data" />
  </section>
</template>
