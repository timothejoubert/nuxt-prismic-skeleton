<script lang="ts" setup>
import type { PropType } from 'vue'
import { commonVideoProps, videoAttributes, videoSrc } from '~/utils/video/video-props'
import { getVideoAttrsValues } from '~/utils/video/video-attributes'
import type { PrismicImageField, PrismicVideoField } from '~/utils/prismic/prismic-media'
import { isReferenceImage, isVideoEmbedField } from '~/utils/prismic/guard'

const props = defineProps({
    ...commonVideoProps,
    ...videoAttributes,
    reference: { type: Object as PropType<PrismicVideoField>, required: true },
    thumbnail: { type: Object as PropType<PrismicImageField> },
    hideThumbnail: Boolean,
})

const displayedThumbnail = computed(() => {
    const documents = [props.thumbnail, props.reference]
    return documents.find(document => isReferenceImage(document))
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

const YT_URL = 'youtu.be/'
const embedProps = computed(() => {
    const embed = isVideoEmbedField(props.reference) && props.reference

    if (!embed) return

    if (embed.provider_name?.toLocaleLowerCase() === 'youtube') {
        const url = embed.embed_url
        return {
            ...embed,
            video_id: url.substring(url.lastIndexOf(YT_URL) + YT_URL.length, url.lastIndexOf('?')),
        }
    }

    return embed
})

const videoAttrs = computed(() => {
    return {
        embedPlatform: embedProps.value?.provider_name,
        embedId: embedProps.value?.video_id,
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
    <VVideoPlayer
        v-if="hideThumbnail || props.background"
        v-bind="videoAttrs"
    />
    <div
        v-else
        :class="[$style.root, hadInteraction && $style['root--had-interaction']]"
    >
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
            />
        </slot>
        <VVideoPlayer
            v-if="hadInteraction"
            v-bind="videoAttrs"
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
    position: relative;
    aspect-ratio: 16 / 9;
    background-color: color(grey-50);

    &::after {
      position: absolute;
      inset: 0;
      content: '';
      background: linear-gradient(45deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
    }
  }
}
</style>
