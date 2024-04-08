<script lang="ts" setup>
import type Plyr from 'plyr'
import type { PropType } from 'vue'
import { commonVideoProps, embedVideoProps, videoAttributes, videoSrc } from '~/utils/video/video-props'
import { getVideoAttrsValues } from '~/utils/video/video-attributes'
import { getEmbedSrc } from '~/utils/media/embed'

const props = defineProps({
  ...videoSrc,
  ...videoAttributes,
  ...embedVideoProps,
  ...commonVideoProps,
  plyr: { type: Object as PropType<Plyr.Options> },
})

// Attributes
const videoAttrsValue = computed(() => getVideoAttrsValues(props, props.background))

const playsinline = computed(() => videoAttrsValue.value.playsinline)
const muted = computed(() => videoAttrsValue.value.muted)
const loop = computed(() => videoAttrsValue.value.loop)
const autoplay = computed(() => videoAttrsValue.value.autoplay)
const controls = computed(() => videoAttrsValue.value.controls)

const videoAttrs = computed(() => {
  return {
    width: props.width,
    height: props.height,
    playsinline: playsinline.value ? '' : undefined,
    muted: muted.value ? '' : undefined,
    loop: loop.value ? '' : undefined,
    autoplay: autoplay.value ? '' : undefined,
    controls: controls.value ? '' : undefined,
  }
})

const isEmbed = computed(() => !!props.embedPlatform && !!props.embedId)

const src = computed(() => {
  if (isEmbed.value) {
    let params: Record<string, string> = {}
    if (props.embedPlatform === 'youtube') {
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
    } else if (props.embedPlatform === 'vimeo') {
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

    return getEmbedSrc(props.embedId as string, props.embedPlatform as string, params)
  } else {
    return props.src
  }
})

// Native video
const videoSources = computed(() => {
  if (isEmbed.value) return []

  const altSources = (props.altSources || [])
    .filter((file) => !!file.relativePath)
    .map((file) => {
      return {
        src: props.src,
        type: file.mimeType,
      }
    })
  return [{ src: src.value, type: props.mimeType || 'video/mp4' }, ...altSources]
})

const playerElement = ref<HTMLElement | null>()
const centerOffset = ref(0)
const playerSize = ref<number[]>([])
const videoRatio = computed(() => props.ratio || 16 / 9)

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
    if (playerSize.value.length) {
      style.width = playerSize.value[0] + 'px'
      style.height = playerSize.value[1] + 'px'
      // Cover center
      style.left = -centerOffset.value + 'px'
    }
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
</script>

<template>
  <iframe v-if="isEmbed" ref="playerElement" :style="playerStyle" :src="src" frameborder="0" allow="autoplay"></iframe>
  <video v-else v-bind="videoAttrs">
    <source v-for="source in videoSources" :key="source.src" :src="source.src" :type="source.type" />
  </video>
</template>
