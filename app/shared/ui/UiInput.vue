<template>
  <div class="ui-input" :class="{ 'ui-input--error': !!error }">
    <label v-if="label" :for="inputId" class="ui-input__label">{{ label }}</label>
    <div class="ui-input__wrapper">
      <span v-if="$slots.prefix" class="ui-input__prefix">
        <slot name="prefix" />
      </span>
      <input
        :id="inputId"
        class="ui-input__field"
        :class="{ 'ui-input__field--has-prefix': $slots.prefix }"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <span v-if="error" class="ui-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  error?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = computed(() => props.id ?? `ui-input-${Math.random().toString(36).slice(2, 7)}`)
</script>

<style lang="scss" scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  gap: $space-1;

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: var(--color-text-muted);
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__prefix {
    position: absolute;
    left: $space-3;
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
  }

  &__field {
    width: 100%;
    padding: $space-2 $space-3;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: $radius-sm;
    color: var(--color-text);
    font-size: $font-size-base;
    transition: border-color var(--transition), background var(--transition);

    @include focus-ring;

    &::placeholder {
      color: var(--color-text-muted);
    }

    &:focus {
      border-color: var(--color-primary);
      background: var(--color-card);
      outline: none;
    }

    &--has-prefix {
      padding-left: $space-8;
    }
  }

  &--error &__field {
    border-color: #ef4444;
  }

  &__error {
    font-size: $font-size-xs;
    color: #ef4444;
  }
}
</style>
