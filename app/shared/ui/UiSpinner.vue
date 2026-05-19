<template>
  <div class="ui-spinner" :class="`ui-spinner--${size}`" role="status" :aria-label="label">
    <div class="ui-spinner__ring" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  label: 'Loading...',
})
</script>

<style lang="scss" scoped>
@keyframes spinner-rotate {
  to { transform: rotate(360deg); }
}

.ui-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &--sm { width: 16px; height: 16px; }
  &--md { width: 32px; height: 32px; }
  &--lg { width: 48px; height: 48px; }

  &__ring {
    width: 100%;
    height: 100%;
    border: 3px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spinner-rotate 0.7s linear infinite;

    @include reduced-motion {
      animation: none;
      border-top-color: var(--color-border);
    }
  }
}
</style>
