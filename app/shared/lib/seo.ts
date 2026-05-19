import type { City } from '#shared/api/types'

export function buildJsonLd(city: City, locale: string) {
  const base = 'https://weatherapp.example.com'
  const prefix = locale === 'en' ? '' : `/${locale}`

  return {
    webApplication: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'WeatherApp',
      url: base,
      applicationCategory: 'WeatherApplication',
      operatingSystem: 'All',
      description: 'Real-time weather forecast for any city worldwide',
    },
    place: {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: city.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.lat,
        longitude: city.lon,
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${base}${prefix}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: city.name,
          item: `${base}${prefix}`,
        },
      ],
    },
  }
}
