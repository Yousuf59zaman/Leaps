<script setup lang="ts">
import DashboardIcon from './DashboardIcon.vue'

defineProps<{
  title: string
  icon?: string
  subtitle?: string
  badgeLabel?: string
}>()
</script>

<template>
  <div class="flex flex-wrap items-start justify-between gap-4">
    <div class="flex items-start gap-3">
      <span class="mt-1 h-8 w-1 rounded-full bg-[color:var(--color-success-500)]" />
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <DashboardIcon v-if="icon" :name="icon" :size="18" class="text-[color:var(--color-brand-500)]" />
          <h2 class="text-[length:var(--text-section-title)] leading-[var(--text-section-title--line-height)] font-semibold text-[color:var(--color-text-strong)]">
            {{ title }}
          </h2>
        </div>
        <p v-if="subtitle" class="text-sm text-[color:var(--color-text-muted)]">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <span
      v-if="badgeLabel"
      class="inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text-muted)]"
    >
      {{ badgeLabel }}
    </span>
  </div>
</template>
