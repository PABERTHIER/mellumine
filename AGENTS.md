# AGENTS.md

This file provides shared guidance for AI coding agents (Claude Code, GitHub Copilot, and others)
when working with code in this repository.

---

## Project Overview

**Mellumine** website is the VTuber portfolio for Mellumine, a French-speaking polar fox VTuber from the Stars. It showcases her universe, handmade plushies, mascot, and social links. Built with **Nuxt 4** (Vue 3 + TypeScript), deployed on **Vercel** as a statically pre-rendered site.

The primary development workflows are:

- **Adding new plushies** — add an entry to `data.ts` and translations to both locale files
- **Adding new pages** — create a new Vue page with full SEO metadata and translations

---

## Repository Layout

```
mellumine/
├── app/
│   ├── pages/                    # Nuxt file-based routing
│   │   ├── index.vue             # Home page
│   │   ├── about.vue             # About Mellumine page
│   │   ├── plushies.vue          # Plushies collection page
│   │   └── contact.vue           # Contact & socials page
│   ├── components/               # Auto-imported Vue components
│   │   ├── SiteHeader.vue        # Navigation header
│   │   ├── SiteFooter.vue        # Footer
│   │   ├── PlushieCard.vue       # Plushie display card with views
│   │   ├── SocialCard.vue        # Social/support link card
│   │   ├── LanguageSwitcher.vue  # FR/EN locale switcher
│   │   ├── Starfield.vue         # Animated starfield background
│   │   └── MelluGremlin.vue      # Animated gremlin easter egg
│   ├── composables/
│   │   └── useReveal.ts          # Intersection Observer for scroll-in animations
│   ├── types/
│   │   ├── content.ts            # ImageSource, Plushie, SocialLink, etc.
│   │   └── locales.ts            # LocaleCode union type ('fr' | 'en')
│   ├── utils/
│   │   └── data.ts               # Static data: plushies[], socials[], supports[], credits[]
│   ├── styles/
│   │   ├── variables.scss        # SCSS design tokens (colors, fonts, breakpoints, z-indexes)
│   │   ├── keyframes.scss        # Global keyframe animations (aurora-shift, float-slow, twinkle)
│   │   └── default.scss          # Global resets and utility classes
│   ├── assets/css/
│   │   └── main.css              # Tailwind imports + @theme static + :root CSS custom properties
│   ├── layouts/
│   │   └── default.vue           # Default layout (header + footer)
│   └── app.vue                   # Root component
├── i18n/locales/                 # Translation files
│   ├── fr-FR.json                # French (default locale)
│   └── en-US.json                # English
├── public/                       # Static assets
│   ├── images/
│   │   ├── plushies/             # Plushie images (WebP, multi-view)
│   │   ├── mellumine/            # Character illustrations
│   │   └── misc/                 # Logos, icons, OG image
├── nuxt.config.ts                # Nuxt configuration
├── package.json                  # Dependencies and scripts
└── .editorconfig                 # Editor formatting rules
```

---

## Tech Stack

| Purpose            | Technology                          |
|--------------------|-------------------------------------|
| Framework          | Nuxt 4 (Vue 3 + TypeScript)         |
| i18n               | @nuxtjs/i18n (prefix strategy)      |
| SEO                | @nuxtjs/seo (OG, Twitter, Schema)   |
| UI components      | @nuxt/ui                            |
| Fonts              | @nuxt/fonts (Google Fonts)          |
| Utilities          | @vueuse/nuxt                        |
| Smooth scroll      | Lenis                               |
| Linting            | ESLint + Prettier                   |
| Package manager    | Yarn 4.13.0                         |
| Deployment         | Vercel (static pre-rendering)       |

---

## Git Policy — AI Agents Must Never Commit or Push

**AI agents (Claude Code, GitHub Copilot, and any other tool) are strictly forbidden from running any destructive or history-altering git commands without explicit user instruction.**

### Permanently forbidden without explicit user request

