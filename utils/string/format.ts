export function format(value: string) {
  return value.replace(/^\/|\/$/g, '')
}

export function removeSpecialCharacter(value: string) {
  return value.replace(/[^\w\s]/gi, ' ')
}
