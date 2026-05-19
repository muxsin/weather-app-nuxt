# Theme (Dark / Light Mode)

## How it works

Themes are driven by CSS custom properties on the `<html>` element's `data-theme` attribute.

```
data-theme="light"  →  :root { ... }
data-theme="dark"   →  [data-theme="dark"] { ... }
```

CSS custom properties are defined in `app/assets/styles/_themes.scss`.

## FOUC prevention

`app/plugins/theme.client.ts` runs before first paint (`.client.ts` suffix = client-only). It reads `localStorage.theme`, falls back to `prefers-color-scheme`, and sets `document.documentElement.setAttribute('data-theme', mode)` synchronously before the Vue app mounts.

## State management

The current mode is stored in Vuex (`store.state.theme.mode`). The `useTheme` composable (`shared/composables/useTheme.ts`) keeps Vuex, the DOM attribute, and `localStorage` in sync via a `watch`.

```ts
const { mode, isDark, toggle } = useTheme()
```

Calling `toggle()` dispatches `theme/toggle` to Vuex, which updates the state, which the watcher picks up and applies to the DOM + localStorage.

## Color tokens

All colors are CSS custom properties — never hardcoded values in component styles.

| Token | Light | Dark |
|---|---|---|
| `--color-bg` | `#f0f4ff` | `#0f172a` |
| `--color-card` | `#ffffff` | `#1e293b` |
| `--color-text` | `#1e293b` | `#f1f5f9` |
| `--color-text-muted` | `#64748b` | `#94a3b8` |
| `--color-primary` | `#3b82f6` | `#3b82f6` |
| `--color-border` | `#e2e8f0` | `#2d3f5e` |

Full list in `app/assets/styles/_themes.scss`.

## SCSS variables vs CSS custom properties

- **SCSS variables** (`$space-4`, `$radius-md`, `$font-size-base`) — compile-time, for spacing/sizing/typography. Defined in `_variables.scss`, available globally via `additionalData` in `nuxt.config.ts`.
- **CSS custom properties** (`--color-*`, `--radius-*`, `--transition`) — runtime, theme-switchable. Defined in `_themes.scss`.

Use CSS custom properties for anything that changes between themes. Use SCSS variables for everything else.