- `git commit` — never commit on behalf of the user
- `git push` — never push to any remote
- `git reset` — never alter HEAD or the index
- `git rebase` — never rebase branches
- `git merge` — never merge branches
- `git cherry-pick` — never cherry-pick commits
- `git revert` — never create revert commits
- `git stash` — never stash changes
- `git tag` — never create or delete tags
- `git branch -D` — never delete branches
- `git am` — never apply patches

### Allowed read-only git operations

- `git status`, `git diff`, `git log`, `git show` — inspection only

### Rule

If the user says "commit the changes" or "push", **ask for confirmation first** and show exactly what will be committed/pushed before running the command. Never commit speculatively at the end of a task.

---

## Build and Dev Commands

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev

# Build for production
yarn build

# Generate static site
yarn generate

# Preview production build
yarn preview

# Lint
yarn lint

# Lint and auto-fix
yarn lint:fix
```

---

## Code Style

- **Indent**: 2 spaces
- **End of line**: LF
- **Charset**: utf-8
- **Vue SFC order**: `<template>`, `<script setup lang="ts">`, `<style lang="scss" scoped>`
- **Prefer Composition API** with `<script setup>`
- **Use Nuxt auto-imports** — `useI18n()`, `useHead()`, `useSeoMeta()`, `useRoute()`, `useRuntimeConfig()`, `ref()`, `computed()`, `definePageMeta()` are auto-imported
- **Import types explicitly**: `import type { Plushie } from '~/types/content'`
- **SCSS scoped styles**: all component styles use `<style lang="scss" scoped>`
- **SCSS variables** for design tokens: use `$aurora-1`, `$font-display`, `$header-z-index` etc. (auto-injected via Vite `additionalData`) — not CSS custom properties in `<style>` blocks
- **CSS custom properties** remain in `:root` for Tailwind `@theme` and runtime dynamic values only (e.g. `--accent`, `--i`, `--header-height`)
- **No inline comments** unless the logic is genuinely non-obvious
- Run `yarn lint` before committing

---

## Internationalization (i18n)

**Default locale**: French (`fr`)
**Strategy**: Prefix-based (`/fr/path` and `/en/path`)
**Base URL**: `https://mellumine.vercel.app`

### Translation Key Structure

Translation files are located in `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`.

**Top-level structure:**

```
app.*                    — app name, global meta description
miscellaneous.*          — shared UI labels and SEO keywords
navigation.*             — nav link labels (home, about, plushies, contact)
pages.*                  — page-specific content and SEO metadata
components.*             — component-specific labels
pictures.*               — image alt text and titles
```

**Page metadata keys** follow the pattern:

```
pages.{page}.tab_name
pages.{page}.meta.content
pages.{page}.title
pages.{page}.subtitle
```

**Component label keys** follow the pattern:

```
components.{component_snake_case}.{key}
```

**Image description keys** follow the pattern:

```
pictures.{image_key}.title
pictures.{image_key}.alt
```

**Plushie image keys** follow the pattern:

```
pictures.plushies.{plushie_id}.title
pictures.plushies.{plushie_id}.alt
```

**Shared labels** are in `miscellaneous.*`.

---

## Image Conventions

### Storage

Images are stored in `public/images/` with the following structure:

```
public/images/plushies/{name}-front.webp   # plushie front view
public/images/plushies/{name}-back.webp    # plushie back view
public/images/plushies/{name}-left.webp    # optional left view
public/images/plushies/{name}-right.webp   # optional right view
public/images/mellumine/mellumine-*.webp   # character illustrations
public/images/misc/                        # logo, OG image, other
```

All images must be in **WebP** format.

---

## Plushie Data Management (Core Pattern)

**This is the main recurring workflow.** Plushies are defined in `app/utils/data.ts`.

### Plushie entry structure

```typescript
{
  id: 'artikodin',              // unique kebab-case id
  i18nKey: 'artikodin',         // matches pictures.plushies.{i18nKey} in locale files
  views: {
    front: '/images/plushies/artikodin-front.webp',   // required
    back: '/images/plushies/artikodin-back.webp',     // required
    left: '/images/plushies/artikodin-left.webp',     // optional
    right: '/images/plushies/artikodin-right.webp',   // optional
  },
}
```

