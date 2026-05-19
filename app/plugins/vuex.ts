import { defineNuxtPlugin } from '#app'
import { createAppStore } from '#shared/store/index'

export default defineNuxtPlugin((nuxtApp) => {
  const store = createAppStore()
  nuxtApp.vueApp.use(store)
  return {
    provide: {
      store,
    },
  }
})
