# Weather API — Open-Meteo

No API key required. Free tier, no rate limits for normal usage.

## Endpoints

### Forecast
`GET https://api.open-meteo.com/v1/forecast`

| Param | Value |
|---|---|
| `latitude`, `longitude` | City coordinates |
| `timezone` | `auto` |
| `forecast_days` | `7` |
| `wind_speed_unit` | `ms` (m/s) |
| `temperature_unit` | `celsius` |
| `current` | temperature_2m, apparent_temperature, relative_humidity_2m, is_day, precipitation, weather_code, cloud_cover, pressure_msl, wind_speed_10m, wind_direction_10m, wind_gusts_10m |
| `hourly` | temperature_2m, weather_code, precipitation_probability, wind_speed_10m |
| `daily` | weather_code, temperature_2m_max, temperature_2m_min, sunrise, sunset, precipitation_sum, wind_speed_10m_max |

### Geocoding (city search)
`GET https://geocoding-api.open-meteo.com/v1/search`

| Param | Value |
|---|---|
| `name` | Search query |
| `count` | `10` |
| `language` | Current locale code |

## Unit conversions (view layer only — never store converted values)

- **Pressure**: hPa → mmHg: `Math.round(hpa * 0.750062)` — `shared/lib/format.ts:hpaToMmHg`
- **Wind direction**: degrees → compass — `shared/lib/format.ts:degreesToCompass`
- **Temperature**: `Math.round(celsius)°`

## WMO weather codes → animation kind

| Codes | Condition | Animation |
|---|---|---|
| 0, 1 | Clear sky | `sun` |
| 2, 3, 45, 48 | Cloudy / fog | `clouds` |
| 51–65, 80–82 | Rain / drizzle / showers | `rain` |
| 71–77, 85–86 | Snow | `snow` |
| 95–99 | Thunderstorm | `thunder` |

Full mapping in `app/shared/lib/weatherCode.ts`.

## State management

Weather data lives in `useAsyncData('weather-${lat}-${lon}')` — not Vuex. Vuex holds only the selected `City` object. `useWeather` watches the city ref and re-fetches on city change. Default city: Tashkent (`app/shared/config/constants.ts`).
