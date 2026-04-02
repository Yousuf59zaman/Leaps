<script setup lang="ts">
import type { ChartPanelData } from '../../../types'
import QmsActivityTrendChart from './qms/QmsActivityTrendChart.vue'

defineProps<{
  data: ChartPanelData
}>()
</script>

<template>
  <section>
    <QmsActivityTrendChart :data="data" />
  </section>
</template>
