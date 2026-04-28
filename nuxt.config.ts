// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
  ],

  eslint: {
    config: {
      stylistic: false,
    },
  },

  css: [
    '~/assets/css/main.css',
    '~/styles/keyframes.scss',
    '~/styles/default.scss',
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      htmlAttrs: { lang: 'fr' },
      link: [
        { rel: 'icon', type: 'image/webp', href: '/images/misc/logo.webp' },
      ],
      meta: [
        { name: 'theme-color', content: '#0b0820' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        { name: 'application-name', content: 'Mellumine' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Mellumine' },
      ],
      templateParams: {
        separator: '-',
      },
    },
  },

  runtimeConfig: {
    public: {
      i18n: {
        baseUrl:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : process.env.VERCEL_ENV === 'production'
              ? 'https://mellumine.vercel.app'
              : `https://${process.env.VERCEL_URL}`,
      },
    },
  },

  site: {
    url: 'https://mellumine.vercel.app',
    name: 'Mellumine',
    defaultLocale: 'fr',
    indexable: true,
    identity: {
      type: 'Person',
    },
    robots: {
      index: true,
      follow: true,
    },
  },

  ogImage: {
    enabled: false,
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Mellumine',
      url: 'https://mellumine.vercel.app',
      image: 'https://mellumine.vercel.app/og-image.webp',
      sameAs: [
        'https://www.twitch.tv/mellumine',
        'https://www.instagram.com/mellumine_/',
        'https://www.tiktok.com/@mellumine',
        'https://www.youtube.com/channel/UCvhk-7WcKz9m5DQ9INhTJPg',
        'https://x.com/Mellumine',
        'https://discord.gg/423mAV2epn',
      ],
    },
  },

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'fr',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  fonts: {
    families: [
      { name: 'Quicksand', provider: 'google', weights: [400, 500, 600, 700] },
      {
        name: 'Cormorant Garamond',
        provider: 'google',
        weights: [400, 500, 600, 700],
      },
    ],
  },

  ui: {
    colorMode: false,
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/styles/variables.scss" as *;',
        },
      },
    },
  },

  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  experimental: {
    payloadExtraction: true,
  },
})
