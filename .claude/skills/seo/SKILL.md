---
name: seo
description: >
  Reference and checklist for SEO metadata on any page.
  Use when writing, reviewing, or debugging useHead() and useSeoMeta() on any page.
disable-model-invocation: true
argument-hint: "<page path or page name>"
---

You are writing or reviewing SEO metadata for: $ARGUMENTS

The project uses `@nuxtjs/seo` v5. Every page needs both `useHead()` and `useSeoMeta()`.

---

## URL Setup (always comes first)

```typescript
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
// URL path segment without locale prefix and without leading slash
const urlEndPath = '{page-path}'            // e.g. 'plushies' or 'about'
// Path to OG image inside public/ (no leading slash)
const ogImageEndPath = 'og-image.webp'      // or a page-specific image

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
```

`route.path` includes the locale prefix (`/fr/...` or `/en/...`) so `canonicalUrl` is always locale-correct.

---

## useHead() — Complete Pattern

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

### Hreflang rules (NON-NEGOTIABLE)

- Always include **all 3**: `en-US`, `fr-FR`, `x-default`
- `x-default` **always** points to `/fr/` — French is the default locale
- Use `urlEndPath` (no locale prefix) and prepend `/en/` or `/fr/` manually
- For the home page: `href: computed(() => baseUrl.value)` for `x-default` (no path suffix)
- **Do NOT** use `route.path` for hreflang alternates — it carries the current locale

---

## useSeoMeta() — Complete Pattern

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
    // ... add page-specific keywords
  ],

  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})
```

`articleTag` values use `.value` directly (resolved strings, not reactive refs).
All other i18n values must be `computed(() => t(...))`.

---

## Reactive i18n rule (NON-NEGOTIABLE)

Inside `useHead()` and `useSeoMeta()`, **all** `t()` calls must be wrapped in `computed()`:

```typescript
// ✅ Reactive — updates when locale changes
content: computed(() => t('pages.plushies.meta.content'))

// ❌ Wrong — stale on locale switch
content: t('pages.plushies.meta.content')
```

Exception: `articleTag` resolves with `.value`:
```typescript
articleTag: [
  computed(() => t('miscellaneous.plushies')).value,  // ✅ resolved string
]
```

---

## Keyword Reference

**Always include these on every page:**
- `miscellaneous.vtuber`
- `miscellaneous.creator`
- `app.name`

**Add page-specific keywords:**

| Page | Additional keywords |
|---|---|
| Home | `streaming`, `polar_fox`, `stars`, `mascot`, `handmade`, `plushies` |
| About | `polar_fox`, `mascot`, `stars`, `streaming`, `handmade`, `plushies` |
| Plushies | `plushies`, `handmade`, `stars` |
| Contact | `streaming`, `stars` |

---

## meta.content Quality Rules (NON-NEGOTIABLE)

- **≤160 characters** — Google truncates at 160
- Must mention **"Mellumine"**
- Must describe the page content
- FR: natural French; EN: natural English (not a literal translation)

**Example (FR, 104 chars):**
> "Découvrez la collection de peluches faites main par Mellumine, chacune cousue avec amour, étoile par étoile."

---

## OG Image

Default: `og-image.webp` (in `public/`) — the site-wide OG image.
For future page-specific images: use a representative WebP image from `public/images/`.
`ogImageType` must always be `'image/webp'` (not `'image/jpeg'`).
