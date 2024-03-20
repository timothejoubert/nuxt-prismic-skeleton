import { joinURL } from 'ufo'
import type { PrismicDocument } from '@prismicio/types'
import type { DocumentType } from '~/types/api'
import { DocumentType as documentType } from '~/constants/document-type'

export function getFetchPageMeta(pageId?: string) {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  const i18n = useNuxtApp().$i18n

  const url = joinURL(runtimeConfig.public.siteUrl, route.path)
  const path = (pageId || route.path === '/' ? 'home' : route.path) + '-' + i18n.locale.value

  return { url, key: `page-key-${path}` }
}

export async function useFetchPage<T extends PrismicDocument>(pageId?: DocumentType) {
  const { key } = getFetchPageMeta(pageId)
  const route = useRoute()

  const queryOptions =
    route.fullPath.includes('/en') || route.fullPath.includes('/en-gb') ? { lang: 'en-gb' } : undefined

  const cachedData = useNuxtData(key)

  console.log('use fetch page', pageId || documentType.HOME, queryOptions)
  const { data } = cachedData.data.value
    ? cachedData
    : await useAsyncData(key, async () => {
        try {
          return await usePrismic().client.getSingle(pageId || documentType.HOME, queryOptions)
        } catch (error) {
          console.error('error=', error)

          return { error }
        }
      })

  const webResponse = computed(() => data.value as T)
  const locale = computed(() => webResponse.value?.lang)
  const pageData = computed(() => webResponse.value?.data)
  const alternateLinks = computed(() => webResponse.value?.alternate_languages || [])

  return {
    alternateLinks,
    webResponse,
    pageData,
    locale,
    error: data.value?.error,
  }
}
