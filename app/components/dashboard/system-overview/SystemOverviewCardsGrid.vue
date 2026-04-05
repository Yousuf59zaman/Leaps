<script setup lang="ts">
import type { MetricCardData } from '../../../../types'
import SystemOverviewCard from './SystemOverviewCard.vue'

defineProps<{
  cards: MetricCardData[]
}>()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-[20px] xl:gap-y-[21.33px]">
    <SystemOverviewCard v-for="card in cards" :key="card.id" :data="card" />
  </div>
</template>
