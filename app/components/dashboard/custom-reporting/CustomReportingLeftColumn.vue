<script setup lang="ts">
import type { CustomReportState, CustomReportingFormData } from '../../../../types'
import CustomReportingFormPanel from './CustomReportingFormPanel.vue'

defineProps<{
  data: CustomReportingFormData
  state: CustomReportState
}>()
</script>

<template>
  <CustomReportingFormPanel :data="data" :state="state" />
</template>
