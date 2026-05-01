<template>
  <div class="home">
    <section class="hero">
      <div class="container-page hero-inner">
        <div class="text-col">
          <p class="tagline">{{ $t('pages.home.hero.tagline') }}</p>
          <h1 class="title">
            <span class="aurora-text">{{ $t('app.name') }}</span>
          </h1>
          <p class="subtitle">{{ $t('pages.home.subtitle') }}</p>
          <p class="intro">{{ $t('pages.home.hero.intro') }}</p>
          <div class="cta">
            <NuxtLinkLocale to="/about" class="btn primary">
              {{ $t('pages.home.hero.cta_discover') }}
            </NuxtLinkLocale>
            <NuxtLinkLocale to="/plushies" class="btn ghost">
              {{ $t('pages.home.hero.cta_plushies') }}
            </NuxtLinkLocale>
          </div>
        </div>
        <div class="visual-col">
          <div class="halo" />
          <img
            src="/images/mellumine/mellumine-look.webp"
            :alt="$t('pictures.mellumine_look.alt')"
            :title="$t('pictures.mellumine_look.title')"
            class="hero-img float-slow"
            width="640"
            height="900"
            fetchpriority="high"
            decoding="async" />
        </div>
      </div>
      <div class="scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>

    <section
      ref="aboutEl"
      :class="['section', 'fade-in-up', { 'is-visible': aboutVisible }]">
      <div class="container-page split">
        <div class="text">
          <p class="eyebrow">01</p>
          <h2>{{ $t('pages.home.sections.about_title') }}</h2>
          <p>{{ $t('pages.home.sections.about_text') }}</p>
          <NuxtLinkLocale to="/about" class="btn small">
            {{ $t('pages.home.sections.about_cta') }} →
          </NuxtLinkLocale>
        </div>
        <div class="img-wrap">
          <img
            src="/images/mellumine/mellumine-1.webp"
            :alt="$t('pictures.mellumine_1.alt')"
            :title="$t('pictures.mellumine_1.title')"
            loading="lazy"
            decoding="async"
            width="600"
            height="800" />
        </div>
      </div>
    </section>

    <section
      ref="plushiesEl"
      :class="['section', 'fade-in-up', { 'is-visible': plushiesVisible }]">
      <div class="container-page split reverse">
        <div class="text">
          <p class="eyebrow">02</p>
          <h2>{{ $t('pages.home.sections.plushies_title') }}</h2>
          <p>{{ $t('pages.home.sections.plushies_text') }}</p>
          <NuxtLinkLocale to="/plushies" class="btn small">
            {{ $t('pages.home.sections.plushies_cta') }} →
          </NuxtLinkLocale>
        </div>
        <div class="plushie-preview">
          <img
            v-for="(p, i) in previewPlushies"
            :key="p.id"
            :src="p.views.front"
            :alt="$t('pictures.plushies.' + p.i18nKey + '.alt')"
            :title="$t('pictures.plushies.' + p.i18nKey + '.title')"
            :style="{ '--i': i }"
            class="preview-img"
            loading="lazy"
            decoding="async"
            width="400"
            height="400" />
        </div>
      </div>
    </section>

    <section
      ref="contactEl"
      :class="['section', 'fade-in-up', { 'is-visible': contactVisible }]">
      <div class="container-page contact-cta">
        <h2>{{ $t('pages.home.sections.contact_title') }}</h2>
        <p>{{ $t('pages.home.sections.contact_text') }}</p>
        <NuxtLinkLocale to="/contact" class="btn primary">
          {{ $t('pages.home.sections.contact_cta') }}
        </NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { plushies } from '~/utils/data'

definePageMeta({ layout: 'default' })

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const ogImageEndPath = 'og-image.webp'

const canonicalUrl = computed(() => `${baseUrl.value}/${locale.value}`)

useHead({
  title: computed(() => t('pages.home.tab_name')),
  meta: [
    { name: 'description', content: computed(() => t('app.meta.description')) },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.vtuber')).value},
        ${computed(() => t('miscellaneous.creator')).value},
        ${computed(() => t('miscellaneous.handmade')).value},
        ${computed(() => t('miscellaneous.plushies')).value},
        ${computed(() => t('miscellaneous.streaming')).value},
        ${computed(() => t('miscellaneous.polar_fox')).value},
        ${computed(() => t('miscellaneous.stars')).value},
        ${computed(() => t('miscellaneous.mascot')).value},
        ${computed(() => t('app.name')).value},
      `,
    },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/en`),
      hreflang: 'en-US',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/fr`),
      hreflang: 'fr-FR',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}`),
      hreflang: 'x-default',
    },
  ],
})

useSeoMeta({
  ogTitle: '%s %separator %siteName',
  description: computed(() => t('app.meta.description')),
  ogDescription: computed(() => t('app.meta.description')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('app.meta.description')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: canonicalUrl.value,
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('app.meta.description')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('app.meta.description')),
  twitterImageType: 'image/jpeg',
  articleTag: computed(() => [
    computed(() => t('pages.home.tab_name')).value,
    computed(() => t('miscellaneous.vtuber')).value,
    computed(() => t('miscellaneous.creator')).value,
    computed(() => t('miscellaneous.handmade')).value,
    computed(() => t('miscellaneous.plushies')).value,
    computed(() => t('miscellaneous.streaming')).value,
    computed(() => t('miscellaneous.polar_fox')).value,
    computed(() => t('miscellaneous.stars')).value,
    computed(() => t('miscellaneous.mascot')).value,
    computed(() => t('app.name')).value,
  ]),
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})

