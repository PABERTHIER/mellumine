---
name: plushie
description: "Add a new plushie to the Mellumine collection: update data.ts and both locale files. Use when adding any new plushie to the site."
---

# Plushie Skill

This skill describes how to add a new plushie to the Mellumine collection.

---

## Data Structure

Plushies are defined in `app/utils/data.ts` in the `plushies` array:

```typescript
export const plushies: Plushie[] = [
  {
    id: 'artikodin',           // kebab-case unique id
    i18nKey: 'artikodin',      // snake_case — matches pictures.plushies.{i18nKey} in locale files
    dimensions: '30 × 25 cm', // optional — physical dimensions (width × height)
    views: {
      front: '/images/plushies/artikodin-front.webp',   // required
      back: '/images/plushies/artikodin-back.webp',     // required
      left: '/images/plushies/artikodin-left.webp',     // optional
      right: '/images/plushies/artikodin-right.webp',   // optional
    },
  },
]
```

---

## Naming Conventions

| Context | Convention | Example |
|---|---|---|
| `id` | kebab-case | `pink-cat` |
| `i18nKey` | snake_case | `pink_cat` |
| Image folder | `public/images/plushies/` | `/images/plushies/pink-cat-front.webp` |
| i18n key | `pictures.plushies.{i18nKey}` | `pictures.plushies.pink_cat` |

---

## Complete Workflow

### 1. Verify images

Check that `public/images/plushies/` contains the expected `.webp` files:
- `{name}-front.webp` — required
- `{name}-back.webp` — required
- `{name}-left.webp` — optional
- `{name}-right.webp` — optional

Only include view keys for image files that actually exist.

### 2. Add entry to data.ts

```typescript
// In app/utils/data.ts, add to the plushies array:
{
  id: '{name}',
  i18nKey: '{name_snake}',
  dimensions: '{width} × {height} cm',  // optional
  views: {
    front: '/images/plushies/{name}-front.webp',
    back: '/images/plushies/{name}-back.webp',
    // Include left/right only if files exist
  },
},
```

### 3. Add translations (both files in one edit)

**`i18n/locales/fr-FR.json`** — add under `pictures.plushies`:
```json
{
  "{name_snake}": {
    "title": "Nom de la peluche en français",
    "alt": "Description courte de l'image (5–12 mots)",
    "description": "Brève présentation de la peluche (1–2 phrases)"
  }
}
```

**`i18n/locales/en-US.json`** — add under `pictures.plushies`:
```json
{
  "{name_snake}": {
    "title": "Plushie name in English",
    "alt": "Short English description (5–12 words)",
    "description": "Brief presentation of the plushie (1–2 sentences)"
  }
}
```

### 4. Verify

Run `yarn lint` to confirm no issues.

---

## Translation Quality Rules

| Field | Rule |
|---|---|
| `title` | The plushie's recognisable name |
| `alt` (FR) | Describes what is shown: e.g., "Peluche Artikodin vu de face, bleu et blanc" |
| `alt` (EN) | Natural English: e.g., "Artikodin plushie front view, blue and white" |
| `description` (FR) | Creative 1–2 sentence presentation of the plushie |
| `description` (EN) | Natural English adaptation of the FR description |

- Keep `alt` to 5–12 words
- Never add a key to one locale file without adding it to the other

---

## Checklist before reporting done

- [ ] Image files verified in `public/images/plushies/`
- [ ] Entry added to `plushies[]` in `data.ts`
- [ ] `id` is kebab-case, `i18nKey` is snake_case
- [ ] Only existing view files included
- [ ] `pictures.plushies.{i18nKey}` added to `fr-FR.json`
- [ ] `pictures.plushies.{i18nKey}` added to `en-US.json`
- [ ] `yarn lint` passes
