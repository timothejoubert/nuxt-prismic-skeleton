import type { PrismicDocument } from '@prismicio/types'
import type { DocumentType } from '~/types/api'
import { useLocale } from '~/composables/use-locale'
import { isDynamicDocument, isExistingDocumentType } from '~/utils/prismic/document-type'

export async function useFetchPage<T extends PrismicDocument>(prismicDocument: DocumentType) {
    const route = useRoute()
    const routeUid = route.params?.uid
    const uid = Array.isArray(routeUid) ? routeUid.at(-1) : routeUid

    const key = `use-fetch-page-${prismicDocument}${uid ? `-${uid}` : ''}`

    const prismicClient = usePrismic().client
    const { fetchLocaleOption } = useLocale()
    const isDynamicUidDocument = uid && isDynamicDocument(prismicDocument)

    const cachedData = useNuxtData(key)
    const { data } = cachedData.data.value
        ? cachedData
        : await useAsyncData(key, async () => {
            try {
                if (isDynamicUidDocument) {
                    return await prismicClient.getByUID(prismicDocument, uid, { ...fetchLocaleOption.value })
                }
                else if (isExistingDocumentType(prismicDocument)) {
                    return await prismicClient.getSingle(prismicDocument, {
                        ...fetchLocaleOption.value,
                        fetchLinks: ['my.project.title', 'my.project.excerpt', 'my.project.main_media'],
                    })
                }
            }
            catch (error: unknown) {
                console.error(`PrismicError in useFetchPage on ${prismicDocument} `, error)
                // @ts-ignore cannot know the error type
                return { error: createError(error) }
            }
        })

    const prismicDocumentData = data.value as T

    const locale = prismicDocumentData?.lang
    const pageData = prismicDocumentData?.data as T['data']
    const alternateLinks = prismicDocumentData?.alternate_languages || []

    return {
        alternateLinks,
        prismicDocumentData,
        pageData,
        locale,
        error: data.value?.error,
    }
}
