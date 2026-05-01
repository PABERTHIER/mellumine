# GitHub Copilot Repository Instructions

This project uses shared agent instructions defined in `AGENTS.md` at the repository root.
Copilot reads both this file and `AGENTS.md` automatically.

This file provides Copilot-specific behavioral guidance that complements `AGENTS.md`.

## Copilot-Specific Guidelines

### Code Generation

- Use `<script setup lang="ts">` for all Vue SFCs (never Options API)
- Nuxt auto-imports are available — do NOT manually import `ref`, `computed`, `useI18n`, `useHead`, `useSeoMeta`, `useRoute`, `useRuntimeConfig`, `useLocalePath`, `definePageMeta`
- DO manually import data and types:
  - `import { plushies } from '~/utils/data'`
  - `import type { Plushie } from '~/types/content'`
- Use `<NuxtLinkLocale to="...">` for all internal links (never `<NuxtLink>` + `localePath()`)
- Use **SCSS variables** (`$aurora-1`, `$font-display`, `$header-z-index`) — auto-injected from `app/styles/variables.scss` — not CSS custom properties in `<style>` blocks
- All styles must use `<style lang="scss" scoped>`
- Follow `.editorconfig`: 2-space indent, LF line endings, utf-8

### When Suggesting Code Changes

- Match existing code patterns in the same file/project
- Always include full SEO metadata (`useHead` + `useSeoMeta`) on pages
- Use `computed()` for reactive i18n values in meta tags
- All image paths start with `/images/` (relative to `public/`)
- Always set `loading="lazy"` on images (except hero images which use `fetchpriority="high"`)
- Bind `:alt` to i18n keys — never hardcode alt text
- Bind `:title` to i18n keys — all images display a tooltip on hover

## Git Policy

**Never run any git write command without explicit user instruction.**

Forbidden without a direct user request:
- `git commit`, `git push`, `git reset`, `git rebase`, `git merge`
- `git cherry-pick`, `git revert`, `git stash`, `git tag`
- `git branch -D`, `git am`

Allowed: `git status`, `git diff`, `git log`, `git show` (read-only inspection).

If asked to commit or push, **ask for confirmation first** and show what will be committed. Never commit speculatively at the end of a task.

### Commit Messages

- Use conventional commit format
- Include a clear description of what changed and why

### For Scoped Instructions

- See `.github/instructions/` for file-type-specific rules that apply automatically
- See `.github/prompts/` for reusable prompt templates (invoke with `/` in Copilot Chat)
- See `.github/skills/` for detailed pattern references
