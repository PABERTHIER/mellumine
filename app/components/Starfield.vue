<template>
  <div class="starfield" aria-hidden="true">
    <div class="layer layer-1" />
    <div class="layer layer-2" />
    <div class="layer layer-3" />
    <div class="aurora" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.starfield {
  position: fixed;
  inset: 0;
  z-index: $starfield-z-index;
  pointer-events: none;
  overflow: hidden;

  .layer {
    position: absolute;
    inset: -50%;
    background-repeat: repeat;
    opacity: 0.7;

    &.layer-1 {
      background-image:
        radial-gradient(1px 1px at 20px 30px, $white-color, transparent),
        radial-gradient(
          1px 1px at 60px 90px,
          rgba($white-color, 0.85),
          transparent
        ),
        radial-gradient(1.5px 1.5px at 130px 50px, $white-color, transparent),
        radial-gradient(
          1px 1px at 200px 200px,
          rgba(255, 240, 200, 0.9),
          transparent
        ),
        radial-gradient(1px 1px at 80px 250px, $white-color, transparent);
      background-size: 250px 250px;
      animation: drift-slow 200s linear infinite;
    }

    &.layer-2 {
      background-image:
        radial-gradient(
          1.5px 1.5px at 50px 80px,
          rgba(180, 200, 255, 0.9),
          transparent
        ),
        radial-gradient(2px 2px at 180px 160px, $white-color, transparent),
        radial-gradient(
          1px 1px at 230px 30px,
          rgba(255, 200, 240, 0.9),
          transparent
        ),
        radial-gradient(1px 1px at 100px 220px, $white-color, transparent);
      background-size: 320px 320px;
      animation: drift-slow 320s linear infinite reverse;
      opacity: 0.5;
    }

    &.layer-3 {
      background-image:
        radial-gradient(2px 2px at 90px 60px, $white-color, transparent),
        radial-gradient(
          2.5px 2.5px at 280px 220px,
          rgba(255, 240, 200, 0.95),
          transparent
        );
      background-size: 480px 480px;
      animation:
        drift-slow 480s linear infinite,
        twinkle 4s ease-in-out infinite;
      opacity: 0.6;
    }
  }

  .aurora {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 70% 20%,
        rgba($aurora-1, 0.18),
        transparent 40%
      ),
      radial-gradient(circle at 20% 80%, rgba($aurora-2, 0.12), transparent 40%);
    filter: blur(40px);
    animation: aurora-pulse 18s ease-in-out infinite;
  }
}
</style>
