// https://prismic.io/docs/route-resolver#resolvers
// https://prismic.io/docs/nuxt-3-define-routes
import { DocumentType } from './../../constants/document-type'

export const prismicDocumentRouteList = [
  {
    type: DocumentType.HOME,
    path: '/',
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

function getDocumentRoutePath(document: { type: DocumentType }) {
  const documentType = document?.type || ''

  const currentRoute = prismicDocumentRouteList.find((route) => route.type === documentType)

  return currentRoute?.path.replace('/:lang?', '').replace(':uid', '')
}
