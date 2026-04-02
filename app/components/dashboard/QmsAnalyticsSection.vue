<script setup lang="ts">
import type { DashboardPageData } from '../../../types'
import DashboardSectionHeading from './shared/DashboardSectionHeading.vue'
import QmsMetricsGrid from './qms/QmsMetricsGrid.vue'

defineProps<{
  data: DashboardPageData['qmsAnalytics']
}>()
</script>

<template>
  <section class="space-y-4">
    <DashboardSectionHeading :title="data.title" icon="table" />
    <QmsMetricsGrid :cards="data.cards" />
  </section>
</template>
