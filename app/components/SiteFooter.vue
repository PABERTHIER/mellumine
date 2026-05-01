<template>
  <footer class="site-footer">
    <div class="container-footer inner">
      <div class="brand-block">
        <img
          src="/images/misc/logo.webp"
          :alt="$t('pictures.logo.alt')"
          :title="$t('pictures.logo.title')"
          width="48"
          height="48" />
        <div>
          <p class="title aurora-text">{{ $t('app.name') }}</p>
          <p class="sub">{{ $t('pages.home.subtitle') }}</p>
        </div>
      </div>

      <nav class="links" :aria-label="$t('miscellaneous.menu')">
        <NuxtLinkLocale to="/">{{ $t('navigation.home') }}</NuxtLinkLocale>
        <NuxtLinkLocale to="/about">
          {{ $t('navigation.about') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale to="/plushies">
          {{ $t('navigation.plushies') }}
        </NuxtLinkLocale>
        <NuxtLinkLocale to="/contact">
          {{ $t('navigation.contact') }}
        </NuxtLinkLocale>
      </nav>

      <div class="socials">
        <a
          v-for="s in socials"
          :key="s.id"
          :href="s.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="$t('socials.' + s.id)"
          class="social-icon">
          <UIcon :name="s.icon" class="i" />
        </a>
      </div>
    </div>

    <div class="bottom">
      <span>
        © {{ year }} {{ $t('app.name') }} —
        {{ $t('miscellaneous.all_rights_reserved') }}
      </span>
      <span class="dot">·</span>
      <span>{{ $t('miscellaneous.made_with_love') }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { socials } from '~/utils/data'
const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.site-footer {
  position: relative;
  z-index: $footer-z-index;
  margin-top: 6rem;
  padding-right: 5%;
  padding-left: 5%;
  padding-block: 3rem 2rem;
  background: linear-gradient(180deg, transparent, rgba($night-0, 0.8));
  border-top: 1px solid $border-subtle;

  .inner {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;

    @media (min-width: $md) {
      grid-template-columns: 1fr auto 1fr;
    }

    .brand-block {
      display: flex;
      align-items: center;
      gap: 1rem;

      @media (max-width: $md) {
        justify-content: center;
      }

      img {
        width: 56px;
        height: 56px;
        flex-shrink: 0;
        border-radius: 50%;
        object-fit: contain;
        box-shadow: 0 0 22px rgba($aurora-1, 0.45);
      }

      .title {
        font-family: $font-display;
        font-size: 1.5rem;
        margin: 0;
      }

      .sub {
        color: rgba($text-color, 0.6);
        font-size: 0.9rem;
        margin: 0;
      }
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 1rem;
      justify-content: center;

      a {
        color: $text-muted;
        text-decoration: none;
        padding: 0.4rem 0.7rem;
        border-radius: 999px;
        transition:
          color 0.2s ease,
          background 0.2s ease;

        &:hover {
          color: $white-color;
          background: rgba($white-color, 0.05);
        }
      }
    }

    .socials {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      flex-wrap: wrap;

      @media (max-width: #{$md - 1px}) {
        justify-content: center;
      }

      .social-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid $border-medium;
        background: rgba($white-color, 0.03);
        color: $white-color;
        transition:
          transform 0.25s ease,
          background 0.25s ease,
          border-color 0.25s ease;

        &:hover {
          transform: translateY(-3px);
          background: rgba($aurora-1, 0.2);
          border-color: $box-shadow-aurora;
        }

        .i {
          font-size: 1.1rem;
        }
      }
    }
  }

  .bottom {
    margin-top: 1.5rem;
    text-align: center;
    color: $text-faint;
    font-size: 0.85rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;

    .dot {
      opacity: 0.5;
    }
  }
}
</style>
