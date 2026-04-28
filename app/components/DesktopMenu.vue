<template>
  <nav class="desktop-nav" :aria-label="$t('miscellaneous.menu')">
    <NuxtLinkLocale
      v-for="item in nav"
      :key="item.to"
      :to="item.to"
      class="nav-link">
      {{ $t(item.label) }}
    </NuxtLinkLocale>
    <LanguageSwitcher />
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  nav: Array<{ to: string; label: string }>
}>()
</script>

<style lang="scss" scoped>
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  color: rgba($text-color, 0.85);
  font-weight: 500;
  text-decoration: none;
  transition:
    color 0.2s ease,
    background 0.2s ease;

  &:hover {
    color: $white-color;
    background: rgba($white-color, 0.06);
  }

  &.router-link-exact-active {
    color: $white-color;
    background: rgba($aurora-1, 0.2);
  }
}
</style>
