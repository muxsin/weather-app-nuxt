<template>
  <span class="ui-icon" :class="`ui-icon--${size}`" aria-hidden="true">{{ icon }}</span>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})
</script>

<style lang="scss" scoped>
.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &--sm { font-size: $font-size-sm; }
  &--md { font-size: $font-size-base; }
  &--lg { font-size: $font-size-xl; }
  &--xl { font-size: $font-size-3xl; }
}
</style>
