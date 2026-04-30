<script setup lang="ts">

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
