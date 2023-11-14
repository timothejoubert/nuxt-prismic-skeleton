import type { TransitionProps } from 'vue'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'

const defaultPageTransition: TransitionProps = {
    css: false,
    mode: 'out-in',
    onLeave(_el, done) {
        done()
    },
    onEnter(_el, done) {
        eventBus.$emit(EventType.PAGE_TRANSITION_ENTER)
        done()
    },
}

export { defaultPageTransition }
