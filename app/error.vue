<template>
  <div class="error-layout">
    <div class="container-page">
      <p class="code">{{ error?.statusCode || 404 }}</p>
      <h1 class="aurora-text">Oups…</h1>
      <p>{{ msg }}</p>
      <button class="btn" @click="handleHome">
        ← {{ $t('navigation.home') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const localePath = useLocalePath()

const msg = computed(() =>
  props.error?.statusCode === 404
    ? "La page que vous cherchez s'est perdue dans les étoiles."
    : "Une étoile filante s'est cachée. Réessayez plus tard."
)

const handleHome = () => clearError({ redirect: localePath('/') })
</script>

<style lang="scss" scoped>
.error-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: $night-1;
}

.code {
  font-family: $font-display;
  font-size: 5rem;
  color: $aurora-2;
  margin: 0;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0 0 1rem;
}

p {
  color: $text-muted;
  margin: 0 0 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  background: linear-gradient(120deg, $aurora-1, $aurora-2);
  color: $white-color;
  border: 0;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
}
</style>
