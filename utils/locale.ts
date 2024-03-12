// Convert fr-fr to fr
export function getLocaleLanguage(locale: string) {
  if (locale.split('-').length) return locale.split('-')[0]
  else return locale
}
