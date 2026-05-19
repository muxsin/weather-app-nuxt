<template>
  <div class="snow-layer" aria-hidden="true">
    <div
      v-for="n in 50"
      :key="n"
      class="snow__flake"
      :style="flakeStyle(n)"
    >❄</div>
  </div>
</template>

<script setup lang="ts">
function flakeStyle(n: number) {
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const fallDuration = 4 + Math.random() * 4
  const swayDuration = 2 + Math.random() * 3
  const size = 8 + Math.random() * 8

  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${fallDuration}s, ${swayDuration}s`,
    fontSize: `${size}px`,
  }
}
</script>
