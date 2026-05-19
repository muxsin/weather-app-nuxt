<template>
  <div class="weather-details">
    <!-- subtle world map silhouette -->
    <div class="weather-details__map" aria-hidden="true" />

    <div class="weather-details__content">
      <DetailRow
        :label="t('weather.details.temperature')"
        :value="`${formatTemp(current.temperature_2m)} / ${t('weather.details.feelsLike')}: ${formatTemp(current.apparent_temperature)}`"
      />
      <DetailRow
        :label="t('weather.details.pressure')"
        :value="`${hpaToMmHg(current.pressure_msl)} ${t('weather.units.mmHg', t('weather.units.mmHg'))}`"
      />
      <DetailRow
        :label="t('weather.details.precipitation')"
        :value="current.precipitation > 0
          ? `${current.precipitation} ${t('weather.units.mm')}`
          : t('weather.noPrecipitation')"
      />
      <DetailRow
        :label="t('weather.details.humidity')"
        :value="`${current.relative_humidity_2m}${t('weather.units.percent')}`"
      />
      <DetailRow
        :label="t('weather.details.wind')"
        :value="`${t(`compass.${windDir}`)} · ${current.wind_speed_10m} ${t('weather.units.ms')}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DetailRow from './DetailRow.vue'
import { hpaToMmHg, formatTemp, degreesToCompass } from '#shared/lib/format'
import type { CurrentWeather } from '#shared/api/types'

interface Props {
  current: CurrentWeather
}

const props = defineProps<Props>()
const { t } = useI18n()

const windDir = computed(() => degreesToCompass(props.current.wind_direction_10m))
</script>

<style lang="scss" scoped>
.weather-details {
  @include card;
  padding: $space-6;
  position: relative;
  overflow: hidden;
  z-index: $z-card;

  &__map {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cpath fill='%236b7280' fill-opacity='0.08' d='M150 100 C 160 80 200 75 220 100 L 240 110 260 90 300 95 310 120 280 140 250 130 220 140 190 130 160 140 140 120 Z M350 80 C 370 60 420 65 450 80 L 480 75 510 90 530 110 520 140 490 150 460 140 430 155 400 140 370 130 340 120 330 100 Z M550 90 C 570 75 610 80 640 95 L 660 100 680 120 670 145 640 150 610 140 580 150 555 135 540 115 Z M100 200 C 120 185 160 190 180 205 L 200 200 220 215 215 240 190 250 165 245 140 250 115 235 100 220 Z M250 195 C 275 175 320 180 350 200 L 375 195 400 210 395 240 365 255 335 248 305 255 275 240 255 220 Z'/%3E%3C/svg%3E");
    background-size: cover;
    background-position: center;
    pointer-events: none;
    opacity: 0.6;
  }

  &__content {
    position: relative;
    z-index: 1;
  }
}
</style>
