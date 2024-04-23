export const locale = {
  DEFAULT: 'fr-fr',
  EN: 'en-gb',
} as const

type LocaleValue = (typeof locale)[keyof typeof locale]
type OthersLocaleValue = Exclude<LocaleValue, typeof locale.DEFAULT>

export const allLocale = Object.values(locale)
export const othersLocale = Object.values(locale).filter((value) => value !== locale.DEFAULT) as OthersLocaleValue[]
export const defaultLocale = locale.DEFAULT
