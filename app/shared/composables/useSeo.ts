import { useHead, useSeoMeta } from '#app'
import { buildJsonLd } from '#shared/lib/seo'
import type { City } from '#shared/api/types'

export function useSeo(
  title: string,
  description: string,
  keywords: string[],
  city: City,
  locale: string
) {
  const keywordsStr = Array.isArray(keywords) ? keywords.join(', ') : String(keywords)

  useSeoMeta({
    title,
    description,
    keywords: keywordsStr,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
  })

  const jsonLd = buildJsonLd(city, locale)
  useHead({
    script: [
      { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd.webApplication) },
      { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd.place) },
      { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd.breadcrumb) },
    ],
  })
}
