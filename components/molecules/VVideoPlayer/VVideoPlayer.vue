<script lang="ts">
import type { PropType } from 'vue'
import type { EmbedField, LinkToMediaField } from '@prismicio/types'
import { commonVideoProps, embedVideoProps, videoAttributes, videoSrc } from '~/utils/video/video-props'
import { getEmbedSrc } from '~/utils/media/embed'
import { isVideoEmbedField } from '~/utils/prismic/guard'

export type CustomEmbedField = {
  video_id: string
  provider_name: 'vimeo' | 'youtube' | 'Vimeo' | 'YouTube'
}

type VideoReference = (EmbedField | CustomEmbedField | LinkToMediaField) & {
  width?: number | string
  height?: number | string
}

export const vVideoPlayerProps = {
  reference: Object as PropType<VideoReference>,
  ratio: Number,
  ...videoSrc,
  ...videoAttributes,
  ...embedVideoProps,
  ...commonVideoProps,
  // plyr: { type: Object as PropType<Plyr.Options> },
}

function getVideoAttrsValues(props: Record<string, unknown>) {
  return {
    playsinline: props.playsinline || props.background,
    muted: !!props.muted || props.background,
    loop: !!props.loop || props.background,
    autoplay: !!props.autoplay || props.background,
    controls: props.controls && !props.background,
  }
}

function isCustomEmbed(field?: unknown) {
  if (!field || typeof field !== 'object') return

  if ('video_id' in field && 'provider_name' in field && !!field.video_id && !!field.provider_name) {
    return field as CustomEmbedField
  }
}

function isPrismicEmbed(field: unknown) {
  return isVideoEmbedField(field) ? field : undefined
}

export default defineComponent({
  props: vVideoPlayerProps,
  setup(props) {
    // ATTRIBUTES
    const videoAttrsValue = computed(() => getVideoAttrsValues(props))

    const playsinline = computed(() => videoAttrsValue.value.playsinline)
    const muted = computed(() => videoAttrsValue.value.muted)
    const loop = computed(() => videoAttrsValue.value.loop)
    const autoplay = computed(() => videoAttrsValue.value.autoplay)
    const controls = computed(() => videoAttrsValue.value.controls)

    const videoAttrs = computed(() => {
      return {
        width: props.width || props.reference?.width,
        height: props.height || props.reference?.height,
        playsinline: playsinline.value ? '' : undefined,
        muted: muted.value ? '' : undefined,
        loop: loop.value ? '' : undefined,
        autoplay: autoplay.value ? '' : undefined,
        controls: controls.value ? '' : undefined,
      }
    })

    // EMBED
    const embedData = computed(() => {
      const isNativeEmbed = isPrismicEmbed(props.reference)
      const customEmbed = isCustomEmbed(props.reference)

      if (customEmbed) {
        return customEmbed
      } else if (isNativeEmbed) {
        const urlId = isNativeEmbed.embed_url.substring(isNativeEmbed.embed_url.lastIndexOf('/') + 1)
        const endIndexId = urlId.lastIndexOf('?') === -1 ? urlId.length : urlId.lastIndexOf('?')
        return {
          ...isNativeEmbed,
          video_id: (isNativeEmbed.video_id || urlId.substring(0, endIndexId)).toString(),
        }
      }
    })

    const videoSrc = computed(() => {
      if (!embedData.value) return props.reference?.url || props.src

      let params: Record<string, string> = {}
      const platform = embedData.value.provider_name?.toLocaleLowerCase() || ''

      if (platform === 'youtube') {
        params = {
          iv_load_policy: '3',
          modestbranding: '1',
          playsinline: '1',
          showinfo: '0',
          rel: '0',
          enablejsapi: '1',
          autoplay: autoplay.value ? '1' : '0',
          mute: muted.value ? '1' : '0',
          loop: loop.value ? '1' : '0',
          controls: controls.value ? '1' : '0',
        }
      } else if (platform === 'vimeo') {
        params = {
          loop: 'false',
          byline: 'false',
          portrait: 'false',
          title: 'false',
          speed: 'true',
          transparent: '0',
          gesture: 'media',
        }
      }

      return getEmbedSrc(embedData.value.video_id, platform, params)
    })

    // Native video
    const videoSources = computed(() => {
      if (embedData.value) return []

      const altSources = (props.altSources || [])
        .filter((file) => !!file.relativePath)
        .map((file) => {
          return {
            src: props.src,
            type: file.mimeType,
          }
        })
      return [{ src: videoSrc.value, type: props.mimeType || 'video/mp4' }, ...altSources]
    })

    const playerElement = ref<HTMLElement | null>()
    const centerOffset = ref(0)
    const playerSize = ref<number[]>([])

    const videoRatio = computed(() => {
      if (props.ratio) return props.ratio
      else if (videoAttrs.value.width && videoAttrs.value.height)
        return videoAttrs.value.width / videoAttrs.value.height

      return 16 / 9
    })

    function updatePlayerSize() {
      // for now, it handles cover size only
      const width = (playerElement.value?.clientWidth || 0) + 2 // + 2 for hiding a potential antialiasing issue
      const height = (playerElement.value?.clientHeight || 0) + 2
      const boundsRatio = width / height

      if (boundsRatio < videoRatio.value) {
        // Increase size for fill height
        playerSize.value = [height * videoRatio.value, height]
        centerOffset.value = Math.abs(width - window.innerWidth) / videoRatio.value
      } else {
        // Increase size for fill width
        playerSize.value = [width, width * videoRatio.value]
      }
    }

    const playerStyle = computed(() => {
      const style: Record<string, string | number> = {}
      if (playerSize.value.length) {
        style.width = playerSize.value[0] + 'px'
        style.height = playerSize.value[1] + 'px'
        // Cover center
        style.left = -centerOffset.value + 'px'
      } else if (videoRatio.value) {
        style.aspectRatio = videoRatio.value
      }

      return style
    })

    function initResizeListener() {
      updatePlayerSize()
      window.addEventListener('resize', updatePlayerSize)
    }

    onMounted(() => {
      if (props.fit === 'cover') nextTick(() => initResizeListener())
    })

    onBeforeUnmount(() => {
      if (props.fit === 'cover') window.removeEventListener('resize', updatePlayerSize)
    })

    return {
      videoSrc,
      embedData,
      playerStyle,
      videoAttrs,
      videoSources,
    }
  },
})
</script>

<template>
  <iframe
    v-if="embedData"
    ref="playerElement"
    :style="playerStyle"
    :src="videoSrc"
    frameborder="0"
    allow="autoplay"
  ></iframe>
  <video v-else v-bind="videoAttrs">
    <source v-for="source in videoSources" :key="source.src" :src="source.src" :type="source.type" />
  </video>
</template>
