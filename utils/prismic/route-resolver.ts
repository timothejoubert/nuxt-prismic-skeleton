// https://prismic.io/docs/route-resolver#resolvers
// https://prismic.io/docs/nuxt-3-define-routes
import { DocumentType } from './../../constants/document-type'
import { allLocale } from './../../constants/locale'
import { extractValueBetweenOccurrence } from '~/utils/string/extract'

export const prismicDocumentRouteList = [
  {
    type: DocumentType.HOME,
    path: '/:lang?',
  },
  {
    type: DocumentType.ABOUT,
    path: '/:lang?/bio',
  },
  {
    type: DocumentType.PROJECT_LISTING,
    path: '/:lang?/projets',
  },
  {
    type: DocumentType.PROJECT,
    path: '/:lang?/projets/:uid',
  },
  {
    type: DocumentType.WEB_PAGE,
    path: '/:lang?/:uid',
  },
]

// TODO: finish verification
// mapRoutePathToDocument('/en-gb/bio') return home_page

export function mapRoutePathToDocument(path: string) {
  const firstRoute = extractValueBetweenOccurrence(path, '/', [1, 2]) || null

  const route = prismicDocumentRouteList.find((route) => {
    const filteredPath = route.path.replace('/:lang?', '').replace(':uid', '') || '/'

    return filteredPath === path || allLocale.includes(firstRoute as (typeof allLocale)[number])
  })

  if (route) return route.type
}

function getDocumentRoutePath(document: { type: DocumentType }) {
  const documentType = document?.type || ''

  const currentRoute = prismicDocumentRouteList.find((route) => route.type === documentType)

  return currentRoute?.path.replace('/:lang?', '').replace(':uid', '')
}
