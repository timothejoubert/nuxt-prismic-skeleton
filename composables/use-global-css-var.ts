export type KnowGlobalVarKey = 'v-top-bar-height'

export type GlobalCssVar = { [key in KnowGlobalVarKey]?: string }

export function useGlobalCssVar() {
    const globalVars = useState<GlobalCssVar>('globalCssVar', () => ({}))

    const allGlobalStyle = computed(() => {
        return Object.entries(globalVars.value).reduce((acc: { [key: string]: string }, [key, value]) => {
            Object.assign(acc, { [`--${key}`]: value })
            return acc
        }, {})
    })

    return { allGlobalStyle, globalVars }
}
