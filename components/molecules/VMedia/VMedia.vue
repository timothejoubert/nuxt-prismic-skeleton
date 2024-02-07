<script lang="ts" setup>
import { asImageSrc, asImageWidthSrcSet } from '@prismicio/client'
import type { VVideoProps } from '~/components/molecules/VMedia/VVideo.vue'
import type { CustomPrismicMedia } from '~/types/media'
import type { VPictureProps } from '~/components/molecules/VMedia/VPicture.vue'
import { useMedia } from '~/composables/component/use-media'

export interface VMediaSrcProps {
  media?: CustomPrismicMedia
  src?: string
  embedUrl?: string
}

interface VMediaProps extends VMediaSrcProps {
  background?: boolean
  ratio?: number
  cover?: boolean
  videoProps?: VVideoProps
  imageProps?: VPictureProps
}

const props = defineProps<VMediaProps>()

const { src, mediaType, filledMedia, embedPlatform } = useMedia({
  media: props.media,
  src: props.src,
  embedUrl: props.embedUrl,
})
</script>

<template>
  <template v-if="src">
    <template v-if="mediaType === 'video' || mediaType === 'embed'">
      <VVideo
        v-if="background"
        :src="src"
        :is-embed="!!embedPlatform"
        v-bind="videoProps"
        playsinline
        autoplay
        muted
        loop
      />
      <VVideo v-else :src="src" v-bind="videoProps" controls />
    </template>
    <template v-else-if="mediaType === 'image'">
      <VPicture :media="filledMedia" v-bind="imageProps" />
    </template>
  </template>
</template>

<style lang="scss" module>
.root {
}
</style>
