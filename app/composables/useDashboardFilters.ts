import type { DashboardFilterState } from '~~/types'

function serializeState(state: DashboardFilterState) {
  return JSON.stringify({
    layer: state.layer,
    office: state.office,
    service: state.service,
    fromDate: state.fromDate,
    toDate: state.toDate
  })
}

export function useDashboardFilters(initialState: DashboardFilterState) {
  const defaultState: DashboardFilterState = {
    ...initialState
  }

  const state = reactive<DashboardFilterState>({
    ...initialState
  })

  const isDirty = computed(() => serializeState(state) !== serializeState(defaultState))

  function resetFilters() {
    Object.assign(state, defaultState)
  }

  function applyFilters() {
    state.applied = true
  }

  return {
    state,
    isDirty,
    resetFilters,
    applyFilters
  }
}
