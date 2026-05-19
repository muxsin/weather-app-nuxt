export interface ThemeState {
  mode: 'light' | 'dark'
}

export const themeModule = {
  namespaced: true,

  state: (): ThemeState => ({
    mode: 'light',
  }),

  mutations: {
    SET_MODE(state: ThemeState, mode: 'light' | 'dark') {
      state.mode = mode
    },
  },

  actions: {
    toggle({ commit, state }: { commit: Function; state: ThemeState }) {
      const next = state.mode === 'light' ? 'dark' : 'light'
      commit('SET_MODE', next)
    },
    setMode({ commit }: { commit: Function }, mode: 'light' | 'dark') {
      commit('SET_MODE', mode)
    },
  },
}