const previewPlushies = computed(() => plushies.slice(0, 4))

const { el: aboutEl, visible: aboutVisible } = useReveal()
const { el: plushiesEl, visible: plushiesVisible } = useReveal()
const { el: contactEl, visible: contactVisible } = useReveal()
</script>

<style lang="scss" scoped>
.home {
  position: relative;

  .hero {
    position: relative;
    min-height: calc(100vh - #{$header-height});
    display: flex;
    align-items: center;
    padding-block: 3rem 5rem;

    .hero-inner {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      align-items: center;

      .text-col {
        @media (max-width: $hero-bp) {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }

      @media (min-width: $hero-bp) {
        grid-template-columns: 1.1fr 1fr;
        gap: 2rem;
      }

      .tagline {
        text-transform: uppercase;
        letter-spacing: 0.25em;
        color: $aurora-2;
        font-size: 0.78rem;
        font-weight: 600;
        margin-bottom: 1rem;

        @media (max-width: $hero-bp) {
          text-align: center;
        }
      }

      .title {
        font-size: clamp(3rem, 9vw, 6.5rem);
        line-height: 1;
        margin: 0 0 0.5rem;
        font-weight: 700;
      }

      .subtitle {
        font-family: $font-display;
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        color: rgba($text-color, 0.85);
        margin: 0 0 1.25rem;
        font-style: italic;
      }

      .intro {
        font-size: 1.05rem;
        max-width: 32rem;
        color: $text-muted;
        line-height: 1.6;
        margin: 0 0 1.75rem;

        @media (max-width: $hero-bp) {
          text-align: center;
        }
      }

      .cta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;

        @media (max-width: $sm) {
          flex-direction: column;
          flex-wrap: no-wrap;
          align-items: center;
        }
      }

      .visual-col {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .halo {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 50%,
            $box-shadow-aurora,
            transparent 60%
          );
          filter: blur(40px);
        }

        .hero-img {
          position: relative;
          max-width: min(100%, 460px);
          height: auto;
          border-radius: 50%;
          box-shadow: 0 30px 80px -20px $box-shadow-aurora-strong;
          background: rgba($white-color, 0.02);
        }
      }
    }

    .scroll-hint {
      position: absolute;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 38px;
      border: 2px solid rgba($white-color, 0.4);
      border-radius: 999px;
      display: flex;
      justify-content: center;
      padding-top: 6px;

      span {
        width: 3px;
        height: 8px;
        background: $white-color;
        border-radius: 2px;
        animation: scroll-down 1.6s ease-in-out infinite;
      }
    }
  }

  .section {
    padding-block: 5rem;

    .split {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
      align-items: center;

      @media (min-width: $hero-bp) {
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
      }

      &.reverse {
        @media (min-width: $hero-bp) {
          .text {
            order: 2;
          }
        }
      }

      .text {
        .eyebrow {
          font-family: $font-display;
          font-size: 0.95rem;
          letter-spacing: 0.3em;
          color: $aurora-3;
          margin-bottom: 0.75rem;
        }

        h2 {
          font-size: clamp(1.8rem, 4vw, 2.75rem);
          margin: 0 0 1rem;
          line-height: 1.15;
        }

        p {
          color: $text-muted;
          font-size: 1.02rem;
          line-height: 1.7;
          margin: 0 0 1.5rem;
          max-width: 30rem;
        }
      }

      .img-wrap {
        position: relative;
        border-radius: 1.5rem;
        overflow: hidden;
        border: 1px solid $border-light;
        background: rgba($white-color, 0.03);

        img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s ease;
        }

        &:hover img {
          transform: scale(1.03);
        }
      }

      .plushie-preview {
        position: relative;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        .preview-img {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          background: radial-gradient(
            circle,
            rgba($aurora-1, 0.18),
            transparent 70%
          );
          padding: 1rem;
          border: 1px solid $border-subtle;
          animation: float-slow 7s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.7s);
        }
      }
    }

    .contact-cta {
      max-width: 92%;
      text-align: center;
      background: linear-gradient(
        160deg,
        rgba($aurora-1, 0.15),
        rgba($aurora-2, 0.08)
      );
      border: 1px solid $border-light;
      border-radius: 2rem;
      padding: 4rem 2rem;

      h2 {
        font-size: clamp(1.8rem, 4vw, 2.75rem);
        margin: 0 0 1rem;
      }

      p {
        color: $text-muted;
        max-width: 36rem;
        margin: 0 auto 2rem;
        line-height: 1.7;
      }
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.5rem;
    border-radius: 999px;
    font-weight: 600;
    text-decoration: none;
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      background 0.25s ease;
    cursor: pointer;
    font-size: 0.95rem;
    border: 1px solid transparent;

    &.primary {
      background: linear-gradient(120deg, $aurora-1, $aurora-2);
      background-clip: padding-box;
      color: $white-color;
      box-shadow: 0 10px 30px -12px rgba($aurora-1, 0.7);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 36px -14px rgba($aurora-2, 0.7);
      }
    }

    &.ghost {
      background: rgba($white-color, 0.04);
      border-color: $border-strong;
      color: $white-color;

      &:hover {
        background: rgba($white-color, 0.08);
        border-color: rgba($white-color, 0.3);
      }
    }

    &.small {
      padding: 0.6rem 1.1rem;
      font-size: 0.85rem;
      background: rgba($white-color, 0.05);
      border-color: rgba($white-color, 0.12);
      color: $white-color;

      &:hover {
        background: rgba($aurora-1, 0.18);
        border-color: $box-shadow-aurora;
      }
    }
  }
}
</style>
