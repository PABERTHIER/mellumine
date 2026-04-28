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
  link: [{ rel: 'icon', type: 'image/webp', href: '/images/misc/logo.webp' }],
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
  ogImageType: 'image/webp',
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
  twitterImageType: 'image/webp',
  author: 'Mellumine',
  creator: 'Mellumine',
  articleAuthor: ['Mellumine'],
  articleTag: computed(() => [
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

<style lang="scss">
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.5s ease;
}
.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
