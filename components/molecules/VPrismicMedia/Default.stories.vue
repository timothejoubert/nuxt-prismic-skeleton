<script lang="ts" setup>
import prismicImage from 'assets/stories/fixtures/media/image-field.json'
import prismicRelationImage from 'assets/stories/fixtures/media/relation-link-image.json'
import prismicRelationVideo from 'assets/stories/fixtures/media/relation-link-video.json'
</script>

<template>
  <div :class="$style.root">
    <VPrismicMedia :reference="prismicRelationVideo" />
    <VPrismicMedia :reference="prismicRelationImage" />
    <VPrismicMedia
      :reference="prismicImage"
      :image="{ width: '600', height: '100', crop: true, sizes: 'xs:100vw lg:100vw' }"
    />
    <VPrismicMedia :reference="prismicImage" :image="{ width: '100', height: '100', crop: true, sizes: 'xs:100vw' }" />
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 50%;
  margin-inline: auto;
}
</style>
