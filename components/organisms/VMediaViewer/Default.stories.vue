<script setup lang="ts">
import { useMediaViewer } from '~/composables/use-media-viewer'
import type { PrismicImageField } from '~/utils/prismic/prismic-media'

const media = {
  url: 'https://images.prismic.io/hugo-tomasi-v2/Zh10NDjCgu4jz1TZ_electrochoc-screen-01.png?auto=format,compress?crop=edges&w=2500&h=1625&q=75&fit=crop',
}
const documents = [media] as PrismicImageField[]
const { isOpen, open } = useMediaViewer()

function onOpenClick() {
  open(documents, 0)
}
</script>

<template>
  <NuxtStory>
    <VButton v-if="!isOpen" label="open" filled @click="onOpenClick" />
    <Transition :name="$style['media-viewer']">
      <VMediaViewer v-if="isOpen" />
    </Transition>
  </NuxtStory>
</template>

<style lang="scss" module>
.media-viewer {
  &:global(#{'-enter-active'}),
  &:global(#{'-leave-active'}) {
    transition: translate 1s ease(out-quart);
  }
  &:global(#{'-enter-from'}),
  &:global(#{'-leave-to'}) {
    translate: 0 100%;
  }
}

.controls {
  position: fixed;
  z-index: 2000;
}
</style>
