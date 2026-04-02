import type {
  ChartSeriesData,
  CustomReportState,
  DashboardFilterState,
  DashboardMetricValue,
  DashboardTone,
  LegendItem,
  MetricCardData,
  PanelAction,
  SelectOption,
  TableColumn
} from './analytics'

export interface PanelMeta {
  title: string
  subtitle?: string
  icon?: string
  badgeLabel?: string
  actions?: PanelAction[]
}

export interface StatItem {
  id: string
  label: string
  value: DashboardMetricValue
  color?: string
  tone?: DashboardTone
}

export interface DashboardFiltersData {
  state: DashboardFilterState
  layerOptions: SelectOption[]
  officeOptions: SelectOption[]
  serviceOptions: SelectOption[]
}

export interface ChartPanelData extends PanelMeta {
  categories?: string[]
  series: ChartSeriesData[]
  legend?: LegendItem[]
}

export interface DonutPanelData extends PanelMeta {
  series: ChartSeriesData[]
  legend: LegendItem[]
  centerLabel?: string
}

export interface TablePanelData<T extends object> extends PanelMeta {
  columns: TableColumn<T>[]
  rows: T[]
}

export interface RegionTooltipData {
  name: string
  statusLabel?: string
  stats: StatItem[]
}

export interface RegionalRegistrationDensityData extends PanelMeta {
  mapAsset?: string
  legend: LegendItem[]
  highlightedRegion: RegionTooltipData
}

export interface RequestSummaryData extends DonutPanelData {
  totalRequests: number
  totalLabel: string
  periodLabel: string
  statuses: StatItem[]
}

export interface PaymentInformationRow {
  serial: number
  serviceName: string
  receivableAmount: number
  receivedAmount: number
}

export interface AgeGroupRow {
  serial: number
  groupedAge: string
  male: number
  female: number
  common: number
  total: number
}

export interface VulnerabilityRow {
  serial: number
  vulnerability: string
  male: number
  female: number
  common: number
  grandTotal: number
}

export interface FeedbackRatingRow {
  id: string
  serviceName: string
  averageRating: number
  ratingVisual: number
  feedbackCount: number
}

export interface FeedbackSectionData {
  variant: 'service-feedback' | 'channel-feedback'
  summary: DonutPanelData
  details: TablePanelData<FeedbackRatingRow>
}

export interface CustomReportingFormData extends PanelMeta {
  state: CustomReportState
  reportTypeOptions: SelectOption[]
  layerOptions: SelectOption[]
  officeOptions: SelectOption[]
}

export interface OfficeEfficiencyRow {
  officeName: string
  totalTokens: number
  averageServiceTime: string
  averageWaitingTime: string
  status: string
}

export interface OfficeEfficiencyReportData extends PanelMeta {
  generatedAt?: string
  chart: ChartPanelData
  table: TablePanelData<OfficeEfficiencyRow>
}

export interface DashboardPageData {
  filters: DashboardFiltersData
  systemOverview: {
    title: string
    cards: MetricCardData[]
  }
  regionalInsights: {
    density: RegionalRegistrationDensityData
    requestSummary: RequestSummaryData
    monthlyRegistrationTrend: ChartPanelData
  }
  servicePerformance: {
    topServicePopularity: ChartPanelData
    regionalOfficePerformance: ChartPanelData
  }
  serviceRequestTimeline: ChartPanelData
  paymentInformation: TablePanelData<PaymentInformationRow>
  reportingAnalytics: {
    demographic: DonutPanelData
    vulnerability: DonutPanelData
    ageGroups: TablePanelData<AgeGroupRow>
    vulnerabilityMatrix: TablePanelData<VulnerabilityRow>
  }
  serviceFeedback: FeedbackSectionData
  qmsAnalytics: {
    title: string
    cards: MetricCardData[]
  }
  qmsActivityTrend: ChartPanelData
  channelFeedback: FeedbackSectionData
  customReportingAnalytics: {
    form: CustomReportingFormData
    officeEfficiency: OfficeEfficiencyReportData
  }
}
