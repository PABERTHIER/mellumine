---
name: nuxt-vue-patterns
description: "Vue 3 + Nuxt 4 best practices for Mellumine: Composition API, auto-imports, TypeScript, SCSS, CSS custom properties, and component conventions."
---

# Nuxt & Vue Patterns Skill

This skill documents the Vue 3 / Nuxt 4 conventions used across Mellumine.
Follow these patterns for all new code and when modifying existing files.

---

## SFC Structure (always in this order)

```vue
<template>
  <!-- markup -->
</template>

<script setup lang="ts">
// imports (data utils and types — the only manual imports needed)
// definePageMeta
// composables
// reactive state
// computed properties
// functions
</script>

<style lang="scss" scoped>
/* styles */
</style>
```

**Rules:**
- Always `<script setup lang="ts">` — never Options API, never `<script>` without `setup`
- Always `lang="scss" scoped` on styles — never plain CSS, never unscoped
- Template first, then script, then style

---

## Auto-Imports — Do Not Import These

Nuxt auto-imports the following — adding a manual import is an error:

**Vue reactivity:** `ref`, `computed`, `watch`, `watchEffect`, `reactive`, `readonly`, `toRef`, `toRefs`

**Nuxt composables:** `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRouter`, `useRuntimeConfig`, `useNuxtApp`, `useState`, `useFetch`, `useAsyncData`, `navigateTo`, `definePageMeta`, `useLocalePath`

**VueUse:** all composables from `@vueuse/nuxt` (`useIntersectionObserver`, `useMouse`, etc.)

---

## What Must Be Manually Imported

```typescript
// Data utilities — NOT auto-imported
import { plushies } from '~/utils/data'
import { socials, supports, credits } from '~/utils/data'

// Types always require explicit import
import type { Plushie } from '~/types/content'
import type { SocialLink } from '~/types/content'
import type { ImageSource } from '~/types/content'
```

---

## Internal Navigation

Always use `<NuxtLinkLocale>` for internal links:

```vue
<!-- ✅ Correct -->
<NuxtLinkLocale to="/about">À propos</NuxtLinkLocale>
<NuxtLinkLocale to="/plushies" class="btn">Peluches</NuxtLinkLocale>

<!-- ❌ Wrong — do not use localePath() in this project -->
<NuxtLink :to="localePath('/about')">À propos</NuxtLink>
```

---

## SCSS Variables

Component `<style>` blocks use SCSS variables from `app/styles/variables.scss`, auto-injected via Vite `additionalData`:

```scss
<style lang="scss" scoped>
.my-element {
  color: $aurora-1;            /* ✅ purple #7c5cff */
  color: $aurora-2;            /* ✅ pink #ff8fd1 */
  color: $aurora-3;            /* ✅ cyan #5be0ff */
  font-family: $font-display;  /* ✅ Cormorant Garamond */
  font-family: $font-sans;     /* ✅ Quicksand */
  z-index: $header-z-index;    /* ✅ 100 */

  color: var(--aurora-1);      /* ❌ do not use CSS vars in <style> blocks */
}
</style>
```

Runtime CSS custom properties (`--accent`, `--i`, `--header-height`) remain valid only when the value is set dynamically per-element via inline styles or JavaScript.

---

## useReveal() Composable

For scroll-in animations, use the custom `useReveal()` composable:

```typescript
const { el: myEl, visible: myVisible } = useReveal()
```

In the template:
```vue
<section
  ref="myEl"
  :class="['section', 'fade-in-up', { 'is-visible': myVisible }]">
  ...
</section>
```

---

## Image Best Practices

```vue
<!-- Above-the-fold (hero) image — use fetchpriority -->
<img
  src="/images/mellumine/mellumine-look.webp"
  :alt="$t('pictures.mellumine_look.alt')"
  fetchpriority="high"
  decoding="async"
  width="640"
  height="900" />

<!-- Below-the-fold image — use lazy loading -->
<img
  src="/images/mellumine/mellumine-1.webp"
  :alt="$t('pictures.mellumine_1.alt')"
  loading="lazy"
  decoding="async"
  width="600"
  height="800" />
```

- All images must be **WebP** format
- Always set `width` and `height` to prevent layout shift
- Always bind `:alt` to an i18n key — never hardcode alt text

---

## TypeScript Patterns

```typescript
// Typed data references
const items: Plushie[] = plushies

// Computed with type inference
const baseUrl = ref(runtimeConfig.public.i18n.baseUrl)
const canonicalUrl = computed(() => `${baseUrl.value}${route.path}`)
```

`strict: true` is enabled in `tsconfig.json` — no implicit `any`, use proper types.

---

## Key Components

### PlushieCard
```vue
<PlushieCard v-for="p in plushies" :key="p.id" :plushie="p" />
```
Handles multi-view display, thumbnails, and view switching automatically.

### SocialCard
```vue
<SocialCard v-for="s in socials" :key="s.id" :link="s" />
```

### SiteHeader / SiteFooter
Auto-imported layout components — never import manually.

---

## Linting

```bash
yarn lint        # check
yarn lint:fix    # auto-fix
```

Rules:
- `no-console: warn` — remove debug logs before committing
- Prettier is integrated — formatting is enforced automatically
