# Weather Animations

Apple Weather-style full-screen background animations driven by the current WMO weather code.

## Architecture

`WeatherAnimation.vue` (in `app/widgets/weather-animation/`) receives a `kind` prop and renders the matching effect component. Wrapped in `<ClientOnly>` in `app/app.vue` — zero SSR cost.

```
app/widgets/weather-animation/ui/
├── WeatherAnimation.vue      ← dispatcher (fixed overlay, pointer-events: none, z-index: 0)
└── effects/
    ├── RainEffect.vue
    ├── SnowEffect.vue
    ├── SunEffect.vue
    ├── CloudsEffect.vue
    ├── WindEffect.vue
    └── ThunderEffect.vue
```

## Weather code → animation kind

Mapping in `app/shared/lib/weatherCode.ts:weatherCodeToAnimation`.

| Codes | Kind |
|---|---|
| 0, 1 | `sun` |
| 2, 3, 45, 48 | `clouds` |
| 51–65, 80–82 | `rain` |
| 71–77, 85–86 | `snow` |
| 95–99 | `thunder` |

## Particle counts

| Effect | Particles | Element type |
|---|---|---|
| Rain | 80 drops | `<div>` spans |
| Snow | 50 flakes | `<div>` with ❄ character |
| Sun | 1 disc + 12 rays | `<div>` elements |
| Clouds | 4 SVG layers | inline SVG |
| Wind | 8 streaks | `<div>` elements |
| Thunder | 1 overlay + 1 bolt | `<div>` + SVG |

## Performance rules

- **Only animate `transform` and `opacity`** — both are GPU-composited.
- `will-change: transform` on particle containers.
- `contain: strict` on the FX layer element.
- `pointer-events: none` always — animations never intercept clicks.
- `@media (prefers-reduced-motion: reduce)` disables all animations.
- Wrapped in `<ClientOnly>` — no SSR rendering.

## SCSS keyframes

Each effect has its own SCSS file in `app/assets/styles/animations/`. Keyframes animate only `transform` and `opacity`. Per-particle variation (position, duration, delay) is applied via inline `:style` bindings in the Vue component — not in SCSS.

Example pattern:
```vue
<div v-for="n in 80" :key="n" class="rain__drop" :style="dropStyle(n)" />

<script setup>
function dropStyle(n) {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${0.6 + Math.random() * 0.6}s`,
  }
}
</script>
```

## Adding a new animation

1. Create `app/widgets/weather-animation/ui/effects/FogEffect.vue`.
2. Add corresponding keyframes to `app/assets/styles/animations/_fog.scss`.
3. Import `_fog.scss` in `app/assets/styles/main.scss`.
4. Add `fog` to `AnimationKind` in `app/shared/lib/weatherCode.ts`.
5. Map the relevant WMO codes to `'fog'` in `weatherCodeToAnimation`.
6. Add `<FogEffect v-else-if="kind === 'fog'" />` in `WeatherAnimation.vue`.
