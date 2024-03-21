// Convert fr-fr to fr
export function getLocaleLanguage(localeCode: string) {
  if (localeCode.split('-').length) return localeCode.split('-')[0]
  else return localeCode
}
