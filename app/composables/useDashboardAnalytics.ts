import { dashboardFixture } from '~~/data/dashboard.fixture'
import type { DashboardPageData } from '~~/types'

export function useDashboardAnalytics() {
  const dashboardData = computed<DashboardPageData>(() => dashboardFixture)

  return {
    dashboardData
  }
}
