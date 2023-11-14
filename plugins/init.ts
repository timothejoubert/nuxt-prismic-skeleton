import type {CommonContent} from "~/composables/use-common-content";
import type {PrismicDocument} from "@prismicio/client";
import {joinURL} from "ufo";
import type { Link } from '@unhead/schema'

async function initCommonContent() {
    const { client } = usePrismic()

    return useAsyncData<CommonContent>('common_content', async () => {
        const menus = await client.getAllByType('menu')
        const setting = await client.getSingle('settings')

        return { menus, setting }
    })
}

function initHead(document?: PrismicDocument, alternateLinks?: unknown[]) {

    const route = useRoute()
    const runtimeConfig = useRuntimeConfig()
    const link: Link[] = [
        {
            rel: 'canonical',
            href: joinURL(runtimeConfig.public.baseURL, document?.url || route.path),
        },
    ]

    const nuxtApp = useNuxtApp()
    const locale = runtimeConfig.public.availableLocales?.length ? nuxtApp?.$i18n.locale.value :  runtimeConfig.public.defaultLocale

    useHead({
        htmlAttrs: {
            lang: locale || 'fr',
        },
        link,
        meta: [
            // app version
            { name: 'version', content: runtimeConfig.public.version },
        ],
    })
}
//
// function initSeoMeta(webResponse?: RoadizWebResponse) {
//     const nuxtApp = useNuxtApp()
//     const { commonContent } = useCommonContent()
//     const runtimeConfig = useRuntimeConfig()
//     const head = webResponse?.head
//     const description = webResponse?.head?.metaDescription || commonContent.value?.head?.metaDescription
//     const title = webResponse?.head?.metaTitle || commonContent.value?.head?.metaTitle
//     const siteName = commonContent.value?.head?.siteName || (nuxtApp.$config.siteName as string) || ''
//     const { isActive: previewIsActive } = usePreview()
//     const img = useImage()
//     const image = () => {
//         const image =
//             head?.shareImage?.relativePath ||
//             // @ts-ignore not sure the `images` property exists, but generally it does
//             head?.images?.[0]?.relativePath ||
//             // @ts-ignore not sure the `image` property exists, but generally it does
//             head?.image?.[0]?.relativePath ||
//             commonContent.value?.head?.shareImage?.relativePath
//
//         if (image) {
//             return img(image, {
//                 width: 1200,
//                 quality: 70,
//             })
//         } else {
//             return joinURL(runtimeConfig.public.baseURL, '/images/share.jpg')
//         }
//     }
//
//     useServerSeoMeta({
//         description,
//         ogTitle: title,
//         ogSiteName: siteName,
//         ogDescription: description,
//         ogImage: image(),
//         twitterCard: 'summary',
//         twitterTitle: title,
//         twitterDescription: description,
//         robots: {
//             noindex: (webResponse?.item as RoadizNodesSources)?.noIndex || previewIsActive.value,
//         },
//     })
// }

export default defineNuxtPlugin(async () => {
    // initPreview()
    await initCommonContent()

    // const route = useRoute()
    // const isWildCardRoute = route.name === 'slug'
    // const page = isWildCardRoute ? await useFetchPage() : undefined

    // if (page) await initI18n(page?.locale)
    // initHead(page?.webResponse, page?.alternateLinks)
    // initSeoMeta(page?.webResponse)
})
