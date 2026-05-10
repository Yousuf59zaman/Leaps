<script setup lang="ts">
import ApplicationTrackingReportPanel from './custom-reporting/ApplicationTrackingReportPanel.vue'
import ApplicationVolumeOfficeReportPanel from './custom-reporting/ApplicationVolumeOfficeReportPanel.vue'
import AllTokenDetailsReportPanel from './custom-reporting/AllTokenDetailsReportPanel.vue'
import AverageTimeReportPanel from './custom-reporting/AverageTimeReportPanel.vue'
import GenderBreakdownReportPanel from './custom-reporting/GenderBreakdownReportPanel.vue'
import GenderDistributionReportPanel from './custom-reporting/GenderDistributionReportPanel.vue'
import LGUServiceSpecificReportPanel from './custom-reporting/LGUServiceSpecificReportPanel.vue'
import MonthlyUserGrowthReportPanel from './custom-reporting/MonthlyUserGrowthReportPanel.vue'
import OfficeSummaryReportPanel from './custom-reporting/OfficeSummaryReportPanel.vue'
import ProcessingTimelineReportPanel from './custom-reporting/ProcessingTimelineReportPanel.vue'
import RegistrationChannelsReportPanel from './custom-reporting/RegistrationChannelsReportPanel.vue'
import StatusByServiceReportPanel from './custom-reporting/StatusByServiceReportPanel.vue'
import TokenStartEndTimeReportPanel from './custom-reporting/TokenStartEndTimeReportPanel.vue'
import TurnoverOfficeReportPanel from './custom-reporting/TurnoverOfficeReportPanel.vue'
import TurnoverOfficeServiceReportPanel from './custom-reporting/TurnoverOfficeServiceReportPanel.vue'
import TurnoverServiceReportPanel from './custom-reporting/TurnoverServiceReportPanel.vue'
import UserDemographicsReportPanel from './custom-reporting/UserDemographicsReportPanel.vue'
import UserSummaryReportPanel from './custom-reporting/UserSummaryReportPanel.vue'
import VerificationStatusReportPanel from './custom-reporting/VerificationStatusReportPanel.vue'
import type { Component } from 'vue'

type ReportExportFormat = 'csv' | 'pdf' | 'preview'
type ReportTypeValue =
  | 'office-summary'
  | 'user-summary'
  | 'all-token-details'
  | 'gender-breakdown'
  | 'average-time'
  | 'token-start-end-time'
  | 'lgu-service-specific'
  | 'verification-status'
  | 'gender-distribution'
  | 'registration-channels'
  | 'monthly-user-growth'
  | 'turnover-office-service'
  | 'turnover-office'
  | 'turnover-service'
  | 'application-volume-office'
  | 'status-by-service'
  | 'user-demographics'
  | 'processing-timeline'
  | 'application-tracking'

interface CustomReportState {
  selectType: string | null
  region: string | null
  province: string | null
  municipality: string | null
  barangay: string | null
  reportType: ReportTypeValue
  dateRange: {
    from: string | null
    to: string | null
  }
  exportFormat: ReportExportFormat | null
  previewMode: boolean
}

