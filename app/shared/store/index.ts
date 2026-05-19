import { createStore } from 'vuex'
import { cityModule } from './modules/city'
import { themeModule } from './modules/theme'
import { uiModule } from './modules/ui'

export function createAppStore() {
  return createStore({
    modules: {
      city: cityModule,
      theme: themeModule,
      ui: uiModule,
    },
  })
}

export type AppStore = ReturnType<typeof createAppStore>
