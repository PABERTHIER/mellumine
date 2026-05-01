<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const { t, locale, locales } = useI18n()
const runtimeConfig = useRuntimeConfig()
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const ogImageEndPath = 'og-image.webp'

const availableLocaleAlternates = computed(() => {
  const localesFiltered = locales.value.filter(l => l.code !== locale.value)
  const localesFilteredUpdated = localesFiltered.map(
    x => x.language?.replace('-', '_') ?? 'en_US'
  )

  return localesFilteredUpdated.filter(
    (item, index) => localesFilteredUpdated.indexOf(item) === index
  )
})

useHead({
  titleTemplate: '%s %separator %siteName',
  meta: [
    { name: 'description', content: computed(() => t('app.meta.description')) },
  ],
})

useSeoMeta({
  title: computed(() => t('app.name')),
  ogTitle: computed(() => t('app.name')),
  ogSiteName: computed(() => t('app.name')),
  applicationName: computed(() => t('app.name')),
  description: computed(() => t('app.meta.description')),
  ogDescription: computed(() => t('app.meta.description')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('app.meta.description')),
  ogImageType: 'image/jpeg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: `${baseUrl.value}`,
  ogType: 'website',
  ogLocale: locale.value,
  ogLocaleAlternate: availableLocaleAlternates.value,
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => t('app.name')),
  twitterDescription: computed(() => t('app.meta.description')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('app.meta.description')),
  twitterImageType: 'image/jpeg',
  author: computed(() => t('miscellaneous.author_name')),
  creator: computed(() => t('miscellaneous.author_name')),
  articleAuthor: computed(() => [
    computed(() => t('miscellaneous.author_name')).value,
  ]),
  articleTag: computed(() => [
    computed(() => t('app.name')).value,
    computed(() => t('miscellaneous.vtuber')).value,
    computed(() => t('miscellaneous.creator')).value,
    computed(() => t('miscellaneous.handmade')).value,
    computed(() => t('miscellaneous.plushies')).value,
    computed(() => t('miscellaneous.streaming')).value,
    computed(() => t('miscellaneous.polar_fox')).value,
    computed(() => t('miscellaneous.stars')).value,
    computed(() => t('miscellaneous.mascot')).value,
  ]),
  profileUsername: computed(() => t('miscellaneous.author_name')),
  publisher: 'https://mellumine.vercel.app',
  generator: 'https://nuxt.com/',
  mobileWebAppCapable: 'yes',
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'default',
  appleMobileWebAppTitle: computed(() => t('app.name')),
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
  msapplicationTileColor: '#0b0820',
})
</script>

<style lang="scss" scoped></style>
