<template>
  <div class="day-card">
    <span class="day-card__day">{{ formattedDay }}</span>
    <span class="day-card__date">{{ formattedDate }}</span>
    <span class="day-card__icon" aria-hidden="true">{{ icon }}</span>
    <span class="day-card__desc">
      {{ t(`weather.description.${weatherCode}`, t('weather.description.0')) }}
    </span>
    <div class="day-card__temps">
      <span class="day-card__hi">{{ formatTemp(tempMax) }}</span>
      <span class="day-card__sep">/</span>
      <span class="day-card__lo">{{ formatTemp(tempMin) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatTemp, formatDate, formatDayName } from '#shared/lib/format'
import { weatherCodeToEmoji } from '#shared/lib/weatherCode'

interface Props {
  dateIso: string
  weatherCode: number
  tempMax: number
  tempMin: number
  isToday?: boolean
}

const props = defineProps<Props>()
const { t, locale } = useI18n()

const icon = computed(() => weatherCodeToEmoji(props.weatherCode))
const formattedDay = computed(() => {
  if (props.isToday) return t('common.today')
  return formatDayName(props.dateIso, locale.value)
})
const formattedDate = computed(() => formatDate(props.dateIso, locale.value))
</script>

<style lang="scss" scoped>
.day-card {
  @include card;
  padding: $space-4 $space-3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-1;
  text-align: center;
  transition: background var(--transition), transform var(--transition);

  &:hover {
    background: var(--color-card-hover);
    transform: translateY(-2px);
  }

  &__day {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: var(--color-text);
    text-transform: capitalize;
  }

  &__date {
    font-size: $font-size-xs;
    color: var(--color-text-muted);
  }

  &__icon {
    font-size: 32px;
    line-height: 1;
    margin: $space-2 0;
  }

  &__desc {
    font-size: $font-size-xs;
    color: var(--color-text-muted);
    line-height: 1.3;
    @include truncate;
    width: 100%;
  }

  &__temps {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: $space-1;
  }

  &__hi {
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: var(--color-text);
  }

  &__sep {
    color: var(--color-text-muted);
    font-size: $font-size-xs;
  }

  &__lo {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
  }
}
</style>
