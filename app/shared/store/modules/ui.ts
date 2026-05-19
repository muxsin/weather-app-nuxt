export interface UiState {
  cityModalOpen: boolean
}

export const uiModule = {
  namespaced: true,

  state: (): UiState => ({
    cityModalOpen: false,
  }),

  mutations: {
    SET_CITY_MODAL_OPEN(state: UiState, open: boolean) {
      state.cityModalOpen = open
    },
  },

  actions: {
    openCityModal({ commit }: { commit: Function }) {
      commit('SET_CITY_MODAL_OPEN', true)
    },
    closeCityModal({ commit }: { commit: Function }) {
      commit('SET_CITY_MODAL_OPEN', false)
    },
  },
}
