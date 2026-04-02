import type { RawDashboardFixture } from '../../types/raw-dashboard'
import type {
  ChartDataPoint,
  ChartPanelData,
  ChartSeriesData,
  CustomReportState,
  CustomReportingFormData,
  DashboardFilterState,
  DashboardPageData,
  DonutPanelData,
  FeedbackSectionData,
  LegendItem,
  MetricCardData,
  OfficeEfficiencyRow,
  PanelMeta,
  PaymentInformationRow,
  RequestSummaryData,
  StatItem,
  TableColumn,
  TablePanelData
} from '../../types'

type RawAction = { key: string; label: string; icon?: string }

function mapPanelMeta(input: { title: string; subtitle?: string; icon?: string; badge_label?: string; actions?: RawAction[] }): PanelMeta {
  return {
    title: input.title,
    subtitle: input.subtitle,
    icon: input.icon,
    badgeLabel: input.badge_label,
    actions: input.actions?.map((action) => ({ id: action.key, label: action.label, icon: action.icon }))
  }
}

function mapLegendItem(input: { key: string; label: string; color: string; value?: number | string; percentage?: number; tone?: LegendItem['tone'] }): LegendItem {
  return {
    id: input.key,
    label: input.label,
    color: input.color,
    value: input.value,
    percentage: input.percentage,
    tone: input.tone
  }
}

function mapChartPoint(value: number | null | { label: string; value: number | string; color?: string; meta?: Record<string, string | number | boolean | null> }): number | null | ChartDataPoint {
  if (value === null || typeof value === 'number') {
    return value
  }

  return {
    label: value.label,
    value: value.value,
    color: value.color,
    meta: value.meta
  }
}

function mapChartSeries(input: { key: string; label: string; chart_type: ChartSeriesData['type']; color?: string; stack?: string; smooth?: boolean; area?: boolean; values: Array<number | null | { label: string; value: number | string; color?: string; meta?: Record<string, string | number | boolean | null> }> }): ChartSeriesData {
  return {
    id: input.key,
    name: input.label,
    type: input.chart_type,
    color: input.color,
    stack: input.stack,
    smooth: input.smooth,
    area: input.area,
    data: input.values.map(mapChartPoint)
  }
}

function mapMetricCard(input: { key: string; label: string; value: number | string; icon: string; tone?: MetricCardData['tone']; delta_value?: number | string; delta_label?: string; delta_direction?: 'up' | 'down' | 'neutral'; footnote?: string }): MetricCardData {
  return {
    id: input.key,
    label: input.label,
    value: input.value,
    icon: input.icon,
    tone: input.tone,
    footnote: input.footnote,
    delta: input.delta_value !== undefined && input.delta_label && input.delta_direction
      ? { value: input.delta_value, label: input.delta_label, direction: input.delta_direction }
      : undefined
  }
}

function mapStatItem(input: { key: string; label: string; value: number | string; color?: string; tone?: StatItem['tone'] }): StatItem {
  return {
    id: input.key,
    label: input.label,
    value: input.value,
    color: input.color,
    tone: input.tone
  }
}

function mapChartPanel(input: { title: string; subtitle?: string; icon?: string; badge_label?: string; actions?: RawAction[]; categories?: string[]; chart_series: Array<Parameters<typeof mapChartSeries>[0]>; chart_legend?: Array<Parameters<typeof mapLegendItem>[0]> }): ChartPanelData {
  return {
    ...mapPanelMeta(input),
    categories: input.categories,
    series: input.chart_series.map(mapChartSeries),
    legend: input.chart_legend?.map(mapLegendItem)
  }
}

function mapDonutPanel(input: { title: string; subtitle?: string; icon?: string; badge_label?: string; actions?: RawAction[]; chart_series: Array<Parameters<typeof mapChartSeries>[0]>; chart_legend: Array<Parameters<typeof mapLegendItem>[0]>; center_label?: string }): DonutPanelData {
  return {
    ...mapPanelMeta(input),
    series: input.chart_series.map(mapChartSeries),
    legend: input.chart_legend.map(mapLegendItem),
    centerLabel: input.center_label
  }
}

function mapTableColumn<T extends object>(input: { field: string; label: string; align?: TableColumn<T>['align']; width?: string; sortable?: boolean; emphasize?: boolean }): TableColumn<T> {
  return {
    key: input.field,
    label: input.label,
    align: input.align,
    width: input.width,
    sortable: input.sortable,
    emphasize: input.emphasize
  }
}

function mapTablePanel<TInput extends object, TOutput extends object>(
  input: { title: string; subtitle?: string; icon?: string; badge_label?: string; actions?: RawAction[]; columns: Array<{ field: string; label: string; align?: TableColumn<TOutput>['align']; width?: string; sortable?: boolean; emphasize?: boolean }>; rows: TInput[] },
  mapRow: (row: TInput) => TOutput
): TablePanelData<TOutput> {
  return {
    ...mapPanelMeta(input),
    columns: input.columns.map((column) => mapTableColumn<TOutput>(column)),
    rows: input.rows.map(mapRow)
  }
}

