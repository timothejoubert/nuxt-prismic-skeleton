<script lang="ts" setup>
import { asImageWidthSrcSet } from '@prismicio/client'
import type { VMediaSrcProps } from '~/components/molecules/VMedia/VMedia.vue'
import { useMedia } from '~/composables/component/use-media'
import type { ImgixURLParams } from '~/types/Imgix-url-params'

// const vRawPictureProps = {
//   sizes: String,
//   alt: String,
//   copyright: String,
//   imgixParams: {
//     type: Object,
//     default: undefined,
//     validator: (val: string) => {
//       return [
//         'ar',
//         'auto',
//         'bgRemove',
//         'bgRemoveFallback',
//         'bg',
//         'blendAlign',
//         'blendalign',
//         'ba',
//         'blendAlpha',
//         'bf',
//         'blur',
//         'bri',
//         'con',
//         'cornerRadius',
//         'crop',
//         'exp',
//         'fit',
//         'flip',
//         'h',
//       ].includes(val)
//     },
//   },
//   widths: {
//     type: [String, Array] as unknown as () => number[] | 'thumbnails' | 'defaults',
//     default: undefined,
//     validator: (val: unknown) => {
//       return Array.isArray(val)
//         ? val.every((v) => typeof v === 'number')
//         : typeof val === 'string' && ['thumbnails', 'defaults'].includes(val)
//     },
//   },
// }
// const props = defineProps(vRawPictureProps)

export type VPictureProps = VMediaSrcProps & {
  sizes?: string
  alt?: string
  copyright?: string
  imgixParams?: ImgixURLParams // Parameters<typeof asImageSrc>[1]
  widths?: NonNullable<Parameters<typeof asImageWidthSrcSet>[1]>['widths'] | 'thumbnails' | 'defaults'
}

const props = defineProps<VPictureProps>()

const { src: defaultSrc, alt, copyright } = useMedia({ media: props.media })

// TODO: if has imgixParams use custom PismicImage component
const { src: prismicSrc, srcset } = usePrismicImage({
  field: props.media,
  imgixParams: props.imgixParams,
  widths: [400, 800, 1600] || 'defaults',
  pixelDensities: '1',
})

const usePrismicComponent = computed(() => !!props.imgixParams || !!props.widths)
const src = computed(() => (usePrismicComponent.value ? prismicSrc.value : defaultSrc.value))
</script>

<template>
  <template v-if="src">
    <picture v-if="usePrismicComponent">
      <source type="image/webp" :srcset="srcset" />
      <img :src="src" :alt="alt" :copyright="copyright" />
    </picture>
    <NuxtPicture
      v-else
      :class="$style.root"
      :sizes="sizes || {}"
      :alt="alt || ''"
      :copyright="copyright"
      provider="prismic"
      :src="src"
    />
  </template>
</template>

<style lang="scss" module>
.root {
}
</style>
