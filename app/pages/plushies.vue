<template>
  <div class="plushies-page">
    <section class="hero">
      <div class="container-page">
        <p class="eyebrow">{{ $t('pages.plushies.subtitle') }}</p>
        <h1 class="aurora-text">{{ $t('pages.plushies.title') }}</h1>
        <p class="intro">{{ $t('pages.plushies.intro') }}</p>
      </div>
    </section>

    <section class="grid-section">
      <div class="container-page">
        <div class="grid">
          <PlushieCard v-for="p in plushies" :key="p.id" :plushie="p" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { plushies } from '~/utils/data'

definePageMeta({ layout: 'default' })

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = 'plushies'
const ogImageEndPath = 'og-image.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.plushies.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.plushies.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.plushies')).value},
        ${computed(() => t('miscellaneous.handmade')).value},
        ${computed(() => t('miscellaneous.creator')).value},
        ${computed(() => t('miscellaneous.vtuber')).value},
        ${computed(() => t('miscellaneous.stars')).value},
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
  description: computed(() => t('pages.plushies.meta.content')),
  ogDescription: computed(() => t('pages.plushies.meta.content')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.plushies.meta.content')),
  ogImageType: 'image/webp',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('pages.plushies.meta.content')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.plushies.meta.content')),
  twitterImageType: 'image/webp',
  articleTag: [
    computed(() => t('miscellaneous.plushies')).value,
    computed(() => t('miscellaneous.handmade')).value,
    computed(() => t('miscellaneous.creator')).value,
    computed(() => t('miscellaneous.vtuber')).value,
    computed(() => t('miscellaneous.stars')).value,
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})
</script>

<style lang="scss" scoped>
.plushies-page {
  padding-bottom: 4rem;
}

.hero {
  padding-block: 4rem 2rem;
  text-align: center;
}

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

.grid-section {
  padding-block: 2rem 0;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: $sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
