<script setup lang="ts">
import type { MetricCardData } from '../../../../types'
import QmsMetricCard from './QmsMetricCard.vue'

defineProps<{
  cards: MetricCardData[]
}>()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-6 xl:gap-[21px]">
    <QmsMetricCard v-for="card in cards" :key="card.id" :data="card" />
  </div>
</template>
