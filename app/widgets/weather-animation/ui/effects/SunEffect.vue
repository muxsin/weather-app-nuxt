<template>
  <div class="sun-layer" aria-hidden="true">
    <div class="sun__glow" />
    <div class="sun__container">
      <div class="sun__rays">
        <span
          v-for="n in 12"
          :key="n"
          class="sun__ray"
          :style="{ transform: `rotate(${(n - 1) * 30}deg)`, animationDelay: `${(n - 1) * 0.25}s` }"
        />
      </div>
      <div class="sun__disc" />
    </div>
  </div>
</template>
