import type { DashboardPageData } from '../types'

export const dashboardFixture: DashboardPageData = {
  filters: {
    state: {
      layer: 'office',
      office: 'metro-manila',
      service: 'all-services',
      fromDate: '2024-01-01',
      toDate: '2024-06-30',
      applied: true
    },
    layerOptions: [
      { label: 'Office Layer', value: 'office' },
      { label: 'Regional Layer', value: 'regional' },
      { label: 'Service Layer', value: 'service' }
    ],
    officeOptions: [
      { label: 'Metro Manila', value: 'metro-manila' },
      { label: 'Cebu City', value: 'cebu-city' },
      { label: 'Davao Central', value: 'davao-central' }
    ],
    serviceOptions: [
      { label: 'All Services', value: 'all-services' },
      { label: 'Business Permit Registration', value: 'business-permit-registration' },
      { label: 'Birth Certificate Request', value: 'birth-certificate-request' }
    ]
  },
  systemOverview: {
    title: 'System Overview',
    cards: [
      { id: 'total-offices', label: 'Total Offices', value: 1248, icon: 'building-2', tone: 'brand' },
      { id: 'total-services', label: 'Total Services', value: 342, icon: 'file-text', tone: 'success' },
      { id: 'total-registrations', label: 'Total Registrations', value: '2.4M', icon: 'users', tone: 'warning' },
      { id: 'verified-users', label: 'Verified Users', value: '1.8M', icon: 'circle-check', tone: 'success' },
      { id: 'suspended-users', label: 'Suspended Users', value: '12.4K', icon: 'circle-x', tone: 'danger' },
      { id: 'total-applications', label: 'Total Applications', value: '8.1M', icon: 'file-text', tone: 'brand' },
      { id: 'pending-applications', label: 'Pending Applications', value: '450K', icon: 'clock', tone: 'warning' },
      { id: 'completed-apps', label: 'Completed Apps', value: '7.2M', icon: 'feedback-sheet', tone: 'success' },
      { id: 'rejected-apps', label: 'Rejected Apps', value: '310K', icon: 'receipt', tone: 'danger' },
      { id: 'cancelled-apps', label: 'Cancelled Apps', value: '140K', icon: 'circle-alert', tone: 'neutral' }
    ]
  },
  regionalInsights: {
    density: {
      title: 'Regional Registration Density',
      subtitle: 'Geographical distribution of active citizen registrations.',
      icon: 'map',
      badgeLabel: 'Live Data',
      legend: [
        { id: 'low', label: 'Low', color: '#D5E6FF' },
        { id: 'medium', label: 'Medium', color: '#87B6FF' },
        { id: 'high', label: 'High', color: '#4C96FF' }
      ],
      highlightedRegion: {
        name: 'BARMM',
        statusLabel: 'High',
        stats: [
          { id: 'total', label: 'Total Registrations', value: 452310 },
          { id: 'completed', label: 'Completed', value: 380100 },
          { id: 'pending', label: 'Pending', value: 45000, tone: 'warning' },
          { id: 'rejected', label: 'Rejected', value: 27210, tone: 'danger' }
        ]
      }
    },
    requestSummary: {
      title: 'System Overview',
      icon: 'map',
      totalRequests: 3088,
      totalLabel: 'Total Requests',
      periodLabel: 'Month',
      statuses: [
        { id: 'open', label: 'Open Requests', value: 27, color: '#FF9330' },
        { id: 'rejected', label: 'Rejected Requests', value: 212, color: '#F3F5F7' },
        { id: 'cancelled', label: 'Cancelled Requests', value: 83, color: '#FF4343' },
        { id: 'complete', label: 'Complete Requests', value: 1271, color: '#4FD463' },
        { id: 'overdue', label: 'Overdue Requests', value: 1495, color: '#F4C533' }
      ],
      legend: [
        { id: 'open', label: 'Open', color: '#4C96FF', value: 27 },
        { id: 'rejected', label: 'Rejected', color: '#FF9330', value: 212 },
        { id: 'complete', label: 'Complete', color: '#31C97A', value: 1271 },
        { id: 'overdue', label: 'Overdue', color: '#F4B548', value: 1495 }
      ],
      series: [
        {
          id: 'request-distribution',
          name: 'Request Distribution',
          type: 'donut',
          data: [
            { label: 'Open', value: 27, color: '#4C96FF' },
            { label: 'Rejected', value: 212, color: '#FF9330' },
            { label: 'Complete', value: 1271, color: '#31C97A' },
            { label: 'Overdue', value: 1495, color: '#F4B548' }
          ]
        }
      ]
    },
    monthlyRegistrationTrend: {
      title: 'Monthly Registration Trend',
      icon: 'calendar',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        {
          id: 'monthly-registrations',
          name: 'Registrations',
          type: 'line',
          color: '#3899FA',
          smooth: true,
          data: [120000, 138000, 132000, 180000, 215000, 198000, 248000, 264000, 220000, 286000, 320000, 356000]
        }
      ]
    }
  },
  servicePerformance: {
    topServicePopularity: {
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
      series: [
        {
          id: 'applications',
          name: 'Applications',
          type: 'bar',
          color: '#1DC973',
          data: [920000, 790000, 650000, 555000, 492000, 410000, 350000, 300000, 250000, 180000]
        }
      ]
    },
    regionalOfficePerformance: {
      title: 'Regional Office Performance',
      subtitle: 'Applications Received vs Completed vs Pending',
      icon: 'benchmark',
      categories: ['NCR North', 'Cebu City Hub', 'Davao Central', 'Iloilo Regional', 'Baguio District'],
      series: [
        { id: 'received', name: 'Received', type: 'bar', color: '#3899FA', data: [40000, 34500, 29800, 25900, 19800] },
        { id: 'completed', name: 'Completed', type: 'bar', color: '#22C358', data: [34000, 28900, 25400, 22100, 16700] },
        { id: 'pending', name: 'Pending', type: 'bar', color: '#FCB11D', data: [5200, 4300, 2900, 1800, 1500] }
      ],
      legend: [
        { id: 'received', label: 'Received', color: '#3899FA' },
        { id: 'completed', label: 'Completed', color: '#22C358' },
        { id: 'pending', label: 'Pending', color: '#FCB11D' }
      ]
    }
  },
  serviceRequestTimeline: {
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
  },
  paymentInformation: {
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
  },
  reportingAnalytics: {
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
  },
  serviceFeedback: {
    variant: 'service-feedback',
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
  qmsAnalytics: {
    title: 'Queue Management System (QMS) Analytics',
    cards: [
      { id: 'tokens-issued', label: 'Total Tokens Issued', value: '1.2M', icon: 'ticket', tone: 'brand', delta: { value: '+12%', label: 'vs last month', direction: 'up' } },
      { id: 'average-service-time', label: 'Average Service Time', value: '14m 30s', icon: 'timer', tone: 'brand', delta: { value: '-2m', label: 'improvement', direction: 'down' } },
      { id: 'average-waiting-time', label: 'Average Waiting Time', value: '28m 15s', icon: 'clock-3', tone: 'warning', footnote: 'Needs attention' },
      { id: 'male-visitors', label: 'Total Visitors (Male)', value: '540K', icon: 'user-round', tone: 'warning', footnote: '45% of total' },
      { id: 'female-visitors', label: 'Total Visitors (Female)', value: '660K', icon: 'user-round-check', tone: 'success', footnote: '45% of total' },
      { id: 'active-counters', label: 'Total Active Counters', value: '3,450', icon: 'scan-line', tone: 'neutral', footnote: 'Across 1,248 offices' }
    ]
  },
  qmsActivityTrend: {
    title: 'QMS Activity Trend',
    subtitle: 'Tokens Issued, Served, and Abandoned over time',
    icon: 'indicator',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      { id: 'issued', name: 'Tokens Issued', type: 'bar', color: '#3CD856', data: [86000, 92000, 88000, 105000, 112000, 118000] },
      { id: 'served', name: 'Tokens Served', type: 'bar', color: '#3899FA', data: [81000, 86000, 85000, 97000, 104000, 110000] },
      { id: 'abandoned', name: 'Abandoned', type: 'line', color: '#EF4343', smooth: true, data: [5200, 6100, 4700, 7600, 7000, 8400] }
    ],
    legend: [
      { id: 'issued', label: 'Tokens Issued', color: '#3CD856' },
      { id: 'served', label: 'Tokens Served', color: '#3899FA' },
      { id: 'abandoned', label: 'Abandoned', color: '#EF4343' }
    ]
  },
  channelFeedback: {
    variant: 'channel-feedback',
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
  },
  customReportingAnalytics: {
    form: {
      title: 'Custom Reporting',
      icon: 'settings-2',
      state: {
        reportType: null,
        layer: null,
        office: null,
        dateRange: { from: '2024-01-01', to: '2024-06-30' },
        exportFormat: 'preview',
        previewMode: true
      },
      reportTypeOptions: [
        { label: 'Office Efficiency', value: 'office-efficiency' },
        { label: 'QMS Summary', value: 'qms-summary' }
      ],
      layerOptions: [
        { label: 'Office Layer', value: 'office' },
        { label: 'Regional Layer', value: 'regional' }
      ],
      officeOptions: [
        { label: 'Metro Manila', value: 'metro-manila' },
        { label: 'Quezon City Hall', value: 'quezon-city-hall' }
      ]
    },
    officeEfficiency: {
      title: 'Office Efficiency Report: Metro Manila',
      subtitle: 'Generated on: Oct 24, 2024 • Layer: Office Level',
      icon: 'bar-chart-3',
      badgeLabel: 'Preview Mode',
      generatedAt: '2024-10-24',
      chart: {
        title: 'Tokens Processed per Office',
        categories: ['Quezon City Hall', 'Manila City Hall', 'Makati City Hall', 'Pasig City Hall', 'Taguig City Hall'],
        series: [
          { id: 'tokens', name: 'Tokens', type: 'bar', color: '#4C96FF', data: [14500, 12800, 9500, 8200, 7800] }
        ]
      },
      table: {
        title: 'Office Efficiency Breakdown',
        columns: [
          { key: 'officeName', label: 'Office Name' },
          { key: 'totalTokens', label: 'Total Tokens', align: 'right' },
          { key: 'averageServiceTime', label: 'Avg Service Time', align: 'center' },
          { key: 'averageWaitingTime', label: 'Avg Waiting Time', align: 'center' },
          { key: 'status', label: 'Status', align: 'center', emphasize: true }
        ],
        rows: [
          { officeName: 'Quezon City Hall', totalTokens: 14500, averageServiceTime: '12m', averageWaitingTime: '25m', status: 'Optimal' },
          { officeName: 'Manila City Hall', totalTokens: 12800, averageServiceTime: '15m', averageWaitingTime: '32m', status: 'Review Needed' },
          { officeName: 'Makati City Hall', totalTokens: 9500, averageServiceTime: '10m', averageWaitingTime: '18m', status: 'Optimal' },
          { officeName: 'Pasig City Hall', totalTokens: 8200, averageServiceTime: '14m', averageWaitingTime: '22m', status: 'Optimal' },
          { officeName: 'Taguig City Hall', totalTokens: 7800, averageServiceTime: '11m', averageWaitingTime: '20m', status: 'Optimal' }
        ]
      }
    }
  }
}
