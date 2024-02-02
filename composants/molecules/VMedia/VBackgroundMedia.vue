<script lang="ts" setup>
interface VBackgroundMedia {
  src: string
  isEmbed?: boolean
}

defineProps<VBackgroundMedia>()

const video = ref<HTMLVideoElement | null>(null)
const playState = ref(false)

function onClick() {
  playState.value = !playState.value
}

function onVideoReady() {
  playState.value = true
}

watch(playState, (play) => {
  if (!video.value) return

  if (play) video.value.play()
  else video.value.pause()
})
</script>

<template>
  <iframe
    v-if="isEmbed"
    :class="$style.root"
    width="auto"
    height="auto"
    frameborder="0"
    :src="src"
    allow="autoplay"
  ></iframe>
  <video
    v-else
    ref="video"
    :class="$style.root"
    playsinline
    autoplay
    muted
    loop
    @click.prevent="onClick"
    @canplay="onVideoReady"
  >
    <source :src="src" type="video/mp4" />
  </video>
</template>

<style lang="scss" module>
.root {
  width: 100%;
}
</style>
