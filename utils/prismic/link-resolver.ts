import type { PrismicDocument, LinkField } from '@prismicio/types'
import { defaultLocale } from '../../nuxt.config'
import { getLocaleLanguage } from '~/utils/locale'
import routeResolver from '~/utils/prismic/route-resolver'

export function linkResolver(doc: PrismicDocument | LinkField) {
  const localeDocument = doc?.lang || ''
  const localePath = getLocaleLanguage(localeDocument) === defaultLocale ? '' : getLocaleLanguage(localeDocument)

  const currentRoute = routeResolver.find((route) => route.type === doc?.type)
  const path = currentRoute?.path.replace(':lang?', localePath).replace(':uid', doc?.uid || '') || '/'

  console.log('doc', doc)
  console.log('localePath', localePath)
  console.log('currentRoute', currentRoute)
  console.log('outputPath', path)

  return path
}
