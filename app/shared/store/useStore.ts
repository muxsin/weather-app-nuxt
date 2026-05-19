import { useNuxtApp } from '#app'
import type { AppStore } from './index'

export function useStore(): AppStore {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$store as AppStore
}
