<script setup lang="ts">
import { computed } from 'vue'
import DashboardIcon from './DashboardIcon.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    icon?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'secondary',
    disabled: false,
    type: 'button'
  }
)

const classes = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'border border-transparent bg-[color:var(--color-brand-500)] text-white shadow-[0_12px_24px_rgba(76,150,255,0.24)] hover:bg-[color:#3d86f1]'
    case 'ghost':
      return 'border border-transparent bg-transparent text-[color:var(--color-text-muted)] hover:bg-[rgba(15,37,82,0.04)] hover:text-[color:var(--color-brand-700)]'
    case 'icon':
      return 'h-10 w-10 justify-center rounded-[var(--radius-card)] border border-[color:var(--app-surface-border)] bg-white text-[color:var(--color-text-muted)] hover:text-[color:var(--color-brand-700)]'
    default:
      return 'border border-[color:var(--app-surface-border)] bg-white text-[color:var(--color-brand-700)] hover:border-[rgba(76,150,255,0.28)] hover:bg-[rgba(76,150,255,0.06)]'
  }
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="label || icon || 'Action'"
    class="inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-card)] px-4 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
    :class="classes"
  >
    <DashboardIcon v-if="icon" :name="icon" :size="16" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>
