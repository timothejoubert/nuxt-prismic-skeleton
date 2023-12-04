import type { VNodeNormalizedChildren, Slots, VNode, Slot } from 'vue'

function getSlotsChildren(node?: VNodeNormalizedChildren): string {
    if (typeof node === 'string') return node
    else if (Array.isArray(node)) {
        const children = (node[0] as VNode)?.children || (node[0] && getSlotsChildren(node[0]))
        return typeof children === 'string' ? children : getSlotsChildren(children)
    } else {
        return node || ''
    }
}

export function getSlotInnerText(slots: Slots) {
    const slotChildren = getSlotsChildren(slots.default?.())

    if (typeof slotChildren === 'string') return slotChildren
    else return getSlotsChildren(slotChildren)
}

// export function getSlotChildrenText(node: Slot) {
//     if (!node.children || typeof node.children === 'string') return node.children || ''
//     else if (Array.isArray(node.children)) return getSlotChildrenText(node.children)
//     else if (node.children.default) return getSlotChildrenText(node.children.default())
// }

// const getSlotChildrenText = (children) =>
//     children
//         .map((node) => {
//             if (!node.children || typeof node.children === 'string') return node.children || ''
//             else if (Array.isArray(node.children)) return getSlotChildrenText(node.children)
//             else if (node.children.default) return getSlotChildrenText(node.children.default())
//         })
//         .join('')
