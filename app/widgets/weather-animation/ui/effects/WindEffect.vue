<template>
  <div class="wind-layer" aria-hidden="true">
    <div
      v-for="n in 8"
      :key="n"
      class="wind__streak"
      :style="streakStyle(n)"
    />
  </div>
</template>

<script setup lang="ts">
const streakConfigs = [
  { top: 15, width: 180, opacity: 0.5, delay: 0, duration: 2.5 },
  { top: 28, width: 240, opacity: 0.4, delay: 0.8, duration: 3.2 },
  { top: 42, width: 160, opacity: 0.6, delay: 0.3, duration: 2.8 },
  { top: 55, width: 300, opacity: 0.35, delay: 1.2, duration: 3.8 },
  { top: 65, width: 200, opacity: 0.5, delay: 0.5, duration: 2.4 },
  { top: 75, width: 140, opacity: 0.45, delay: 1.8, duration: 3.0 },
  { top: 82, width: 280, opacity: 0.3, delay: 0.9, duration: 4.0 },
  { top: 90, width: 220, opacity: 0.4, delay: 0.2, duration: 2.9 },
]

function streakStyle(n: number) {
  const cfg = streakConfigs[n - 1]
  return {
    top: `${cfg.top}%`,
    width: `${cfg.width}px`,
    opacity: String(cfg.opacity),
    animationDelay: `${cfg.delay}s`,
    animationDuration: `${cfg.duration}s`,
  }
}
</script>
