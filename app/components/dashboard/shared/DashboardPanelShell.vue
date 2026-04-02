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
  <article class="rounded-[var(--radius-panel)] border border-[color:var(--app-surface-border)] bg-white shadow-[var(--shadow-card)]">
    <header class="border-b border-[color:var(--app-surface-border)] px-5 py-4 sm:px-6">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="flex items-start gap-3">
          <span class="mt-1 h-8 w-1 rounded-full bg-[color:var(--color-success-500)]" />
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <DashboardIcon v-if="icon" :name="icon" :size="17" class="text-[color:var(--color-brand-500)]" />
              <h3 class="text-[length:var(--text-panel-title)] leading-[var(--text-panel-title--line-height)] font-semibold text-[color:var(--color-text-strong)]">
                {{ title }}
              </h3>
            </div>
            <p v-if="subtitle" class="text-sm text-[color:var(--color-text-muted)]">
              {{ subtitle }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <slot name="actions">
            <span
              v-if="badgeLabel"
              class="inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text-muted)]"
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

    <div class="px-5 py-5 sm:px-6 sm:py-6" :class="bodyClass">
      <slot />
    </div>
  </article>
</template>
