<template>
  <div class="city-search">
    <UiInput
      v-model="query"
      :placeholder="t('common.search')"
      class="city-search__input"
    >
      <template #prefix>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" />
          <path d="M11 11l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </template>
    </UiInput>

    <div v-if="pending" class="city-search__state">
      <UiSpinner size="sm" />
    </div>

    <ul v-else-if="results.length > 0" class="city-search__results" role="listbox">
      <li
        v-for="result in results"
        :key="result.id"
        class="city-search__result"
        role="option"
        tabindex="0"
        @click="selectResult(result)"
        @keydown.enter="selectResult(result)"
      >
        <span class="city-search__result-name">{{ result.name }}</span>
        <span class="city-search__result-sub">
          {{ [result.admin1, result.country].filter(Boolean).join(', ') }}
        </span>
      </li>
    </ul>

    <div v-else-if="query && !pending" class="city-search__state city-search__state--empty">
      {{ t('common.noResults') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import UiInput from '#shared/ui/UiInput.vue'
import UiSpinner from '#shared/ui/UiSpinner.vue'
import { useCitySearch } from '#features/city-search/model/useCitySearch'
import type { GeocodingResult } from '#shared/api/types'
import type { City } from '#shared/api/types'

const emit = defineEmits<{
  select: [city: City]
}>()

const { t, locale } = useI18n()
const { query, results, pending, geocodingResultToCity, reset } = useCitySearch(locale.value)

function selectResult(result: GeocodingResult) {
  const city = geocodingResultToCity(result)
  emit('select', city)
  reset()
}
</script>

<style lang="scss" scoped>
.city-search {
  display: flex;
  flex-direction: column;
  gap: $space-3;

  &__input {
    width: 100%;
  }

  &__results {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-border);
    border-radius: $radius-sm;
    overflow: hidden;
  }

  &__result {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-2;
    padding: $space-3 $space-4;
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

    &-name {
      font-weight: $font-weight-medium;
      color: var(--color-text);
    }

    &-sub {
      font-size: $font-size-sm;
      color: var(--color-text-muted);
    }
  }

  &__state {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $space-4;
    color: var(--color-text-muted);
    font-size: $font-size-sm;
  }
}
</style>
