<script setup lang="ts">
import type { RegionTooltipData } from '../../../../types'
import { formatCount } from '../../../utils/dashboard-formatters'

defineProps<{
  data: RegionTooltipData
}>()

function valueClass(tone?: string) {
  switch (tone) {
    case 'danger':
      return 'text-[color:var(--color-danger-500)]'
    case 'warning':
      return 'text-[color:var(--color-warning-500)]'
    case 'success':
      return 'text-[color:var(--color-success-500)]'
    default:
      return 'text-[color:var(--color-text-strong)]'
  }
}
</script>

<template>
  <div class="w-[18.5rem] rounded-3xl bg-white px-5 py-4 shadow-[0_18px_44px_rgba(15,37,82,0.16)]">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h4 class="text-base font-semibold text-[color:var(--color-brand-500)]">
          {{ data.name }}
        </h4>
      </div>
      <span class="rounded-full bg-[rgba(49,201,122,0.14)] px-3 py-1 text-xs font-semibold text-[color:var(--color-success-500)]">
        {{ data.statusLabel }}
      </span>
    </div>

    <div class="mt-4 space-y-2.5">
      <div v-for="stat in data.stats" :key="stat.id" class="flex items-center justify-between gap-3 text-sm">
        <span class="text-[color:var(--color-text-muted)]">{{ stat.label }}</span>
        <span class="font-semibold" :class="valueClass(stat.tone)">
          {{ formatCount(stat.value) }}
        </span>
      </div>
    </div>
  </div>
</template>
