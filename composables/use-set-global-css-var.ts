import type { MaybeRefOrGetter } from 'vue'
import type { KnowGlobalVarKey } from '~/composables/use-global-css-var'

export function useSetGlobalCssVar(key: KnowGlobalVarKey, input: MaybeRefOrGetter<string | number>) {
    const { globalVars } = useGlobalCssVar()

    function set() {
        const value = toValue(input) + 'px'
        if (globalVars.value?.[key]) Object.assign(globalVars.value, { [key]: value })
        else globalVars.value[key] = value
    }

    set()

    if (isRef(input)) {
        watch(input, () => {
            set()
        })
    }

    return globalVars
}
