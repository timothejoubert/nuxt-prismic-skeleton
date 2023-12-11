import type { MaybeRefOrGetter } from 'vue'
import type { KnowGlobalVarKey } from '~/composables/use-global-css-var'

export function useSetGlobalCssVar(key: KnowGlobalVarKey, input: MaybeRefOrGetter<string | number>) {
    const data = useGlobalCssVar()

    function set() {
        const value = toValue(input) + 'px'

        console.log('set', key, value)
        if (data.value?.[key]) Object.assign(data.value, { [key]: value })
        else data.value[key] = value
    }

    set()

    if (isRef(input)) {
        watch(input, () => {
            set()
            console.log('value update', key, input.value)
        })
    }

    return data
}
