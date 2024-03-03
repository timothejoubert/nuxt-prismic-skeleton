import type { PrismicDocument, AlternateLanguage } from '@prismicio/types'
import EventType from '~/constants/event-type'

export interface Page {
  title?: string
  webResponse?: PrismicDocument
  alternateLinks?: AlternateLanguage[]
}

interface UsePageOptions extends Page {}

export function usePage(options?: UsePageOptions) {
  const nextPage = useNextPage()
  const currentPage = useCurrentPage()

  const title = options?.title || options?.webResponse?.data?.meta_title || options?.webResponse?.data?.title

  nextPage.value = {
    title,
    webResponse: options?.webResponse,
    alternateLinks: options?.alternateLinks,
  }

  watch(currentPage, () => {
    useHead({
      title: currentPage.value.title,
    })

    useAlternateLinks(currentPage.value.alternateLinks)
  })

  if (!currentPage.value?.webResponse) currentPage.value = { ...nextPage.value }

  function onPageTransitionAfterLeave() {
    currentPage.value = { ...nextPage.value }
  }

  usePageTransitionEvent(EventType.PAGE_TRANSITION_AFTER_LEAVE, onPageTransitionAfterLeave)
}
