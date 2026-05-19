<template>
  <div class="rain-layer" aria-hidden="true">
    <div
      v-for="n in 80"
      :key="n"
      class="rain__drop"
      :style="dropStyle(n)"
    />
  </div>
</template>

<script setup lang="ts">
function dropStyle(n: number) {
  const left = Math.random() * 100
  const delay = Math.random() * 2
  const duration = 0.6 + Math.random() * 0.6

  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }
}
</script>
