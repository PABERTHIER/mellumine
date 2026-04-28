<template>
  <div class="menu">
    <div class="desktop">
      <DesktopMenu :nav="nav" />
    </div>

    <div class="mobile">
      <button
        ref="burgerRef"
        class="burger"
        :aria-label="
          open
            ? $t('components.site_header.close_menu')
            : $t('components.site_header.open_menu')
        "
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open">
        <span :class="['line', { o: open }]" />
        <span :class="['line', { o: open }]" />
        <span :class="['line', { o: open }]" />
      </button>

      <MobileMenu :open="open" :nav="nav" @close="onClose" />
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
const route = useRoute()
const burgerRef = ref<HTMLButtonElement | null>(null)

const nav = [
  { to: '/', label: 'navigation.home' },
  { to: '/about', label: 'navigation.about' },
  { to: '/plushies', label: 'navigation.plushies' },
  { to: '/contact', label: 'navigation.contact' },
]

const onClose = () => {
  open.value = false
  burgerRef.value?.focus()
}

watch(
  () => route.fullPath,
  () => {
    open.value = false
  }
)
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
}

.desktop {
  display: none;

  @media (min-width: $md) {
    display: flex;
  }
}

.mobile {
  display: flex;

  @media (min-width: $md) {
    display: none;
  }
}

.burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: 0;
  padding: 0.5rem;
  cursor: pointer;
}

.line {
  width: 26px;
  height: 2px;
  background: $white-color;
  border-radius: 2px;
  transition:
    transform 0.3s ease,
    opacity 0.2s ease;
  transform-origin: center;

  &.o:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  &.o:nth-child(2) {
    opacity: 0;
  }

  &.o:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}
</style>
