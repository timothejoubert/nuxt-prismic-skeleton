<script lang="ts" setup>
import type { PropType } from 'vue'
import { commonVideoProps, videoAttributes, videoSrc } from '~/utils/video/video-props'
import { getVideoAttrsValues } from '~/utils/video/video-attributes'
import { isReferenceImage } from '~/utils/prismic/prismic-media'
import type { PrismicImageField, PrismicVideoField } from '~/utils/prismic/prismic-media'

const ytUrl = 'youtu.be/'
function extractEmbedIdFromUrl(url: string | undefined) {
  if (!url) return

  return url.substring(url.lastIndexOf(ytUrl) + ytUrl.length, url.lastIndexOf('?'))
}

const props = defineProps({
  ...commonVideoProps,
  ...videoAttributes,
  reference: { type: Object as PropType<PrismicVideoField>, required: true },
  thumbnail: { type: Object as PropType<PrismicImageField> },
  hideThumbnail: Boolean,
})

const displayedThumbnail = computed(() => {
  const documents = [props.thumbnail, props.reference]
  return documents.find((document) => isReferenceImage(document))
})

const filteredVideoProps = computed(() => {
  return Object.keys(props).reduce((acc, key) => {
    // @ts-ignore
    if (commonVideoProps[key] || videoAttributes[key] || videoSrc[key]) acc[key] = props[key]
    return acc
  }, {})
})

const dimension = computed(() => {
  return {
    width: props.width || props.reference.width,
    height: props.height || props.reference.height,
  }
})

const videoRatio = computed(() => {
  const ratio = Number(dimension.value.width) / Number(dimension.value.height)
  if (typeof ratio === 'number') return ratio
})

const embedVideoAttrs = computed(() => {
  return {
    embedPlatform: props.reference.provider_name,
    embedId: extractEmbedIdFromUrl(props.reference.embed_url),
    src: props.reference.url,
    altSources: props.reference.altSources,
    ...getVideoAttrsValues(props, !!props?.background),
    ...filteredVideoProps.value,
    ...dimension.value,
  }
})

// Video interaction
const hadInteraction = ref(false)
const onClick = (event: Event) => {
  if (event.defaultPrevented || !props.playsinline) return

  hadInteraction.value = true
}
const onVideoEnded = () => (hadInteraction.value = false)
</script>

<template>
  <VVideoPlayer v-if="hideThumbnail || props.background" v-bind="embedVideoAttrs" />
  <div v-else :class="[$style.root, hadInteraction && $style['root--had-interaction']]">
    <VButton
      :label="$t('watch_the_video')"
      theme="dark"
      icon-name="play"
      size="l"
      filled
      :class="$style.button"
      @click="onClick"
    />
    <slot>
      <VPrismicImage
        v-if="displayedThumbnail"
        :reference="displayedThumbnail"
        :class="$style.thumbnail"
        @click="onClick"
      />
      <div
        v-else
        :class="[$style.thumbnail, $style['thumbnail--placeholder']]"
        :style="{ aspectRatio: videoRatio || 16 / 9 }"
      ></div>
    </slot>
    <VVideoPlayer
      v-if="hadInteraction"
      v-bind="embedVideoAttrs"
      :autoplay="true"
      :plyr="{ listener: { ended: onVideoEnded } }"
    />
  </div>
</template>

<style lang="scss" module="">
.root {
  --v-player-position: absolute;
  --v-player-height: 100%;
  --v-player-width: 100%;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  --v-button-position: absolute;

  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .root--had-interaction & {
    pointer-events: none;
    visibility: hidden;
  }
}

.thumbnail {
  width: 100%;
  cursor: pointer;

  .root--had-interaction & {
    pointer-events: none;
    visibility: hidden;
  }

  &--placeholder {
    aspect-ratio: 16 / 9;
    background-color: color(grey-50);
  }
}
</style>