function mapFeedbackSection(input: RawDashboardFixture['service_feedback'] | RawDashboardFixture['channel_feedback']): FeedbackSectionData {
  return {
    variant: input.variant,
    summary: mapDonutPanel(input.summary),
    details: mapTablePanel(input.details, (row) => ({
      id: row.id,
      serviceName: row.service_name,
      averageRating: row.average_rating,
      ratingVisual: row.rating_visual,
      feedbackCount: row.feedback_count
    }))
  }
}

function mapCustomReportState(input: RawDashboardFixture['custom_reporting_analytics']['form']): CustomReportState {
  return {
    reportType: input.report_type,
    layer: input.layer,
    office: input.office,
    dateRange: { from: input.from_date, to: input.to_date },
    exportFormat: input.export_format,
    previewMode: input.preview_mode
  }
}

function mapCustomReportingForm(input: RawDashboardFixture['custom_reporting_analytics']['form']): CustomReportingFormData {
  return {
    ...mapPanelMeta(input),
    state: mapCustomReportState(input),
    reportTypeOptions: input.report_type_options.map((option) => ({ ...option })),
    layerOptions: input.layer_options.map((option) => ({ ...option })),
    officeOptions: input.office_options.map((option) => ({ ...option }))
  }
}

export function normalizeDashboardFixture(input: RawDashboardFixture): DashboardPageData {
  const filters: DashboardFilterState = {
    layer: input.filters.selected_layer,
    office: input.filters.selected_office,
    service: input.filters.selected_service,
    fromDate: input.filters.from_date,
    toDate: input.filters.to_date,
    applied: input.filters.applied
  }

  return {
    filters: {
      state: filters,
      layerOptions: input.filters.layer_options.map((option) => ({ ...option })),
      officeOptions: input.filters.office_options.map((option) => ({ ...option })),
      serviceOptions: input.filters.service_options.map((option) => ({ ...option }))
    },
    systemOverview: {
      title: input.system_overview.title,
      cards: input.system_overview.cards.map(mapMetricCard)
    },
    regionalInsights: {
      density: {
        ...mapPanelMeta(input.regional_insights.density),
        mapAsset: input.regional_insights.density.map_asset,
        legend: input.regional_insights.density.legend.map(mapLegendItem),
        highlightedRegion: {
          name: input.regional_insights.density.highlighted_region.name,
          statusLabel: input.regional_insights.density.highlighted_region.status_label,
          stats: input.regional_insights.density.highlighted_region.stats.map(mapStatItem)
        }
      },
      requestSummary: {
        ...mapDonutPanel(input.regional_insights.request_summary),
        totalRequests: input.regional_insights.request_summary.total_requests,
        totalLabel: input.regional_insights.request_summary.total_label,
        periodLabel: input.regional_insights.request_summary.period_label,
        statuses: input.regional_insights.request_summary.statuses.map(mapStatItem)
      } satisfies RequestSummaryData,
      monthlyRegistrationTrend: mapChartPanel(input.regional_insights.monthly_registration_trend)
    },
    servicePerformance: {
      topServicePopularity: mapChartPanel(input.service_performance.top_service_popularity),
      regionalOfficePerformance: mapChartPanel(input.service_performance.regional_office_performance)
    },
    serviceRequestTimeline: mapChartPanel(input.service_request_timeline),
    paymentInformation: mapTablePanel(input.payment_information, (row): PaymentInformationRow => ({
      serial: row.serial,
      serviceName: row.service_name,
      receivableAmount: row.receivable_amount,
      receivedAmount: row.received_amount
    })),
    reportingAnalytics: {
      demographic: mapDonutPanel(input.reporting_analytics.demographic),
      vulnerability: mapDonutPanel(input.reporting_analytics.vulnerability),
      ageGroups: mapTablePanel(input.reporting_analytics.age_groups, (row) => ({
        serial: row.serial,
        groupedAge: row.grouped_age,
        male: row.male,
        female: row.female,
        common: row.common,
        total: row.total
      })),
      vulnerabilityMatrix: mapTablePanel(input.reporting_analytics.vulnerability_matrix, (row) => ({
        serial: row.serial,
        vulnerability: row.vulnerability,
        male: row.male,
        female: row.female,
        common: row.common,
        grandTotal: row.grand_total
      }))
    },
    serviceFeedback: mapFeedbackSection(input.service_feedback),
    qmsAnalytics: {
      title: input.qms_analytics.title,
      cards: input.qms_analytics.cards.map(mapMetricCard)
    },
    qmsActivityTrend: mapChartPanel(input.qms_activity_trend),
    channelFeedback: mapFeedbackSection(input.channel_feedback),
    customReportingAnalytics: {
      form: mapCustomReportingForm(input.custom_reporting_analytics.form),
      officeEfficiency: {
        ...mapPanelMeta(input.custom_reporting_analytics.office_efficiency),
        generatedAt: input.custom_reporting_analytics.office_efficiency.generated_at,
        chart: mapChartPanel(input.custom_reporting_analytics.office_efficiency.chart),
        table: mapTablePanel(input.custom_reporting_analytics.office_efficiency.table, (row): OfficeEfficiencyRow => ({
          officeName: row.office_name,
          totalTokens: row.total_tokens,
          averageServiceTime: row.average_service_time,
          averageWaitingTime: row.average_waiting_time,
          status: row.status
        }))
      }
    }
  }
}
