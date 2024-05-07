<script lang="ts" setup>
import type { PropType } from 'vue'
import { vPrismicImageProps } from '~/components/molecules/VPrismicImage/VPrismicImage.vue'
import { vVideoPlayerProps } from '~/components/molecules/VVideoPlayer/VVideoPlayer.vue'
import { getPrismicMediaData, type PrismicImageField } from '~/utils/prismic/prismic-media'

const props = defineProps({
  reference: Object as PropType<PrismicImageField>,
  image: vPrismicImageProps,
  video: vVideoPlayerProps,
})

const mediaData = computed(() => getPrismicMediaData(props.reference as PrismicImageField | undefined))

// Display image with interaction video player listener
const isEmbedVideo = computed(() => !!(props.video?.embedId && props.video?.embedPlatform))
const hasInternalVideo = computed(() => !!props.video?.src)
const hasVideoThumbnail = computed(() => {
  return !!mediaData.value?.url && (isEmbedVideo.value || hasInternalVideo.value)
})

// Basic data
const src = computed(() => mediaData.value?.url || props.video?.url || props.image?.url)
const mediaType = computed(() => mediaData.value?.mediaType)
const embedPlatform = computed(() => props.video?.embedPlatform || mediaData.value?.embedPlatform)

const hadInteraction = ref(false)

function onThumbnailClicked() {
  hadInteraction.value = true
}

//
const videoWithoutThumbnail = computed(() => !mediaData.value?.url && hasInternalVideo.value)
const displayPlayerVideoRoot = computed(
  () => mediaType.value === 'video' || embedPlatform.value || videoWithoutThumbnail.value,
)

console.log('isEmbedVideo', isEmbedVideo.value)
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
    v-else-if="displayPlayerVideoRoot"
    :src="src"
    v-bind="video"
    :background="video?.background || videoWithoutThumbnail"
    :class="$style.root"
  />
  <VPrismicImage v-else-if="mediaType === 'image'" :reference="reference" v-bind="image" :class="$style.root"
    ><slot
  /></VPrismicImage>
  <div v-else :class="[$style.root, $style.placeholder]"></div>
</template>

<style lang="scss" module>
.root {
  aspect-ratio: var(--v-prismic-medias-aspect-ratio);
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
