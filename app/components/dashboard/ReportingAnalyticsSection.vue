<script setup lang="ts">

const data = {
  demographic: {
    title: 'Reporting Analytics',
    icon: 'building-2',
    actions: [{ id: 'download-reporting-analytics', label: '', icon: 'download' }],
    centerLabel: 'Male',
    legend: [
      { id: 'male', label: 'Male', color: '#339AF0', percentage: 32 },
      { id: 'female', label: 'Female', color: '#51CF66', percentage: 45 },
      { id: 'common', label: 'Common', color: '#FF922B', percentage: 23 }
    ],
    series: [
      {
        id: 'demographic-distribution',
        name: 'Demographic Distribution',
        type: 'donut',
        data: [
          { label: 'Male', value: 32, color: '#339AF0' },
          { label: 'Female', value: 45, color: '#51CF66' },
          { label: 'Common', value: 23, color: '#FF922B' }
        ]
      }
    ]
  },
  vulnerability: {
    title: 'Reporting Analytics',
    icon: 'building-2',
    centerLabel: 'Vulnerability',
    legend: [
      { id: 'vulnerability', label: 'Vulnerability', color: '#477EFB', percentage: 24 },
      { id: 'male', label: 'Male', color: '#339AF0', percentage: 22 },
      { id: 'female', label: 'Female', color: '#51CF66', percentage: 38 },
      { id: 'common', label: 'Common', color: '#FF922B', percentage: 16 }
    ],
    series: [
      {
        id: 'vulnerability-distribution',
        name: 'Vulnerability Distribution',
        type: 'donut',
        data: [
          { label: 'Vulnerability', value: 24, color: '#477EFB' },
          { label: 'Male', value: 22, color: '#339AF0' },
          { label: 'Female', value: 38, color: '#51CF66' },
          { label: 'Common', value: 16, color: '#FF922B' }
        ]
      }
    ]
  },
  ageGroups: {
    title: 'Reporting Analytics',
    icon: 'building-2',
    actions: [
      { id: 'download-age-group', label: '', icon: 'file-text' },
      { id: 'export-age-group', label: '', icon: 'file-spreadsheet' }
    ],
    columns: [
      { key: 'serial', label: 'SI', align: 'center', width: '72px' },
      { key: 'groupedAge', label: 'Grouped Age (Years)' },
      { key: 'male', label: 'Male', align: 'center' },
      { key: 'female', label: 'Female', align: 'center' },
      { key: 'common', label: 'Common', align: 'center' },
      { key: 'total', label: 'Total', align: 'center', emphasize: true }
    ],
    rows: [
      { serial: 1, groupedAge: '11-20', male: 11, female: 4, common: 0, total: 15 },
      { serial: 2, groupedAge: '21-30', male: 58, female: 36, common: 0, total: 94 },
      { serial: 3, groupedAge: '31-40', male: 49, female: 37, common: 0, total: 86 },
      { serial: 4, groupedAge: '41 up', male: 41, female: 31, common: 0, total: 72 }
    ]
  },
  vulnerabilityMatrix: {
    title: 'Reporting Analytics',
    icon: 'building-2',
    actions: [
      { id: 'download-vulnerability', label: '', icon: 'file-text' },
      { id: 'export-vulnerability', label: '', icon: 'file-spreadsheet' }
    ],
    columns: [
      { key: 'serial', label: 'SI', align: 'center', width: '72px' },
      { key: 'vulnerability', label: 'Vulnerability' },
      { key: 'male', label: 'Male', align: 'center' },
      { key: 'female', label: 'Female', align: 'center' },
      { key: 'common', label: 'Common', align: 'center' },
      { key: 'grandTotal', label: 'Grand Total', align: 'center', emphasize: true }
    ],
    rows: [
      { serial: 1, vulnerability: 'Elderly', male: 11, female: 8, common: 0, grandTotal: 19 },
      { serial: 2, vulnerability: 'IP', male: 5, female: 3, common: 0, grandTotal: 8 },
      { serial: 3, vulnerability: 'Minor', male: 3, female: 1, common: 0, grandTotal: 4 },
      { serial: 4, vulnerability: 'Pregnant', male: 1, female: 2, common: 0, grandTotal: 3 },
      { serial: 5, vulnerability: 'PWD', male: 4, female: 0, common: 0, grandTotal: 4 }
    ]
  }
}
</script>

<template>
  <section class="rounded-[24.1722px] bg-white px-4 py-5 sm:px-5 sm:py-6 lg:px-[44px] lg:pb-[41px] lg:pt-[29.71px]">
    <DashboardSectionHeading title="Reporting Analytics" icon="building-2" />

    <div class="mt-6 grid gap-5 sm:mt-8 sm:gap-6 min-[1700px]:mt-[43px] min-[1700px]:grid-cols-[704px_minmax(0,1009px)] min-[1700px]:items-start min-[1700px]:gap-[34px]">
      <ReportingAnalyticsLeftColumn :demographic="data.demographic" :vulnerability="data.vulnerability" />
      <ReportingAnalyticsRightColumn :age-groups="data.ageGroups" :vulnerability-matrix="data.vulnerabilityMatrix" />
    </div>
  </section>
</template>
