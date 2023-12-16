import type { ComponentPublicInstance, MaybeRefOrGetter } from 'vue'

type PossibleType = HTMLElement | ComponentPublicInstance | null | undefined

export function getHtmlElement(element: MaybeRefOrGetter<PossibleType>) {
    const el = toValue(element)
    if (!el) return

    return ((el as ComponentPublicInstance)?.$el || el) as HTMLElement | undefined
}
