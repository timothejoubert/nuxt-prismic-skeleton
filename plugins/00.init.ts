import type { Link, Script } from '@unhead/schema'
import { joinURL } from 'ufo'
import type { AlternateLanguage, PrismicDocument } from '@prismicio/types'
// @ts-ignore
import type { PrismicPluginClient } from '@prismicio/vue/src/types'
import type { CommonContent } from '~/composables/use-common-content'
import { useLocale } from '~/composables/use-locale'
import { DocumentType } from '~/constants/document-type'
import { mapRoutePathToPrismicDocument } from '~/utils/prismic/route-resolver'

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
      href: webResponse?.url || joinURL(runtimeConfig.public.siteUrl, route.path),
    },
  ]

  // ALTERNATE LINKS
  const alternateLinksHead = alternateLinks?.map((alternateLink: AlternateLanguage) => {
    return {
      hid: `alternate-${alternateLink.lang}`,
      rel: 'alternate',
      hreflang: alternateLink.lang,
      href: joinURL(runtimeConfig.public.siteUrl, alternateLink.uid || ''),
    }
  })
  if (alternateLinksHead) link.push(...alternateLinksHead)

  useHead({
    htmlAttrs: {
      lang: $i18n.locale.value,
    },
    script,
    link,
    meta: [
      // app version
      { name: 'version', content: runtimeConfig.public.version },
    ],
  })
}

function initSeoMeta(webResponse?: PrismicDocument) {
  const { siteName } = useCommonContent()
  const runtimeConfig = useRuntimeConfig()

  const pageData = webResponse?.data
  const description = pageData?.meta_description || pageData?.excerpt || pageData?.description
  const title = pageData?.meta_title || pageData?.title

  const img = useImage()
  const image = () => {
    const imageUrl = [pageData?.meta_image, pageData?.media, pageData?.thumbnail, pageData?.mainMedia].find(
      (prismicMedia) => !!prismicMedia?.url && prismicMedia?.kind !== 'all',
    )

    if (typeof imageUrl === 'string') {
      return img(imageUrl, {
        width: 1200,
        quality: 70,
        providers: 'ipx',
      })
    } else {
      return joinURL(runtimeConfig.public.siteUrl, '/images/share.jpg')
    }
  }

  useServerSeoMeta({
    description,
    ogTitle: title,
    ogSiteName: siteName,
    ogDescription: description,
    ogImage: image(),
    twitterCard: 'summary',
    twitterTitle: title,
    twitterDescription: description,
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
  initHead(pageResponse?.webResponse, pageResponse?.alternateLinks)
  initSeoMeta(pageResponse?.webResponse)
})
