import type { FilledImageFieldImage, FilledLinkToMediaField, ImageField, LinkToMediaField } from '@prismicio/types'
import { isFilledImageField, isFilledLinkToMediaField } from '~/utils/prismic/guard'

export type PrismicImageField = ImageField | LinkToMediaField
export type FilledPrismicImageField = FilledImageFieldImage | FilledLinkToMediaField

const videoExtension = ['mp4', 'mov', 'quick', 'webm', 'mkv', 'avi', 'mpeg']
const imgExtension = ['jpg', 'png', 'webp', 'gif', 'avif', 'jpeg', 'svg']

export function getImageFieldUrl(field: PrismicImageField | undefined) {
  if (!field || (!isFilledImageField(field) && !isFilledLinkToMediaField(field))) return

  return field.url
}

function getExtension(src: string | undefined) {
  // match(/\.[0-9a-z][^?]*/i)
  // match(/\.[0-9a-z]+$/i)
  // return src?.match(/\.[0-9a-z][^?]*/i)?.[0].toLowerCase()
  return src?.substring(0, src?.indexOf('?')).substring(src?.lastIndexOf('.') + 1)
}
function isVideo(ext: string | undefined) {
  return videoExtension.includes(ext ?? '')
}
function isImage(ext: string | undefined) {
  return imgExtension.includes(ext ?? '')
}

function getEmbedPlatform(src: string | undefined) {
  if (src?.includes('youtube.com/embed/')) return 'youtubeEmbed'
  else if (src?.includes('player.vimeo.com/')) return 'vimeoEmbed'
}

export function getPrismicImageData(field: PrismicImageField | undefined) {
  const url = getImageFieldUrl(field)
  const extension = getExtension(url)
  let mediaType = 'unknown'

  const isPrismicImage =
    isImage(extension) || (field as { kind?: string })?.kind === 'image' || url?.includes('images.prismic.io/')

  if (isVideo(extension)) {
    mediaType = 'video'
  } else if (isPrismicImage) {
    mediaType = 'image'
  } else if (getEmbedPlatform(url)) {
    mediaType = 'embed'
  }

  const props = {
    url,
    mediaType,
    extension,
    embedPlatform: getEmbedPlatform(url),
    alt: '',
    copyright: '',
    width: '',
    height: '',
  }

  if (isFilledImageField(field)) {
    Object.assign(props, {
      width: field.dimensions.width,
      height: field.dimensions.height,
      alt: field.alt,
      copyright: field.copyright,
    })
  } else if (isFilledLinkToMediaField(field)) {
    Object.assign(props, {
      width: field.width,
      height: field.height,
      alt: field.name,
      copyright: '',
    })
  }

  return props
}
