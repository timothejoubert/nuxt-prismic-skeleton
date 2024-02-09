// https://nuxt.com/docs/api/configuration/nuxt-config
import prismicData from './slicemachine.config.json'

// i18n
const locales = ['fr']
const defaultLocale = 'fr'

// @ts-ignore
// @ts-ignore
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: false,
    layoutTransition: false,
    head: {
      htmlAttrs: {
        lang: defaultLocale,
      },
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#000' },
      ],
    },
  },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/prismic', '@nuxt/image'],
  runtimeConfig: {
    public: {
      baseUrl: '',
      siteName: '',
    },
  },
  prismic: {
    endpoint: prismicData.repositoryName,
  },
  components: {
    dirs: [{ path: '~/components', pathPrefix: false }],
  },
  // components: ['~/components/atoms', '~/components/molecules', '~/components/organisms'],
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
  stories: {
    route: {
      name: '_stories',
      path: '/_stories',
      file: '~/stories/VStoriesPage.vue',
    },
    include: '**/*.stories.vue',
    root: ['components', 'stories'],
  },
})
