<script setup lang="ts">
import type { PanelAction } from '../../../../types'
import DashboardActionButton from './DashboardActionButton.vue'
import DashboardIcon from './DashboardIcon.vue'

defineProps<{
  title: string
  subtitle?: string
  icon?: string
  badgeLabel?: string
  actions?: PanelAction[]
  bodyClass?: string
}>()
</script>

<template>
  <article class="rounded-[var(--radius-panel)] border border-[#EFF0F6] bg-white shadow-[var(--shadow-panel)]">
    <header class="border-b border-[#E4E5E7] px-5 py-5 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="flex items-start gap-[11px]">
          <span class="h-[39px] w-[10px] rounded-r-[5px] bg-[#1DC973]" />
          <div class="space-y-1">
            <div class="flex items-center gap-[10px]">
              <DashboardIcon v-if="icon" :name="icon" :size="24" class="text-[#3899FA]" />
              <h3 class="text-[20px] font-semibold leading-[30px] text-[#15191E] lg:text-[24px] lg:leading-[37px]">
                {{ title }}
              </h3>
            </div>
            <p v-if="subtitle" class="text-sm leading-6 text-[#8D97A5] lg:text-[18.6667px] lg:leading-[27px]">
              {{ subtitle }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <slot name="actions">
            <span
              v-if="badgeLabel"
              class="inline-flex min-h-[29px] items-center rounded-[13.3333px] bg-[#F3F5F7] px-4 text-[13px] font-semibold text-[#1C2027] lg:text-[16px]"
            >
              {{ badgeLabel }}
            </span>

            <DashboardActionButton
              v-for="action in actions"
              :key="action.id"
              :label="action.label"
              :icon="action.icon"
              :variant="action.label ? 'secondary' : 'icon'"
            />
          </slot>
        </div>
      </div>
    </header>

    <div class="px-5 py-5 sm:px-6 sm:py-6 lg:px-8" :class="bodyClass">
      <slot />
    </div>
  </article>
</template>
