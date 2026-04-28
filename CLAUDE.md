# CLAUDE.md

This file provides project context for Claude Code.

## Core Reference

@AGENTS.md

---

## Claude Code — Specific Notes

### Environment

- **OS**: Windows. Use PowerShell commands (not bash).
- **Package manager**: Yarn 4 — always use `yarn`, never `npm`.
- **Dev server**: `yarn dev` (port 3000). After changes, `yarn lint` to verify.

### Auto-imports in this project

Nuxt auto-imports mean you must **never** manually import these in `.vue` files:
`ref`, `computed`, `watch`, `watchEffect`, `reactive`, `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRouter`, `useRuntimeConfig`, `useLocalePath`, `navigateTo`, `definePageMeta`

You **must** manually import:

- Types: `import type { Plushie } from '~/types/content'`
- Types: `import type { SocialLink } from '~/types/content'`
- Types: `import type { ImageSource } from '~/types/content'`
- Data: `import { plushies } from '~/utils/data'` (NOT auto-imported)
- Data: `import { socials, supports, credits } from '~/utils/data'` (NOT auto-imported)

### Where things live

| What | Where |
|---|---|
| Pages | `app/pages/{page}.vue` |
| Components | `app/components/*.vue` (auto-imported) |
| Composables | `app/composables/*.ts` (auto-imported) |
| Types | `app/types/content.ts`, `app/types/locales.ts` |
| Static data | `app/utils/data.ts` — `plushies[]`, `socials[]`, `supports[]`, `credits[]` |
| FR translations | `i18n/locales/fr-FR.json` |
| EN translations | `i18n/locales/en-US.json` |
| SCSS design tokens | `app/styles/variables.scss` (auto-injected into all SFCs) |
| Global styles | `app/styles/default.scss`, `app/styles/keyframes.scss` |
| Tailwind + CSS vars | `app/assets/css/main.css` |
| Plushie images | `public/images/plushies/*.webp` |
| Character images | `public/images/mellumine/*.webp` |
| Misc images | `public/images/misc/*.webp` |

### Key composables

- `useReveal()` — returns `{ el, visible }` for scroll-in animation. Attach `el` to a `ref` on a section element, bind `visible` to an `is-visible` class.
- All VueUse composables from `@vueuse/nuxt` are auto-imported.

### Internal navigation

Always use `<NuxtLinkLocale to="...">` for internal links — never `<NuxtLink>` with `localePath()`.

---

## Available Skills

Invoke with `/skill-name [arguments]` in Claude Code.

| Skill | Invocation | When to use |
|---|---|---|
| seo | `/seo` | Write or review SEO metadata on a page |
| i18n | `/i18n` | Add or fix translation entries |
| nuxt-vue-patterns | `/nuxt-vue-patterns` | Reference Vue/Nuxt conventions |
| plushie | `/plushie "Artikodin"` | Add a new plushie entry |

## Available Agents

| Agent | When to use |
|---|---|
| `page-reviewer` | Review a page for SEO completeness, i18n coverage, and code quality |

## Available Commands

| Command | Invocation | When to use |
|---|---|---|
| new-page | `/new-page` | Create a new content page with full SEO |
| add-plushie | `/add-plushie` | Add a new plushie to data.ts + locale files |
| add-translations | `/add-translations` | Add i18n entries to both locale files only |
