<script lang="ts" setup>
import type { PropType } from 'vue'
import { vPrismicImageProps } from '~/components/molecules/VPrismicImage/VPrismicImage.vue'
import { vVideoPlayerProps } from '~/components/molecules/VVideoPlayer/VVideoPlayer.vue'
import { getImageFieldUrl, getPrismicImageData, type PrismicImageField } from '~/utils/prismic/prismic-image'

const props = defineProps({
  reference: Object as PropType<PrismicImageField>,
  image: vPrismicImageProps,
  video: vVideoPlayerProps,
})

// Display image with interaction video player listener
const isEmbedVideo = computed(() => props.video?.embedId && props.video?.embedPlatform)
const hasInternalVideo = computed(() => props.video?.src)
const hasVideoThumbnail = computed(() => {
  return props.reference && getImageFieldUrl(props.reference) && (isEmbedVideo.value || hasInternalVideo.value)
})

const referenceProps = computed(() => props.reference && getPrismicImageData(props.reference))

const src = computed(() => referenceProps.value?.url)
const mediaType = computed(() => referenceProps.value?.mediaType)
const embedPlatform = computed(() => props.video?.embedPlatform || referenceProps.value?.embedPlatform)

const hadInteraction = ref(false)
function onThumbnailClicked() {
  hadInteraction.value = true
}
</script>

<template>
  <div
    v-if="hasVideoThumbnail"
    :class="[$style.root, $style.wrapper, hadInteraction && $style['wrapper--had-interaction']]"
    @click="onThumbnailClicked"
  >
    <VButton size="s" filled icon-name="play" tag="div" :class="$style.button" />
    <VPrismicImage :reference="reference" v-bind="image" :class="$style.image"><slot /></VPrismicImage>
    <VVideoPlayer v-if="hadInteraction" v-bind="video" autoplay :class="$style['player']" />
  </div>
  <VVideoPlayer
    v-else-if="mediaType === 'video' || embedPlatform"
    :src="src"
    v-bind="video"
    :class="$style.root"
    :is-embed="embedPlatform"
  />
  <VPrismicImage v-else-if="mediaType === 'image'" :reference="reference" v-bind="image" :class="$style.root"
    ><slot
  /></VPrismicImage>
  <div v-else :class="[$style.root, $style.placeholder]"></div>
</template>

<style lang="scss" module>
.root {
  border-radius: var(--v-prismic-media-border-radius);
  overflow: hidden;
}

.wrapper {
  position: relative;
  cursor: pointer;

  .player {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    object-fit: cover;
  }

  &--had-interaction .button,
  &--had-interaction .image {
    opacity: 0;
  }
}

.placeholder {
  aspect-ratio: 16 / 9;
  width: 100%;
  background-color: lightgrey;
}

.button {
  --v-button-position: absolute;
  right: rem(12);
  bottom: rem(12);
  z-index: 1;
}
</style>
