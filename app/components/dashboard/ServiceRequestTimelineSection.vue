<script setup lang="ts">
import ServiceRequestTrendlineChart from './service-request-timeline/ServiceRequestTrendlineChart.vue'

const data = {
  title: 'Service Request Trendline',
  icon: 'building-2',
  categories: ['Oct 2023', 'Dec 2023', 'Feb 2024', 'Apr 2024', 'Jun 2024', 'Aug 2024', 'Oct 2024', 'Dec 2024', 'Feb 2025', 'Apr 2025', 'Jun 2025', 'Aug 2025', 'Oct 2025', 'Dec 2025', 'Feb 2026'],
  series: [
    { id: 'business-permit-renewal', name: 'Business Permit Registration and Renewal', type: 'line', color: '#3B82F6', smooth: true, data: [35, 54, 120, 83, 60, 58, 64, 132, 118, 79, 72, 80, 95, 142, 128] },
    { id: 'birth-certificate', name: 'Certificate of Live Birth (COLB)', type: 'line', color: '#EF4444', smooth: true, data: [74, 82, 76, 86, 104, 112, 106, 96, 112, 118, 126, 122, 131, 139, 136] },
    { id: 'issuance', name: 'Issuance of services rendered for local Sangguniang members', type: 'line', color: '#86EFAC', smooth: true, data: [16, 18, 20, 24, 30, 36, 44, 38, 48, 52, 56, 62, 66, 72, 68] },
    { id: 'authority-to-travel', name: 'Authority to Travel', type: 'line', color: '#A855F7', smooth: true, data: [42, 34, 28, 44, 55, 61, 58, 112, 41, 46, 52, 57, 65, 126, 54] },
    { id: 'building-permit', name: 'Building Permit', type: 'line', color: '#EC4899', smooth: true, data: [28, 24, 20, 26, 38, 54, 60, 82, 44, 42, 52, 60, 68, 74, 62] },
    { id: 'zoning-clearance', name: 'Zoning Clearance', type: 'line', color: '#14B8A6', smooth: true, data: [18, 22, 25, 28, 36, 48, 54, 72, 50, 58, 61, 64, 72, 88, 80] },
    { id: 'motorized', name: 'Motorized Vehicle Operators Permit', type: 'line', color: '#84CC16', smooth: true, data: [62, 68, 74, 70, 60, 56, 50, 82, 76, 78, 92, 104, 98, 120, 116] },
    { id: 'tourist-attractions', name: 'Tourist Attractions', type: 'line', color: '#15803D', smooth: true, data: [96, 126, 98, 110, 118, 129, 138, 87, 140, 133, 146, 154, 149, 160, 156] },
    { id: 'real-property', name: 'Real Property Assessment', type: 'line', color: '#B91C1C', smooth: true, data: [44, 48, 55, 60, 118, 102, 110, 96, 108, 117, 123, 120, 128, 133, 118] },
    { id: 'wastewater', name: 'Wastewater Discharge Permit', type: 'line', color: '#0EA5E9', smooth: true, data: [22, 20, 24, 28, 34, 42, 52, 48, 60, 68, 74, 80, 86, 92, 88] },
    { id: 'kalinga', name: 'KALINGA Program', type: 'line', color: '#EAB308', smooth: true, data: [12, 18, 44, 30, 28, 36, 40, 54, 48, 56, 68, 74, 82, 84, 90] },
    { id: 'special-fund', name: 'Special Development Fund Release', type: 'line', color: '#A16207', smooth: true, data: [10, 8, 12, 16, 20, 22, 28, 18, 32, 34, 40, 48, 50, 58, 56] },
    { id: 'appointment-health', name: 'Appointment for Health Services', type: 'line', color: '#22C55E', smooth: true, data: [110, 132, 108, 120, 126, 134, 142, 110, 138, 147, 156, 162, 158, 165, 162] },
    { id: 'citizen-feedback', name: 'Citizen Feedback', type: 'line', color: '#06B6D4', smooth: true, data: [18, 16, 22, 28, 34, 40, 48, 42, 50, 56, 62, 68, 72, 82, 76] }
  ],
  legend: [
    { id: 'business-permit-renewal', label: 'Business Permit Registration and Renewal', color: '#3B82F6' },
    { id: 'birth-certificate', label: 'Certificate of Live Birth (COLB)', color: '#EF4444' },
    { id: 'issuance', label: 'Issuance of services rendered for local Sangguniang members', color: '#86EFAC' },
    { id: 'authority-to-travel', label: 'Authority to Travel', color: '#A855F7' },
    { id: 'building-permit', label: 'Building Permit', color: '#EC4899' },
    { id: 'zoning-clearance', label: 'Zoning Clearance', color: '#14B8A6' },
    { id: 'motorized', label: 'Motorized Vehicle Operators Permit', color: '#84CC16' },
    { id: 'tourist-attractions', label: 'Tourist Attractions', color: '#15803D' },
    { id: 'real-property', label: 'Real Property Assessment', color: '#B91C1C' },
    { id: 'wastewater', label: 'Wastewater Discharge Permit', color: '#0EA5E9' },
    { id: 'kalinga', label: 'KALINGA Program', color: '#EAB308' },
    { id: 'special-fund', label: 'Special Development Fund Release', color: '#A16207' },
    { id: 'appointment-health', label: 'Appointment for Health Services', color: '#22C55E' },
    { id: 'citizen-feedback', label: 'Citizen Feedback', color: '#06B6D4' }
  ]
}
</script>

<template>
  <section>
    <ServiceRequestTrendlineChart :data="data" />
  </section>
</template>
