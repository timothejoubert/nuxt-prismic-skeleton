import type { RoadizAlternateLink, RoadizWebResponse } from '@roadiz/abstract-api-client/dist/types/roadiz'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'

export interface Page {
    title?: string
    webResponse?: RoadizWebResponse
    alternateLinks?: RoadizAlternateLink[]
}

interface UsePageOptions extends Page {}

export function usePage(options?: UsePageOptions) {
    const nextPage = useNextPage()
    const currentPage = useCurrentPage()

    nextPage.value = {
        title: options?.title,
        webResponse: options?.webResponse,
        alternateLinks: options?.alternateLinks,
    }

    function onPageTransitionEnter() {
        currentPage.value = { ...nextPage.value }
    }

    watch(currentPage, () => {
        useHead({
            title: currentPage.value.title,
        })

        useAlternateLinks(currentPage.value.alternateLinks)
    })

    onBeforeMount(() => {
        eventBus.$on(EventType.PAGE_TRANSITION_ENTER, onPageTransitionEnter)
    })

    onBeforeUnmount(() => {
        eventBus.$off(EventType.PAGE_TRANSITION_ENTER, onPageTransitionEnter)
    })
}
