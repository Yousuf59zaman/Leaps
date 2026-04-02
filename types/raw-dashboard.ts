import type { ChartSeriesType, DashboardTone, ReportExportFormat, TableAlign } from './analytics'

export interface RawSelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface RawPanelAction {
  key: string
  label: string
  icon?: string
}

export interface RawMetricCard {
  key: string
  label: string
  value: number | string
  icon: string
  tone?: DashboardTone
  delta_value?: number | string
  delta_label?: string
  delta_direction?: 'up' | 'down' | 'neutral'
  footnote?: string
}

export interface RawChartPoint {
  label: string
  value: number | string
  color?: string
  meta?: Record<string, string | number | boolean | null>
}

export interface RawChartSeries {
  key: string
  label: string
  chart_type: ChartSeriesType
  color?: string
  stack?: string
  smooth?: boolean
  area?: boolean
  values: Array<number | null | RawChartPoint>
}

export interface RawLegendItem {
  key: string
  label: string
  color: string
  value?: number | string
  percentage?: number
  tone?: DashboardTone
}

export interface RawTableColumn {
  field: string
  label: string
  align?: TableAlign
  width?: string
  sortable?: boolean
  emphasize?: boolean
}

export interface RawPanelMeta {
  title: string
  subtitle?: string
  icon?: string
  badge_label?: string
  actions?: RawPanelAction[]
}

export interface RawTablePanel<T extends object> extends RawPanelMeta {
  columns: RawTableColumn[]
  rows: T[]
}

export interface RawDashboardFixture {
  filters: {
    selected_layer: string | null
    selected_office: string | null
    selected_service: string | null
    from_date: string | null
    to_date: string | null
    applied: boolean
    layer_options: RawSelectOption[]
    office_options: RawSelectOption[]
    service_options: RawSelectOption[]
  }
  system_overview: {
    title: string
    cards: RawMetricCard[]
  }
  regional_insights: {
    density: RawPanelMeta & {
      map_asset?: string
      legend: RawLegendItem[]
      highlighted_region: {
        name: string
        status_label?: string
        stats: Array<{
          key: string
          label: string
          value: number | string
          color?: string
          tone?: DashboardTone
        }>
      }
    }
    request_summary: RawPanelMeta & {
      total_requests: number
      total_label: string
      period_label: string
      statuses: Array<{
        key: string
        label: string
        value: number | string
        color?: string
        tone?: DashboardTone
      }>
      chart_legend: RawLegendItem[]
      chart_series: RawChartSeries[]
    }
    monthly_registration_trend: RawPanelMeta & {
      categories: string[]
      chart_series: RawChartSeries[]
      chart_legend?: RawLegendItem[]
    }
  }
  service_performance: {
    top_service_popularity: RawPanelMeta & {
      categories: string[]
      chart_series: RawChartSeries[]
      chart_legend?: RawLegendItem[]
    }
    regional_office_performance: RawPanelMeta & {
      categories: string[]
      chart_series: RawChartSeries[]
      chart_legend: RawLegendItem[]
    }
  }
  service_request_timeline: RawPanelMeta & {
    categories: string[]
    chart_series: RawChartSeries[]
    chart_legend: RawLegendItem[]
  }
  payment_information: RawTablePanel<{
    serial: number
    service_name: string
    receivable_amount: number
    received_amount: number
  }>
  reporting_analytics: {
    demographic: RawPanelMeta & {
      chart_series: RawChartSeries[]
      chart_legend: RawLegendItem[]
      center_label?: string
    }
    vulnerability: RawPanelMeta & {
      chart_series: RawChartSeries[]
      chart_legend: RawLegendItem[]
      center_label?: string
    }
    age_groups: RawTablePanel<{
      serial: number
      grouped_age: string
      male: number
      female: number
      common: number
      total: number
    }>
    vulnerability_matrix: RawTablePanel<{
      serial: number
      vulnerability: string
      male: number
      female: number
      common: number
      grand_total: number
    }>
  }
  service_feedback: {
    variant: 'service-feedback'
    summary: RawPanelMeta & {
      chart_series: RawChartSeries[]
      chart_legend: RawLegendItem[]
      center_label?: string
    }
    details: RawTablePanel<{
      id: string
      service_name: string
      average_rating: number
      rating_visual: number
      feedback_count: number
    }>
  }
  qms_analytics: {
    title: string
    cards: RawMetricCard[]
  }
  qms_activity_trend: RawPanelMeta & {
    categories: string[]
    chart_series: RawChartSeries[]
    chart_legend: RawLegendItem[]
  }
  channel_feedback: {
    variant: 'channel-feedback'
    summary: RawPanelMeta & {
      chart_series: RawChartSeries[]
      chart_legend: RawLegendItem[]
      center_label?: string
    }
    details: RawTablePanel<{
      id: string
      service_name: string
      average_rating: number
      rating_visual: number
      feedback_count: number
    }>
  }
  custom_reporting_analytics: {
    form: RawPanelMeta & {
      report_type: string | null
      layer: string | null
      office: string | null
      from_date: string | null
      to_date: string | null
      export_format: ReportExportFormat | null
      preview_mode: boolean
      report_type_options: RawSelectOption[]
      layer_options: RawSelectOption[]
      office_options: RawSelectOption[]
    }
    office_efficiency: RawPanelMeta & {
      generated_at?: string
      chart: RawPanelMeta & {
        categories: string[]
        chart_series: RawChartSeries[]
        chart_legend?: RawLegendItem[]
      }
      table: RawTablePanel<{
        office_name: string
        total_tokens: number
        average_service_time: string
        average_waiting_time: string
        status: string
      }>
    }
  }
}
