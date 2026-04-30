<script setup lang="ts">

interface MetricCardData {
  id: string
  label: string
  value: number | string
  icon: string
  tone?: string
  delta?: {
    value: number | string
    label: string
    direction: 'up' | 'down' | 'neutral'
  }
  footnote?: string
}

defineProps<{
  data: MetricCardData
}>()
</script>

<template>
  <DashboardMetricCard :data="data" variant="qms" />
</template>
