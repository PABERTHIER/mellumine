<template>
  <div
    ref="rootEl"
    :class="['gremlin', { peeking: peeking }]"
    aria-hidden="true">
    <img
      src="/images/misc/mellu-gremelin.webp"
      :alt="$t('pictures.gremlin.alt')"
      width="120"
      height="120" />
  </div>
</template>

<script setup lang="ts">
const rootEl = ref<HTMLElement | null>(null)
const peeking = ref(false)
let scrollTriggered = false

onMounted(() => {
  const trigger = () => {
    if (scrollTriggered) return
    if (window.scrollY > window.innerHeight * 0.6) {
      scrollTriggered = true
      peeking.value = true
      setTimeout(() => (peeking.value = false), 4500)
      // schedule periodic peeks every ~25s
      setInterval(() => {
        peeking.value = true
        setTimeout(() => (peeking.value = false), 4500)
      }, 25000)
    }
  }
  window.addEventListener('scroll', trigger, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', trigger))
})
</script>

<style lang="scss" scoped>
.gremlin {
  position: fixed;
  right: -130px;
  bottom: 12vh;
  z-index: $gremlin-z-index;
  pointer-events: none;
  transition:
    transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1),
    right 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: rotate(-8deg);

  img {
    width: 110px;
    height: auto;
    filter: drop-shadow(0 6px 20px rgba($aurora-1, 0.45));

    @media (max-width: $sm) {
      width: 80px;
    }
  }

  &.peeking {
    right: -10px;
    transform: rotate(2deg) translateY(-4px);
    animation: wiggle 1.4s ease-in-out 0.7s 2;
  }
}

@keyframes wiggle {
  0%,
  100% {
    transform: rotate(2deg) translateY(-4px);
  }
  25% {
    transform: rotate(-4deg) translateY(-8px);
  }
  75% {
    transform: rotate(6deg) translateY(-4px);
  }
}
</style>
