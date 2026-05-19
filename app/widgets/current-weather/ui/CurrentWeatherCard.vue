<template>
  <div class="current-weather">
    <div class="current-weather__label">{{ t('common.today') }}</div>
    <div class="current-weather__temp">{{ formatTemp(current.temperature_2m) }}</div>
    <div class="current-weather__description">
      {{ t(`weather.description.${current.weather_code}`, t('weather.description.0')) }}
    </div>
    <div class="current-weather__meta">
      <span class="current-weather__time">{{ currentTime }}</span>
      <span class="current-weather__city">{{ cityName }}</span>
    </div>
    <div class="current-weather__emoji" aria-hidden="true">
      {{ weatherCodeToEmoji(current.weather_code) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatTemp, formatTime } from '#shared/lib/format'
import { weatherCodeToEmoji } from '#shared/lib/weatherCode'
import type { CurrentWeather } from '#shared/api/types'

interface Props {
  current: CurrentWeather
  cityName: string
  currentTimeIso?: string
}

const props = defineProps<Props>()
const { t, locale } = useI18n()

const currentTime = computed(() => {
  const iso = props.currentTimeIso ?? new Date().toISOString()
  return formatTime(iso, locale.value)
})
</script>

<style lang="scss" scoped>
.current-weather {
  @include card;
  padding: $space-8;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: $space-2;
  min-height: 260px;
  z-index: $z-card;

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__temp {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    color: var(--color-text);
    line-height: 1;
    letter-spacing: -0.03em;
  }

  &__description {
    font-size: $font-size-lg;
    color: var(--color-text-muted);
    font-weight: $font-weight-medium;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: auto;
  }

  &__time {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: var(--color-text);
  }

  &__city {
    font-size: $font-size-base;
    color: var(--color-text-muted);
    font-weight: $font-weight-medium;
  }

  &__emoji {
    position: absolute;
    bottom: $space-6;
    right: $space-8;
    font-size: 80px;
    opacity: 0.3;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }
}
</style>
