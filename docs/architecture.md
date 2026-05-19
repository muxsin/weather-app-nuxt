# Architecture — FSD for Nuxt 4

## Layer overview

```
app/                          # Nuxt 4 srcDir
├── pages/                    # Layer 1: Routing (thin, one view per page)
├── layouts/                  # Nuxt layouts (default.vue: header + slot + modal)
├── views/                    # Layer 2: Page compositions (no logic, assembles widgets)
├── widgets/                  # Layer 3: Self-contained UI blocks (own state + API calls)
├── features/                 # Layer 4: Reusable user actions (theme toggle, lang switch, city search)
└── shared/                   # Layer 5: Cross-cutting code (api, store, composables, ui, lib, config)
```

## Dependency rule

Each layer may only import from layers **below** it:
- `pages` → `views`
- `views` → `widgets`, `features`, `shared`
- `widgets` → `features`, `shared`
- `features` → `shared`
- `shared` → nothing (only external packages)

**Aliases** (defined in `nuxt.config.ts`):
- `#shared` → `app/shared/`
- `#widgets` → `app/widgets/`
- `#features` → `app/features/`
- `#views` → `app/views/`

Auto-imports are **disabled** for FSD layers. Import explicitly:
```ts
import CurrentWeatherCard from '#widgets/current-weather/ui/CurrentWeatherCard.vue'
import { useWeather } from '#shared/composables/useWeather'
```

Exception: `shared/ui/` atoms (`UiButton`, `UiSpinner`, etc.) are globally registered via `nuxt.config.ts components` so they work in templates without importing.

## Naming

| What | Convention |
|---|---|
| Files / Folders | kebab-case |
| Components | PascalCase |
| Composables | camelCase + `use` prefix |
| Constants | UPPER_SNAKE_CASE |
| Types / Interfaces | PascalCase |

## Adding a new page

1. Create route at `app/pages/<name>.vue` — import one view, nothing else.
2. Create view at `app/views/<name>/ui/<Name>View.vue` — assembles widgets.
3. Create any new widgets in `app/widgets/<name>/ui/`.
4. Add i18n keys to all three locale files (`app/locales/`).
5. Add SEO metadata via `useSeo()` in the view.
6. Sitemap auto-updates only if you add the route to `server/routes/sitemap.xml.ts`.
