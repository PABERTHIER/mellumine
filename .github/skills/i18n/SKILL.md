---
name: i18n
description: "i18n management for Mellumine: key structure, naming conventions, both-locale rule, and translation quality guidelines. Use when adding or modifying translation entries."
---

# i18n Skill

The project uses `@nuxtjs/i18n` v10 with **two locales** — French (default) and English.
All user-visible text lives in the translation files. Never hardcode French or English strings in Vue files.

---

## Configuration

```typescript
// nuxt.config.ts
i18n: {
  defaultLocale: 'fr',
  langDir: 'locales',
  strategy: 'prefix',
  locales: [
    { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
    { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
  ],
}
```

**Files:** `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`

---

## Top-Level Key Structure

```
app.*                    — app name, global meta description
miscellaneous.*          — shared UI labels and SEO keywords
navigation.*             — nav link labels (home, about, plushies, contact)
pages.*                  — page-specific content and metadata
  pages.home.*
  pages.about.*
  pages.plushies.*
  pages.contact.*
components.*             — component-specific labels
  components.site_header.*
  components.language_switcher.*
  components.plushie_card.*
  components.social_card.*
pictures.*               — image alt texts and titles
  pictures.{image_key}.title
  pictures.{image_key}.alt
  pictures.plushies.{plushie_id}.title
  pictures.plushies.{plushie_id}.alt
```

---

## Page Keys

```
pages.{page}.tab_name          — browser tab title
pages.{page}.meta.content      — SEO meta description (≤160 chars)
pages.{page}.title             — page heading
pages.{page}.subtitle          — page subheading
```

Where `{page}` = `home`, `about`, `plushies`, `contact`, or a new page name.

---

## Plushie Picture Keys

```
pictures.plushies.{i18nKey}.title   — plushie display name
pictures.plushies.{i18nKey}.alt     — accessible image description
```

Where `{i18nKey}` matches the `i18nKey` field in `app/utils/data.ts` (snake_case).

---

## The Two-File Rule (NON-NEGOTIABLE)

**Every change to `fr-FR.json` must have a matching change in `en-US.json`.**
Never add a key to one file without adding it to the other.
The English translation must be a proper natural English adaptation — not a word-for-word literal translation.

---

## In Vue Files

```typescript
const { t } = useI18n()

// Simple usage (not in meta tags)
t('pages.plushies.title')

// Reactive (for meta tags — must be wrapped in computed())
computed(() => t('pages.plushies.meta.content'))

// In template
{{ t('miscellaneous.follow_me') }}
// or shorthand
{{ $t('miscellaneous.follow_me') }}
```

---

## Translation Quality Guidelines

| Field | FR guideline | EN guideline |
|---|---|---|
| `tab_name` | Short, natural French label | Short, natural English label |
| `meta.content` | ≤160 chars, mentions Mellumine, starts with "Découvrez…" | ≤160 chars, mentions Mellumine, natural English |
| `title` | Natural French | Natural English |
| `subtitle` | Poetic/evocative — matching brand voice | Natural English adaptation |
| `pictures.*.alt` | Describes what is depicted — 5–12 words | Translated, descriptive |
| `pictures.*.title` | Plushie name or description | Same |

---

## Miscellaneous Keys

`miscellaneous.*` contains shared labels used in the UI and as SEO keywords.
Before adding a new key, **search both locale files** to check it doesn't already exist.

Existing keyword keys include (non-exhaustive):
`vtuber`, `creator`, `handmade`, `plushies`, `streaming`, `polar_fox`, `stars`, `mascot`,
`loading`, `menu`, `close`, `back_to_top`, `skip_to_content`, `follow_me`, `support_me`,
`view_more`, `view_less`, `made_with_love`, `all_rights_reserved`
