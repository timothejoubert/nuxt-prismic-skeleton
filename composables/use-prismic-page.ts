import type { DocumentType } from '~/types/api'

export function usePrismicPage(type: DocumentType) {
    return useAsyncData(type, () => {
        return usePrismic().client.getSingle(type)
    })
}
