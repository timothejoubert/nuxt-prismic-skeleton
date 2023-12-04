import type { ReachableDocumentType } from '~/types/prismic'
import { prismicDocuments } from '~/utils/prismic/prismic-documents'

export const documentTypeList = Object.keys(prismicDocuments) as ReachableDocumentType[]

export const isExistingType = (type: string) => !!documentTypeList.find((v) => v === type)
const isType = (input: string, type: ReachableDocumentType) => input === type

export function isHomeDocument(type: string | undefined) {
    return type && isType(type, 'home_page')
}

export function isArchiveDocument(type: string | undefined) {
    return type && isType(type, 'archives')
}

export function isProjectListingDocument(type: string | undefined) {
    return type && isType(type, 'project_listing')
}

export function isProjectDocument(type: string | undefined) {
    return type && isType(type, 'project')
}

export function isPageDocument(type: string | undefined) {
    return type && isType(type, 'page')
}
