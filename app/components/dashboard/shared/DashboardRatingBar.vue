<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
}>()

const width = computed(() => `${Math.max(0, Math.min(props.value, 100))}%`)
</script>

<template>
  <div class="h-2.5 w-full rounded-full bg-[rgba(15,37,82,0.08)]">
    <div
      class="h-full rounded-full bg-[linear-gradient(90deg,var(--color-brand-500),rgba(76,150,255,0.58))]"
      :style="{ width }"
    />
  </div>
</template>
