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
  <div class="flex flex-wrap justify-end gap-[8px]">
    <DashboardActionButton
      label="Reset"
      icon="refresh-cw"
      variant="secondary"
      :disabled="!isDirty"
      class="w-[82.25px]"
      @click="$emit('reset')"
    />
    <DashboardActionButton label="Apply Filters" variant="primary" class="w-[96px]" @click="$emit('apply')" />
  </div>
</template>
