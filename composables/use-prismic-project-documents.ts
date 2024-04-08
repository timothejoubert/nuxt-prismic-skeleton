import type { BuildQueryURLArgs } from '@prismicio/client'
import { useLocale } from '~/composables/use-locale'

type PrismicAllByTypeOptions = Partial<Omit<BuildQueryURLArgs, 'page'>> // Parameters<Client>

export function usePrismicProjectDocuments(options?: PrismicAllByTypeOptions) {
  const prismic = usePrismic()
  const { fetchLocaleOption } = useLocale()

  return useAsyncData(
    'project_listing',
    () => {
      return prismic.client.getAllByType('project_page', {
        orderings: [{ field: 'my.project_page.creation_date', direction: 'desc' }, { field: 'my.project_page.title' }],
        lang: fetchLocaleOption.value?.lang,
        pageSize: 30,
        ...options,
      })
    },
    { deep: false },
  )
}
