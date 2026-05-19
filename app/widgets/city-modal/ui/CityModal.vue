<template>
  <UiModal v-model="isOpen" :title="t('modal.cityPicker.title')">
    <div class="city-modal">
      <CitySearch @select="handleSelect" />
      <div class="city-modal__divider" />
      <CommonCitiesList :current-city-key="currentCityKey" @select="handleSelect" />
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '#shared/store/useStore'
import UiModal from '#shared/ui/UiModal.vue'
import CitySearch from '#features/city-search/ui/CitySearch.vue'
import CommonCitiesList from '#features/city-search/ui/CommonCitiesList.vue'
import type { City } from '#shared/api/types'

const { t } = useI18n()
const store = useStore()

const isOpen = computed({
  get: () => store.state.ui.cityModalOpen,
  set: (val: boolean) => {
    if (val) store.dispatch('ui/openCityModal')
    else store.dispatch('ui/closeCityModal')
  },
})

const currentCityKey = computed(() => store.state.city.current.key)

function handleSelect(city: City) {
  store.dispatch('city/selectCity', city)
  store.dispatch('ui/closeCityModal')
}
</script>

<style lang="scss" scoped>
.city-modal {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__divider {
    height: 1px;
    background: var(--color-border);
  }
}
</style>
