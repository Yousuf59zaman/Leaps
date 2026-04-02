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
  <section class="space-y-4">
    <DashboardSectionHeading :title="title" icon="thumbs-up" />
    <div class="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
      <OverallSatisfactionPanel :data="data.summary" />
      <ServiceRatingDetailsPanel :data="data.details" />
    </div>
  </section>
</template>
