<script lang="ts" setup>
import relationLinkImage from '~/stories/fixtures/media/relation-link-image.json'
import VStory from '~/stories/commons/VStory.vue'

const props = {
  media: relationLinkImage,
  src: '',
  embedUrl: '',
  sizes: 'xs:200px lg:50vw',
  alt: 'alt texte',
  copyright: 'copyright',
  // imgixParams: {},
  // widths: [200, 400],
}

// TODO: import globally commons Stories component from module
</script>

<template>
  <VStory :class="$style.root">
    <VPicture v-bind="props" />
  </VStory>
</template>

<style lang="scss" module>
.root {
}
</style>
