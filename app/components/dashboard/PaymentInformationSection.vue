<script setup lang="ts">
import PaymentInformationTable from './payment-information/PaymentInformationTable.vue'

const data = {
  title: 'Payment Information',
  icon: 'building-2',
  columns: [
    { key: 'serial', label: 'SI', align: 'center', width: '72px' },
    { key: 'serviceName', label: 'Service Name' },
    { key: 'receivableAmount', label: 'Receivable Amount', align: 'right' },
    { key: 'receivedAmount', label: 'Received Amount', align: 'right', emphasize: true }
  ],
  rows: [
    { serial: 1, serviceName: 'Tourist Attractions', receivableAmount: 1490394, receivedAmount: 1469992 },
    { serial: 2, serviceName: 'Building Permit', receivableAmount: 31897884, receivedAmount: 31888670 },
    { serial: 3, serviceName: 'Motorized Vehicle Operators Permit', receivableAmount: 2478195, receivedAmount: 2412865 },
    { serial: 4, serviceName: 'Zoning Clearance', receivableAmount: 147735775, receivedAmount: 147674819 },
    { serial: 5, serviceName: 'Business Permit Registration and Renewal', receivableAmount: 10779911, receivedAmount: 1514555 },
    { serial: 6, serviceName: 'Wastewater Discharge Permit', receivableAmount: 2229394, receivedAmount: 2229394 },
    { serial: 7, serviceName: 'Certificate of Live Birth (COLB)', receivableAmount: 21399, receivedAmount: 19398 },
    { serial: 8, serviceName: 'Real Property Assessment', receivableAmount: 89782, receivedAmount: 89675 }
  ]
}
</script>

<template>
  <section>
    <PaymentInformationTable :data="data" />
  </section>
</template>
