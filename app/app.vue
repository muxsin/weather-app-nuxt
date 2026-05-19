<template>
  <div>
    <NuxtRouteAnnouncer />
    <ClientOnly>
      <WeatherAnimation :kind="animationKind" />
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '#shared/store/useStore'
import { useWeather } from '#shared/composables/useWeather'
import { weatherCodeToAnimation } from '#shared/lib/weatherCode'
import WeatherAnimation from '#widgets/weather-animation/ui/WeatherAnimation.vue'

const store = useStore()
const city = computed(() => store.state.city.current)
const { current } = useWeather(city)

const animationKind = computed(() =>
  current.value ? weatherCodeToAnimation(current.value.weather_code) : 'sun'
)
</script>

