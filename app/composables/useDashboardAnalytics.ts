import { computed, ref, watch } from 'vue'
import { dashboardFixture } from '~~/data/dashboard.fixture'
import type { DashboardPageData, DashboardFilterState } from '~~/types'

export function useDashboardAnalytics(filterState?: DashboardFilterState) {
  const isLoading = ref(false)
  const dashboardData = ref<DashboardPageData>({ ...dashboardFixture })

  const triggerRefresh = () => {
    if (import.meta.server) return
    isLoading.value = true
    // Simulate API delay and filtering
    setTimeout(() => {
      dashboardData.value = { 
        ...dashboardFixture,
        systemOverview: {
          ...dashboardFixture.systemOverview,
          title: filterState?.office && filterState.office !== 'all' ? `System Overview: ${filterState?.office}` : 'System Overview'
        }
      }
      isLoading.value = false
    }, 400)
  }

  if (filterState) {
    watch(() => filterState.applied, (newVal) => {
      if (newVal && import.meta.client) {
        triggerRefresh()
        filterState.applied = false
      }
    })
  }

  return {
    dashboardData,
    isLoading
  }
}
