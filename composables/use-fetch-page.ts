import { joinURL } from 'ufo'
import type { PrismicDocument } from '@prismicio/types'
import type { DocumentType } from '~/types/api'
import { DocumentType as documentType } from '~/constants/document-type'

export async function useFetchPage<T extends PrismicDocument>(pageId?: DocumentType) {
  const route = useRoute()
  const { $i18n } = useNuxtApp()

  const path = joinURL('/', route.path)
  const key = `fetch-page-${path}`

  const queryOptions: Record<string, unknown> = {}
  const extractLocaleFromUrl = $i18n.locales.value.find((locale) => {
    return route.fullPath.includes(locale.code) || route.fullPath.includes(getLocaleLanguage(locale.code))
  })?.code
  if (extractLocaleFromUrl) queryOptions.lang = extractLocaleFromUrl
  console.log('useFetchPage', pageId || documentType.HOME, queryOptions)

  const cachedData = useNuxtData(key)
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
