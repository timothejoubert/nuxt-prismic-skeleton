<script lang="ts" setup>
import type { VVideoProps } from '~/components/molecules/VMedia/VVideo.vue'
import type { VPictureProps } from '~/components/molecules/VMedia/VPicture.vue'
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

const displayVideo = computed(() => (src.value && mediaType.value === 'video') || mediaType.value === 'embed')
const displayImage = computed(() => mediaType.value === 'image')
</script>

<template>
  <template v-if="displayVideo">
    <VVideo v-if="background" :src="src" :is-embed="!!embedPlatform" v-bind="video" playsinline autoplay muted loop />
    <VVideo v-else :src="src" v-bind="video" controls />
  </template>
  <template v-else-if="displayImage">
    <VPicture :media-entity="filledMedia" v-bind="image" />
  </template>
</template>

<style lang="scss" module>
.root {
}
</style>
