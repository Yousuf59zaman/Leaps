<script setup lang="ts">
import DashboardField from '../shared/DashboardField.vue'

interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

defineProps<{
  modelValue: string | null
  options: SelectOption[]
}>()

defineEmits<{
  'update:modelValue': [value: string | null]
}>()
</script>

<template>
  <DashboardField
    label="Select Office"
    placeholder="Choose One"
    :model-value="modelValue"
    :options="options"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
