<template>
  <button
    class="theme-toggle"
    :aria-label="t('theme.toggle')"
    :title="t('theme.toggle')"
    @click="toggle"
  >
    <span class="theme-toggle__icon">{{ isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from '#shared/composables/useTheme'

const { t } = useI18n()
const { isDark, toggle } = useTheme()
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: $radius-sm;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  transition: background var(--transition);
  font-size: $font-size-base;

  @include focus-ring;

  &:hover {
    background: var(--color-card-hover);
  }

  &__icon {
    line-height: 1;
  }
}
</style>
