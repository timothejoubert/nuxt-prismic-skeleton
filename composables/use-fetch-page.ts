import type { ReachableDocumentType } from '~/types/prismic'
import type { PossibleUrl } from '~/utils/prismic/document-url'
import { prismicDocuments } from '~/utils/prismic/prismic-documents'
import { isProjectUrl, isSingleDocumentType, isStaticUrl } from '~/utils/prismic/document-url'

function getDocumentTypeByUrl(url: PossibleUrl | string): ReachableDocumentType {
    if (isStaticUrl(url)) {
        return (
            (Object.entries(prismicDocuments).find(
                ([_type, typeUrl]) => typeUrl === url,
            )?.[0] as ReachableDocumentType) || 'home_page'
        )
    } else if (isProjectUrl(url)) return 'project'
    else return 'page'
}

export async function useFetchPage() {
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
              const prismic = usePrismic()
              const documentType = getDocumentTypeByUrl(route.fullPath)

              const response = await (isSingleDocumentType(documentType)
                  ? prismic?.client.getSingle(documentType)
                  : prismic?.client.getByUID(documentType, !uid ? 'home_page' : uid))

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
