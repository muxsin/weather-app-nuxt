import { ref, watch } from 'vue'
import { useGeocoding } from '#shared/composables/useGeocoding'
import type { GeocodingResult } from '#shared/api/types'
import type { City } from '#shared/api/types'

export function useCitySearch(locale: string) {
  const query = ref('')
  const { results, pending, error, search, clear } = useGeocoding()

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  watch(query, (val) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    if (!val.trim()) {
      clear()
      return
    }
    debounceTimer = setTimeout(() => {
      search(val, locale)
    }, 300)
  })

  function geocodingResultToCity(result: GeocodingResult): City {
    const nameParts = [result.admin1, result.country].filter(Boolean)
    return {
      name: result.name,
      country: result.country,
      lat: result.latitude,
      lon: result.longitude,
      timezone: result.timezone ?? 'UTC',
      key: result.name.toLowerCase().replace(/\s+/g, '_'),
    }
  }

  function reset() {
    query.value = ''
    clear()
  }

  return {
    query,
    results,
    pending,
    error,
    geocodingResultToCity,
    reset,
  }
}
