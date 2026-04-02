<script setup lang="ts">
import DashboardActionButton from '../shared/DashboardActionButton.vue'

defineProps<{
  isDirty: boolean
}>()

defineEmits<{
  reset: []
  apply: []
}>()
</script>

<template>
  <div class="flex flex-wrap items-end gap-3">
    <DashboardActionButton label="Reset" icon="refresh-cw" variant="secondary" :disabled="!isDirty" @click="$emit('reset')" />
    <DashboardActionButton label="Apply Filters" variant="primary" @click="$emit('apply')" />
  </div>
</template>
