<script lang="ts" setup>
import prismicImageField from 'assets/stories/fixtures/media/image-field.json'

const props = {
  mediaEntity: 'prismicImageField',
  sizes: 'xs:200px lg:50vw',
  alt: 'alt texte',
  width: '20',
  height: '80',
  crop: true,
}
</script>

<template>
  <NuxtStory :class="$style.root" :props-object="props">
    <VPicture :media-entity="prismicImageField" sizes="xs:400px lg:60vw" />

    <VPicture :media-entity="prismicImageField" sizes="xs:200px lg:40vw" alt="alt texte" />

    <VPicture
      :media-entity="prismicImageField"
      sizes="xs:100xs lg:100vw"
      alt="alt texte"
      width="400"
      height="400"
      crop
    />

    <VPicture :media-entity="prismicImageField" sizes="xs:200px lg:50vw" alt="alt texte" width="20" height="80" crop />
  </NuxtStory>
</template>

<style lang="scss" module>
.root {
}
</style>
