<template>
  <div class="clouds-layer" aria-hidden="true">
    <!-- Large slow cloud -->
    <div class="cloud cloud--1">
      <svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80"  cy="75" rx="75" ry="38" />
        <ellipse cx="155" cy="58" rx="70" ry="42" />
        <ellipse cx="230" cy="68" rx="80" ry="38" />
        <ellipse cx="290" cy="78" rx="45" ry="30" />
        <rect    x="20"   y="75" width="285" height="32" rx="0" />
      </svg>
    </div>
    <!-- Medium cloud, opposite direction -->
    <div class="cloud cloud--2">
      <svg viewBox="0 0 380 120" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="80" rx="95"  ry="42" />
        <ellipse cx="195" cy="60" rx="85"  ry="48" />
        <ellipse cx="285" cy="72" rx="90"  ry="40" />
        <ellipse cx="355" cy="82" rx="48"  ry="32" />
        <rect    x="20"   y="80" width="340" height="36" rx="0" />
      </svg>
    </div>
    <!-- Small distant cloud -->
    <div class="cloud cloud--3">
      <svg viewBox="0 0 210 90" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60"  cy="58" rx="55" ry="30" />
        <ellipse cx="115" cy="44" rx="55" ry="34" />
        <ellipse cx="165" cy="58" rx="55" ry="30" />
        <rect    x="15"   y="58" width="195" height="28" rx="0" />
      </svg>
    </div>
    <!-- Small wispy cloud -->
    <div class="cloud cloud--4">
      <svg viewBox="0 0 260 95" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="75"  cy="62" rx="68" ry="33" />
        <ellipse cx="145" cy="48" rx="65" ry="38" />
        <ellipse cx="210" cy="65" rx="60" ry="30" />
        <rect    x="18"   y="62" width="232" height="30" rx="0" />
      </svg>
    </div>
  </div>
</template>
