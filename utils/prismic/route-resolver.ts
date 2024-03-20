// https://prismic.io/docs/route-resolver#resolvers
// https://prismic.io/docs/nuxt-3-define-routes
import { DocumentType } from './../../constants/document-type'

export default [
  {
    type: DocumentType.HOME,
    lang: 'fr-fr',
    path: '/',
  },
  {
    type: DocumentType.HOME,
    lang: 'en-gb',
    path: '/en',
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
