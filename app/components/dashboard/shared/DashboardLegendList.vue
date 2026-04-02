<script setup lang="ts">
import type { LegendItem } from '../../../../types'

withDefaults(
  defineProps<{
    items: LegendItem[]
    columns?: number
    compact?: boolean
  }>(),
  {
    columns: 1,
    compact: false
  }
)
</script>

<template>
  <ul
    class="grid gap-3"
    :style="{
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
    }"
  >
    <li
      v-for="item in items"
      :key="item.id"
      class="flex items-center justify-between gap-3"
      :class="compact ? 'text-xs' : 'text-sm'"
    >
      <div class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: item.color }" />
        <span class="font-medium text-[color:var(--color-text-muted)]">{{ item.label }}</span>
      </div>

      <span class="text-right font-semibold text-[color:var(--color-text-strong)]">
        {{ item.percentage !== undefined ? `${item.percentage}%` : item.value ?? '' }}
      </span>
    </li>
  </ul>
</template>
