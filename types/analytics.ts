export type DashboardTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'

export type DashboardMetricValue = number | string

export type TableAlign = 'left' | 'center' | 'right'

export type ChartSeriesType = 'line' | 'bar' | 'area' | 'donut' | 'pie' | 'map'

export type ReportExportFormat = 'csv' | 'pdf' | 'xlsx' | 'preview'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface DateRangeValue {
  from: string | null
  to: string | null
}

export interface DashboardFilterState {
  layer: string | null
  office: string | null
  service: string | null
  fromDate: string | null
  toDate: string | null
  applied: boolean
}

export interface MetricDelta {
  value: DashboardMetricValue
  label: string
  direction: 'up' | 'down' | 'neutral'
}

export interface MetricCardData {
  id: string
  label: string
  value: DashboardMetricValue
  icon: string
  tone?: DashboardTone
  delta?: MetricDelta
  footnote?: string
}

export interface ChartDataPoint {
  label: string
  value: number | string
  color?: string
  meta?: Record<string, string | number | boolean | null>
}

export interface ChartSeriesData {
  id: string
  name: string
  type: ChartSeriesType
  color?: string
  stack?: string
  smooth?: boolean
  area?: boolean
  data: Array<number | null | ChartDataPoint>
}

export interface LegendItem {
  id: string
  label: string
  color: string
  value?: DashboardMetricValue
  percentage?: number
  tone?: DashboardTone
}

export interface TableColumn<T extends object> {
  key: keyof T | (string & {})
  label: string
  align?: TableAlign
  width?: string
  sortable?: boolean
  emphasize?: boolean
  formatter?: (value: unknown, row: T, index: number) => string
}

export interface PanelAction {
  id: string
  label: string
  icon?: string
}

export interface CustomReportState {
  reportType: string | null
  layer: string | null
  office: string | null
  dateRange: DateRangeValue
  exportFormat: ReportExportFormat | null
  previewMode: boolean
}
