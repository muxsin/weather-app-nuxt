# Translations (i18n)

Module: `@nuxtjs/i18n` v9. Strategy: `prefix_except_default`. Default locale: `en`.

URLs: `/` (English), `/ru` (Russian), `/uz` (Uzbek).

## Locale files

`app/locales/en.json`, `ru.json`, `uz.json`

Key namespaces:

| Namespace | Contents |
|---|---|
| `common` | Shared UI labels (today, hourly, weekly, search…) |
| `weather.details` | Detail row labels (temperature, pressure, wind…) |
| `weather.description` | WMO code → text (e.g. `"0": "Clear sky"`) |
| `weather.units` | Unit suffixes (mmHg, m/s, mm, %) |
| `compass` | Cardinal directions (N, NE, E…) |
| `theme` | Theme mode labels |
| `cities` | City name translations |
| `modal.cityPicker` | City picker modal labels |
| `seo.home` | Per-page SEO copy (title, description, keywords) |
| `time` | Time labels (now) |

## Using translations

**In components (client + server):**
```ts
const { t, tm } = useI18n()
t('common.today')               // string
tm('seo.home.keywords')         // array (use tm for non-string values)
```

**Switching locale:**
```ts
const { $i18n } = useNuxtApp()
await $i18n.setLocale('ru')     // switches locale + reloads messages
```

## Adding a new key

1. Add key to `app/locales/en.json`.
2. Add the same key with translated value to `ru.json` and `uz.json`.
3. Use `t('your.key')` in components.

A missing key in any locale will emit a `[intlify] Not found` warning in dev. Keep all three files in sync.

## Adding a new locale

1. Create `app/locales/<code>.json` with all keys.
2. Add to `nuxt.config.ts` `i18n.locales` array with `code`, `language`, `file`, `name`.
3. Sitemap auto-includes it if you add it to the `locales` array in `server/routes/sitemap.xml.ts`.
