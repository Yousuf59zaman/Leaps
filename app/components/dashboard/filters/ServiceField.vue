<script setup lang="ts">
import type { SelectOption } from '../../../../types'
import DashboardField from '../shared/DashboardField.vue'

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
    label="Select Service"
    placeholder="Choose One"
    :model-value="modelValue"
    :options="options"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
