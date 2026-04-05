<script setup lang="ts">
import type { FeedbackRatingRow, TablePanelData } from '../../../../types'
import { formatFeedbackCount, formatRating } from '../../../utils/dashboard-formatters'
import DashboardIcon from '../shared/DashboardIcon.vue'

defineProps<{
  data: TablePanelData<FeedbackRatingRow>
}>()
</script>

<template>
  <article class="relative overflow-hidden rounded-[19px] bg-white shadow-[var(--shadow-card)] xl:min-h-[585px]">
    <span class="absolute left-0 top-[24.33px] h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />

    <div class="px-8 pb-8 pt-[24.33px] xl:px-[31px] xl:pb-[36px]">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-3">
          <DashboardIcon :name="data.icon || 'feedback-sheet'" :size="27" class="text-[#3899FA]" />
          <h3 class="text-[24px] font-semibold leading-[37px] text-[#15191E]">
            {{ data.title }}
          </h3>
        </div>

        <button
          v-if="data.actions?.[0]"
          type="button"
          class="inline-flex h-[36px] items-center rounded-[12px] border border-[#DEE2E7] bg-white px-[14px] text-[12px] font-medium leading-5 text-[#15191E]"
        >
          {{ data.actions[0].label }}
        </button>
      </div>

      <div class="mt-[30px] overflow-hidden rounded-[14px] border border-[#EEF1F5]">
        <div class="grid h-[49px] items-center bg-[#F3F5F7] xl:grid-cols-[2.35fr_1.05fr_1.45fr_1.1fr]">
          <div
            v-for="column in data.columns"
            :key="String(column.key)"
            class="px-[18px] text-[16px] font-semibold uppercase leading-[21px] text-[#8D97A5]"
            :class="{
              'text-left': !column.align || column.align === 'left',
              'text-center': column.align === 'center',
              'text-right': column.align === 'right'
            }"
          >
            {{ column.label }}
          </div>
        </div>

        <div
          v-for="row in data.rows"
          :key="row.id"
          class="grid min-h-[54px] items-center border-b border-[#DEE2E7] last:border-b-0 xl:grid-cols-[2.35fr_1.05fr_1.45fr_1.1fr]"
        >
          <div class="px-[18px] py-[14px] text-[18.6667px] font-normal leading-[27px] text-[#15191E]">
            {{ row.serviceName }}
          </div>

          <div class="flex items-center justify-center gap-2 px-[18px] py-[14px] text-[18.6667px] font-semibold leading-[27px] text-[#15191E]">
            <span>{{ formatRating(Number(row.averageRating)) }}</span>
            <DashboardIcon name="star" :size="15" class="text-[#15191E]" />
          </div>

          <div class="flex items-center justify-center px-[18px] py-[14px]">
            <span class="h-[8px] w-[140px] rounded-full bg-[#9AA4B2]" />
          </div>

          <div class="flex items-center justify-end gap-[10px] px-[18px] py-[14px] text-[18.6667px] font-normal leading-[27px] text-[#94A3B8]">
            <span>{{ formatFeedbackCount(Number(row.feedbackCount)) }}</span>
            <DashboardIcon name="eye" :size="16" class="text-[#15191E]" />
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
