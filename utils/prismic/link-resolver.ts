// https://prismic.io/docs/route-resolver#resolvers

export default [
  {
    type: 'home_page',
    lang: 'fr-fr',
    path: '/',
  },
  {
    type: 'home_page',
    lang: 'en-gb',
    path: '/en',
  },
  {
    type: 'about_page',
    path: '/:uid',
  },
  {
    type: 'project_listing_page',
    path: '/:uid',
  },
  {
    type: 'page',
    path: '/:uid',
  },
  {
    type: 'project_page',
    path: '/:lang?/projects/:uid',
  },
]
