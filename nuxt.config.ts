// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      htmlAttrs: { lang: 'fr' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      title: 'Mellumine',
      viewport: 'width=device-width, initial-scale=1',
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
  ssr: true,
  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  plugins: [],
  build: {
    transpile: [],
  },
  typescript: {
    strict: true,
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
  ],
  imports: {
    dirs: [],
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
  ui: {
    colorMode: false,
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
  css: [
    '~/assets/css/main.css',
    '~/styles/default.scss',
    '~/styles/transitions.scss',
  ],
  i18n: {
    defaultLocale: 'fr',
    langDir: 'locales',
    strategy: 'prefix',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/styles/variables.scss" as *;
            @use "~/styles/keyframes.scss" as *;
          `,
        },
      },
    },
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'lenis'],
    },
    plugins: [],
  },
  compatibilityDate: '2025-01-01',
  devtools: {
    enabled: true,
  },
  site: {
    url: 'https://mellumine.vercel.app',
    name: 'Mellumine',
    indexable: true,
    identity: {
      type: 'Person',
    },
    robots: {
      index: true,
      follow: true,
    },
  },
  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Mellumine',
      url: 'https://mellumine.vercel.app',
      logo: 'https://mellumine.vercel.app/android-chrome-192x192.png',
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
  ogImage: {
    enabled: false,
  },
})
