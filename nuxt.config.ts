import svgLoader from 'vite-svg-loader'
import prismicProjectData from './slicemachine.config.json'
import { version } from './package.json'
import { generatePrismicUrlList } from './utils/prismic/prismic-route'

const locales = ['fr']
const defaultLocale = 'fr'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: true,

    app: {
        head: {
            title: 'Prismic + Nuxt Minimal Starter',
            htmlAttrs: {
                lang: defaultLocale,
            },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { hid: 'description', name: 'description', content: '' },
                { name: 'format-detection', content: 'telephone=no' },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },
    css: ['@/assets/scss/global.scss'],

    // https://nuxt.com/docs/api/configuration/nuxt-config#vite
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/_style-resources.scss" as *;',
                },
            },
        },
        plugins: [
            svgLoader({
                defaultImport: 'url',
            }),
        ],
    },
    // experimental: {
    //     renderJsonPayloads: false,
    // },
    // https://github.com/storybook-vue/storybook-nuxt/issues/57
    components: ['~/components/atoms', '~/components/molecules', '~/components/organisms'],

    modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/prismic', '@nuxtjs/svg-sprite', '@vueuse/nuxt'],

    runtimeConfig: {
        // The private keys which are only available server-side
        apiSecret: '123',
        // Keys within public are also exposed client-side
        public: {
            availableLocales: locales,
            defaultLocale,
            version,
            baseURL: process.env.NUXT_PUBLIC_BASE_URL || '',
        },
    },

    build: {
        transpile: ['gsap'],
    },

    prismic: {
        endpoint: prismicProjectData.repositoryName || 'nuxt3-starter',
        preview: false, // prismicProjectData.previewEndpoint || '/preview',
        clientConfig: {
            routes: generatePrismicUrlList(),
        },
    },

    image: {
        provider: 'prismic' || 'imgix',
        prismic: {},
        domains: ['images.prismic.io'],
        quality: 80,
        screens: {
            xs: 375, // override size to match our breakpoints
            xl: 1440, // override size to match our breakpoints
            hd: 1920, // additional size
            qhd: 2500, // additional size
        },
        // @ts-ignore not working with [1]
        densities: '1',
        presets: {
            fullscreen: {
                format: 'webp',
                sizes: 'xs:100vw md:100vw lg:100vw vl:100vw xl:100vw hd:100vw qhd:100vw',
            },
            avatar: {
                modifiers: {
                    format: 'jpg',
                    width: 50,
                    height: 50,
                },
            },
        },
    },

    i18n: {
        // Use no_prefix strategy to avoid redirecting localized paths without locale prefix
        strategy: 'no_prefix',
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
