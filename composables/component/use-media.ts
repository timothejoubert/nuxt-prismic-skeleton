import type { ImageField, LinkToMediaField, FilledLinkToMediaField, FilledImageFieldImage } from '@prismicio/types'
import { isLinkToFieldFilled } from '~/utils/prismic/prismic-link-to'
import { isPrismicImageField } from '~/utils/prismic/prismic-image'
import type { VMediaSrcProps } from '~/components/molecules/VMedia/VMedia.vue'

export type PrismicMedia = LinkToMediaField | ImageField
export type FilledPrismicMedia = FilledLinkToMediaField | FilledImageFieldImage

export type UseMediaOptions = VMediaSrcProps & {}

const videoExtension = ['mp4', 'mov', 'quick', 'webm', 'mkv', 'avi', 'mpeg']
const imgExtension = ['jpg', 'png', 'webp', 'gif', 'avif', 'jpeg', 'svg']

const getExtension = (src: string | undefined) => src?.match(/\.[0-9a-z]+$/i)?.[0].toLowerCase()

const isVideo = (ext: string | undefined) => videoExtension.includes(ext ?? '')
const isImage = (ext: string | undefined) => imgExtension.includes(ext ?? '')
const getEmbedPlatform = (src: string | undefined) => {
  if (src?.includes('youtube.com/embed/')) return 'youtubeEmbed'
  else if (src?.includes('player.vimeo.com/')) return 'vimeoEmbed'
}

export function useMedia(options: UseMediaOptions) {
  const filledMedia = computed<FilledPrismicMedia | undefined>(() => {
    const field = options.media

    if (isLinkToFieldFilled(field)) return field as FilledLinkToMediaField
    else if (isPrismicImageField(field)) return field
  })

  const src = computed(() => options.src || filledMedia.value?.url || options.embedUrl)
  const extension = computed(() => {
    const ext =
      getExtension(filledMedia.value?.url) ||
      getExtension((filledMedia.value as FilledLinkToMediaField)?.name) ||
      getExtension(src.value)
    return ext?.replace('.', '')
  })

  const mediaType = computed(() => {
    const isPrismicImage =
      isImage(extension.value) ||
      (filledMedia.value as FilledLinkToMediaField)?.kind === 'image' ||
      src.value?.includes('images.prismic.io/')

    if (isVideo(extension.value)) {
      return 'video'
    } else if (isPrismicImage) {
      return 'image'
    } else if (getEmbedPlatform(src.value)) {
      return 'embed'
    } else return 'unknown'
  })

  const embedPlatform = computed(() => getEmbedPlatform(src.value))

  return { src, filledMedia, mediaType, extension, embedPlatform }
}
