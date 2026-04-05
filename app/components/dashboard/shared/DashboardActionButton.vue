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
      return 'border border-transparent bg-[#3899FA] text-white hover:bg-[#2f8ef0]'
    case 'ghost':
      return 'border border-transparent bg-transparent text-[color:var(--color-text-muted)] hover:bg-[rgba(21,25,30,0.04)] hover:text-[color:var(--color-brand-700)]'
    case 'icon':
      return 'h-[40.71px] w-[40.71px] justify-center rounded-[7.63333px] border border-[#DEE1E6] bg-white text-[#565D6D] hover:bg-[#f8f9fa] hover:text-[#15191E]'
    default:
      return 'border border-[#DEE2E7] bg-[#F9FAFB] text-[#15191E] hover:bg-[#f1f4f7]'
  }
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="label || icon || 'Action'"
    class="inline-flex min-h-[36px] items-center justify-center gap-2 rounded-[3.31px] px-3 [font-family:var(--font-ui-accent)] text-[12px] font-medium leading-5 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
    :class="classes"
  >
    <DashboardIcon v-if="icon" :name="icon" :size="16" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>
