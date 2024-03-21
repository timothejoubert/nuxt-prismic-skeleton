import svgLoader from 'vite-svg-loader'
import prismicData from './slicemachine.config.json'
import { hoistUseStatements } from './utils/vite/hoist-use-statements'
import { version } from './package.json'

// i18n
const locales = ['fr-FR', 'en-GB']
const defaultLocale = 'fr-FR'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: defaultLocale,
      },
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
        { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#000' },
      ],
    },
  },
  css: ['~/assets/scss/main.scss'],
  // https://nuxt.com/docs/api/configuration/nuxt-config#vite
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: hoistUseStatements(`@import "~/assets/scss/_style-resources.scss";`),
        },
      },
    },
    build: {
      // Force to use inline sprite-sheet asset instead raw data:image file
      // https://github.com/nuxt-modules/svg-sprite/issues/8
      assetsInlineLimit: 0,
    },
    plugins: [
      svgLoader({
        defaultImport: 'url',
      }),
    ],
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/prismic',
    '@nuxtjs/i18n',
    '@nuxtjs/svg-sprite',
    '@rezo-zero/nuxt-stories',
    '@nuxt/image',
  ],
  // https://github.com/nuxt-modules/svg-sprite#options
  svgSprite: {
    input: '~/assets/images/icons',
    output: '~/assets/images/sprites',
  },
  runtimeConfig: {
    public: {
      siteUrl: '',
      siteName: '',
      version,
    },
  },
  prismic: {
    endpoint: prismicData.repositoryName,
    // clientConfig: {
    //   routes: routeResolver,
    // },
  },
  components: ['~/components/atoms', '~/components/molecules', '~/components/organisms'],
  image: {
    prismic: {},
    imgix: {
      baseURL: '',
    },
    quality: 75,
    screens: {
      xs: 375,
      sm: 480,
      md: 768,
      lg: 1024,
      vl: 1280,
      xl: 1440,
      xxl: 1600,
      hd: 1920, // additional size
      qhd: 2500, // additional size
    },
    // @ts-ignore not working with [1]
    densities: '1',
  },
  i18n: {
    // all routes will have a locale prefix added except for the default language
    strategy: 'no_prefix',
    routesNameSeparator: '___',
    detectBrowserLanguage: false,
    defaultLocale,
    locales: locales.map((locale) => ({
      code: locale,
      file: `nuxt.${locale}.json`,
    })),
    lazy: true,
    langDir: 'assets/locales/',
  },
})
