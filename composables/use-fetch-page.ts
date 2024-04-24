import type { PrismicDocument } from '@prismicio/types'
import type { DocumentType } from '~/types/api'
import { useLocale } from '~/composables/use-locale'
import { isDynamicDocument, isExistingDocumentType } from '~/utils/prismic/document-type'

export async function useFetchPage<T extends PrismicDocument>(prismicDocument: DocumentType) {
  const route = useRoute()

  const uid = Array.isArray(route.params?.uid) ? route.params.uid.at(-1) : route.params.uid
  const key = `use-fetch-page-${prismicDocument}${uid ? `-${uid}` : ''}`

  const prismicClient = usePrismic().client
  const { fetchLocaleOption } = useLocale()
  const isDynamicUidDocument = isDynamicDocument(prismicDocument) && uid

  const cachedData = useNuxtData(key)
  const { data } = cachedData.data.value
    ? cachedData
    : await useAsyncData(key, async () => {
        try {
          if (isDynamicUidDocument) {
            return await prismicClient.getByUID(prismicDocument, uid)
          } else if (isExistingDocumentType(prismicDocument)) {
            return await prismicClient.getSingle(prismicDocument, fetchLocaleOption.value)
          }
        } catch (error: unknown) {
          console.error('PrismicError in useFetchPage: ', error)
          // @ts-ignore cannot know the error type
          return { error: createError(error) }
        }
      })

  const webResponse = data.value as T

  const locale = webResponse?.lang
  const pageData = webResponse?.data as T['data']
  const alternateLinks = webResponse?.alternate_languages || []

  return {
    alternateLinks,
    webResponse,
    pageData,
    locale,
    error: data.value?.error,
  }
}
