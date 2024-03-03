export function stringifyProps(propsObject: Object) {
  if (!propsObject) return

  return JSON.stringify(
    propsObject,
    (_key, value) => {
      if (Array.isArray(value)) return `[${value.join(', ')}]`
      return value
    },
    ' ',
  ).replace(/"([^"]+)":/g, '$1:')
}
