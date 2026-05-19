<template>
  <section class="weekly-forecast">
    <h2 class="weekly-forecast__title">{{ t('common.weekly') }}</h2>
    <div class="weekly-forecast__grid">
      <DayCard
        v-for="(day, i) in days"
        :key="day.dateIso"
        :date-iso="day.dateIso"
        :weather-code="day.weatherCode"
        :temp-max="day.tempMax"
        :temp-min="day.tempMin"
        :is-today="i === 0"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DayCard from './DayCard.vue'
import type { DailyWeather } from '#shared/api/types'

interface Props {
  daily: DailyWeather
}

const props = defineProps<Props>()
const { t } = useI18n()

const days = computed(() =>
  props.daily.time.slice(0, 7).map((dateIso, i) => ({
    dateIso,
    weatherCode: props.daily.weather_code[i],
    tempMax: props.daily.temperature_2m_max[i],
    tempMin: props.daily.temperature_2m_min[i],
  }))
)
</script>

<style lang="scss" scoped>
.weekly-forecast {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: var(--color-text);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: $space-3;

    @include max-md {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
