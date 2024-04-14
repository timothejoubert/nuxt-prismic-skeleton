import { isObject } from '~/utils/object/is-object'

export function returnObjWithAllValidKey<T, U extends string>(entity: T, keys: U[]): Record<U, unknown> | undefined {
  const isValid = isObject(entity) && keys.every((key) => key in entity)
  return isValid ? entity : undefined
}

export function objectHasAllKeys<T, U extends string>(entity: T, keys: U[]) {
  return isObject(entity) && !!returnObjWithAllValidKey(entity, keys)
}
