<template>
  <div class="hour-cell" :class="{ 'hour-cell--now': isNow }">
    <span class="hour-cell__time">{{ isNow ? t('time.now') : formattedTime }}</span>
    <span class="hour-cell__icon" aria-hidden="true">{{ icon }}</span>
    <span class="hour-cell__temp">{{ formatTemp(temp) }}</span>
    <span v-if="precipProb > 0" class="hour-cell__precip">{{ precipProb }}%</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatTemp, formatTime } from '#shared/lib/format'
import { weatherCodeToEmoji } from '#shared/lib/weatherCode'

interface Props {
  timeIso: string
  temp: number
  weatherCode: number
  precipProb: number
  isNow?: boolean
}

const props = defineProps<Props>()
const { t, locale } = useI18n()

const icon = computed(() => weatherCodeToEmoji(props.weatherCode))
const formattedTime = computed(() => formatTime(props.timeIso, locale.value))
</script>

<style lang="scss" scoped>
.hour-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-1;
  padding: $space-3 $space-4;
  border-radius: $radius-md;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  min-width: 72px;
  flex-shrink: 0;
  transition: background var(--transition);

  &:hover {
    background: var(--color-card-hover);
  }

  &--now {
    border-color: var(--color-primary);
    background: color-mix(in srgb, var(--color-primary) 8%, var(--color-card));
  }

  &__time {
    font-size: $font-size-xs;
    color: var(--color-text-muted);
    font-weight: $font-weight-medium;
    white-space: nowrap;
  }

  &__icon {
    font-size: $font-size-xl;
    line-height: 1;
  }

  &__temp {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: var(--color-text);
  }

  &__precip {
    font-size: $font-size-xs;
    color: #60a5fa;
    font-weight: $font-weight-medium;
  }
}
</style>
