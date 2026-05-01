<template>
  <div class="contact-page">
    <section class="hero">
      <div class="container-page">
        <p class="eyebrow">{{ $t('pages.contact.subtitle') }}</p>
        <h1 class="aurora-text">{{ $t('pages.contact.title') }}</h1>
        <p class="intro">{{ $t('pages.contact.intro') }}</p>
      </div>
    </section>

    <section class="block">
      <div class="container-page">
        <h2 class="block-title">{{ $t('pages.contact.socials_title') }}</h2>
        <div class="grid">
          <SocialCard v-for="s in socials" :key="s.id" :link="s" />
        </div>
      </div>
    </section>

    <section class="block">
      <div class="container-page">
        <h2 class="block-title">{{ $t('pages.contact.support_title') }}</h2>
        <div class="grid">
          <SocialCard v-for="s in supports" :key="s.id" :link="s" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { socials, supports } from '~/utils/data'

definePageMeta({ layout: 'default' })

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = 'contact'
const ogImageEndPath = 'og-image.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.contact.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.contact.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.vtuber')).value},
        ${computed(() => t('miscellaneous.creator')).value},
        ${computed(() => t('miscellaneous.streaming')).value},
        ${computed(() => t('miscellaneous.follow_me')).value},
        ${computed(() => t('miscellaneous.support_me')).value},
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
  description: computed(() => t('pages.contact.meta.content')),
  ogDescription: computed(() => t('pages.contact.meta.content')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.contact.meta.content')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('pages.contact.meta.content')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.contact.meta.content')),
  twitterImageType: 'image/jpeg',
  articleTag: [
    computed(() => t('miscellaneous.vtuber')).value,
    computed(() => t('miscellaneous.creator')).value,
    computed(() => t('miscellaneous.streaming')).value,
    computed(() => t('miscellaneous.follow_me')).value,
    computed(() => t('miscellaneous.support_me')).value,
    computed(() => t('miscellaneous.plushies')).value,
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})
</script>

<style lang="scss" scoped>
.contact-page {
  padding-bottom: 4rem;

  .hero {
    padding-block: 4rem 2rem;
    text-align: center;

    .eyebrow {
      font-family: $font-display;
      font-style: italic;
      color: $aurora-3;
      letter-spacing: 0.1em;
    }

    h1 {
      font-size: clamp(2.5rem, 7vw, 5rem);
      margin: 0.5rem 0 1.25rem;
      line-height: 1;
    }

    .intro {
      color: rgba($text-color, 0.78);
      max-width: 38rem;
      margin: 0 auto;
      line-height: 1.7;
      font-size: 1.05rem;
    }
  }

  .block {
    padding-block: 2.5rem;

    .block-title {
      font-size: clamp(1.4rem, 3vw, 2rem);
      margin: 0 0 1.5rem;
      text-align: center;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;

      @media (min-width: $sm) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: $lg) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}
</style>
