# SEO

SEO is locale-aware and centralized. Pages call `useSeo()` and `useHead()` — no hardcoded strings.

## Files

| File | Purpose |
|---|---|
| `app/shared/composables/useSeo.ts` | Calls `useSeoMeta()` for title/description/OG/Twitter |
| `app/shared/lib/seo.ts` | `buildJsonLd(city, locale)` → WebApplication + Place + BreadcrumbList schemas |
| `app/views/home/ui/HomePage.vue` | Calls `useSeo()` + injects JSON-LD via `useHead()` |
| `app/locales/{en,ru,uz}.json` | SEO copy under `seo.home.{title,description,keywords}` |
| `server/routes/sitemap.xml.ts` | Generates `/sitemap.xml` with hreflang alternates |
| `public/robots.txt` | Crawl rules + Sitemap reference |

## Per-page SEO

```ts
// In any view component
const { t, tm } = useI18n()
useSeo(t('seo.home.title'), t('seo.home.description'), tm('seo.home.keywords') as string[], city, locale)
```

`useSeo` sets: `title`, `description`, `keywords`, `ogTitle`, `ogDescription`, `ogType`, `ogImage`, `twitterCard`.

## JSON-LD

Three schemas injected per page:
- `WebApplication` — site-level (name, url, category)
- `Place` — current city with `GeoCoordinates`
- `BreadcrumbList` — Home → City

```ts
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }] })
```

## hreflang

`@nuxtjs/i18n` with `prefix_except_default` strategy emits canonical + alternate links automatically. No manual hreflang management needed.

URLs: `/` (en), `/ru` (ru), `/uz` (uz).

## Sitemap

`server/routes/sitemap.xml.ts` — hand-rolled, ~35 lines. Generates 3 URLs with per-locale `xhtml:link` alternates. Add new pages by extending the `pages` array in that file.

## Adding SEO for a new page

1. Add `seo.<pageName>.{title,description,keywords}` to all three locale files.
2. Call `useSeo(...)` in the page view.
3. Add `useHead({ script: [JSON-LD] })` if needed.
4. Add route to `server/routes/sitemap.xml.ts`.

## Rules

- Never hardcode titles or descriptions in components.
- Keep `seo.*` keys in sync across all three locale files.
- `ogImage` points to `/og-image.png` — replace with a real image before production.
- Update `DOMAIN` constant in `server/routes/sitemap.xml.ts` before deploying.
