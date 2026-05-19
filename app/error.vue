<template>
  <div class="error-page">
    <div class="error-page__content">
      <div class="error-page__code">{{ error?.statusCode }}</div>
      <h1 class="error-page__title">{{ error?.message || 'Something went wrong' }}</h1>
      <button class="error-page__btn" @click="handleError">Go back home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useError, clearError } from '#app'

const error = useError()

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: $space-6;

  &__content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-4;
  }

  &__code {
    font-size: 96px;
    font-weight: $font-weight-bold;
    color: var(--color-primary);
    line-height: 1;
    opacity: 0.3;
  }

  &__title {
    font-size: $font-size-xl;
    color: var(--color-text);
    max-width: 400px;
  }

  &__btn {
    padding: $space-3 $space-6;
    background: var(--color-primary);
    color: #fff;
    border-radius: $radius-sm;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: background var(--transition);

    &:hover {
      background: var(--color-primary-hover);
    }
  }
}
</style>
