import { isObject } from '~/utils/object/is-object'

export function objectHasAllKeys(entity: unknown, keys: string[]) {
  return isObject(entity) && keys.every((key) => !!entity?.[key])
}
