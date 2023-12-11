import type { PrismicDocument } from '@prismicio/types'
import { useNextPage } from '~/composables/use-next-page'
import { useCurrentPage } from '~/composables/use-current-page'
import EventType from '~/constants/event-type'

export interface Page {
    title?: string | null
    webResponse?: PrismicDocument
    // alternateLinks?: RoadizAlternateLink[];
}

interface UsePageOptions extends Page {}

export function usePage(options?: UsePageOptions) {
    const nextPage = useNextPage()
    const currentPage = useCurrentPage()
    const isFirstPageVisited = useFirstPageVisited()

    nextPage.value = {
        title: options?.title,
        webResponse: options?.webResponse,
        // alternateLinks: options?.alternateLinks,
    }

    watch(currentPage, () => {
        useHead({
            title: currentPage.value.title,
        })

        // useAlternateLinks(currentPage.value.alternateLinks)
    })

    if (!currentPage.value?.webResponse) currentPage.value = { ...nextPage.value }

    function onPageTransitionAfterLeave() {
        isFirstPageVisited.value = false
        currentPage.value = { ...nextPage.value }
    }

    usePageTransitionEvent(EventType.PAGE_TRANSITION_AFTER_LEAVE, onPageTransitionAfterLeave)
}
