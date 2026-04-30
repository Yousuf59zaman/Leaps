<script setup lang="ts">
import { computed } from 'vue'
import DashboardSectionHeading from './shared/DashboardSectionHeading.vue'
import OverallSatisfactionPanel from './feedback/OverallSatisfactionPanel.vue'
import ServiceRatingDetailsPanel from './feedback/ServiceRatingDetailsPanel.vue'

type FeedbackVariant = 'service-feedback' | 'channel-feedback'

const props = withDefaults(
  defineProps<{
    variant?: FeedbackVariant
    title?: string
  }>(),
  {
    variant: 'service-feedback',
    title: 'Feedback & Ratings'
  }
)

const feedbackDataByVariant = {
  'service-feedback': {
    summary: {
      title: 'Overall Satisfaction',
      icon: 'like',
      centerLabel: 'Very Good',
      legend: [
        { id: 'very-good', label: 'Very Good', color: '#22C358', percentage: 45 },
        { id: 'good', label: 'Good', color: '#3899FA', percentage: 30 },
        { id: 'average', label: 'Average', color: '#FCB11D', percentage: 15 },
        { id: 'bad', label: 'Bad', color: '#EF4343', percentage: 7 },
        { id: 'very-bad', label: 'Very Bad', color: '#9CA3AF', percentage: 3 }
      ],
      series: [
        {
          id: 'overall-satisfaction',
          name: 'Overall Satisfaction',
          type: 'donut',
          data: [
            { label: 'Very Good', value: 45, color: '#22C358' },
            { label: 'Good', value: 30, color: '#3899FA' },
            { label: 'Average', value: 15, color: '#FCB11D' },
            { label: 'Bad', value: 7, color: '#EF4343' },
            { label: 'Very Bad', value: 3, color: '#8D97A5' }
          ]
        }
      ]
    },
    details: {
      title: 'Service Rating Details',
      icon: 'feedback-sheet',
      actions: [{ id: 'view-service-feedback', label: 'View All Feedback', icon: 'eye' }],
      columns: [
        { key: 'serviceName', label: 'Service Name' },
        { key: 'averageRating', label: 'Average Rating', align: 'center' },
        { key: 'ratingVisual', label: 'Rating Visual', align: 'center' },
        { key: 'feedbackCount', label: 'Feedback Count', align: 'right' }
      ],
      rows: [
        { id: 'business-permit-registration', serviceName: 'Business Permit Registration', averageRating: 4.8, ratingVisual: 96, feedbackCount: 12500 },
        { id: 'birth-certificate-request', serviceName: 'Birth Certificate Request', averageRating: 4.6, ratingVisual: 92, feedbackCount: 18200 },
        { id: 'nbi-clearance', serviceName: 'NBI Clearance', averageRating: 4.2, ratingVisual: 84, feedbackCount: 21000 },
        { id: 'passport-renewal', serviceName: 'Passport Renewal', averageRating: 3.8, ratingVisual: 76, feedbackCount: 15400 },
        { id: 'driver-license-renewal', serviceName: 'Driver License Renewal', averageRating: 3.5, ratingVisual: 70, feedbackCount: 11200 },
        { id: 'tax-declaration', serviceName: 'Tax Declaration', averageRating: 4.5, ratingVisual: 90, feedbackCount: 8900 }
      ]
    }
  },
  'channel-feedback': {
    summary: {
      title: 'Overall Satisfaction',
      icon: 'like',
      centerLabel: 'Very Good',
      actions: [{ id: 'download-channel-feedback', label: 'Download', icon: 'download' }],
      legend: [
        { id: 'very-good', label: 'Very Good', color: '#22C358', percentage: 45 },
        { id: 'good', label: 'Good', color: '#3899FA', percentage: 30 },
        { id: 'average', label: 'Average', color: '#FCB11D', percentage: 15 },
        { id: 'bad', label: 'Bad', color: '#EF4343', percentage: 7 },
        { id: 'very-bad', label: 'Very Bad', color: '#9CA3AF', percentage: 3 }
      ],
      series: [
        {
          id: 'channel-satisfaction',
          name: 'Channel Satisfaction',
          type: 'donut',
          data: [
            { label: 'Very Good', value: 45, color: '#22C358' },
            { label: 'Good', value: 30, color: '#3899FA' },
            { label: 'Average', value: 15, color: '#FCB11D' },
            { label: 'Bad', value: 7, color: '#EF4343' },
            { label: 'Very Bad', value: 3, color: '#8D97A5' }
          ]
        }
      ]
    },
    details: {
      title: 'Service Rating Details',
      icon: 'feedback-sheet',
      actions: [{ id: 'view-channel-feedback', label: 'View All Feedback', icon: 'eye' }],
      columns: [
        { key: 'serviceName', label: 'Service' },
        { key: 'averageRating', label: 'Average Rating', align: 'center' },
        { key: 'ratingVisual', label: 'Rating Visual', align: 'center' },
        { key: 'feedbackCount', label: 'Feedback Count', align: 'right' }
      ],
      rows: [
        { id: 'inquiry', serviceName: 'Inquiry', averageRating: 4.8, ratingVisual: 96, feedbackCount: 20 },
        { id: 'avail-service', serviceName: 'Avail Service', averageRating: 4.6, ratingVisual: 92, feedbackCount: 13 },
        { id: 'complaint', serviceName: 'Complaint', averageRating: 4.2, ratingVisual: 84, feedbackCount: 13 }
      ]
    }
  }
}

const data = computed(() => feedbackDataByVariant[props.variant])
</script>

<template>
  <section class="space-y-4 sm:space-y-[18px]">
    <div class="border-b border-[#DEE2E7] pb-[14px]">
      <DashboardSectionHeading :title="title" icon="feedback-sheet" />
    </div>

    <div class="grid gap-5 sm:gap-6 min-[1600px]:grid-cols-[minmax(0,590.67px)_minmax(0,1fr)] min-[1600px]:items-start min-[1600px]:gap-[30.33px]">
      <OverallSatisfactionPanel :data="data.summary" />
      <ServiceRatingDetailsPanel :data="data.details" />
    </div>
  </section>
</template>
