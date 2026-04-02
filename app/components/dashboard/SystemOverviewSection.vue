<script setup lang="ts">
import type { DashboardPageData } from '../../../types'
import DashboardSectionHeading from './shared/DashboardSectionHeading.vue'
import SystemOverviewCardsGrid from './system-overview/SystemOverviewCardsGrid.vue'

defineProps<{
  data: DashboardPageData['systemOverview']
}>()
</script>

<template>
  <section class="space-y-4">
    <DashboardSectionHeading :title="data.title" icon="map" />
    <SystemOverviewCardsGrid :cards="data.cards" />
  </section>
</template>
