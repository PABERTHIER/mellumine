<template>
  <header :class="['site-header', { scrolled: scrolled }]">
    <div class="container-page bar">
      <NuxtLinkLocale
        to="/"
        class="brand"
        :aria-label="homePageWording"
        :title="homePageWording">
        <img
          src="/images/misc/logo.webp"
          :alt="$t('pictures.logo.alt')"
          width="44"
          height="44" />
        <span class="brand-name aurora-text">
          {{ $t('app.name') }}
        </span>
      </NuxtLinkLocale>

      <Menu />
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()

const scrolled = ref(false)
const homePageWording = t('navigation.home')

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

  .bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 0.85rem;
    gap: 1rem;

    .brand {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      text-decoration: none;

      img {
        width: 44px;
        height: 44px;
        flex-shrink: 0;
        border-radius: 50%;
        object-fit: contain;
        box-shadow: 0 0 18px $box-shadow-aurora;
      }

      .brand-name {
        font-family: $font-display;
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
  }
}
</style>
