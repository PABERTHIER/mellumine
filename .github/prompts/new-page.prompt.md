---
description: "Create a new content page end-to-end: i18n translations and Vue page component with full SEO metadata."
---

# New Page

You are creating a new page for the Mellumine website.

## Required Information

Before starting, you **must** have all of the following. If any is missing, ask for it:

1. **Route / page name** — e.g., `events`, `faq`, `stream`
2. **FR title** — displayed as the page heading
3. **FR subtitle** — tagline or subheading
4. **FR meta.content** — SEO description (≤160 chars, must mention "Mellumine")
5. **EN title**, **EN subtitle**, **EN meta.content** (natural English)
6. **SEO keywords** — which `miscellaneous.*` keys to use
7. **OG image** — defaults to `og-image.webp`

## Pre-Implementation Checks

1. Verify the page doesn't already exist in `app/pages/`.
2. Identify any data imports needed (plushies, socials, etc.).

## Implementation Steps

### Step 1: Add i18n translations

Update **both** `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`:

```json
"pages": {
  "{page}": {
    "tab_name": "...",
    "meta": { "content": "≤160 chars, includes Mellumine" },
    "title": "...",
    "subtitle": "..."
  }
}
```

### Step 2: Create the page component

Create `app/pages/{page}.vue` with:

```vue
<template>
  <div class="{page}-page">
    <!-- page content -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = '{page}'
const ogImageEndPath = 'og-image.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)

useHead({
  title: computed(() => t('pages.{page}.tab_name')),
  meta: [
    { name: 'description', content: computed(() => t('pages.{page}.meta.content')) },
    { name: 'keywords', content: `...` },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    { rel: 'alternate', href: computed(() => `${baseUrl.value}/en/${urlEndPath}`), hreflang: 'en-US' },
    { rel: 'alternate', href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`), hreflang: 'fr-FR' },
    { rel: 'alternate', href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`), hreflang: 'x-default' },
  ],
})

useSeoMeta({
  ogTitle: '%s %separator %siteName',
  description: computed(() => t('pages.{page}.meta.content')),
  ogDescription: computed(() => t('pages.{page}.meta.content')),
  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.{page}.meta.content')),
  ogImageType: 'image/webp',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: canonicalUrl.value,
  ogType: 'article',
  twitterTitle: '%s %separator %siteName',
  twitterDescription: computed(() => t('pages.{page}.meta.content')),
  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.{page}.meta.content')),
  twitterImageType: 'image/webp',
  articleTag: [
    computed(() => t('miscellaneous.vtuber')).value,
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})
</script>

<style lang="scss" scoped>
.{page}-page {
  padding-bottom: 4rem;
}
</style>
```

### Step 3: Update navigation (if needed)

If this page should appear in the site navigation, update `app/components/SiteHeader.vue` and add a `navigation.{page}` key to both locale files.

### Step 4: Verify

- Run `yarn lint` to check for issues

## Key Rules

- See `page.instructions.md` for auto-applied SEO conventions
- See `vue-nuxt.instructions.md` for Vue/Nuxt auto-import rules
- `x-default` hreflang always points to `/fr/`
- `ogImageType` must be `'image/webp'`
- Always update both FR and EN translation files
