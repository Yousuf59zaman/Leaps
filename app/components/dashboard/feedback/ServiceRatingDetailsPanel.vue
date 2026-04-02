<script setup lang="ts">
import type { FeedbackRatingRow, TablePanelData } from '../../../../types'
import { formatFeedbackCount, formatRating } from '../../../utils/dashboard-formatters'
import DashboardIcon from '../shared/DashboardIcon.vue'
import DashboardPanelShell from '../shared/DashboardPanelShell.vue'
import DashboardRatingBar from '../shared/DashboardRatingBar.vue'
import DashboardTable from '../shared/DashboardTable.vue'

defineProps<{
  data: TablePanelData<FeedbackRatingRow>
}>()
</script>

<template>
  <DashboardPanelShell :title="data.title" :icon="data.icon" :actions="data.actions">
    <DashboardTable :columns="data.columns" :rows="data.rows" row-key="id" compact>
      <template #cell-averageRating="{ value }">
        <div class="inline-flex items-center gap-2 font-semibold text-[color:var(--color-text-strong)]">
          <span>{{ formatRating(Number(value)) }}</span>
          <DashboardIcon name="star" :size="14" class="text-[color:var(--color-warning-500)]" />
        </div>
      </template>

      <template #cell-ratingVisual="{ value }">
        <DashboardRatingBar :value="Number(value)" />
      </template>

      <template #cell-feedbackCount="{ value }">
        <div class="inline-flex items-center gap-2 text-[color:var(--color-text-muted)]">
          <span>{{ formatFeedbackCount(Number(value)) }}</span>
          <DashboardIcon name="eye" :size="14" />
        </div>
      </template>
    </DashboardTable>
  </DashboardPanelShell>
</template>