const data = {
  form: {
    title: 'Custom Reporting',
    icon: 'settings-2',
    state: {
      selectType: null,
      region: null,
      province: null,
      municipality: null,
      barangay: null,
      reportType: 'verification-status',
      dateRange: { from: '2024-01-01', to: '2024-06-30' },
      exportFormat: 'preview',
      previewMode: true
    } satisfies CustomReportState,
    selectTypeOptions: [
      { label: 'Citizen Profile', value: 'citizen-profile' },
      { label: 'Service Request', value: 'service-request' },
      { label: 'Office Operations', value: 'office-operations' }
    ],
    regionOptions: [
      { label: 'All Regions', value: 'all-regions' },
      { label: 'BARMM', value: 'barmm' },
      { label: 'National Capital Region', value: 'ncr' },
      { label: 'Region XI', value: 'region-xi' }
    ],
    provinceOptions: [
      { label: 'All Provinces', value: 'all-provinces' },
      { label: 'Lanao del Sur', value: 'lanao-del-sur' },
      { label: 'Maguindanao del Sur', value: 'maguindanao-del-sur' },
      { label: 'Basilan', value: 'basilan' }
    ],
    municipalityOptions: [
      { label: 'All Municipalities', value: 'all-municipalities' },
      { label: 'Cotabato City', value: 'cotabato-city' },
      { label: 'Marawi City', value: 'marawi-city' },
      { label: 'Lamitan City', value: 'lamitan-city' }
    ],
    barangayOptions: [
      { label: 'All Barangays', value: 'all-barangays' },
      { label: 'Poblacion', value: 'poblacion' },
      { label: 'Central District', value: 'central-district' },
      { label: 'Information Not Provided', value: 'information-not-provided' }
    ],
    reportTypeOptions: [
      { label: 'Office Summary', value: 'office-summary' },
      { label: 'User Summary', value: 'user-summary' },
      { label: 'All Token Details', value: 'all-token-details' },
      { label: 'Gender Breakdown', value: 'gender-breakdown' },
      { label: 'Average Time', value: 'average-time' },
      { label: 'Token Start & End Time', value: 'token-start-end-time' },
      { label: 'LGU Service Specific', value: 'lgu-service-specific' },
      { label: 'Verification Status', value: 'verification-status' },
      { label: 'Gender Distribution', value: 'gender-distribution' },
      { label: 'Registration Channels', value: 'registration-channels' },
      { label: 'Monthly User Growth', value: 'monthly-user-growth' },
      { label: 'Turnover / Office+Service', value: 'turnover-office-service' },
      { label: 'Turnover / Office', value: 'turnover-office' },
      { label: 'Turnover / Service', value: 'turnover-service' },
      { label: 'Application Volume', value: 'application-volume-office' },
      { label: 'Status by Service', value: 'status-by-service' },
      { label: 'User Demographics', value: 'user-demographics' },
      { label: 'Processing Timeline', value: 'processing-timeline' },
      { label: 'Application Tracking', value: 'application-tracking' }
    ]
  }
}

const reportState = reactive<CustomReportState>(structuredClone(data.form.state))

const reportComponentMap: Partial<Record<ReportTypeValue, Component>> = {
  'office-summary': OfficeSummaryReportPanel,
  'user-summary': UserSummaryReportPanel,
  'all-token-details': AllTokenDetailsReportPanel,
  'gender-breakdown': GenderBreakdownReportPanel,
  'average-time': AverageTimeReportPanel,
  'token-start-end-time': TokenStartEndTimeReportPanel,
  'lgu-service-specific': LGUServiceSpecificReportPanel,
  'verification-status': VerificationStatusReportPanel,
  'gender-distribution': GenderDistributionReportPanel,
  'registration-channels': RegistrationChannelsReportPanel,
  'monthly-user-growth': MonthlyUserGrowthReportPanel,
  'turnover-office-service': TurnoverOfficeServiceReportPanel,
  'turnover-office': TurnoverOfficeReportPanel,
  'turnover-service': TurnoverServiceReportPanel,
  'application-volume-office': ApplicationVolumeOfficeReportPanel,
  'status-by-service': StatusByServiceReportPanel,
  'user-demographics': UserDemographicsReportPanel,
  'processing-timeline': ProcessingTimelineReportPanel,
  'application-tracking': ApplicationTrackingReportPanel
}

const activeReportComponent = computed(() => reportComponentMap[reportState.reportType])
</script>

<template>
  <section class="space-y-5">
    <div class="border-b border-[#DEE2E7] pb-[23px]">
      <DashboardSectionHeading title="Custom Reporting & Analytics" icon="file-text" />
    </div>

    <div class="grid gap-5 sm:gap-6 min-[1400px]:grid-cols-[434px_minmax(0,1fr)] min-[1400px]:items-start min-[1400px]:gap-[33px]">
      <CustomReportingLeftColumn :data="data.form" :state="reportState" />
      <component v-if="activeReportComponent" :is="activeReportComponent" :key="reportState.reportType" />
    </div>
  </section>
</template>
