// Defined in prismic options inside nuxt.config.ts for add specific url on document
// All pages with dedicated content should be a specific document type
// routes: [
//     {
//         type: 'page',
//         uid: 'home',
//         path: '/',
//     },
// ]

import type { ReachableDocumentType } from '~/types/prismic'

const documentUrl = {
    home_page: '/',
    project_listing: '/projects',
    project: '/projects/:uid',
    archives: '/archives',
    page: '/:uid',
} as const satisfies Record<ReachableDocumentType, string>

type AllUrl = (typeof documentUrl)[keyof typeof documentUrl]
type OmitDynamic<T> = T extends `${string}/:uid` ? never : T
type StripDynamic<T> = T extends `${infer Base}/:uid` ? `${Base}/${string}` : T
type PossibleUrl = OmitDynamic<AllUrl> | StripDynamic<AllUrl>

const possibleUrlPattern = Object.values(documentUrl).map((url): PossibleUrl => {
    const dynamicPatternIndex = url.lastIndexOf('/:uid')
    if (dynamicPatternIndex === -1) return url as OmitDynamic<AllUrl>
    else return url.substring(0, dynamicPatternIndex + 1) as StripDynamic<AllUrl>
})

export function generatePrismicUrlList() {
    return Object.entries(documentUrl).map(([key, value]) => {
        return { type: key, path: value }
    })
}

console.log('prismic routes:', generatePrismicUrlList())

export function getDocumentTypeByUrl(url: `${string}${PossibleUrl}` | PossibleUrl | string): ReachableDocumentType {
    // TODO: check if base url isn't include in url
    if (url === '/') return 'home_page'
    else if (url === '/projects') return 'project_listing'
    else if (url.includes('/projects')) return 'project'
    else if (url === '/archive') return 'archives'
    else return 'page'
}