### Required i18n entries for a new plushie

Add under `pictures.plushies.{i18nKey}` in **both** locale files:

```json
{
  "{i18nKey}": {
    "title": "Descriptive name of the plushie",
    "alt": "Short accessible description of the plushie image"
  }
}
```

---

## Page Architecture (SEO Pattern)

Every page must follow this script pattern:

```typescript
definePageMeta({ layout: 'default' })

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const urlEndPath = '{page-path}'         // without locale prefix, no leading slash
const ogImageEndPath = 'og-image.webp'  // or a page-specific image

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
    // ... page-specific keywords
    computed(() => t('app.name')).value,
  ],
  appleMobileWebAppTitle: '%s %separator %siteName',
  msapplicationTileImage: `${baseUrl.value}/${ogImageEndPath}`,
})
```

### Hreflang (NON-NEGOTIABLE)

- Always include all 3: `en-US`, `fr-FR`, `x-default`
- `x-default` always points to `/fr/` (French is the default locale)
- For the home page, use `${baseUrl.value}/fr` (no path suffix) for `x-default`

---

## Navigation & Links

Use `<NuxtLinkLocale>` for all internal links — it automatically prepends the locale prefix:

```vue
<NuxtLinkLocale to="/about">À propos</NuxtLinkLocale>
<NuxtLinkLocale to="/plushies">Peluches</NuxtLinkLocale>
```

Never use `<NuxtLink>` with `localePath()` — this project uses `NuxtLinkLocale` instead.

---

## SCSS Variables

Component `<style>` blocks use SCSS variables from `app/styles/variables.scss`, which is auto-injected into every Vue SFC via Vite `additionalData`:

```scss
<style lang="scss" scoped>
.my-class {
  color: $aurora-1;           /* purple #7c5cff */
  font-family: $font-display; /* Cormorant Garamond */
  background: $aurora-2;      /* pink #ff8fd1 */
  z-index: $header-z-index;   /* 100 */
}
</style>
```

Key SCSS variables (defined in `app/styles/variables.scss`):

| Variable | Value / Description |
|---|---|
| `$aurora-1` | `#7c5cff` — purple |
| `$aurora-2` | `#ff8fd1` — pink |
| `$aurora-3` | `#5be0ff` — cyan |
| `$font-display` | `'Cormorant Garamond', serif` |
| `$font-sans` | `'Quicksand', sans-serif` |
| `$text-color` | `#f5f1ff` |
| `$text-muted` | `rgba($text-color, 0.75)` |
| `$header-z-index` | `100` |
| `$sm`, `$md`, `$lg` | `640px`, `768px`, `1024px` (breakpoints) |

CSS custom properties (`--aurora-1`, `--font-display`, etc.) remain in `:root` for Tailwind `@theme` compatibility only — do **not** use them in component `<style>` blocks.

---

## Available Skills

Invoke with `/skill-name` in Copilot Chat. Claude Code loads them via `CLAUDE.md` imports.

| Skill | When to use |
|---|---|
| `/seo` | Writing or reviewing SEO metadata: `useHead`, `useSeoMeta`, hreflang, OG |
| `/i18n` | Managing translations: key structure, naming conventions, two-locale rule |
| `/nuxt-vue-patterns` | Vue 3 / Nuxt 4 conventions: Composition API, auto-imports, SCSS, components |
| `/plushie` | Adding a new plushie to data.ts and both locale files |

---

## Available Prompts (Copilot Chat) / Commands (Claude Code)

| Name | When to use |
|---|---|
| `new-page` | Create a new content page end-to-end with SEO and translations |
| `add-plushie` | Add a new plushie entry to data.ts + both locale files |
| `add-translations` | Add i18n entries to both locale files only |

---

## Available Instructions (auto-applied by Copilot)

| File | Applies to |
|---|---|
| `page.instructions.md` | `app/pages/**/*.vue` — SEO pattern, hreflang rules |
| `vue-nuxt.instructions.md` | `app/**/*.vue` — Composition API, auto-imports, SCSS |
| `i18n.instructions.md` | `i18n/**/*.json` — key structure, two-locale rule |
