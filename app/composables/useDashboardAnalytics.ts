import { dashboardFixture } from '~~/data/dashboard.fixture'
import type { DashboardPageData } from '~~/types'
import { normalizeDashboardFixture } from '~/utils/dashboard-transformers'

export function useDashboardAnalytics() {
  const dashboardData = computed<DashboardPageData>(() => normalizeDashboardFixture(dashboardFixture))

  return {
    dashboardData
  }
}
