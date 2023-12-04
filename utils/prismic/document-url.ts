import { prismicDocuments } from '~/utils/prismic/prismic-documents'
import type { ReachableDocumentType } from '~/types/prismic'

export const documentUrlList = Object.values(prismicDocuments)

type AllUrl = (typeof documentUrlList)[number]
type OmitDynamic<T> = T extends `${string}/:uid` ? never : T
type OmitStatic<T> = T extends `${string}/:uid` ? T : never
type StripDynamic<T> = T extends `${infer Base}/:uid` ? `${Base}/${string}` : T
export type PossibleUrl = OmitDynamic<AllUrl> | StripDynamic<AllUrl>

export const staticDocumentUrl = documentUrlList.filter((value) => !value.includes('/:uid')) as OmitDynamic<AllUrl>[]
export const dynamicDocumentUrl = documentUrlList.filter((value) => value.includes('/:uid')) as OmitStatic<AllUrl>[]

type StaticUrl = typeof staticDocumentUrl
type DynamicUrl = typeof dynamicDocumentUrl

export function isSingleDocumentType(type: ReachableDocumentType) {
    return !prismicDocuments[type].includes('/:uid')
}

export const isStaticUrl = (url: string) => (staticDocumentUrl as (StaticUrl | string)[]).includes(url)
export const isProjectUrl = (url: string) => url.includes('/projects/')
