<template>
  <div class="sun-layer" aria-hidden="true">
    <div class="sun__glow" />
    <div class="sun__container">
      <div class="sun__rays">
        <span
          v-for="n in 12"
          :key="n"
          class="sun__ray-wrap"
          :style="{ transform: `rotate(${(n - 1) * 30}deg)` }"
        >
          <span
            class="sun__ray"
            :style="{ animationDelay: `${(n - 1) * 0.15}s` }"
          />
        </span>
      </div>
      <div class="sun__disc" />
    </div>
  </div>
</template>
