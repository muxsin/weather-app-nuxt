import type { City } from '#shared/api/types'
import { DEFAULT_CITY } from '#shared/config/constants'

export interface CityState {
  current: City
  recent: City[]
}

export const cityModule = {
  namespaced: true,

  state: (): CityState => ({
    current: { ...DEFAULT_CITY },
    recent: [],
  }),

  mutations: {
    SET_CURRENT(state: CityState, city: City) {
      state.current = city
    },
    PUSH_RECENT(state: CityState, city: City) {
      // Remove if already exists
      state.recent = state.recent.filter(c => c.key !== city.key || c.name !== city.name)
      // Add to front and keep max 5
      state.recent.unshift(city)
      if (state.recent.length > 5) {
        state.recent = state.recent.slice(0, 5)
      }
    },
  },

  actions: {
    selectCity({ commit }: { commit: Function }, city: City) {
      commit('SET_CURRENT', city)
      commit('PUSH_RECENT', city)
    },
  },
}
