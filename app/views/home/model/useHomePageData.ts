import { computed } from 'vue'
import { useStore } from '#shared/store/useStore'
import { useWeather } from '#shared/composables/useWeather'
import { weatherCodeToAnimation } from '#shared/lib/weatherCode'

export function useHomePageData() {
  const store = useStore()
  const city = computed(() => store.state.city.current)

  const { current, hourly, daily, pending, error } = useWeather(city)

  const animationKind = computed(() =>
    current.value ? weatherCodeToAnimation(current.value.weather_code) : 'sun'
  )

  return { city, current, hourly, daily, pending, error, animationKind }
}
