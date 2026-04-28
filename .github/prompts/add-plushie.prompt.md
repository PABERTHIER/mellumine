---
description: "Add a new plushie to data.ts and both fr-FR.json and en-US.json."
---

# Add New Plushie

You are adding a new plushie to the Mellumine collection.

## Required Information

Before starting, you **must** have:

1. **ID** — kebab-case unique identifier (e.g., `pink-cat`)
   - The `i18nKey` will be the snake_case equivalent (e.g., `pink_cat`)
2. **Image views available** — at minimum `front` and `back`
   - Filenames follow: `{name}-front.webp`, `{name}-back.webp`, `{name}-left.webp`, `{name}-right.webp`
3. **FR title** — the plushie's name in French
4. **FR alt** — short accessible description (5–12 words) in French
5. **EN title** — the plushie's name in English
6. **EN alt** — short accessible description (5–12 words) in English

## What to produce

### 1. Update `app/utils/data.ts`

Add to the `plushies` array:
```typescript
{
  id: '{name}',
  i18nKey: '{name_snake}',
  views: {
    front: '/images/plushies/{name}-front.webp',
    back: '/images/plushies/{name}-back.webp',
    // Include left/right only if files exist
  },
},
```

### 2. Update both locale files

In **`i18n/locales/fr-FR.json`** and **`i18n/locales/en-US.json`**, add under `pictures.plushies`:

```json
{
  "{name_snake}": {
    "title": "Plushie name",
    "alt": "Short accessible description"
  }
}
```

## Rules

- Never add a key to one locale file without adding it to the other
- Only include view paths for image files that actually exist in `public/images/plushies/`
- `id` is kebab-case, `i18nKey` is snake_case
- Run `yarn lint` after making changes
