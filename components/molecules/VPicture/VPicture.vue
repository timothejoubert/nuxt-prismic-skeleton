<script lang="ts" setup>
import type { ImageModifiers } from '@nuxt/image'
import type { ImgixUrl } from 'typescript-imgix-url-params'
import type { VMediaSrcProps } from '~/composables/component/use-media'
import { useMedia } from '~/composables/component/use-media'

export type VImageProps = {
  sizes?: string
  alt?: string
  copyright?: string
  loading?: 'eager' | 'lazy'
  provider?: 'ipx' | 'prismic' | string
  media?: string // `(max-width: ${getBreakpointValue('lg') - 1}px)`
  preset?: string
  format?: string
  modifiers?: Partial<ImageModifiers> | Partial<ImgixUrl.Params>
  width?: string
  height?: string
}

export type VPictureProps = VMediaSrcProps &
  VImageProps & {
    // Custom props
    crop?: boolean
    cover?: boolean
  }

const props = defineProps<VPictureProps>()

// Getters
const { src, alt, copyright, dimension } = useMedia({ mediaEntity: props.mediaEntity, src: props.src })
const imgWidth = computed(() => props.width || dimension.value?.width)
const imgHeight = computed(() => props.height || dimension.value?.height)
const hasDimension = computed(() => !!imgWidth.value && !!imgHeight.value)
const ratio = computed(() => hasDimension.value && Number(imgWidth.value) / Number(imgHeight.value))
const providerOutput = computed(() => props.provider || 'imgix' || 'prismic')

// Options
const cropImg = computed(() => props.crop && hasDimension.value)

const img = useImage()
const getGenerateImg = (modifiersOptions?: Partial<ImageModifiers>) => {
  const options = {
    provider: providerOutput.value,
    preset: props.preset,
    sizes: props.sizes || img.options.screens,
    modifiers: {
      ...props.modifiers,
      ...modifiersOptions,
    },
  }

  if (cropImg.value) {
    Object.assign(options.modifiers, { width: imgWidth.value, height: imgHeight.value })

    if (providerOutput.value === 'imgix') {
      Object.assign(options.modifiers, { fit: 'crop' })
    }
  }

  return img.getSizes(src.value || '', options)
}

const generatedImg = computed(() => getGenerateImg())

const webpSizes = computed(() => getGenerateImg({ format: 'webp' }))
const hasWebp = computed(() => props.format !== 'webp' && !src.value?.endsWith('.webp'))

// TODO: Add loading placeholder

// const avifSizes = computed(() => getGenerateImg({ modifiers: { ...options.modifiers, format: 'avif' } }))
// const hasAvif = computed(() => props.format !== 'avif' && !src.value?.endsWith('.avif'))
</script>

<template>
  <picture v-if="src" :style="{ '--v-picture-ratio': ratio }" :class="$style.root">
    <source v-if="hasWebp" type="image/webp" :media="media" :sizes="generatedImg.sizes" :srcset="webpSizes.srcset" />
    <img
      :src="generatedImg.src"
      :srcset="generatedImg.srcset"
      :alt="alt"
      :width="imgWidth"
      :height="imgHeight"
      :loading="loading || 'lazy'"
      :copyright="copyright"
      :class="$style.img"
    />
  </picture>
</template>

<style lang="scss" module>
.root {
  //aspect-ratio: var(--v-picture-ratio);
}

.img {
  width: var(--v-picture-image-width, auto);
  height: var(--v-picture-image-height, auto);
}
</style>
