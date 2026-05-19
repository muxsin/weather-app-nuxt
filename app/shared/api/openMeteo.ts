import type { WeatherResponse } from './types'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export async function fetchWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'is_day',
      'precipitation',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'weather_code',
      'precipitation_probability',
      'wind_speed_10m',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'precipitation_sum',
      'wind_speed_10m_max',
    ].join(','),
    forecast_days: '7',
    wind_speed_unit: 'ms',
    temperature_unit: 'celsius',
    timezone: 'auto',
  })

  const response = await $fetch<WeatherResponse>(`${BASE_URL}?${params}`)
  return response
}
