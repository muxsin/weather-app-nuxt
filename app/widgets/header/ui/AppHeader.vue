<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="app-header__brand">
        <svg class="app-header__logo" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="var(--color-primary)" />
          <path d="M16 8a5 5 0 0 1 5 5c0 2.5-1.5 4.5-3 5.5L16 24l-2-5.5C12.5 17.5 11 15.5 11 13a5 5 0 0 1 5-5z" fill="#fff" opacity="0.9" />
          <circle cx="16" cy="13" r="2" fill="var(--color-primary)" />
        </svg>
        <span class="app-header__app-name">WeatherApp</span>
      </div>

      <div class="app-header__actions">
        <LocaleSwitcher />
        <ThemeToggle />
        <UiButton variant="primary" size="sm" @click="openModal">
          {{ t('common.chooseCity') }}
        </UiButton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useStore } from '#shared/store/useStore'
import LocaleSwitcher from '#features/locale-switcher/ui/LocaleSwitcher.vue'
import ThemeToggle from '#features/theme-toggle/ui/ThemeToggle.vue'
import UiButton from '#shared/ui/UiButton.vue'

const { t } = useI18n()
const store = useStore()

function openModal() {
  store.dispatch('ui/openCityModal')
}
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: $z-header;
  background: var(--color-overlay);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: $space-3 $space-6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-4;

    @include max-md {
      padding: $space-3 $space-4;
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: $space-3;
    text-decoration: none;
  }

  &__logo {
    flex-shrink: 0;
  }

  &__app-name {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: var(--color-text);
    letter-spacing: -0.01em;

    @include max-md {
      display: none;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-3;
  }
}
</style>
