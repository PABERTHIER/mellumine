---
name: seo
description: "Full SEO implementation pattern for Mellumine pages: useHead, useSeoMeta, canonical URL, hreflang, Open Graph, Twitter cards, and article tags. Use when writing or reviewing SEO metadata on any page."
---

# SEO Skill

Every page in Mellumine uses the `@nuxtjs/seo` module v5.
This skill documents the complete SEO pattern used consistently across all pages.

---

## Architecture Overview

| Concern | Where |
|---|---|
| Browser tab title | `useHead({ title })` |
| Meta description + keywords | `useHead({ meta: [...] })` |
| Canonical URL + hreflang | `useHead({ link: [...] })` |
| Open Graph + Twitter | `useSeoMeta({...})` |
| Translations | `i18n/locales/*.json` → `pages.{page}.meta.content` |
| Site-level config | `nuxt.config.ts` → `site: { url, name }` |

---

## URL Setup (required on every page)

```typescript
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
// URL path segment without locale prefix and without leading slash
const urlEndPath = '{page}'          // e.g. 'plushies', 'about', 'contact'
// Path to OG image inside public/
const ogImageEndPath = 'og-image.webp'

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
```

---

## useHead() — Full Pattern

```typescript
useHead({
  title: computed(() => t('pages.{page}.tab_name')),
  meta: [
    {
      name: 'description',
      content: computed(() => t('pages.{page}.meta.content')),
    },
    {
      name: 'keywords',
      content: `${computed(() => t('miscellaneous.vtuber')).value},
        ${computed(() => t('miscellaneous.creator')).value},
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
```

### Hreflang rules
- Always include all 3 hreflang entries: `en-US`, `fr-FR`, and `x-default`
- `x-default` always points to the **French** URL (French is the default locale)
- Use `urlEndPath` (without locale prefix) — prepend `/en/` or `/fr/` manually

---

## useSeoMeta() — Full Pattern

```typescript
useSeoMeta({
  ogTitle: '%s %separator %siteName',
  twitterTitle: '%s %separator %siteName',
  appleMobileWebAppTitle: '%s %separator %siteName',

  description: computed(() => t('pages.{page}.meta.content')),
  ogDescription: computed(() => t('pages.{page}.meta.content')),
  twitterDescription: computed(() => t('pages.{page}.meta.content')),

  ogImage: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageSecureUrl: `${baseUrl.value}/${ogImageEndPath}`,
  ogImageAlt: computed(() => t('pages.{page}.meta.content')),
  ogImageType: 'image/webp',
  ogImageWidth: '1200',
  ogImageHeight: '630',

  twitterImage: `${baseUrl.value}/${ogImageEndPath}`,
  twitterImageAlt: computed(() => t('pages.{page}.meta.content')),
  twitterImageType: 'image/webp',

  ogUrl: canonicalUrl.value,
  ogType: 'article',

  articleTag: [
    computed(() => t('miscellaneous.vtuber')).value,
    computed(() => t('miscellaneous.creator')).value,
    computed(() => t('app.name')).value,
  ],

  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})
```

---

## Keyword Reference by Page

**Always include on every page:**
- `miscellaneous.vtuber`
- `miscellaneous.creator`
- `app.name`

| Page | Additional keywords |
|---|---|
| Home | `streaming`, `polar_fox`, `stars`, `mascot`, `handmade`, `plushies` |
| About | `polar_fox`, `mascot`, `stars`, `streaming`, `handmade`, `plushies` |
| Plushies | `plushies`, `handmade`, `stars` |
| Contact | `streaming`, `stars` |

---

## meta.content Quality Rules

- **≤160 characters** — Google truncates at 160
- Must mention **"Mellumine"**
- FR: start with `"Découvrez…"`, `"Bienvenue…"`, or `"Retrouvez…"`
- EN: start with `"Discover…"`, `"Welcome…"`, or `"Find…"`

**Example (FR, 104 chars):**
> "Découvrez la collection de peluches faites main par Mellumine, chacune cousue avec amour, étoile par étoile."

---

## OG Image

Default: `og-image.webp` (in `public/`) — the site-wide OG image.
`ogImageType` must always be `'image/webp'` (not `'image/jpeg'`).
`ogImageWidth: '1200'`, `ogImageHeight: '630'`.
