import { Comment } from 'vue'
import type { VNode, Slot } from 'vue'

export function hasSlotContent(slot: Slot | undefined, props = {}) {
    return slot && !isSlotEmpty(slot, props)
}

function isSlotEmpty(slot: Slot, props = {}) {
    return isVNodeEmpty(slot(props))
}

function isVNodeEmpty(vNode: VNode[]) {
    return !vNode || asArray(vNode).every((vNode) => vNode.type === Comment)
}

function asArray(arg: unknown[] | unknown) {
    return Array.isArray(arg) ? arg : arg != null ? [arg] : []
}
