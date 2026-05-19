export interface City {
  name: string
  country: string
  lat: number
  lon: number
  timezone: string
  key: string
}

export interface CurrentWeather {
  temperature_2m: number
  apparent_temperature: number
  relative_humidity_2m: number
  is_day: number
  precipitation: number
  weather_code: number
  cloud_cover: number
  pressure_msl: number
  wind_speed_10m: number
  wind_direction_10m: number
  wind_gusts_10m: number
}

export interface HourlyWeather {
  time: string[]
  temperature_2m: number[]
  weather_code: number[]
  precipitation_probability: number[]
  wind_speed_10m: number[]
}

export interface DailyWeather {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  sunrise: string[]
  sunset: string[]
  precipitation_sum: number[]
  wind_speed_10m_max: number[]
}

export interface WeatherResponse {
  latitude: number
  longitude: number
  timezone: string
  current: CurrentWeather
  hourly: HourlyWeather
  daily: DailyWeather
}

export interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  country_code: string
  timezone: string
  admin1?: string
}

export interface GeocodingResponse {
  results?: GeocodingResult[]
}
