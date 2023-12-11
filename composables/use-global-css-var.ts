export type KnowGlobalVarKey = 'v-top-bar-height'

export type GlobalCssVar = { [key in KnowGlobalVarKey]?: string }

export function useGlobalCssVar() {
    return useState<GlobalCssVar>('globalCssVar', () => ({}))
}
