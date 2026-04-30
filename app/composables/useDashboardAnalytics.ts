type DashboardPageData = Record<string, unknown>

export function useDashboardAnalytics(initialData: DashboardPageData = {}) {
  const dashboardData = computed<DashboardPageData>(() => initialData)

  return {
    dashboardData
  }
}
