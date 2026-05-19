<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="ui-modal" @click.self="$emit('update:modelValue', false)">
        <div class="ui-modal__dialog" role="dialog" :aria-label="title">
          <div class="ui-modal__header">
            <h2 class="ui-modal__title">{{ title }}</h2>
            <button class="ui-modal__close" :aria-label="'Close'" @click="$emit('update:modelValue', false)">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="ui-modal__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

defineEmits<{
  'update:modelValue': [val: boolean]
}>()

// Lock body scroll while open
if (import.meta.client) {
  watch(() => props.modelValue, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  })
}
</script>

<style lang="scss" scoped>
.ui-modal {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  padding: $space-4;

  &__dialog {
    @include card;
    width: 100%;
    max-width: 480px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-4 $space-6;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: var(--color-text);
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: $radius-sm;
    color: var(--color-text-muted);
    transition: background var(--transition), color var(--transition);

    @include focus-ring;

    &:hover {
      background: var(--color-bg-secondary);
      color: var(--color-text);
    }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: $space-4 $space-6;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;

  .ui-modal__dialog {
    transition: transform 0.2s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .ui-modal__dialog {
    transform: scale(0.95) translateY(-10px);
  }
}
</style>
