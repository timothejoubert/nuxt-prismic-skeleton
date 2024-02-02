import type {DocumentType} from "~/types/api";

export function usePrismicPage(type: DocumentType) {
    return useAsyncData(type, async () => {
        return await usePrismic().client.getSingle(type);
    })
}
