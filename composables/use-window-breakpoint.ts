import { throttle } from '@antfu/utils'

type UseWindowBreakpointCallback = (width: number) => boolean

export function useWindowBreakpoint(callback: UseWindowBreakpointCallback) {
    const { width } = useWindowSize()
    const isValid = ref(callback(width.value))

    const resizeCallback = throttle(100, () => {
        isValid.value = callback(width.value)
    })

    watch(width, resizeCallback)

    return isValid
}
