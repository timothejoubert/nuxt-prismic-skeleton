<script lang="ts" setup>
import type { VMediaSrcProps } from '~/components/molecules/VMedia/VMedia.vue'
import { useMedia } from '~/composables/component/use-media'

export interface VPictureProps {
  sizes?: string
  alt?: string
  copyright?: string
}

const props = defineProps<VPictureProps & VMediaSrcProps>()

const { src } = useMedia({ media: props.media })

// TODO: if has imgixParams use custom PismicImage component
// const { src, srcset, alt, copyright } = usePrismicImage({
//   field: props.media,
//   imgixParams: props.imgixParams,
//   widths: [400, 800, 1600] || 'defaults',
//   pixelDensities: '1',
// })
</script>

<template>
  <NuxtPicture
    v-if="src"
    :class="$style.root"
    :sizes="sizes || {}"
    :alt="alt"
    :copyright="copyright"
    provider="prismic"
    :src="src"
  />
  <!--    :sizes="sizes ?? {}"-->
</template>

<style lang="scss" module>
.root {
}
</style>
