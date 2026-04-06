import type { RawDashboardFixture } from '../types/raw-dashboard'

export const dashboardFixture = {
  filters: {
    selected_layer: 'office',
    selected_office: 'metro-manila',
    selected_service: 'all-services',
    from_date: '2024-01-01',
    to_date: '2024-06-30',
    applied: true,
    layer_options: [
      { label: 'Office Layer', value: 'office' },
      { label: 'Regional Layer', value: 'regional' },
      { label: 'Service Layer', value: 'service' }
    ],
    office_options: [
      { label: 'Metro Manila', value: 'metro-manila' },
      { label: 'Cebu City', value: 'cebu-city' },
      { label: 'Davao Central', value: 'davao-central' }
    ],
    service_options: [
      { label: 'All Services', value: 'all-services' },
      { label: 'Business Permit Registration', value: 'business-permit-registration' },
      { label: 'Birth Certificate Request', value: 'birth-certificate-request' }
    ]
  },
  system_overview: {
    title: 'System Overview',
    cards: [
      { key: 'total-offices', label: 'Total Offices', value: 1248, icon: 'building-2', tone: 'brand' },
      { key: 'total-services', label: 'Total Services', value: 342, icon: 'file-text', tone: 'success' },
      { key: 'total-registrations', label: 'Total Registrations', value: '2.4M', icon: 'users', tone: 'warning' },
      { key: 'verified-users', label: 'Verified Users', value: '1.8M', icon: 'circle-check', tone: 'success' },
      { key: 'suspended-users', label: 'Suspended Users', value: '12.4K', icon: 'circle-x', tone: 'danger' },
      { key: 'total-applications', label: 'Total Applications', value: '8.1M', icon: 'file-text', tone: 'brand' },
      { key: 'pending-applications', label: 'Pending Applications', value: '450K', icon: 'clock', tone: 'warning' },
        { key: 'completed-apps', label: 'Completed Apps', value: '7.2M', icon: 'feedback-sheet', tone: 'success' },
        { key: 'rejected-apps', label: 'Rejected Apps', value: '310K', icon: 'receipt', tone: 'danger' },
      { key: 'cancelled-apps', label: 'Cancelled Apps', value: '140K', icon: 'circle-alert', tone: 'neutral' }
    ]
  },
  regional_insights: {
    density: {
      title: 'Regional Registration Density',
      subtitle: 'Geographical distribution of active citizen registrations.',
      icon: 'map',
      badge_label: 'Live Data',
      legend: [
        { key: 'low', label: 'Low', color: '#D5E6FF' },
        { key: 'medium', label: 'Medium', color: '#87B6FF' },
        { key: 'high', label: 'High', color: '#4C96FF' }
      ],
      highlighted_region: {
        name: 'BARMM',
        status_label: 'High',
        stats: [
          { key: 'total', label: 'Total Registrations', value: 452310 },
          { key: 'completed', label: 'Completed', value: 380100 },
          { key: 'pending', label: 'Pending', value: 45000, tone: 'warning' },
          { key: 'rejected', label: 'Rejected', value: 27210, tone: 'danger' }
        ]
      }
    },
    request_summary: {
      title: 'System Overview',
      icon: 'map',
      badge_label: 'Month',
      total_requests: 3088,
      total_label: 'Total Requests',
      period_label: 'Month',
      statuses: [
        { key: 'open', label: 'Open Requests', value: 27, color: '#FF9330' },
        { key: 'rejected', label: 'Rejected Requests', value: 212, color: '#F3F5F7' },
        { key: 'cancelled', label: 'Cancelled Requests', value: 83, color: '#FF4343' },
        { key: 'complete', label: 'Complete Requests', value: 1271, color: '#4FD463' },
        { key: 'overdue', label: 'Overdue Requests', value: 1495, color: '#F4C533' }
      ],
      chart_legend: [
        { key: 'open', label: 'Open', color: '#4C96FF', value: 27 },
        { key: 'rejected', label: 'Rejected', color: '#FF9330', value: 212 },
        { key: 'complete', label: 'Complete', color: '#31C97A', value: 1271 },
        { key: 'overdue', label: 'Overdue', color: '#F4B548', value: 1495 }
      ],
      chart_series: [
        {
          key: 'request-distribution',
          label: 'Request Distribution',
          chart_type: 'donut',
          values: [
            { label: 'Open', value: 27, color: '#4C96FF' },
            { label: 'Rejected', value: 212, color: '#FF9330' },
            { label: 'Complete', value: 1271, color: '#31C97A' },
            { label: 'Overdue', value: 1495, color: '#F4B548' }
          ]
        }
      ]
    },
    monthly_registration_trend: {
      title: 'Monthly Registration Trend',
      icon: 'calendar',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      chart_series: [
        {
          key: 'monthly-registrations',
          label: 'Registrations',
          chart_type: 'line',
          color: '#3899FA',
          smooth: true,
          values: [120000, 138000, 132000, 180000, 215000, 198000, 248000, 264000, 220000, 286000, 320000, 356000]
        }
      ]
    }
  },
  service_performance: {
    top_service_popularity: {
      title: 'Top 10 Service Popularity',
      subtitle: 'By total application volume',
      icon: 'badge-check',
      categories: [
        'Business Permit Registration',
        'Birth Certificate Request',
        'NBI Clearance',
        'Passport Renewal',
        'Driver License Renewal',
        'Tax Declaration',
        'Barangay Clearance',
        'Voter Registration',
        'PhilHealth ID',
        'SSS Loan Application'
      ],
      chart_series: [
        {
          key: 'applications',
          label: 'Applications',
          chart_type: 'bar',
          color: '#1DC973',
          values: [920000, 790000, 650000, 555000, 492000, 410000, 350000, 300000, 250000, 180000]
        }
      ]
    },
    regional_office_performance: {
      title: 'Regional Office Performance',
      subtitle: 'Applications Received vs Completed vs Pending',
      icon: 'benchmark',
      categories: ['NCR North', 'Cebu City Hub', 'Davao Central', 'Iloilo Regional', 'Baguio District'],
      chart_series: [
        { key: 'received', label: 'Received', chart_type: 'bar', color: '#3899FA', values: [40000, 34500, 29800, 25900, 19800] },
        { key: 'completed', label: 'Completed', chart_type: 'bar', color: '#22C358', values: [34000, 28900, 25400, 22100, 16700] },
        { key: 'pending', label: 'Pending', chart_type: 'bar', color: '#FCB11D', values: [5200, 4300, 2900, 1800, 1500] }
      ],
      chart_legend: [
        { key: 'received', label: 'Received', color: '#3899FA' },
        { key: 'completed', label: 'Completed', color: '#22C358' },
        { key: 'pending', label: 'Pending', color: '#FCB11D' }
      ]
    }
  },
  service_request_timeline: {
    title: 'Service Request Trendline',
    icon: 'building-2',
    categories: ['Oct 2023', 'Dec 2023', 'Feb 2024', 'Apr 2024', 'Jun 2024', 'Aug 2024', 'Oct 2024', 'Dec 2024', 'Feb 2025', 'Apr 2025', 'Jun 2025', 'Aug 2025', 'Oct 2025', 'Dec 2025', 'Feb 2026'],
    chart_series: [
      { key: 'business-permit-renewal', label: 'Business Permit Registration and Renewal', chart_type: 'line', color: '#3B82F6', smooth: true, values: [35, 54, 120, 83, 60, 58, 64, 132, 118, 79, 72, 80, 95, 142, 128] },
      { key: 'birth-certificate', label: 'Certificate of Live Birth (COLB)', chart_type: 'line', color: '#EF4444', smooth: true, values: [74, 82, 76, 86, 104, 112, 106, 96, 112, 118, 126, 122, 131, 139, 136] },
      { key: 'issuance', label: 'Issuance of services rendered for local Sangguniang members', chart_type: 'line', color: '#86EFAC', smooth: true, values: [16, 18, 20, 24, 30, 36, 44, 38, 48, 52, 56, 62, 66, 72, 68] },
      { key: 'authority-to-travel', label: 'Authority to Travel', chart_type: 'line', color: '#A855F7', smooth: true, values: [42, 34, 28, 44, 55, 61, 58, 112, 41, 46, 52, 57, 65, 126, 54] },
      { key: 'building-permit', label: 'Building Permit', chart_type: 'line', color: '#EC4899', smooth: true, values: [28, 24, 20, 26, 38, 54, 60, 82, 44, 42, 52, 60, 68, 74, 62] },
      { key: 'zoning-clearance', label: 'Zoning Clearance', chart_type: 'line', color: '#14B8A6', smooth: true, values: [18, 22, 25, 28, 36, 48, 54, 72, 50, 58, 61, 64, 72, 88, 80] },
      { key: 'motorized', label: 'Motorized Vehicle Operators Permit', chart_type: 'line', color: '#84CC16', smooth: true, values: [62, 68, 74, 70, 60, 56, 50, 82, 76, 78, 92, 104, 98, 120, 116] },
      { key: 'tourist-attractions', label: 'Tourist Attractions', chart_type: 'line', color: '#15803D', smooth: true, values: [96, 126, 98, 110, 118, 129, 138, 87, 140, 133, 146, 154, 149, 160, 156] },
      { key: 'real-property', label: 'Real Property Assessment', chart_type: 'line', color: '#B91C1C', smooth: true, values: [44, 48, 55, 60, 118, 102, 110, 96, 108, 117, 123, 120, 128, 133, 118] },
      { key: 'wastewater', label: 'Wastewater Discharge Permit', chart_type: 'line', color: '#0EA5E9', smooth: true, values: [22, 20, 24, 28, 34, 42, 52, 48, 60, 68, 74, 80, 86, 92, 88] },
      { key: 'kalinga', label: 'KALINGA Program', chart_type: 'line', color: '#EAB308', smooth: true, values: [12, 18, 44, 30, 28, 36, 40, 54, 48, 56, 68, 74, 82, 84, 90] },
      { key: 'special-fund', label: 'Special Development Fund Release', chart_type: 'line', color: '#A16207', smooth: true, values: [10, 8, 12, 16, 20, 22, 28, 18, 32, 34, 40, 48, 50, 58, 56] },
      { key: 'appointment-health', label: 'Appointment for Health Services', chart_type: 'line', color: '#22C55E', smooth: true, values: [110, 132, 108, 120, 126, 134, 142, 110, 138, 147, 156, 162, 158, 165, 162] },
      { key: 'citizen-feedback', label: 'Citizen Feedback', chart_type: 'line', color: '#06B6D4', smooth: true, values: [18, 16, 22, 28, 34, 40, 48, 42, 50, 56, 62, 68, 72, 82, 76] }
    ],
    chart_legend: [
      { key: 'business-permit-renewal', label: 'Business Permit Registration and Renewal', color: '#3B82F6' },
      { key: 'birth-certificate', label: 'Certificate of Live Birth (COLB)', color: '#EF4444' },
      { key: 'issuance', label: 'Issuance of services rendered for local Sangguniang members', color: '#86EFAC' },
      { key: 'authority-to-travel', label: 'Authority to Travel', color: '#A855F7' },
      { key: 'building-permit', label: 'Building Permit', color: '#EC4899' },
      { key: 'zoning-clearance', label: 'Zoning Clearance', color: '#14B8A6' },
      { key: 'motorized', label: 'Motorized Vehicle Operators Permit', color: '#84CC16' },
      { key: 'tourist-attractions', label: 'Tourist Attractions', color: '#15803D' },
      { key: 'real-property', label: 'Real Property Assessment', color: '#B91C1C' },
      { key: 'wastewater', label: 'Wastewater Discharge Permit', color: '#0EA5E9' },
      { key: 'kalinga', label: 'KALINGA Program', color: '#EAB308' },
      { key: 'special-fund', label: 'Special Development Fund Release', color: '#A16207' },
      { key: 'appointment-health', label: 'Appointment for Health Services', color: '#22C55E' },
      { key: 'citizen-feedback', label: 'Citizen Feedback', color: '#06B6D4' }
    ]
  },
  payment_information: {
    title: 'Payment Information',
    icon: 'building-2',
    columns: [
      { field: 'serial', label: 'SI', align: 'center', width: '72px' },
      { field: 'service_name', label: 'Service Name' },
      { field: 'receivable_amount', label: 'Receivable Amount', align: 'right' },
      { field: 'received_amount', label: 'Received Amount', align: 'right', emphasize: true }
    ],
    rows: [
      { serial: 1, service_name: 'Tourist Attractions', receivable_amount: 1490394, received_amount: 1469992 },
      { serial: 2, service_name: 'Building Permit', receivable_amount: 31897884, received_amount: 31888670 },
      { serial: 3, service_name: 'Motorized Vehicle Operators Permit', receivable_amount: 2478195, received_amount: 2412865 },
      { serial: 4, service_name: 'Zoning Clearance', receivable_amount: 147735775, received_amount: 147674819 },
      { serial: 5, service_name: 'Business Permit Registration and Renewal', receivable_amount: 10779911, received_amount: 1514555 },
      { serial: 6, service_name: 'Wastewater Discharge Permit', receivable_amount: 2229394, received_amount: 2229394 },
      { serial: 7, service_name: 'Certificate of Live Birth (COLB)', receivable_amount: 21399, received_amount: 19398 },
      { serial: 8, service_name: 'Real Property Assessment', receivable_amount: 89782, received_amount: 89675 }
    ]
  },
  reporting_analytics: {
    demographic: {
      title: 'Reporting Analytics',
      icon: 'building-2',
      actions: [{ key: 'download-reporting-analytics', label: '', icon: 'download' }],
      center_label: 'Male',
      chart_legend: [
        { key: 'male', label: 'Male', color: '#339AF0', percentage: 32 },
        { key: 'female', label: 'Female', color: '#51CF66', percentage: 45 },
        { key: 'common', label: 'Common', color: '#FF922B', percentage: 23 }
      ],
      chart_series: [
        {
          key: 'demographic-distribution',
          label: 'Demographic Distribution',
          chart_type: 'donut',
          values: [
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
      center_label: 'Vulnerability',
      chart_legend: [
        { key: 'vulnerability', label: 'Vulnerability', color: '#477EFB', percentage: 24 },
        { key: 'male', label: 'Male', color: '#339AF0', percentage: 22 },
        { key: 'female', label: 'Female', color: '#51CF66', percentage: 38 },
        { key: 'common', label: 'Common', color: '#FF922B', percentage: 16 }
      ],
      chart_series: [
        {
          key: 'vulnerability-distribution',
          label: 'Vulnerability Distribution',
          chart_type: 'donut',
          values: [
            { label: 'Vulnerability', value: 24, color: '#477EFB' },
            { label: 'Male', value: 22, color: '#339AF0' },
            { label: 'Female', value: 38, color: '#51CF66' },
            { label: 'Common', value: 16, color: '#FF922B' }
          ]
        }
      ]
    },
    age_groups: {
      title: 'Reporting Analytics',
      icon: 'building-2',
      actions: [
        { key: 'download-age-group', label: '', icon: 'file-text' },
        { key: 'export-age-group', label: '', icon: 'file-spreadsheet' }
      ],
      columns: [
        { field: 'serial', label: 'SI', align: 'center', width: '72px' },
        { field: 'grouped_age', label: 'Grouped Age (Years)' },
        { field: 'male', label: 'Male', align: 'center' },
        { field: 'female', label: 'Female', align: 'center' },
        { field: 'common', label: 'Common', align: 'center' },
        { field: 'total', label: 'Total', align: 'center', emphasize: true }
      ],
      rows: [
        { serial: 1, grouped_age: '11-20', male: 11, female: 4, common: 0, total: 15 },
        { serial: 2, grouped_age: '21-30', male: 58, female: 36, common: 0, total: 94 },
        { serial: 3, grouped_age: '31-40', male: 49, female: 37, common: 0, total: 86 },
        { serial: 4, grouped_age: '41 up', male: 41, female: 31, common: 0, total: 72 }
      ]
    },
    vulnerability_matrix: {
      title: 'Reporting Analytics',
      icon: 'building-2',
      actions: [
        { key: 'download-vulnerability', label: '', icon: 'file-text' },
        { key: 'export-vulnerability', label: '', icon: 'file-spreadsheet' }
      ],
      columns: [
        { field: 'serial', label: 'SI', align: 'center', width: '72px' },
        { field: 'vulnerability', label: 'Vulnerability' },
        { field: 'male', label: 'Male', align: 'center' },
        { field: 'female', label: 'Female', align: 'center' },
        { field: 'common', label: 'Common', align: 'center' },
        { field: 'grand_total', label: 'Grand Total', align: 'center', emphasize: true }
      ],
      rows: [
        { serial: 1, vulnerability: 'Elderly', male: 11, female: 8, common: 0, grand_total: 19 },
        { serial: 2, vulnerability: 'IP', male: 5, female: 3, common: 0, grand_total: 8 },
        { serial: 3, vulnerability: 'Minor', male: 3, female: 1, common: 0, grand_total: 4 },
        { serial: 4, vulnerability: 'Pregnant', male: 1, female: 2, common: 0, grand_total: 3 },
        { serial: 5, vulnerability: 'PWD', male: 4, female: 0, common: 0, grand_total: 4 }
      ]
    }
  },
  service_feedback: {
    variant: 'service-feedback',
    summary: {
      title: 'Overall Satisfaction',
      icon: 'like',
      center_label: 'Very Good',
      chart_legend: [
        { key: 'very-good', label: 'Very Good', color: '#22C358', percentage: 45 },
        { key: 'good', label: 'Good', color: '#3899FA', percentage: 30 },
        { key: 'average', label: 'Average', color: '#FCB11D', percentage: 15 },
        { key: 'bad', label: 'Bad', color: '#EF4343', percentage: 7 },
        { key: 'very-bad', label: 'Very Bad', color: '#9CA3AF', percentage: 3 }
      ],
      chart_series: [
        {
          key: 'overall-satisfaction',
          label: 'Overall Satisfaction',
          chart_type: 'donut',
          values: [
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
      actions: [{ key: 'view-service-feedback', label: 'View All Feedback', icon: 'eye' }],
      columns: [
        { field: 'service_name', label: 'Service Name' },
        { field: 'average_rating', label: 'Average Rating', align: 'center' },
        { field: 'rating_visual', label: 'Rating Visual', align: 'center' },
        { field: 'feedback_count', label: 'Feedback Count', align: 'right' }
      ],
      rows: [
        { id: 'business-permit-registration', service_name: 'Business Permit Registration', average_rating: 4.8, rating_visual: 96, feedback_count: 12500 },
        { id: 'birth-certificate-request', service_name: 'Birth Certificate Request', average_rating: 4.6, rating_visual: 92, feedback_count: 18200 },
        { id: 'nbi-clearance', service_name: 'NBI Clearance', average_rating: 4.2, rating_visual: 84, feedback_count: 21000 },
        { id: 'passport-renewal', service_name: 'Passport Renewal', average_rating: 3.8, rating_visual: 76, feedback_count: 15400 },
        { id: 'driver-license-renewal', service_name: 'Driver License Renewal', average_rating: 3.5, rating_visual: 70, feedback_count: 11200 },
        { id: 'tax-declaration', service_name: 'Tax Declaration', average_rating: 4.5, rating_visual: 90, feedback_count: 8900 }
      ]
    }
  },
  qms_analytics: {
    title: 'Queue Management System (QMS) Analytics',
    cards: [
      { key: 'tokens-issued', label: 'Total Tokens Issued', value: '1.2M', icon: 'ticket', tone: 'brand', delta_value: '+12%', delta_label: 'vs last month', delta_direction: 'up' },
      { key: 'average-service-time', label: 'Average Service Time', value: '14m 30s', icon: 'timer', tone: 'brand', delta_value: '-2m', delta_label: 'improvement', delta_direction: 'down' },
      { key: 'average-waiting-time', label: 'Average Waiting Time', value: '28m 15s', icon: 'clock-3', tone: 'warning', footnote: 'Needs attention' },
      { key: 'male-visitors', label: 'Total Visitors (Male)', value: '540K', icon: 'user-round', tone: 'warning', footnote: '45% of total' },
      { key: 'female-visitors', label: 'Total Visitors (Female)', value: '660K', icon: 'user-round-check', tone: 'success', footnote: '45% of total' },
      { key: 'active-counters', label: 'Total Active Counters', value: '3,450', icon: 'scan-line', tone: 'neutral', footnote: 'Across 1,248 offices' }
    ]
  },
  qms_activity_trend: {
    title: 'QMS Activity Trend',
    subtitle: 'Tokens Issued, Served, and Abandoned over time',
    icon: 'indicator',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    chart_series: [
      { key: 'issued', label: 'Tokens Issued', chart_type: 'bar', color: '#3CD856', values: [86000, 92000, 88000, 105000, 112000, 118000] },
      { key: 'served', label: 'Tokens Served', chart_type: 'bar', color: '#3899FA', values: [81000, 86000, 85000, 97000, 104000, 110000] },
      { key: 'abandoned', label: 'Abandoned', chart_type: 'line', color: '#EF4343', smooth: true, values: [5200, 6100, 4700, 7600, 7000, 8400] }
    ],
    chart_legend: [
      { key: 'issued', label: 'Tokens Issued', color: '#3CD856' },
      { key: 'served', label: 'Tokens Served', color: '#3899FA' },
      { key: 'abandoned', label: 'Abandoned', color: '#EF4343' }
    ]
  },
  channel_feedback: {
    variant: 'channel-feedback',
    summary: {
      title: 'Overall Satisfaction',
      icon: 'like',
      center_label: 'Very Good',
      actions: [{ key: 'download-channel-feedback', label: 'Download', icon: 'download' }],
      chart_legend: [
        { key: 'very-good', label: 'Very Good', color: '#22C358', percentage: 45 },
        { key: 'good', label: 'Good', color: '#3899FA', percentage: 30 },
        { key: 'average', label: 'Average', color: '#FCB11D', percentage: 15 },
        { key: 'bad', label: 'Bad', color: '#EF4343', percentage: 7 },
        { key: 'very-bad', label: 'Very Bad', color: '#9CA3AF', percentage: 3 }
      ],
      chart_series: [
        {
          key: 'channel-satisfaction',
          label: 'Channel Satisfaction',
          chart_type: 'donut',
          values: [
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
      actions: [{ key: 'view-channel-feedback', label: 'View All Feedback', icon: 'eye' }],
      columns: [
        { field: 'service_name', label: 'Service' },
        { field: 'average_rating', label: 'Average Rating', align: 'center' },
        { field: 'rating_visual', label: 'Rating Visual', align: 'center' },
        { field: 'feedback_count', label: 'Feedback Count', align: 'right' }
      ],
      rows: [
        { id: 'inquiry', service_name: 'Inquiry', average_rating: 4.8, rating_visual: 96, feedback_count: 20 },
        { id: 'avail-service', service_name: 'Avail Service', average_rating: 4.6, rating_visual: 92, feedback_count: 13 },
        { id: 'complaint', service_name: 'Complaint', average_rating: 4.2, rating_visual: 84, feedback_count: 13 }
      ]
    }
  },
  custom_reporting_analytics: {
    form: {
      title: 'Custom Reporting',
      icon: 'settings-2',
      report_type: null,
      layer: null,
      office: null,
      from_date: '2024-01-01',
      to_date: '2024-06-30',
      export_format: 'preview',
      preview_mode: true,
      report_type_options: [
        { label: 'Office Efficiency', value: 'office-efficiency' },
        { label: 'QMS Summary', value: 'qms-summary' }
      ],
      layer_options: [
        { label: 'Office Layer', value: 'office' },
        { label: 'Regional Layer', value: 'regional' }
      ],
      office_options: [
        { label: 'Metro Manila', value: 'metro-manila' },
        { label: 'Quezon City Hall', value: 'quezon-city-hall' }
      ]
    },
    office_efficiency: {
      title: 'Office Efficiency Report: Metro Manila',
      subtitle: 'Generated on: Oct 24, 2024 • Layer: Office Level',
      icon: 'bar-chart-3',
      badge_label: 'Preview Mode',
      generated_at: '2024-10-24',
      chart: {
        title: 'Tokens Processed per Office',
        categories: ['Quezon City Hall', 'Manila City Hall', 'Makati City Hall', 'Pasig City Hall', 'Taguig City Hall'],
        chart_series: [
          { key: 'tokens', label: 'Tokens', chart_type: 'bar', color: '#4C96FF', values: [14500, 12800, 9500, 8200, 7800] }
        ]
      },
      table: {
        title: 'Office Efficiency Breakdown',
        columns: [
          { field: 'office_name', label: 'Office Name' },
          { field: 'total_tokens', label: 'Total Tokens', align: 'right' },
          { field: 'average_service_time', label: 'Avg Service Time', align: 'center' },
          { field: 'average_waiting_time', label: 'Avg Waiting Time', align: 'center' },
          { field: 'status', label: 'Status', align: 'center', emphasize: true }
        ],
        rows: [
          { office_name: 'Quezon City Hall', total_tokens: 14500, average_service_time: '12m', average_waiting_time: '25m', status: 'Optimal' },
          { office_name: 'Manila City Hall', total_tokens: 12800, average_service_time: '15m', average_waiting_time: '32m', status: 'Review Needed' },
          { office_name: 'Makati City Hall', total_tokens: 9500, average_service_time: '10m', average_waiting_time: '18m', status: 'Optimal' },
          { office_name: 'Pasig City Hall', total_tokens: 8200, average_service_time: '14m', average_waiting_time: '22m', status: 'Optimal' },
          { office_name: 'Taguig City Hall', total_tokens: 7800, average_service_time: '11m', average_waiting_time: '20m', status: 'Optimal' }
        ]
      }
    }
  }
} satisfies RawDashboardFixture
