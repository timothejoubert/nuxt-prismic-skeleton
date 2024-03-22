export function getSelfObjectOrFirstMapObject<T>(obj: T | T[]): T | undefined {
  if (obj && typeof obj === 'object') return obj as T
  else if (Array.isArray(obj)) return obj[0]
  else return obj
}
