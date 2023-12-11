import type { TransitionProps } from 'vue'
import { gsap } from 'gsap'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'
import cssColor from '~/assets/scss/export/_colors.module.scss'

function foregroundElement() {
    const foreground = document.createElement('div')
    foreground.style.position = 'fixed'
    foreground.style.inset = '0'
    foreground.style.zIndex = '5'
    foreground.style.background = cssColor['color-secondary']

    return foreground
}

const defaultPageTransition: TransitionProps = {
    css: false,
    mode: 'out-in',
    onLeave(_element, done) {
        eventBus.emit(EventType.PAGE_TRANSITION_LEAVE)

        if (usePrefersReducedMotion().value) {
            done()
        } else {
            const foreground = foregroundElement()
            document.body.appendChild(foreground)

            disableBodyScroll(document.body, { reserveScrollBarGap: true })

            gsap.from(foreground, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    foreground.remove()
                    done()
                },
            })
        }
    },
    onAfterLeave() {
        eventBus.emit(EventType.PAGE_TRANSITION_AFTER_LEAVE)
    },
    onEnter(element, done) {
        if (usePrefersReducedMotion().value) {
            eventBus.emit(EventType.PAGE_TRANSITION_ENTER)
            done()
        } else {
            const foreground = foregroundElement()
            element.appendChild(foreground)

            eventBus.emit(EventType.PAGE_TRANSITION_ENTER)
            gsap.to(foreground, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    enableBodyScroll(document.body)
                    foreground.remove()
                    done()
                },
            })
        }
    },
}

export { defaultPageTransition }
