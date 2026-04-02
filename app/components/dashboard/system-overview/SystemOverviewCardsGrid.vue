<script setup lang="ts">
import type { MetricCardData } from '../../../../types'
import SystemOverviewCard from './SystemOverviewCard.vue'

defineProps<{
  cards: MetricCardData[]
}>()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
    <SystemOverviewCard v-for="card in cards" :key="card.id" :data="card" />
  </div>
</template>
