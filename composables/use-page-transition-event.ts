import EventType from '~/constants/event-type'

export function usePageTransitionEvent(event: EventType, callback: () => void) {
    onBeforeMount(() => {
        eventBus.once(event, callback)
    })

    onBeforeUnmount(() => {
        eventBus.off(event, callback)
    })
}
