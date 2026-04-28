<template>
  <Teleport to="body">
    <Transition name="slide">
      <div
        v-if="open"
        id="mobile-menu"
        class="mobile-overlay"
        @click.self="$emit('close')">
        <div class="overlay-header">
          <button
            class="close-btn"
            :aria-label="$t('components.site_header.close_menu')"
            @click="$emit('close')">
            <UIcon name="i-lucide-x" class="close-icon" />
          </button>
        </div>
        <nav class="mobile-nav" :aria-label="$t('miscellaneous.menu')">
          <NuxtLinkLocale
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="mobile-link"
            @click="$emit('close')">
            {{ $t(item.label) }}
          </NuxtLinkLocale>
          <LanguageSwitcher class="mobile-lang" />
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  nav: Array<{ to: string; label: string }>
}>()

const emit = defineEmits<{
  close: []
}>()

const nuxtApp = useNuxtApp()

const lockScroll = () => {
  nuxtApp.$lenis?.stop()
  document.body.classList.add('menu-open')
}

const unlockScroll = () => {
  nuxtApp.$lenis?.start()
  document.body.classList.remove('menu-open')
}

watch(
  () => props.open,
  val => {
    if (import.meta.server) return
    if (val) lockScroll()
    else unlockScroll()
  },
  { immediate: true }
)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (!import.meta.server) unlockScroll()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style lang="scss" scoped>
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba($night-0, 0.92);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  z-index: $overlay-z-index;
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
}

.overlay-header {
  flex-shrink: 0;
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-inline: 1.25rem;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: $white-color;
  border-radius: 50%;
  transition: background 0.2s ease;

  &:hover {
    background: rgba($white-color, 0.08);
  }
}

.close-icon {
  font-size: 1.5rem;
}

.mobile-nav {
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem 1.5rem 2rem;
}

.mobile-link {
  font-family: $font-display;
  font-size: 1.6rem;
  padding: 0.85rem 0.5rem;
  color: $text-color;
  text-decoration: none;
  border-bottom: 1px solid $border-subtle;

  &.router-link-exact-active {
    color: $aurora-2;
  }
}

.mobile-lang {
  margin-top: 1rem;
  align-self: center;
}

.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
