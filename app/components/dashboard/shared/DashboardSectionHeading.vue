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
    <div class="flex items-start gap-[11px]">
      <span class="h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />
      <div class="space-y-1">
        <div class="flex items-center gap-[10px]">
          <DashboardIcon v-if="icon" :name="icon" :size="27" class="text-[#3899FA]" />
          <h2 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
            {{ title }}
          </h2>
        </div>
        <p v-if="subtitle" class="text-sm leading-6 text-[#8D97A5] lg:text-[18.6667px] lg:leading-[27px]">
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
