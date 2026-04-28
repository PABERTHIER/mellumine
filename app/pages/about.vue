<template>
  <div class="about">
    <section class="hero">
      <div class="container-page inner">
        <div class="text">
          <p class="eyebrow">{{ $t('pages.about.subtitle') }}</p>
          <h1 class="aurora-text">{{ $t('pages.about.title') }}</h1>
          <p class="intro">{{ $t('pages.about.intro') }}</p>
        </div>
        <div class="img">
          <img
            src="/images/mellumine/mellumine-2.webp"
            :alt="$t('pictures.mellumine_2.alt')"
            loading="eager"
            decoding="async"
            width="600"
            height="800" />
        </div>
      </div>
    </section>

    <section
      ref="loreEl"
      :class="['section', 'fade-in-up', { 'is-visible': loreVisible }]">
      <div class="container-page split">
        <div class="text">
          <p class="num">✦ 01</p>
          <h2>{{ $t('pages.about.lore_title') }}</h2>
          <p>{{ $t('pages.about.lore_text') }}</p>
        </div>
        <div class="img round">
          <img
            src="/images/mellumine/mellumine-3.webp"
            :alt="$t('pictures.mellumine_3.alt')"
            loading="lazy"
            decoding="async"
            width="600"
            height="800" />
        </div>
      </div>
    </section>

    <section
      ref="ariaEl"
      :class="['section', 'fade-in-up', { 'is-visible': ariaVisible }]">
      <div class="container-page split reverse">
        <div class="text">
          <p class="num">✦ 02</p>
          <h2>{{ $t('pages.about.aria_title') }}</h2>
          <p>{{ $t('pages.about.aria_text') }}</p>
        </div>
        <div class="aria-frame">
          <div class="aria-glow" />
          <img
            src="/images/misc/aria.webp"
            :alt="$t('pictures.aria.alt')"
            class="float-slow"
            loading="lazy"
            decoding="async"
            width="500"
            height="500" />
        </div>
      </div>
    </section>

    <section
      ref="creditsEl"
      :class="[
        'section',
        'credits',
        'fade-in-up',
        { 'is-visible': creditsVisible },
      ]">
      <div class="container-page">
        <h2>{{ $t('pages.about.credits_title') }}</h2>
        <ul class="credits-list">
          <li v-for="c in credits" :key="c.roleKey">
            <span class="role">{{ $t('pages.about.' + c.roleKey) }}</span>
            <span class="name">{{ c.name }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { credits } from '~/utils/data'

definePageMeta({ layout: 'default' })

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = 'about'
const ogImageEndPath = 'og-image.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.about.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.about.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.vtuber')).value},
        ${computed(() => t('miscellaneous.creator')).value},
        ${computed(() => t('miscellaneous.polar_fox')).value},
        ${computed(() => t('miscellaneous.mascot')).value},
        ${computed(() => t('miscellaneous.stars')).value},
        ${computed(() => t('miscellaneous.streaming')).value},
        ${computed(() => t('miscellaneous.handmade')).value},
        ${computed(() => t('miscellaneous.plushies')).value},
        ${computed(() => t('app.name')).value},
      `,
    },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/en/${urlEndPath}`),
      hreflang: 'en-US',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`),
      hreflang: 'fr-FR',
    },
    {
      rel: 'alternate',
      href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`),
      hreflang: 'x-default',
    },
  ],
})

useSeoMeta({
  ogTitle: '%s %separator %siteName',
  description: computed(() => t('pages.about.meta.content')),
  ogDescription: computed(() => t('pages.about.meta.content')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.about.meta.content')),
  ogImageType: 'image/webp',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('pages.about.meta.content')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.about.meta.content')),
  twitterImageType: 'image/webp',
  articleTag: [
    computed(() => t('miscellaneous.vtuber')).value,
    computed(() => t('miscellaneous.creator')).value,
    computed(() => t('miscellaneous.polar_fox')).value,
    computed(() => t('miscellaneous.mascot')).value,
    computed(() => t('miscellaneous.stars')).value,
    computed(() => t('miscellaneous.streaming')).value,
    computed(() => t('miscellaneous.handmade')).value,
    computed(() => t('miscellaneous.plushies')).value,
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})

const { el: loreEl, visible: loreVisible } = useReveal()
const { el: ariaEl, visible: ariaVisible } = useReveal()
const { el: creditsEl, visible: creditsVisible } = useReveal()
</script>

<style lang="scss" scoped>
.about {
  padding-bottom: 4rem;
}

.hero {
  padding-block: 4rem 2rem;
}

.inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: $hero-bp) {
    grid-template-columns: 1.2fr 1fr;
  }
}

.eyebrow {
  font-family: $font-display;
  font-style: italic;
  color: $aurora-3;
  letter-spacing: 0.1em;
  font-size: 1.1rem;
}

h1 {
  font-size: clamp(2.5rem, 7vw, 5rem);
  margin: 0.5rem 0 1.25rem;
  line-height: 1;
}

.intro {
  color: rgba($text-color, 0.78);
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 34rem;
}

.img {
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid $border-light;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  &.round {
    border-radius: 50% 30% 50% 30% / 30% 50% 30% 50%;
    box-shadow: 0 20px 60px -20px $box-shadow-aurora;
  }
}

.section {
  padding-block: 4rem;
}

.split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @media (min-width: $hero-bp) {
    grid-template-columns: 1fr 1fr;
  }

  &.reverse {
    @media (min-width: $hero-bp) {
      .text {
        order: 2;
      }
    }
  }
}

.num {
  font-family: $font-display;
  font-size: 1rem;
  letter-spacing: 0.3em;
  color: $aurora-2;
  margin-bottom: 0.5rem;
}

.text h2 {
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  margin: 0 0 1rem;
}

.text p {
  color: rgba($text-color, 0.78);
  line-height: 1.75;
  font-size: 1.02rem;
  max-width: 32rem;
}

.aria-frame {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    position: relative;
    max-width: 360px;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 20px 40px rgba($aurora-3, 0.4));
  }
}

.aria-glow {
  position: absolute;
  inset: 10%;
  background: radial-gradient(circle, rgba($aurora-3, 0.45), transparent 65%);
  filter: blur(40px);
}

.credits {
  text-align: center;

  h2 {
    font-size: clamp(1.6rem, 3.5vw, 2.25rem);
    margin: 0 0 2rem;
  }
}

.credits-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 36rem;
  margin-inline: auto;

  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }

  li {
    background: rgba($white-color, 0.04);
    border: 1px solid $border-light;
    border-radius: 1rem;
    padding: 1.25rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .role {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: $text-faint;
  }

  .name {
    font-family: $font-display;
    font-size: 1.25rem;
    color: $white-color;
  }
}
</style>
