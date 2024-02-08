<script lang="ts" setup>
import relationLinkImage from '~/stories/fixtures/media/relation-link-image.json'

const props = {
  media: {},
  src: '',
  embedUrl: '',
  sizes: 'xs:200px lg:50vw',
  alt: '',
  copyright: '',
  imgixParams: {},
  widths: ['number', 'number'],
}

const prismicRelationImg = {
  media: relationLinkImage,
  src: '',
  embedUrl: '',
  sizes: 'xs:200px lg:50vw',
  alt: 'alt texte',
  copyright: 'copyright',
}
</script>

<template>
  <VStory :class="$style.root" :props-object="props">
    <div>
      <p>media: relationLinkImage</p>
      <VPicture v-bind="prismicRelationImg" />
    </div>
  </VStory>
</template>

<style lang="scss" module>
.root {
}
</style>
