<script setup lang="ts">
import type { DashboardPageData } from '../../../types'
import DashboardIcon from './shared/DashboardIcon.vue'
import SystemOverviewCardsGrid from './system-overview/SystemOverviewCardsGrid.vue'

defineProps<{
  data: DashboardPageData['systemOverview']
}>()
</script>

<template>
  <section class="space-y-4 xl:space-y-[20.67px]">
    <div class="flex items-center gap-[10.67px]">
      <DashboardIcon name="map" :size="26.67" class="text-[#3899FA]" />
      <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
        {{ data.title }}
      </h2>
    </div>

    <SystemOverviewCardsGrid :cards="data.cards" />
  </section>
</template>
