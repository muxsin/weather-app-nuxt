<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <div class="layout__container">
        <slot />
      </div>
    </main>
    <CityModal />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '#widgets/header/ui/AppHeader.vue'
import CityModal from '#widgets/city-modal/ui/CityModal.vue'
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: $z-base;

  &__main {
    flex: 1;
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $space-6;

    @include max-md {
      padding: 0 $space-4;
    }
  }
}
</style>
