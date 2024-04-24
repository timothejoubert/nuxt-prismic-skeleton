import type { BuildQueryURLArgs } from '@prismicio/client'
import { hash } from 'ohash'
import type { AsyncDataOptions } from '#app/composables/asyncData'
import { useLocale } from '~/composables/use-locale'
import type { ProjectPageDocument } from '~/prismicio-types'
import { encodeUrlParams } from '~/utils/url'

type PrismicAllByTypeOptions = Partial<Omit<BuildQueryURLArgs, 'page'>> // Parameters<Client>

interface UsePrismicProjectDocumentsOptions {
  params?: PrismicAllByTypeOptions
  fetchOptions?: AsyncDataOptions<ProjectPageDocument[], ProjectPageDocument[]>
}

export function usePrismicProjectDocuments(options?: UsePrismicProjectDocumentsOptions) {
  const prismic = usePrismic()
  const { fetchLocaleOption } = useLocale()
  const key = hash('project_listing' + (options ? encodeUrlParams(options) : ''))

  function fetchProjects() {
    return useAsyncData<ProjectPageDocument[]>(
      key,
      () => {
        return prismic.client.getAllByType('project_page', {
          orderings: [
            { field: 'my.project_page.creation_date', direction: 'desc' },
            { field: 'my.project_page.title' },
          ],
          lang: fetchLocaleOption.value?.lang,
          pageSize: 30,
          ...options?.params,
        })
      },
      {
        deep: false,
        lazy: true,
        ...options?.fetchOptions,
      },
    )
  }

  if (import.meta.server) {
    return fetchProjects()
  } else {
    const { data } = useNuxtData<ProjectPageDocument[]>(key)
    return data.value ? { data } : fetchProjects()
  }
}
