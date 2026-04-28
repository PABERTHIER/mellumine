<template>
  <header :class="['site-header', { scrolled: scrolled }]">
    <div class="container-page bar">
      <NuxtLinkLocale
        to="/"
        class="brand"
        :aria-label="$t('miscellaneous.go_to') + ' ' + $t('navigation.home')">
        <img
          src="/images/misc/logo.webp"
          :alt="$t('pictures.logo.alt')"
          width="44"
          height="44" />
        <span class="brand-name aurora-text">Mellumine</span>
      </NuxtLinkLocale>

      <Menu />
    </div>
  </header>
</template>

<script setup lang="ts">
const scrolled = ref(false)

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 24
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: $header-z-index;
  transition:
    background 0.3s ease,
    backdrop-filter 0.3s ease,
    border-color 0.3s ease;
  border-bottom: 1px solid transparent;

  &.scrolled {
    background: rgba($night-1, 0.7);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom-color: $border-subtle;
  }
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 0.85rem;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;

  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 18px $box-shadow-aurora;
  }
}

.brand-name {
  font-family: $font-display;
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
