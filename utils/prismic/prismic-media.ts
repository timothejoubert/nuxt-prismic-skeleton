import type {
  EmbedField,
  FilledImageFieldImage,
  FilledLinkToMediaField,
  ImageField,
  LinkToMediaField,
} from '@prismicio/types'
import { isFilledImageField, isFilledLinkToMediaField, isVideoEmbedField } from '~/utils/prismic/guard'
import prismicData from '~/slicemachine.config.json'
import { removeSpecialCharacter } from '~/utils/string/format'

export type PrismicImageField = ImageField | LinkToMediaField | EmbedField
export type FilledPrismicImageField = FilledImageFieldImage | FilledLinkToMediaField

const videoExtension = ['mp4', 'mov', 'quick', 'webm', 'mkv', 'avi', 'mpeg']
const imgExtension = ['jpg', 'png', 'webp', 'gif', 'avif', 'jpeg', 'svg']

export function getImageFieldUrl(field: PrismicImageField | undefined) {
  if (!field) return

  if (isVideoEmbedField(field)) return field.embed_url
  else if (isFilledImageField(field) || isFilledLinkToMediaField(field)) return field.url
}

function isVideo(ext?: string) {
  return videoExtension.includes(ext || '')
}
function isImage(ext?: string) {
  return imgExtension.includes(ext || '')
}

function getEmbedPlatform(src: string | undefined) {
  if (src?.includes('youtube.com/embed/')) return 'youtubeEmbed'
  else if (src?.includes('player.vimeo.com/')) return 'vimeoEmbed'
}

function extractDataFromUrl(url: string | undefined) {
  // Ex pattern: https://images.prismic.io/hugo-tomasi-v2/Zh10NDjCgu4jz1TZ_electrochoc-screen-01.png?auto=format,compress
  const path =
    url?.substring(
      url?.lastIndexOf(prismicData.repositoryName) + prismicData.repositoryName.length,
      url?.lastIndexOf('?'),
    ) || ''

  const id = path.substring(0, path.lastIndexOf('_'))
  const name = path.substring(path.indexOf('_') + 1, path.lastIndexOf('.'))
  const extension = path.substring(path.indexOf('.') + 1)

  return { name, id, extension }
}

export function getPrismicMediaData(field: PrismicImageField | undefined) {
  const url = getImageFieldUrl(field)
  const { extension, name, id } = extractDataFromUrl(url)
  let mediaType = 'unknown'

  const isPrismicImage =
    isImage(extension) || (field as { kind?: string })?.kind === 'image' || url?.includes('images.prismic.io/')

  if (isVideo(extension)) {
    mediaType = 'video'
  } else if (isPrismicImage) {
    mediaType = 'image'
  } else if (getEmbedPlatform(url) || isVideoEmbedField(field)) {
    mediaType = 'embed'
  }

  const data = {
    name: removeSpecialCharacter((field as { name?: string })?.name || name),
    id: (id || (Math.random() * 1000).toString()) as string,
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
    Object.assign(data, {
      width: field.dimensions.width,
      height: field.dimensions.height,
      alt: field.alt,
      copyright: field.copyright,
    })
  } else if (isFilledLinkToMediaField(field)) {
    Object.assign(data, {
      width: field.width,
      height: field.height,
      alt: field.name,
      copyright: '',
    })
  }

  return data
}
