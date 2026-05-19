import type { City } from '#shared/api/types'

export const COMMON_CITIES: City[] = [
  { name: 'Tashkent', country: 'Uzbekistan', lat: 41.2995, lon: 69.2401, timezone: 'Asia/Tashkent', key: 'tashkent' },
  { name: 'Samarkand', country: 'Uzbekistan', lat: 39.6542, lon: 66.9597, timezone: 'Asia/Samarkand', key: 'samarkand' },
  { name: 'Bukhara', country: 'Uzbekistan', lat: 39.7681, lon: 64.4556, timezone: 'Asia/Samarkand', key: 'bukhara' },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6176, timezone: 'Europe/Moscow', key: 'moscow' },
  { name: 'Almaty', country: 'Kazakhstan', lat: 43.2567, lon: 76.9286, timezone: 'Asia/Almaty', key: 'almaty' },
  { name: 'Bishkek', country: 'Kyrgyzstan', lat: 42.8740, lon: 74.5698, timezone: 'Asia/Bishkek', key: 'bishkek' },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784, timezone: 'Europe/Istanbul', key: 'istanbul' },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708, timezone: 'Asia/Dubai', key: 'dubai' },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London', key: 'london' },
  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, timezone: 'America/New_York', key: 'newYork' },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo', key: 'tokyo' },
  { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074, timezone: 'Asia/Shanghai', key: 'beijing' },
]
