import { isObject } from '~/utils/object/is-object'

export function objectHasAllKeys<T, U extends string>(entity: T, keys: U[]): Record<U, unknown> | undefined {
  const isValid = isObject(entity) && keys.every((key) => !!entity?.[key])
  return isValid ? entity : undefined
}
