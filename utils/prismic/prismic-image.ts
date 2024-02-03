import type { FilledImageFieldImage } from '@prismicio/types'

export function isPrismicImageField(field: unknown): field is FilledImageFieldImage {
  const filledField = field as FilledImageFieldImage

  return 'alt' in filledField && 'url' in filledField && 'dimensions' in filledField
}
