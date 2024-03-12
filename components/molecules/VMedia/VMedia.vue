<script lang="ts" setup>
import type { VVideoProps } from '~/components/molecules/VVideo/VVideo.vue'
import type { VPictureProps } from '~/components/molecules/VPicture/VPicture.vue'
import { useMedia } from '~/composables/component/use-media'
import type { VMediaSrcProps } from '~/composables/component/use-media'

interface VMediaProps extends VMediaSrcProps {
  background?: boolean
  image?: VPictureProps
  video?: VVideoProps
}

const props = defineProps<VMediaProps>()

const { src, mediaType, filledMedia, embedPlatform } = useMedia({
  mediaEntity: props.mediaEntity,
  src: props.src,
  embedUrl: props.embedUrl,
})

// TODO: Create VVideoContainer (add image placeholder and interaction functionality)
</script>

<template>
  <template v-if="src">
    <template v-if="mediaType === 'video' || mediaType === 'embed'">
      <!--      <VVideo v-if="background" :src="src" :is-embed="!!embedPlatform" v-bind="video" playsinline autoplay muted loop />-->
      <!--      <VVideo v-else :src="src" v-bind="video" controls />-->
    </template>
    <template v-else-if="mediaType === 'image'">
      <VPicture :media-entity="filledMedia" v-bind="image" />
    </template>
  </template>
</template>

<style lang="scss" module>
.root {
}
</style>
