export function getSelfObjectOrFirstMapObject<T>(obj: T | T[]): T | undefined {
    if (obj && Array.isArray(obj)) return obj[0]
    else if (obj && typeof obj === 'object') return obj as T
    else return obj
}
