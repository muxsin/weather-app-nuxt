import type { GeocodingResponse } from './types'

const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search'

export async function searchCities(name: string, locale: string = 'en'): Promise<GeocodingResponse> {
  const params = new URLSearchParams({
    name,
    count: '10',
    language: locale,
    format: 'json',
  })

  const response = await $fetch<GeocodingResponse>(`${BASE_URL}?${params}`)
  return response
}
