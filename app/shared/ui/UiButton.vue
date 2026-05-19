<template>
  <button
    class="ui-button"
    :class="[`ui-button--${variant}`, `ui-button--${size}`, { 'ui-button--loading': loading }]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="ui-button__spinner" />
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})
</script>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  border-radius: $radius-sm;
  font-weight: $font-weight-medium;
  transition: background-color var(--transition), color var(--transition), border-color var(--transition), opacity var(--transition);
  cursor: pointer;
  white-space: nowrap;

  @include focus-ring;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--sm {
    padding: $space-1 $space-3;
    font-size: $font-size-sm;
  }

  &--md {
    padding: $space-2 $space-4;
    font-size: $font-size-base;
  }

  &--lg {
    padding: $space-3 $space-6;
    font-size: $font-size-lg;
  }

  &--primary {
    background: var(--color-primary);
    color: #fff;

    &:hover:not(:disabled) {
      background: var(--color-primary-hover);
    }
  }

  &--secondary {
    background: var(--color-bg-secondary);
    color: var(--color-text);
    border: 1px solid var(--color-border);

    &:hover:not(:disabled) {
      background: var(--color-card-hover);
    }
  }

  &--ghost {
    background: transparent;
    color: var(--color-text);

    &:hover:not(:disabled) {
      background: var(--color-bg-secondary);
    }
  }

  &__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: btn-spin 0.6s linear infinite;

    @include reduced-motion {
      animation: none;
    }
  }
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
</style>
