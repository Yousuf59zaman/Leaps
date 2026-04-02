<script setup lang="ts">
import type { OfficeEfficiencyReportData } from '../../../../types'
import OfficeEfficiencyReportPanel from './OfficeEfficiencyReportPanel.vue'

defineProps<{
  data: OfficeEfficiencyReportData
}>()
</script>

<template>
  <OfficeEfficiencyReportPanel :data="data" />
</template>
