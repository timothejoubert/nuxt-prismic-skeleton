import type { ReachableDocumentType } from '~/types/prismic'

export const prismicDocuments = {
    home_page: '/',
    project_listing: '/projects',
    project: '/projects/:uid',
    archives: '/archives',
    page: '/:uid',
} as const satisfies Record<ReachableDocumentType, string>
