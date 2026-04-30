<script setup lang="ts">
import DashboardMetricCard from '../shared/DashboardMetricCard.vue'

interface MetricCardData {
  id: string
  label: string
  value: number | string
  icon: string
  tone?: string
}

defineProps<{
  data: MetricCardData
}>()
</script>

<template>
  <DashboardMetricCard :data="data" />
</template>
