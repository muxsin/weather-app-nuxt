<template>
  <section class="hourly-forecast">
    <h2 class="hourly-forecast__title">{{ t('common.hourly') }}</h2>
    <div class="hourly-forecast__scroll">
      <HourCell
        v-for="(item, i) in hourlyItems"
        :key="item.timeIso"
        :time-iso="item.timeIso"
        :temp="item.temp"
        :weather-code="item.weatherCode"
        :precip-prob="item.precipProb"
        :is-now="i === 0"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HourCell from './HourCell.vue'
import type { HourlyWeather } from '#shared/api/types'

interface Props {
  hourly: HourlyWeather
}

const props = defineProps<Props>()
const { t } = useI18n()

// Show first 24 hours
const hourlyItems = computed(() =>
  props.hourly.time.slice(0, 24).map((timeIso, i) => ({
    timeIso,
    temp: props.hourly.temperature_2m[i],
    weatherCode: props.hourly.weather_code[i],
    precipProb: props.hourly.precipitation_probability[i] ?? 0,
  }))
)
</script>

<style lang="scss" scoped>
.hourly-forecast {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: var(--color-text);
  }

  &__scroll {
    display: flex;
    gap: $space-3;
    overflow-x: auto;
    padding-bottom: $space-2;
    scrollbar-width: thin;
    scrollbar-color: var(--color-border) transparent;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 2px;
    }
  }
}
</style>
