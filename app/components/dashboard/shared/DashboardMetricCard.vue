<script setup lang="ts">
import { computed } from 'vue'
import type { MetricCardData } from '../../../../types'
import { formatCompactNumber } from '../../../utils/dashboard-formatters'
import DashboardIcon from './DashboardIcon.vue'

const props = withDefaults(
  defineProps<{
    data: MetricCardData
    variant?: 'overview' | 'qms'
  }>(),
  {
    variant: 'overview'
  }
)

const toneStyles = computed(() => {
  switch (props.data.tone) {
    case 'success':
      return {
        iconWrap: 'bg-[rgba(49,201,122,0.12)] text-[color:var(--color-success-500)]',
        qmsWrap: 'bg-[linear-gradient(135deg,rgba(49,201,122,0.10),rgba(255,255,255,0.94))]'
      }
    case 'warning':
      return {
        iconWrap: 'bg-[rgba(244,181,72,0.14)] text-[color:var(--color-warning-500)]',
        qmsWrap: 'bg-[linear-gradient(135deg,rgba(244,181,72,0.14),rgba(255,255,255,0.94))]'
      }
    case 'danger':
      return {
        iconWrap: 'bg-[rgba(244,106,106,0.14)] text-[color:var(--color-danger-500)]',
        qmsWrap: 'bg-[linear-gradient(135deg,rgba(244,106,106,0.12),rgba(255,255,255,0.94))]'
      }
    case 'brand':
    case 'info':
      return {
        iconWrap: 'bg-[rgba(76,150,255,0.12)] text-[color:var(--color-brand-500)]',
        qmsWrap: 'bg-[linear-gradient(135deg,rgba(76,150,255,0.12),rgba(255,255,255,0.94))]'
      }
    default:
      return {
        iconWrap: 'bg-[rgba(15,37,82,0.06)] text-[color:var(--color-brand-700)]',
        qmsWrap: 'bg-[linear-gradient(135deg,rgba(15,37,82,0.06),rgba(255,255,255,0.94))]'
      }
  }
})

const formattedValue = computed(() => formatCompactNumber(props.data.value))
</script>

<template>
  <article
    class="rounded-[var(--radius-card)] border border-[color:var(--app-surface-border)] px-5 py-4 shadow-[var(--shadow-card)]"
    :class="variant === 'qms' ? toneStyles.qmsWrap : 'bg-white'"
  >
    <div class="flex items-start gap-4">
      <span class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" :class="toneStyles.iconWrap">
        <DashboardIcon :name="data.icon" :size="22" />
      </span>

      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-[color:var(--color-text-muted)]">
          {{ data.label }}
        </p>
        <p class="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--color-text-strong)]">
          {{ formattedValue }}
        </p>
        <div v-if="data.delta || data.footnote" class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span
            v-if="data.delta"
            class="font-semibold"
            :class="{
              'text-[color:var(--color-success-500)]': data.delta.direction === 'up',
              'text-[color:var(--color-danger-500)]': data.delta.direction === 'down',
              'text-[color:var(--color-text-muted)]': data.delta.direction === 'neutral'
            }"
          >
            {{ data.delta.value }} {{ data.delta.label }}
          </span>
          <span v-if="data.footnote" class="text-[color:var(--color-text-muted)]">
            {{ data.footnote }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
