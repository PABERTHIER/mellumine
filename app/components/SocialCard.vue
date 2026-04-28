<template>
  <a
    ref="el"
    :href="link.url"
    target="_blank"
    rel="noopener noreferrer"
    :class="['social-card', 'fade-in-up', { 'is-visible': visible }]"
    :style="{ '--accent': link.accent }">
    <div class="icon">
      <UIcon :name="link.icon" />
    </div>
    <div class="text">
      <span class="name">{{ $t('socials.' + link.id) }}</span>
      <span class="desc">{{ $t('socials.' + link.id + '_desc') }}</span>
    </div>
    <UIcon name="i-lucide-arrow-up-right" class="arrow" />
  </a>
</template>

<script setup lang="ts">
import type { SocialLink } from '~/types/content'

defineProps<{ link: SocialLink }>()
const { el, visible } = useReveal()
</script>

<style lang="scss" scoped>
.social-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(
    160deg,
    rgba($white-color, 0.05),
    rgba($white-color, 0.01)
  );
  border: 1px solid $border-light;
  border-radius: 1rem;
  text-decoration: none;
  color: $white-color;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 100% 0%,
      var(--accent),
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 14px 30px -16px var(--accent);

    &::before {
      opacity: 0.18;
    }

    .arrow {
      transform: translate(4px, -4px);
    }
  }
}

.icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--accent) 22%, transparent);
  color: var(--accent);
  font-size: 1.4rem;
  position: relative;
  z-index: 1;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
  flex: 1;
  position: relative;
  z-index: 1;
}

.name {
  font-weight: 600;
  font-size: 1rem;
}

.desc {
  font-size: 0.85rem;
  color: rgba($text-color, 0.65);
}

.arrow {
  position: relative;
  z-index: 1;
  font-size: 1.1rem;
  color: rgba($text-color, 0.7);
  transition: transform 0.3s ease;
}
</style>
