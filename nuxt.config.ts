// https://nuxt.com/docs/api/configuration/nuxt-config
import prismicData from './slicemachine.config.json'

// i18n
const locales = ['fr']
const defaultLocale = 'fr'

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
  components: ['~/components/atoms', '~/components/molecules', '~/components/organisms'],
  image: {
    quality: 80,
    screens: {
      // @nuxt/image breakpoints are not exactly the same as ours
      // TODO: import our breakpoints here
      '2xl': false,
      // remove useless 2xl size (duplicate with xxl size)
      hd: 1920,
    },
  },
})
