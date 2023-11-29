import type { ReachableDocumentType } from '~/types/prismic'

export const documentType = {
    HOME_PAGE: 'home_page',
    PROJECT: 'project',
    PAGE: 'page',
} satisfies Record<string, ReachableDocumentType>

export const documentTypes = Object.values(documentType)
export const isDocumentType = (type: string) => !!documentTypes.find((v) => v === type)

export function isHomeDocument(type: string | undefined) {
    return type === documentType.HOME_PAGE
}

export function isProjectDocument(type: string | undefined) {
    return type === documentType.PROJECT
}

export function isPageDocument(type: string | undefined) {
    return type === documentType.PAGE
}
