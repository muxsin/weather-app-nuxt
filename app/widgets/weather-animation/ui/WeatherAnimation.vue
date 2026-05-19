<template>
  <div class="weather-animation" aria-hidden="true">
    <RainEffect v-if="kind === 'rain'" />
    <SnowEffect v-else-if="kind === 'snow'" />
    <SunEffect v-else-if="kind === 'sun'" />
    <CloudsEffect v-else-if="kind === 'clouds'" />
    <ThunderEffect v-else-if="kind === 'thunder'" />
  </div>
</template>

<script setup lang="ts">
import RainEffect from './effects/RainEffect.vue'
import SnowEffect from './effects/SnowEffect.vue'
import SunEffect from './effects/SunEffect.vue'
import CloudsEffect from './effects/CloudsEffect.vue'
import ThunderEffect from './effects/ThunderEffect.vue'
import type { AnimationKind } from '#shared/lib/weatherCode'

interface Props {
  kind: AnimationKind
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.weather-animation {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: $z-animation;
  overflow: hidden;
}
</style>
