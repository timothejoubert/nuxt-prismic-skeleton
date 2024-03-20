import { joinURL } from 'ufo'
import type { RouteLocationRaw } from 'vue-router'
import type { LinkField, PrismicDocument } from '@prismicio/types'
import { getLocaleLanguage } from '~/utils/locale'
import routeResolver from '~/utils/prismic/route-resolver'
import { isContentRelationshipField, isDocumentEntity } from '~/utils/prismic/guard'
import { objectHasAllKeys } from '~/utils/object/object-has-all-keys'

function isInternalUrl(url: string | undefined) {
  return url?.charAt(0) === '/' || url?.charAt(0) === '#'
}

function isExternalUrl(url: string | undefined, siteUrl?: string) {
  return !isInternalUrl(url) && !(siteUrl && url?.startsWith(siteUrl))
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const siteUrl = runtimeConfig.public.siteUrl
  const route = useRoute()

  const canonicalUrl = computed(() => joinURL(siteUrl, route.path))

  return {
    provide: {
      joinSiteUrl: (...path: string[]) => joinURL(siteUrl, ...path),
      isInternalLink: (url: string | undefined) => isInternalUrl(url),
      isExternalLink: (url: string | undefined) => isExternalUrl(url, siteUrl),
      getInternalPageUrl: (route: RouteLocationRaw) => {
        const router = useRouter()
        const path = router.resolve(route).path

        return joinURL(siteUrl, path)
      },
      canonicalUrl,
      getPrismicUrl: (doc: PrismicDocument | LinkField) => {
        if (isDocumentEntity(doc) || isContentRelationshipField(doc)) {
          const { defaultLocale } = useI18n()

          const localeDocument = doc.lang ? getLocaleLanguage(doc.lang) : ''
          const localePath = localeDocument === defaultLocale ? '' : '/' + localeDocument

          const documentType = doc?.type || ''

          const currentRoute = routeResolver.find((route) => route.type === documentType)
          const path = currentRoute?.path.replace('/:lang?', localePath).replace(':uid', documentType || '') || '/'

          return path
        } else if ((doc as { url?: string })?.url) return (doc as any).url

        console.log('getPrismicUrl() received not PrismicDocument or linkFields arg')
      },
    },
  }
})
