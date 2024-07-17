import svgLoader from 'vite-svg-loader'
import prismicData from './slicemachine.config.json'
import { hoistUseStatements } from './utils/vite/hoist-use-statements'
import { version } from './package.json'
import { prismicDocumentRouteList } from './utils/prismic/route-resolver'
import { defaultLocale, allLocale as locales } from './constants/locale'
// i18n

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
      script: [
        {
          src: `https://static.cdn.prismic.io/prismic.js?new=true&repo=${prismicData.repositoryName}`,
          async: true,
          defer: true,
        },
      ],
    },
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
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

  nitro: {
    routeRules: {
      '/**': {
        headers: {
          // https://web.dev/articles/floc?hl=fr#can_websites_opt_out_of_being_included_in_the_floc_computation
          'Permissions-Policy': 'interest-cohort=()',
          // Hardening client security policies
          // https://developer.mozilla.org/fr/docs/Web/HTTP/CSP
          'Content-Security-Policy': [
            // Only allows these iframe origins
            "frame-src 'self' *.prismic.io *.youtube-nocookie.com *.youtube.com *.vimeo.com *.instagram.com *.soundcloud.com *.google.com",
            // Only allows these script origins
            // "script-src 'self' 'unsafe-inline' *.google.com *.googleapis.com *.gstatic.com",
            // Only allows these images origins
            // "img-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com",
          ].join('; '),
        },
      },
      // Auto generated page by svgSprite module
      '/_icons': {
        headers: {
          // Do not index the page and remove from it sitemap
          'X-Robots-Tag': 'noindex',
        },
      },
    },
  },

  modules: [
    '@nuxt/image',
    '@nuxtjs/prismic',
    '@nuxtjs/i18n',
    '@nuxtjs/svg-sprite',
    '@rezo-zero/nuxt-stories',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',
    '@nuxt/eslint',
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

  components: [
    '~/components/atoms',
    '~/components/molecules',
    '~/components/organisms',
    { path: '~/components/pages/', global: true },
  ],

  image: {
    // prismic: {},
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
    presets: {
      default: {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw vl:100vw xl:100vw xxl:100vw hd:100vw qhd:100vw',
      },
    },
  },

  // https://prismic.io/docs/technical-reference/prismicio-vue?version=v3#plugin-usage
  prismic: {
    endpoint: prismicData.repositoryName,
    clientConfig: {
      routes: prismicDocumentRouteList,
    },
    // richTextSerializer: '~/path'
    preview: '/preview',
    toolbar: true, // Whether or not to inject Prismic toolbar, required for previews to work properly.
  },

  i18n: {
    // Default: all routes will have a locale prefix added except for the default language
    strategy: 'no_prefix',
    routesNameSeparator: '___',
    detectBrowserLanguage: false,
    defaultLocale,
    locales: locales.map((locale) => ({
      code: locale,
      file: `nuxt.${locale}.json`,
    })),
    langDir: 'assets/locales/',
  },

  sitemap: {
    // Don't add any /secret/** URLs to the sitemap.xml
    exclude: ['/slice-simulator', '/preview', '/_icons'],
    sources: [
      // create our own API endpoints
      '/api/sitemap/prismic-urls',
    ],
  },

  // https://eslint.nuxt.com/packages/module
  eslint: {
    config: {
      stylistic: {
        indent: 4,
      },
    },
  },

  compatibilityDate: '2024-07-11',
})
