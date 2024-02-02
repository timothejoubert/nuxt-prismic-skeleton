import { joinURL } from 'ufo'
import type { UseSeoMetaInput } from '@unhead/schema'
import type {VDocumentData} from "~/types/api";


type PageEntity = VDocumentData

type UseWebPageSeoMetaOptions = {
    webPage?: MaybeRef<PageEntity | undefined | null>
    titleFallback?: MaybeRef<string | null>
    descriptionFallback?: MaybeRef<string | null>
    meta?: UseSeoMetaInput
}

function getImagePath(path: string | undefined): string {
    if (path) {
        const img = useImage()

        return img(path, { width: 1200 }, { provider: 'prismic' })
    } else {
        const runtimeConfig = useRuntimeConfig()

        return joinURL(runtimeConfig.public.baseUrl, '/images/share.jpg')
    }
}

export function useWebPageSeoMeta(options?: UseWebPageSeoMetaOptions) {
    const runtimeConfig = useRuntimeConfig()

    const webPage = toValue(options?.webPage)
    const title = webPage?.meta_title || webPage?.title  || toValue(options?.titleFallback)
    const description = webPage?.meta_description || toValue(options?.descriptionFallback)
    const imageSrc = undefined
    // const imageSrc = webPage?.media ? usePrismicLink(webPage.media) : undefined

    const data: UseSeoMetaInput = {
        ogSiteName: runtimeConfig.public.siteName,
        title,
        ogTitle: title,
        twitterTitle: title,
        description,
        ogDescription: description,
        twitterDescription: description,
        ogImage: getImagePath(imageSrc),
        twitterCard: 'summary',
        ...options?.meta,
    }

    useSeoMeta(data)
}
