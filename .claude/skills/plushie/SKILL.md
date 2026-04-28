---
name: plushie
description: >
  Add a new plushie entry to data.ts and both locale files.
  Use when the user provides a new plushie to add to the collection.
disable-model-invocation: true
argument-hint: "<plushie name or id>"
---

You are adding a new plushie to the Mellumine collection: $ARGUMENTS

Read `app/utils/data.ts` and both locale files before starting.

---

## Required Information

If any of the following is missing, ask before proceeding:

1. **ID** — kebab-case unique identifier (e.g., `pink-cat`, `blue-star`)
   - Used as `id` and `i18nKey` in data.ts (converted to snake_case for i18nKey: `pink_cat`)
2. **Image files** — which views exist: `front` (required), `back` (required), `left` (optional), `right` (optional)
   - Filenames follow pattern: `{name}-front.webp`, `{name}-back.webp`, etc.
3. **FR title** — the plushie's name in French
4. **FR alt** — accessible description in French (5–12 words)
5. **EN title** — the plushie's name in English
6. **EN alt** — accessible description in English (5–12 words)

---

## Step 1: Verify images exist

Check that `public/images/plushies/` contains the expected `.webp` files.
If images are missing, warn the user and continue scaffolding.

---

## Step 2: Add to data.ts

In `app/utils/data.ts`, add a new entry to the `plushies` array:

```typescript
{
  id: '{name}',           // kebab-case (e.g., 'pink-cat')
  i18nKey: '{name}',      // snake_case (e.g., 'pink_cat')
  views: {
    front: '/images/plushies/{name}-front.webp',
    back: '/images/plushies/{name}-back.webp',
    // left and right only if the files exist:
    left: '/images/plushies/{name}-left.webp',
    right: '/images/plushies/{name}-right.webp',
  },
},
```

Insert the new entry at the appropriate position (typically end of the array).

---

## Step 3: Add translations (NON-NEGOTIABLE: both files in one edit)

**`i18n/locales/fr-FR.json`** — add under `pictures.plushies`:
```json
{
  "{i18nKey}": {
    "title": "FR title",
    "alt": "Description courte en français"
  }
}
```

**`i18n/locales/en-US.json`** — add under `pictures.plushies`:
```json
{
  "{i18nKey}": {
    "title": "EN title",
    "alt": "Short English description"
  }
}
```

**Translation rules:**
- `title`: the plushie's name (e.g., "Artikodin", "Chat rose")
- `alt`: describes what is visually shown (e.g., "Peluche Artikodin vu de face")
- Keep `alt` concise: 5–12 words
- English `alt` must be a natural English sentence — not a word-for-word translation
- Never add a key to one file without the other

---

## Step 4: Verify

Run `yarn lint` to confirm no issues.

---

## Checklist before reporting done

- [ ] Image files verified in `public/images/plushies/`
- [ ] New entry added to `plushies[]` array in `data.ts`
- [ ] `id` is kebab-case, `i18nKey` is snake_case
- [ ] Only existing view files are included (no broken paths)
- [ ] `pictures.plushies.{i18nKey}` added to `fr-FR.json`
- [ ] `pictures.plushies.{i18nKey}` added to `en-US.json`
- [ ] `yarn lint` passes
