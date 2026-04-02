<script setup lang="ts">
import type { PaymentInformationRow, TablePanelData } from '../../../types'
import PaymentInformationTable from './payment-information/PaymentInformationTable.vue'

defineProps<{
  data: TablePanelData<PaymentInformationRow>
}>()
</script>

<template>
  <section>
    <PaymentInformationTable :data="data" />
  </section>
</template>
