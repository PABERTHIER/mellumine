---
description: "Add i18n translations to both fr-FR.json and en-US.json without creating a page or component."
---

# Add Translations

You are adding i18n translation entries for the Mellumine project.

## Required Information

Before starting, you **must** have:

1. **Section** — which top-level key: `pages`, `components`, `pictures`, `miscellaneous`
2. **Key path** — where to add the key (e.g., `pages.plushies.new_section_title`)
3. **FR value** — French translation
4. **EN value** — English translation (natural English, not a literal translation)

## What to produce

Edit **both** `i18n/locales/fr-FR.json` and `i18n/locales/en-US.json`.

Add the new key at the correct location in the JSON structure, following the existing nesting pattern.

## Rules

- Use `snake_case` for all JSON keys — never camelCase or kebab-case
- Never add a key to one file without adding it to the other
- `meta.content` values must be ≤160 characters and mention "Mellumine"
- Preserve existing JSON structure — do not reformat unrelated sections
- Do not add trailing commas (strict JSON)
- 2-space indent

## Key Structure Reference

```
app.*                    — app name, global meta description
miscellaneous.*          — shared UI labels and SEO keywords
navigation.*             — nav link labels
pages.{page}.*           — page-specific content and SEO
components.{name}.*      — component-specific labels
pictures.{key}.*         — image alt texts and titles
pictures.plushies.{id}.* — plushie image descriptions
```
