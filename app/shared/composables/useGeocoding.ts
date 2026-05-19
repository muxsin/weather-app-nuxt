import { ref } from 'vue'
import { searchCities } from '#shared/api/geocoding'
import type { GeocodingResult } from '#shared/api/types'

export function useGeocoding() {
  const results = ref<GeocodingResult[]>([])
  const pending = ref(false)
  const error = ref<Error | null>(null)

  async function search(query: string, locale: string = 'en') {
    if (!query.trim()) {
      results.value = []
      return
    }
    pending.value = true
    error.value = null
    try {
      const response = await searchCities(query, locale)
      results.value = response.results ?? []
    } catch (e) {
      error.value = e as Error
      results.value = []
    } finally {
      pending.value = false
    }
  }

  function clear() {
    results.value = []
  }

  return { results, pending, error, search, clear }
}
