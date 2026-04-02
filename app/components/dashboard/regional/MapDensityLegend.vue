<script setup lang="ts">
import type { LegendItem } from '../../../../types'

defineProps<{
  items: LegendItem[]
}>()
</script>

<template>
  <div class="rounded-[var(--radius-card)] border border-[color:rgba(255,255,255,0.55)] bg-white/80 p-4 shadow-[var(--shadow-card)] backdrop-blur">
    <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">
      Registration Density
    </p>
    <div class="mt-3 flex items-center gap-2">
      <span class="text-[11px] font-medium text-[color:var(--color-text-muted)]">Low</span>
      <div class="flex items-center gap-1">
        <span v-for="item in items" :key="item.id" class="h-2.5 w-8 rounded-full" :style="{ backgroundColor: item.color }" />
      </div>
      <span class="text-[11px] font-medium text-[color:var(--color-text-muted)]">High</span>
    </div>
  </div>
</template>
