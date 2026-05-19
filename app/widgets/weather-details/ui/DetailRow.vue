<template>
  <div class="detail-row">
    <span class="detail-row__label">{{ label }}</span>
    <span class="detail-row__value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  value: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $space-3 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }

  &__label {
    font-size: $font-size-sm;
    color: var(--color-text-muted);
    font-weight: $font-weight-medium;
  }

  &__value {
    font-size: $font-size-sm;
    color: var(--color-text);
    font-weight: $font-weight-semibold;
    text-align: right;
  }
}
</style>
