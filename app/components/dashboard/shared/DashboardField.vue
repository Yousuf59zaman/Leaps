<script setup lang="ts">
import { computed } from 'vue'
import type { SelectOption } from '../../../../types'
import DashboardIcon from './DashboardIcon.vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: string | null
    options?: SelectOption[]
    placeholder?: string
    type?: 'select' | 'date'
    icon?: string
  }>(),
  {
    options: () => [],
    placeholder: 'Choose One',
    type: 'select',
    icon: 'chevron'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const model = computed({
  get: () => props.modelValue ?? '',
  set: (value: string) => emit('update:modelValue', value || null)
})
</script>

<template>
  <label class="block space-y-2">
    <span class="text-sm font-medium text-[color:var(--color-text-strong)]">
      {{ label }}
    </span>

    <span class="relative block">
      <select
        v-if="type === 'select'"
        v-model="model"
        class="h-12 w-full appearance-none rounded-[var(--radius-card)] border border-[color:var(--app-surface-border)] bg-white px-4 pr-11 text-sm text-[color:var(--color-text-strong)] shadow-[var(--shadow-card)] transition-colors focus:border-[rgba(76,150,255,0.4)]"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <input
        v-else
        v-model="model"
        type="date"
        class="h-12 w-full rounded-[var(--radius-card)] border border-[color:var(--app-surface-border)] bg-white px-4 pr-11 text-sm text-[color:var(--color-text-strong)] shadow-[var(--shadow-card)] transition-colors focus:border-[rgba(76,150,255,0.4)]"
      />

      <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[color:var(--color-text-muted)]">
        <DashboardIcon :name="type === 'date' ? 'calendar' : icon" :size="16" />
      </span>
    </span>
  </label>
</template>
