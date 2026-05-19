import { useAsyncData } from '#app'
import { computed } from 'vue'
import { fetchWeather } from '#shared/api/openMeteo'
import type { City } from '#shared/api/types'

export function useWeather(city: { value: City } | (() => City)) {
  const cityRef = typeof city === 'function' ? { value: city() } : city

  const key = computed(() => `weather-${cityRef.value.lat}-${cityRef.value.lon}`)

  const { data, pending, error, refresh } = useAsyncData(
    key.value,
    () => fetchWeather(cityRef.value.lat, cityRef.value.lon),
    { watch: [key] }
  )

  const current = computed(() => data.value?.current ?? null)
  const hourly = computed(() => data.value?.hourly ?? null)
  const daily = computed(() => data.value?.daily ?? null)

  return {
    data,
    current,
    hourly,
    daily,
    pending,
    error,
    refresh,
  }
}
