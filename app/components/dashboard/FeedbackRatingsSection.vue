<script setup lang="ts">
import type { FeedbackSectionData } from '../../../types'
import DashboardSectionHeading from './shared/DashboardSectionHeading.vue'
import OverallSatisfactionPanel from './feedback/OverallSatisfactionPanel.vue'
import ServiceRatingDetailsPanel from './feedback/ServiceRatingDetailsPanel.vue'

withDefaults(
  defineProps<{
    data: FeedbackSectionData
    title?: string
  }>(),
  {
    title: 'Feedback & Ratings'
  }
)
</script>

<template>
  <section class="space-y-4 sm:space-y-[18px]">
    <div class="border-b border-[#DEE2E7] pb-[14px]">
      <DashboardSectionHeading :title="title" icon="feedback-sheet" />
    </div>

    <div class="grid gap-5 sm:gap-6 min-[1600px]:grid-cols-[minmax(0,590.67px)_minmax(0,1fr)] min-[1600px]:items-start min-[1600px]:gap-[30.33px]">
      <OverallSatisfactionPanel :data="data.summary" />
      <ServiceRatingDetailsPanel :data="data.details" />
    </div>
  </section>
</template>
