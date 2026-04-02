<script setup lang="ts">
import type { MetricCardData } from '../../../../types'
import DashboardMetricCard from '../shared/DashboardMetricCard.vue'

defineProps<{
  data: MetricCardData
}>()
</script>

<template>
  <DashboardMetricCard :data="data" />
</template>
