<template>
  <div class="home-page">
    <!-- Full-page loading state -->
    <Transition name="fade">
      <div v-if="pending && !current" class="home-page__loader">
        <UiSpinner size="lg" />
      </div>
    </Transition>

    <div v-if="current" class="home-page__content">
      <!-- Main weather row -->
      <section class="home-page__main">
        <CurrentWeatherCard
          :current="current"
          :city-name="city.name"
          :current-time-iso="currentTimeIso"
          class="home-page__current"
        />
        <WeatherDetailsCard
          :current="current"
          class="home-page__details"
        />
      </section>

      <!-- Hourly forecast -->
      <HourlyForecast v-if="hourly" :hourly="hourly" />

      <!-- Weekly forecast -->
      <WeeklyForecast v-if="daily" :daily="daily" />
    </div>

    <!-- Error state -->
    <div v-if="error && !current" class="home-page__error">
      <p>{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '#app'
import { useHomePageData } from '../model/useHomePageData'
import { useSeo } from '#shared/composables/useSeo'
import { buildJsonLd } from '#shared/lib/seo'
import UiSpinner from '#shared/ui/UiSpinner.vue'
import CurrentWeatherCard from '#widgets/current-weather/ui/CurrentWeatherCard.vue'
import WeatherDetailsCard from '#widgets/weather-details/ui/WeatherDetailsCard.vue'
import HourlyForecast from '#widgets/hourly-forecast/ui/HourlyForecast.vue'
import WeeklyForecast from '#widgets/weekly-forecast/ui/WeeklyForecast.vue'

const { t, tm, locale } = useI18n()
const { city, current, hourly, daily, pending, error } = useHomePageData()

const keywords = tm('seo.home.keywords') as string[]
useSeo(t('seo.home.title'), t('seo.home.description'), keywords, city.value, locale.value)

const currentTimeIso = computed(() => {
  if (!current.value) return new Date().toISOString()
  // Open-Meteo returns current.time as the observation timestamp
  return new Date().toISOString()
})

// JSON-LD structured data
const jsonLd = computed(() => buildJsonLd(city.value, locale.value))
useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd.value.webApplication) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd.value.place) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd.value.breadcrumb) },
  ],
})
</script>

<style lang="scss" scoped>
.home-page {
  position: relative;
  min-height: calc(100vh - 64px);
  z-index: $z-base;

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-8;
    padding: $space-8 0 $space-12;
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: $space-6;

    @include max-md {
      grid-template-columns: 1fr;
    }
  }

  &__error {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    color: var(--color-text-muted);
    font-size: $font-size-lg;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
