import { mapRoutePathToPrismicDocument } from '~/utils/prismic/route-resolver'
import { DocumentType } from '~/constants/document-type'

export function useRoutePathToPrismicDocument() {
    const route = useRoute()
    console.log('-------------- useRoutePathToPrismicDocument ---------', route.path)
    return mapRoutePathToPrismicDocument(route.path) || DocumentType.HOME
}
