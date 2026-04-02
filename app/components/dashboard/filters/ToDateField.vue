<script setup lang="ts">
import DashboardField from '../shared/DashboardField.vue'

defineProps<{
  modelValue: string | null
}>()

defineEmits<{
  'update:modelValue': [value: string | null]
}>()
</script>

<template>
  <DashboardField
    label="To Date"
    type="date"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
