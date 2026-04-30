<script setup lang="ts">
import QmsMetricCard from './QmsMetricCard.vue'

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
  cards: MetricCardData[]
}>()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-6 xl:gap-[21px]">
    <QmsMetricCard v-for="card in cards" :key="card.id" :data="card" />
  </div>
</template>
