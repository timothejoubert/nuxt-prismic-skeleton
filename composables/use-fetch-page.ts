import type { PrismicDocument } from '@prismicio/types'
import { PrismicError } from '@prismicio/client'
import type { DocumentType } from '~/types/api'
import { useLocale } from '~/composables/use-locale'
import { isExistingDocumentType, isWebPageDocument } from '~/utils/prismic/document-type'
import { DocumentType as documentType } from '~/constants/document-type'
import { getSelfObjectOrFirstMapObject } from '~/utils/object/get-self-object-or-first-map-object'

export async function useFetchPage<T extends PrismicDocument>(pageId?: DocumentType) {
  const route = useRoute()
  const prismicDocumentType = pageId || (route.name as DocumentType)
  const key = `fetch-page-${prismicDocumentType}`
  const uid = getSelfObjectOrFirstMapObject(route.params?.uid)

  const { fetchLocaleOption } = useLocale()

  if (!isExistingDocumentType(prismicDocumentType)) {
    showError({ status: 404, message: 'Le type de page n existe pas' })
  }

  const prismicClient = usePrismic().client

  const cachedData = useNuxtData(key)
  const { data } = cachedData.data.value
    ? cachedData
    : await useAsyncData(key, async () => {
        try {
          if (isWebPageDocument(prismicDocumentType) && uid) {
            return await prismicClient.getByUID(documentType.WEB_PAGE, uid)
          } else {
            return await prismicClient.getSingle(prismicDocumentType, fetchLocaleOption.value)
          }
        } catch (error: unknown) {
          let errorType = 'error: '
          if (error instanceof PrismicError) errorType = 'PrismicError: '
          console.error(errorType, error)

          showError(error as any)
          return { error }
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
