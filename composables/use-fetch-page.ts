import type { ReachableDocument, ReachableDocumentType } from '~/types/prismic'
import type { UnionToIntersection } from '~/utils/types'
import { getDocumentTypeByUrl } from '~/utils/types/document-url'

export type PageContent = UnionToIntersection<ReachableDocument['data']>
const singleDocumentType: ReachableDocumentType[] = ['home_page', 'archives', 'project_listing']

export async function useFetchPage() {
    const prismic = usePrismic()
    const route = useRoute()
    const uidParams = route.params.uid
    const uid = Array.isArray(uidParams) ? uidParams.at(-1) : uidParams
    const key = `fetch-page-${uid}`

    // TODO: use getCachedData() into the useAsyncData() options (not released yet) instead of this
    // const cachedData = useNuxtData(key)
    const cachedData = { data: ref(null), error: ref(null) }
    const { data, error } = cachedData.data?.value
        ? cachedData
        : await useAsyncData(key, async () => {
              // Sometimes error when accessing prismic on SSR
              const documentType = getDocumentTypeByUrl(route.fullPath)
              const isSingleDocument = singleDocumentType.includes(documentType)
              console.log(documentType, isSingleDocument)

              const response = await (isSingleDocument
                  ? prismic?.client.getSingle(documentType)
                  : prismic?.client.getByUID(documentType, !uid ? 'home' : uid))

              // const alternateLinks: AlternateLanguage[] = getResponseAlternateLinks(response);
              return {
                  alternateLinks: [],
                  webResponse: response,
              }
          })

    const webResponse = data.value?.webResponse
    const itemData = webResponse?.data // as PageContent
    const title = (itemData as any)?.meta_title || itemData?.title || webResponse?.uid

    return {
        alternateLinks: [],
        webResponse,
        itemData,
        title,
        error: error.value,
    }
}
