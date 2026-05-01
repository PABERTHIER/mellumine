<template>
  <div class="default-layout">
    <a class="skip-link" href="#main">
      {{ $t('miscellaneous.skip_to_content') }}
    </a>
    <Starfield />
    <SiteHeader />
    <main id="main" class="main">
      <slot />
    </main>
    <SiteFooter />
    <MelluGremlin />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.default-layout {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
    position: relative;
    z-index: $footer-z-index;
  }

  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    padding: 0.5rem 1rem;
    background: $night-2;
    color: $white-color;
    z-index: $skip-link-z-index;
    border-radius: 0 0 0.5rem 0;

    &:focus {
      top: 0;
    }
  }
}
</style>
