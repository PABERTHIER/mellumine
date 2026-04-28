---
applyTo: "app/pages/**/*.vue"
---

# Page Instructions

## Overview

Every page in Mellumine must include complete SEO metadata. When creating or modifying a page, adhere strictly to the patterns described below.

---

## Script Requirements

### Page meta and composables
```typescript
definePageMeta({ layout: 'default' })

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
```

### URL configuration
```typescript
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = '{page-path}'         // e.g. 'plushies', 'about', 'contact'
const ogImageEndPath = 'og-image.webp'   // or a page-specific image

const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
```

### SEO — useHead()
- `title`: use `pages.{page}.tab_name` i18n key
- `meta description`: use `pages.{page}.meta.content` i18n key (≤160 chars)
- `keywords`: relevant `miscellaneous.*` keys, always include `app.name`
- `link`: canonical + hreflang alternates (en-US, fr-FR, x-default pointing to `/fr/`)

### SEO — useSeoMeta()
- `ogTitle`, `twitterTitle`, `appleMobileWebAppTitle`: `'%s %separator %siteName'`
- `description`, `ogDescription`, `twitterDescription`: `pages.{page}.meta.content`
- `ogImage`, `twitterImage`, `msapplicationTileImage`: full URL to OG image
- `ogImageType` / `twitterImageType`: always `'image/webp'`
- `ogImageWidth: '1200'`, `ogImageHeight: '630'`
- `ogType`: `'article'`
- `articleTag`: array of resolved keyword strings (use `.value`)

---

## Hreflang (NON-NEGOTIABLE)

Always include exactly these 3 hreflang entries:
```typescript
{ rel: 'alternate', href: computed(() => `${baseUrl.value}/en/${urlEndPath}`), hreflang: 'en-US' },
{ rel: 'alternate', href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`), hreflang: 'fr-FR' },
{ rel: 'alternate', href: computed(() => `${baseUrl.value}/fr/${urlEndPath}`), hreflang: 'x-default' },
```

`x-default` always points to `/fr/` — French is the default locale.

---

## Internal Navigation

Always use `<NuxtLinkLocale>` for internal links:
```vue
<NuxtLinkLocale to="/about">À propos</NuxtLinkLocale>
```

Never use `<NuxtLink :to="localePath('...')">`.

---

## Checklist

- [ ] `definePageMeta({ layout: 'default' })` present
- [ ] `useHead()` with title, description, keywords, canonical, 3 hreflang entries
- [ ] `useSeoMeta()` with OG + Twitter + articleTag + msapplicationTileImage
- [ ] All `t()` in `useHead()`/`useSeoMeta()` wrapped in `computed()`
- [ ] `articleTag` values use `.value`
- [ ] `ogImageType: 'image/webp'`
- [ ] Translations added to both `fr-FR.json` and `en-US.json`
- [ ] `yarn lint` passes
