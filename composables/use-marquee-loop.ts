type ElementWithObserver = HTMLElement & { resizeObserver?: ResizeObserver }

interface UseMarqueeLoopOptions {
  fps?: number
  speed?: number
}

interface Item {
  item: HTMLElement
  left: number
  right: number
  width: number
  height: number
  min: number
  max: number
  out: boolean
}

let ITEMS: Item[] = []

const TRANSLATE = {
  current: 0,
  end: 0,
}

let THEN = Date.now()
let RAF: number
let OBSERVER: null | IntersectionObserver
let IS_VISIBLE: null | boolean

function mathRound(value: number, exponent = 2) {
  const power: number = Math.pow(10, exponent)

  return Math.round(value * power) / power
}

function mathWrap(current: number, min: number, max: number) {
  const range = max - min
  const func = (value: number) => ((range + ((value - min) % range)) % range) + min

  return current || current === 0 ? func(current) : func
}

function setProperties(element: HTMLElement, children: NodeListOf<HTMLElement> | undefined, windowWidth: number) {
  return new Promise((resolve) => {
    if (!children) return

    let wrapperFirstElement = 0
    let wrapperSecondElement = 20
    let maxWidthElement = 0
    let wrapperBounds = element.getBoundingClientRect()

    for (let i = 0; i < children.length; i++) {
      const item = children[i]
      const { left, right, width } = (item as HTMLElement).getBoundingClientRect()

      if (i === 0) wrapperFirstElement = right
      if (i === 1) wrapperSecondElement = left

      maxWidthElement = Math.max(width, maxWidthElement)
    }

    const gap = wrapperSecondElement - wrapperFirstElement

    // duplicate node if there are too few elements
    while (wrapperBounds.width < windowWidth + maxWidthElement + gap) {
      for (let i = 0; i < children.length; i++) {
        element.appendChild(children[i].cloneNode(true))
      }

      children = element.querySelectorAll(':scope > *') as NodeListOf<HTMLElement>
      wrapperBounds = element.getBoundingClientRect()
    }

    const wrapperOptions = {
      gap,
      max: wrapperBounds.right,
    }

    for (let i = 0; i < children.length; i++) {
      const item = children[i]
      const { left, right, width, height } = (item as HTMLElement).getBoundingClientRect()

      ITEMS.push({
        item,
        left,
        right,
        width,
        height,
        min: -right,
        max: wrapperOptions.max - left - width + wrapperOptions.gap,
        out: false,
      })

      if (i === children.length - 1) resolve(true)
    }
  })
}

function raf(fps: number, speed: number, windowWidth: number) {
  RAF = window.requestAnimationFrame(() => {
    raf(fps, speed, windowWidth)
  })

  if (IS_VISIBLE) {
    const fpsInterval = 1000 / fps
    const now = Date.now()
    const elapsed = now - THEN

    if (elapsed > fpsInterval) {
      THEN = now - (elapsed % fpsInterval)

      TRANSLATE.current -= speed
      TRANSLATE.current = mathRound(TRANSLATE.current)

      for (let i = 0; i < ITEMS.length; i++) transform(TRANSLATE.current, i, windowWidth)
    }
  }
}

function transform(value: number, i: number, windowWidth: number) {
  const { item, min, max, left } = ITEMS[i]
  const x = mathWrap(value, min, max)

  if (x <= -(left - windowWidth)) {
    ITEMS[i].out && (ITEMS[i].out = false)

    item.style.transform = `translate3d(${x}px, 0, 0)`
  } else if (!ITEMS[i].out) {
    ITEMS[i].out = true

    item.style.transform = `translate3d(${x}px, 0, 0)`
  }
}

function initIntersectionObserver(element: HTMLElement) {
  OBSERVER = new IntersectionObserver(onIntersectionObserverChange, {
    rootMargin: '0px',
    threshold: 0,
  })

  OBSERVER.observe(element)
}

function onIntersectionObserverChange([entry]: IntersectionObserverEntry[]) {
  IS_VISIBLE = entry.isIntersecting
}

function destroyIntersectionObserver() {
  OBSERVER?.disconnect()
  OBSERVER = null
}

function createResizeObserver(el: HTMLElement, fps: number, speed: number) {
  const resizeObserver = new ResizeObserver(function () {
    destroyIntersectionObserver()
    RAF && window.cancelAnimationFrame(RAF)

    TRANSLATE.current = 0
    TRANSLATE.end = 0

    const windowWidth = window.innerWidth
    const children = el.querySelectorAll<HTMLElement>(':scope > *')

    for (let i = 0; i < ITEMS.length; i++) transform(TRANSLATE.current, i, windowWidth)

    ITEMS = []

    initIntersectionObserver(el)
    setProperties(el, children, windowWidth).then((response) => {
      response && raf(fps, speed, windowWidth)
    })
  })

  ;(el as ElementWithObserver).resizeObserver = resizeObserver

  resizeObserver.observe(el)
}

function disposeResizeObserver(element: HTMLElement) {
  ;(element as ElementWithObserver)?.resizeObserver?.disconnect()
  delete (element as ElementWithObserver).resizeObserver
}

export function useMarqueeLoop(el: HTMLElement, options?: UseMarqueeLoopOptions) {
  onMounted(() => {
    createResizeObserver(el, options?.fps || 120, options?.speed || 1)
  })

  onUnmounted(() => {
    disposeResizeObserver(el)
    destroyIntersectionObserver()

    window.cancelAnimationFrame(RAF)
  })
}
