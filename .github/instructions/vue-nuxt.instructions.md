---
applyTo: "app/**/*.vue"
---

# Vue & Nuxt File Instructions

## Script Block

Always use `<script setup lang="ts">`. Never use Options API or `<script>` without `setup`.

### Auto-imports — NEVER import these manually

```typescript
// ❌ These will trigger lint errors (unnecessary imports)
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead, useSeoMeta } from '#imports'
```

Nuxt auto-imports: `ref`, `computed`, `watch`, `watchEffect`, `reactive`, `toRef`, `toRefs`, `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRouter`, `useRuntimeConfig`, `useNuxtApp`, `useState`, `navigateTo`, `definePageMeta`, `useLocalePath`

VueUse composables from `@vueuse/nuxt` are also auto-imported.

### DO import manually

```typescript
// Data utilities
import { plushies } from '~/utils/data'
import { socials, supports, credits } from '~/utils/data'

// Types
import type { Plushie } from '~/types/content'
import type { SocialLink } from '~/types/content'
import type { ImageSource } from '~/types/content'
```

---

## Template Block

- Components are auto-imported — never manually register or import them in `<script setup>`
- Always use `<NuxtLinkLocale to="...">` for internal navigation links:
  ```vue
  <NuxtLinkLocale to="/plushies">Peluches</NuxtLinkLocale>
  ```
- Use `:prop="value"` (v-bind shorthand) for dynamic props
- Bind image `:alt` to an i18n key — never hardcode alt text
- Always set `width` and `height` on `<img>` elements

---

## Style Block

Always `<style lang="scss" scoped>`. Never:
- Plain CSS (`<style>`)
- Unscoped styles (`<style lang="scss">` without `scoped`)
- Inline styles on elements

Use SCSS variables for theming — they are auto-injected from `app/styles/variables.scss` via Vite `additionalData`:
```scss
.my-class {
  color: $aurora-1;            /* ✅ purple #7c5cff */
  font-family: $font-display;  /* ✅ Cormorant Garamond */
  z-index: $header-z-index;    /* ✅ 100 */

  color: var(--aurora-1);      /* ❌ do not use CSS vars in <style> blocks */
}
```

Runtime CSS custom properties (`--accent`, `--i`, `--header-height`) remain valid only when the value is set dynamically per-element via inline styles or JavaScript.

---

## Reactive Values in Meta Tags

i18n values used in `useHead()` and `useSeoMeta()` must be wrapped in `computed()`:

```typescript
// ✅ correct — reactive
content: computed(() => t('pages.plushies.meta.content'))

// ❌ wrong — not reactive, won't update on locale switch
content: t('pages.plushies.meta.content')
```

Exception: `articleTag` array values use `.value` directly (already resolved):
```typescript
articleTag: [
  computed(() => t('miscellaneous.plushies')).value,  // ✅
]
```

---

## TypeScript Strictness

- `strict: true` is enabled — no implicit `any`
- Always type data imports explicitly when used in reactive contexts
- Use `const` for everything that doesn't need reassignment
