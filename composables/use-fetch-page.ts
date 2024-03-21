import type { PrismicDocument } from '@prismicio/types'
import type { DocumentType } from '~/types/api'
import { DocumentType as documentType } from '~/constants/document-type'
import { useLocale } from '~/composables/use-locale'

export async function useFetchPage<T extends PrismicDocument>(pageId?: DocumentType) {
  const route = useRoute()
  const key = `fetch-page-${pageId || route.path}`

  const { fetchLocaleOption } = useLocale()

  console.log(pageId || documentType.HOME)

  const cachedData = useNuxtData(key)
  const { data } = cachedData.data.value
    ? cachedData
    : await useAsyncData(key, async () => {
        try {
          return await usePrismic().client.getSingle(pageId || documentType.HOME, fetchLocaleOption.value)
        } catch (error) {
          console.error('error=', error)

          return { error }
        }
      })

  const webResponse = computed(() => data.value as T)
  const locale = computed(() => webResponse.value?.lang)
  const pageData = computed(() => webResponse.value?.data as T['data'])
  const alternateLinks = computed(() => webResponse.value?.alternate_languages || [])

  return {
    alternateLinks,
    webResponse,
    pageData,
    locale,
    error: data.value?.error,
  }
}
