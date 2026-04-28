# Mellumine

Portfolio website for **Mellumine** — a French-speaking polar fox VTuber from the Stars. The site showcases her universe, handmade plushies, mascot, and social links.

🌐 **Live**: [mellumine.vercel.app](https://mellumine.vercel.app)

---

## Tech Stack

| Purpose         | Technology                        |
|-----------------|-----------------------------------|
| Framework       | Nuxt 4 (Vue 3 + TypeScript)       |
| i18n            | @nuxtjs/i18n (prefix strategy)    |
| SEO             | @nuxtjs/seo                       |
| UI              | @nuxt/ui                          |
| Fonts           | @nuxt/fonts (Google Fonts)        |
| Utilities       | @vueuse/nuxt                      |
| Smooth scroll   | Lenis                             |
| Linting         | ESLint + Prettier                 |
| Package manager | Yarn 4                            |
| Deployment      | Vercel (static pre-rendering)     |

---

## Pages

| Route       | Description                        |
|-------------|------------------------------------|
| `/`         | Home — hero section and intro      |
| `/about`    | About Mellumine and her universe   |
| `/plushies` | Handmade plushie collection        |
| `/contact`  | Social links and support           |

The site is available in **French** (default) and **English**, at `/fr/*` and `/en/*` respectively.

---

## Getting Started

```bash
# Install dependencies
yarn install

# Start dev server (http://localhost:3000)
yarn dev

# Build for production
yarn build

# Generate static site
yarn generate

# Preview production build
yarn preview

# Lint
yarn lint

# Lint and auto-fix
yarn lint:fix
```

---

## Project Structure

```
mellumine/
├── app/
│   ├── pages/          # File-based routing (index, about, plushies, contact)
│   ├── components/     # Auto-imported Vue components
│   ├── composables/    # useReveal (scroll-in animations)
│   ├── types/          # TypeScript types (Plushie, SocialLink, …)
│   ├── utils/          # Static data (plushies, socials, supports, credits)
│   └── assets/css/     # Global styles and CSS custom properties
├── i18n/locales/       # fr-FR.json and en-US.json translation files
├── public/images/      # WebP images (plushies, character art, misc)
└── nuxt.config.ts      # Nuxt configuration
```

---

## Adding Content

### New plushie

1. Add images to `public/images/plushies/` (WebP format, front + back required).
2. Add an entry in `app/utils/data.ts` under `plushies[]`.
3. Add `pictures.plushies.{id}` translations in both `fr-FR.json` and `en-US.json`.

### New page

Follow the SEO pattern in `AGENTS.md` — every page requires `useHead` + `useSeoMeta` with hreflang tags for `fr-FR`, `en-US`, and `x-default`.

---

## Credits

| Role    | Person         |
|---------|----------------|
| Design  | @Chuggoth      |
| Art     | @Gwenevyr_     |
| Rig     | Gwenevyr       |
