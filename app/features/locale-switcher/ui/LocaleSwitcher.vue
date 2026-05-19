<template>
  <div class="locale-switcher">
    <button
      v-for="locale in availableLocales"
      :key="locale.code"
      class="locale-switcher__btn"
      :class="{ 'locale-switcher__btn--active': locale.code === currentLocale }"
      @click="switchLocale(locale.code)"
    >
      {{ locale.code.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useNuxtApp } from '#app'
import { computed } from 'vue'

const { locale, locales } = useI18n()
const router = useRouter()
const route = useRoute()
const nuxtApp = useNuxtApp()

const currentLocale = computed(() => locale.value)

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).map((l) => ({
    code: l.code,
    name: l.name,
  }))
)

async function switchLocale(code: string) {
  const i18n = nuxtApp.$i18n as { setLocale: (code: string) => Promise<void> }
  await i18n.setLocale(code)
}
</script>

<style lang="scss" scoped>
.locale-switcher {
  display: flex;
  align-items: center;
  gap: $space-1;

  &__btn {
    padding: $space-1 $space-2;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: var(--color-text-muted);
    background: transparent;
    border: 1px solid transparent;
    transition: all var(--transition);
    letter-spacing: 0.05em;

    @include focus-ring;

    &:hover {
      background: var(--color-bg-secondary);
      color: var(--color-text);
    }

    &--active {
      background: var(--color-primary);
      color: #fff;
      border-color: var(--color-primary);

      &:hover {
        background: var(--color-primary-hover);
      }
    }
  }
}
</style>
