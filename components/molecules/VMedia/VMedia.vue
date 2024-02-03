<script lang="ts" setup>
import type { VVideoProps } from '~/components/molecules/VMedia/VVideo.vue'
import { useMedia, type PrismicMedia } from '~/composables/component/use-media'

export interface VMediaSrcProps {
  media?: PrismicMedia
  src?: string
  embedUrl?: string
}

interface VMediaProps extends VMediaSrcProps {
  background?: boolean
  videoProps?: VVideoProps
  imageProps?: unknown
}

const props = defineProps<VMediaProps>()

const { src, mediaType, filledMedia, embedPlatform } = useMedia({
  media: props.media,
  src: props.src,
  embedUrl: props.embedUrl,
})

console.log(props.media, src.value, mediaType.value)
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
      <VVideo v-else :media="media" v-bind="videoProps" />
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
