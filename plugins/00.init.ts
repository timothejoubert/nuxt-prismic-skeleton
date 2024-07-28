import type { Link, Script } from '@unhead/schema'
import { joinURL } from 'ufo'
import type { AlternateLanguage, PrismicDocument } from '@prismicio/types'
// @ts-ignore
import type { PrismicPluginClient } from '@prismicio/vue/src/types'
import type { CommonContent } from '~/composables/use-common-content'
import { useLocale } from '~/composables/use-locale'
import { DocumentType } from '~/constants/document-type'
import { mapRoutePathToPrismicDocument } from '~/utils/prismic/route-resolver'
import { useSiteUrlPath } from '~/composables/use-site-url-path'

async function initCommonContent() {
    const prismic = useNuxtApp().$prismic as PrismicPluginClient
    const { fetchLocaleOption } = useLocale()

    await useAsyncData<CommonContent>('common_content', async () => {
        const settingResponse = await prismic.client.getSingle(DocumentType.SETTING)
        const menuResponse = await prismic.client.getSingle(DocumentType.MENU, fetchLocaleOption.value)

        return {
            setting: settingResponse,
            mainMenu: menuResponse,
        }
    })
}

function initI18n(locale?: string) {
    const nuxtApp = useNuxtApp()

    if (locale) {
        const { $i18n } = nuxtApp

        $i18n.locale.value = locale
    }
}

function initHead(webResponse?: PrismicDocument, alternateLinks?: AlternateLanguage[]) {
    const nuxtApp = useNuxtApp()
    const route = useRoute()
    const runtimeConfig = useRuntimeConfig()
    const { $i18n } = nuxtApp
    const script: (Script<['script']> | string)[] = []
    const link: Link[] = [
        {
            rel: 'canonical',
            href: webResponse?.url || useSiteUrlPath(route.path),
        },
    ]

    // ALTERNATE LINKS
    const alternateLinksHead = alternateLinks?.map((alternateLink: AlternateLanguage) => {
        return {
            hid: `alternate-${alternateLink.lang}`,
            rel: 'alternate',
            hreflang: alternateLink.lang,
            href: useSiteUrlPath(alternateLink.uid),
        }
    })
    if (alternateLinksHead) link.push(...alternateLinksHead)

    useHead({
        htmlAttrs: {
            lang: $i18n.locale.value,
        },
        script,
        link,
        meta: [{ name: 'version', content: runtimeConfig.public.version }],
    })
}

function initSeoMeta(webResponse?: PrismicDocument) {
    const { siteName } = useCommonContent()

    const pageData = webResponse?.data
    const description = pageData?.meta_description || pageData?.excerpt || pageData?.description
    const title = pageData?.meta_title || pageData?.title

    const img = useImage()
    const image = () => {
        const imageUrl = [
            pageData?.meta_image,
            pageData?.image,
            pageData?.media,
            pageData?.thumbnail,
            pageData?.mainMedia,
        ].find(prismicMedia => !!prismicMedia?.url)

        if (typeof imageUrl === 'string') {
            return img(imageUrl, {
                width: 1200,
                quality: 90,
                providers: 'ipx',
            })
        }
        else {
            return useSiteUrlPath('/images/share.jpg')
        }
    }

    useServerSeoMeta({
        description,
        ogTitle: title,
        ogSiteName: siteName,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description,
        twitterCard: 'summary',
        ogImage: image(),
        robots: {
            noindex: pageData?.noIndex,
        },
    })
}

export default defineNuxtPlugin(async () => {
    const route = useRoute()
    const prismicDocumentType = mapRoutePathToPrismicDocument(route.path) || DocumentType.HOME
    const pageResponse = prismicDocumentType ? await useFetchPage(prismicDocumentType) : undefined

    if (pageResponse) {
        initI18n(pageResponse?.locale)
        useAlternateLinks(pageResponse?.alternateLinks)
    }
    await initCommonContent()
    initHead(pageResponse?.prismicDocumentData, pageResponse?.alternateLinks)
    initSeoMeta(pageResponse?.prismicDocumentData)
})
