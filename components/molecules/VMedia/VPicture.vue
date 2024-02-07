<script lang="ts" setup>
import { asImageSrc, asImageWidthSrcSet } from '@prismicio/client'
import type { VMediaSrcProps } from '~/components/molecules/VMedia/VMedia.vue'
import { useMedia } from '~/composables/component/use-media'

export interface VPictureProps {
  sizes?: string
  alt?: string
  copyright?: string
  imgixParams?: Parameters<typeof asImageSrc>[1]
  widths?: NonNullable<Parameters<typeof asImageWidthSrcSet>[1]>['widths'] | 'thumbnails' | 'defaults'
}

const props = defineProps<VPictureProps & VMediaSrcProps>()

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
