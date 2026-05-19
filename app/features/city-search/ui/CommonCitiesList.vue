<template>
  <div class="common-cities">
    <h3 class="common-cities__title">{{ t('modal.cityPicker.commonCities') }}</h3>
    <ul class="common-cities__list">
      <li
        v-for="city in COMMON_CITIES"
        :key="city.key"
        class="common-cities__item"
        :class="{ 'common-cities__item--active': city.key === currentCityKey }"
        tabindex="0"
        @click="$emit('select', city)"
        @keydown.enter="$emit('select', city)"
      >
        <span class="common-cities__name">{{ t(`cities.${city.key}`) }}</span>
        <span class="common-cities__country">{{ city.country }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { COMMON_CITIES } from '#shared/config/cities'
import type { City } from '#shared/api/types'

interface Props {
  currentCityKey?: string
}

defineProps<Props>()

defineEmits<{
  select: [city: City]
}>()

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.common-cities {
  display: flex;
  flex-direction: column;
  gap: $space-3;

  &__title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-3 $space-2;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: background var(--transition);
    border-bottom: 1px solid var(--color-border);

    &:last-child {
      border-bottom: none;
    }

    &:hover,
    &:focus {
      background: var(--color-bg-secondary);
      outline: none;
    }

    &--active {
      background: var(--color-bg-secondary);

      .common-cities__name {
        color: var(--color-primary);
        font-weight: $font-weight-semibold;
      }
    }
  }

  &__name {
    font-weight: $font-weight-medium;
    color: var(--color-text);
    font-size: $font-size-sm;
  }

  &__country {
    font-size: $font-size-xs;
    color: var(--color-text-muted);
  }
}
</style>
