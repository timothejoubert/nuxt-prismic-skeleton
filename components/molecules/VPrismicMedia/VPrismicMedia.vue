<script lang="ts" setup>
import type { PropType } from 'vue'
import { vPrismicImageProps } from '~/components/molecules/VPrismicImage/VPrismicImage.vue'
import { vVideoPlayerProps } from '~/components/molecules/VVideoPlayer/VVideoPlayer.vue'
import { getPrismicMediaData, type PrismicImageField, type PrismicMediaField } from '~/utils/prismic/prismic-media'

const props = defineProps({
  reference: Object as PropType<PrismicMediaField>,
  image: vPrismicImageProps,
  video: vVideoPlayerProps,
})

const referenceData = computed(() => getPrismicMediaData(props.reference as PrismicImageField | undefined))

// Type
const isEmbedVideo = computed(() => referenceData.value.mediaType === 'embed')
const isNativeVideo = computed(() => referenceData.value.mediaType === 'video')
const isVideo = computed(() => isEmbedVideo.value || isNativeVideo.value)
const videoThumbnail = computed(() => (isVideo.value && props.image?.reference ? props.image : undefined))
const videoReference = computed(() => {
  if (!isVideo.value) return

  // TODO check if video ref is filled
  if (props.video?.reference) return props.video?.reference
  return props.reference
})

// Reference data
const mediaType = computed(() => referenceData.value?.mediaType)

// Video with thumbnail
const hadInteraction = ref(false)
function onThumbnailClicked() {
  hadInteraction.value = true
}
</script>

<template>
  <div
    v-if="videoThumbnail"
    :class="[$style.root, $style.wrapper, hadInteraction && $style['wrapper--had-interaction']]"
    @click="onThumbnailClicked"
  >
    <VButton size="s" filled icon-name="play" tag="div" :class="$style.button" />
    <VPrismicImage v-bind="videoThumbnail" :class="$style.image"><slot /></VPrismicImage>
    <VVideoPlayer
      v-if="hadInteraction"
      v-bind="video"
      :reference="videoReference"
      :autoplay="true"
      :class="$style['player']"
    />
  </div>
  <VVideoPlayer
    v-else-if="isVideo"
    v-bind="video"
    :reference="videoReference"
    :background="video?.background"
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
