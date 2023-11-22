import breakpoints from '~/assets/scss/export/_breakpoints.module.scss'

interface ScssBreakpoints {
    [key: string]: string
}

interface ObjectBreakpoints {
    [key: string]: number
}

interface ImageRangeSizesOptions {
    [key: string]: number | null
}

export type ImageSizesOptions = 'fullScreen' | number | ImageRangeSizesOptions | undefined

export function getBreakpoints() {
    const entries = Object.entries(breakpoints as ScssBreakpoints)

    return entries
        .sort(([_key, value], [_currentKey, currentValue]) => parseInt(value) - parseInt(currentValue))
        .reduce((accumulator: ObjectBreakpoints, current) => {
            const key = current[0].split('breakpoint-')[1]
            const value = parseInt(current[1])

            if (!accumulator?.[key]) accumulator[key] = value

            return accumulator
        }, {})
}

function getBreakpointKeys(): string[] {
    return Object.keys(getBreakpoints())
}

export function generateImageBreakpointsRange(ranges: ImageRangeSizesOptions) {
    const breakpoints = getBreakpointKeys()
    const rangesEntries = Object.entries(ranges)

    const breakpointRanges = rangesEntries
        .filter(([_key, value]) => typeof value !== 'object')
        .map(([key, value], i) => {
            const startBreakpoint = breakpoints.findIndex((breakpointKey) => breakpointKey === key)
            const endBreakpoint = breakpoints.findIndex((breakpointKey) => breakpointKey === rangesEntries[i + 1]?.[0])

            return {
                start: startBreakpoint,
                end: endBreakpoint === -1 ? breakpoints.length : endBreakpoint,
                value: value || 80,
            }
        })

    return breakpointRanges
        .map((range) => generateImageBreakpoints(range.value, breakpoints.slice(range.start, range.end)))
        .join(' ')
}

export function generateImageBreakpoints(width = 80, range?: string[]): string {
    const breakpoints = range || getBreakpointKeys()
    return breakpoints.map((key) => `${key}:${width.toString()}vw`).join(' ')
}

export function getImageSizes(value: ImageSizesOptions) {
    if (typeof value === 'number') {
        return generateImageBreakpoints(parseInt(value.toFixed()))
    } else if (value === 'fullScreen') {
        return generateImageBreakpoints(100)
    } else if (typeof value === 'object') {
        return generateImageBreakpointsRange(value)
    } else {
        return generateImageBreakpoints()
    }
}
