import type { VNodeNormalizedChildren, Slot } from 'vue'

function getSlotsChildren(node?: VNodeNormalizedChildren): string | undefined {
  if (typeof node === 'string') return node

  const nodeChild = Array.isArray(node) ? node?.[0] : node
  const hasChildren = !!nodeChild && typeof nodeChild === 'object' && 'children' in nodeChild

  if (typeof nodeChild === 'string') return nodeChild
  else if (hasChildren && typeof nodeChild.children === 'string') return nodeChild.children
  else if (typeof nodeChild === 'object') {
    // @ts-ignore
    return getSlotsChildren(nodeChild)
  }
}

export function getSlotInnerText(slot: Slot | undefined) {
  if (!slot) return

  const slotChildren = getSlotsChildren(slot?.())

  if (typeof slotChildren === 'string') return slotChildren
  else return getSlotsChildren(slotChildren)
}
