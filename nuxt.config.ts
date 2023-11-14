import prismicProjectData from "./slicemachine.config.json";
import { version } from "./package.json";

const locales = ["fr"];
const defaultLocale = "fr";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: true,

    app: {
        head: {
            title: "Prismic + Nuxt Minimal Starter",
            htmlAttrs: {
                lang: defaultLocale,
            },
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                { hid: "description", name: "description", content: "" },
                { name: "format-detection", content: "telephone=no" },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        },
    },
    css: ["@/assets/scss/global.scss"],

    // https://nuxt.com/docs/api/configuration/nuxt-config#vite
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@use "@/assets/scss/_style-resources.scss" as *;',
                },
            },
        },
    },
    experimental: {
        renderJsonPayloads: false,
    },
    // https://github.com/storybook-vue/storybook-nuxt/issues/57
    components: [
        "~/components/atoms",
        "~/components/molecules",
        "~/components/organisms",
    ],

    modules: ["@nuxtjs/prismic"],

    runtimeConfig: {
        // The private keys which are only available server-side
        apiSecret: "123",
        // Keys within public are also exposed client-side
        public: {
            availableLocales: locales,
            defaultLocale,
            version,
            baseURL: process.env.NUXT_PUBLIC_BASE_URL || "",
        },
    },

    prismic: {
        endpoint: prismicProjectData.repositoryName || "nuxt3-starter",
        preview: prismicProjectData.previewEndpoint || "/api/preview",
        clientConfig: {
            routes: [
                {
                    type: "page",
                    uid: "home",
                    path: "/",
                },
                {
                    type: "page",
                    path: "/:uid",
                },
                {
                    type: "project",
                    path: "/projects/:uid",
                },
            ],
        },
    },
});
