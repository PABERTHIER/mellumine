---
name: i18n
description: >
  Manage translation entries in fr-FR.json and en-US.json.
  Use when adding, modifying, or reviewing i18n keys for pages, components, or images.
disable-model-invocation: true
argument-hint: "<section or key to add/update>"
---

You are managing i18n translations for: $ARGUMENTS

The project has two locale files that must always be kept in sync.
Read existing entries in `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json` before editing.

---

## The Two-File Rule (NON-NEGOTIABLE)

**Every change to `fr-FR.json` MUST have a matching change in `en-US.json` in the same edit.**
Never add a key to one file without the other. Never leave a key untranslated.

---

## Top-Level Key Structure

```
app.*                    — app name, global meta description
miscellaneous.*          — shared UI labels and SEO keywords
navigation.*             — nav link labels (home, about, plushies, contact)
pages.*                  — page-specific content and SEO metadata
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

## Page Metadata Keys

```json
"pages": {
  "{page}": {
    "tab_name": "Browser tab title",
    "meta": {
      "content": "SEO meta description ≤160 chars, must mention Mellumine"
    },
    "title": "Page heading",
    "subtitle": "Page subheading or tagline"
  }
}
```

---

## Plushie Picture Keys

```json
"pictures": {
  "plushies": {
    "{plushie_id}": {
      "title": "Descriptive name of the plushie",
      "alt": "Short accessible description of the plushie image"
    }
  }
}
```

- `{plushie_id}` matches the `i18nKey` field in `app/utils/data.ts`
- Title: the plushie's recognisable name (e.g., "Artikodin", "Renarde rose")
- Alt: describes what is visually shown (e.g., "Peluche Artikodin vu de face")
- Keep `alt` concise: 5–12 words

---

## Component Label Keys

```json
"components": {
  "{component_snake_case}": {
    "{key}": "label text"
  }
}
```

Example:
```json
"components": {
  "plushie_card": {
    "view_all_angles": "Voir toutes les vues"
  }
}
```

---

## Miscellaneous Keys

`miscellaneous.*` holds shared UI labels and SEO keywords.

Before adding a new `miscellaneous` key, **search both locale files** to check it doesn't already exist.

Existing keyword keys (non-exhaustive):
`vtuber`, `creator`, `handmade`, `plushies`, `streaming`, `polar_fox`, `stars`, `mascot`,
`loading`, `menu`, `close`, `back_to_top`, `follow_me`, `support_me`, `view_more`, `view_less`

---

## Translation Quality Guidelines

| Field | FR guideline | EN guideline |
|---|---|---|
| `tab_name` | Short, natural French label | Short, natural English label |
| `meta.content` | ≤160 chars, starts with "Découvrez…" or "Bienvenue…", mentions Mellumine | ≤160 chars, natural English, mentions Mellumine |
| `title` / `subtitle` | Natural French | Natural English adaptation |
| `pictures.*.alt` | Describes what is depicted — 5–12 words | Same, translated |
| `pictures.*.title` | Plushie name or description | Same |

---

## JSON Formatting Rules

- 2-space indent (matches `.editorconfig`)
- No trailing commas (strict JSON)
- Do not reformat or reorder unrelated sections when editing
- Preserve existing nesting depth and style
- Keys are `snake_case` — never camelCase or kebab-case
