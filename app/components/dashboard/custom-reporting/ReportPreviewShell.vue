<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <article class="rounded-[19px] bg-white p-[18px] shadow-[var(--shadow-card)]">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h3 class="text-[17.0571px] font-semibold leading-[21px] text-[#15191E]">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="mt-[2.44px] text-[13.402px] leading-4 text-[#8D97A5]">
          {{ subtitle }}
        </p>
      </div>

      <slot name="actions" />
    </div>

    <slot />
  </article>
</template>
