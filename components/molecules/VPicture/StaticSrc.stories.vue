<script lang="ts" setup>
const props = {
  sizes: 'string',
  alt: 'string',
  copyright: 'string',
  loading: 'eager | lazy',
  provider: 'ipx | prismic | string',
  media: 'string',
  preset: 'string',
  format: 'string',
  modifiers: '(Partial<ImageModifiers> | Partial<ImgixURLParams>) & { width?: number; height?: number }',
  width: 'string',
  height: 'string',
  crop: 'boolean',
  cover: 'boolean',
}
</script>

<template>
  <VStory :class="$style.root" :props-object="props">
    <VPicture src="/images/share.jpg" sizes="xs:200px lg:50vw" provider="ipx" alt="alt texte" copyright="copyright" />
    <VPicture
      src="/images/share.jpg"
      sizes="xs:200px lg:50vw"
      provider="ipx"
      alt="alt texte"
      copyright="copyright"
      :modifiers="{ width: 200, height: 400 }"
      crop
    />
    <VPicture
      src="/images/share.jpg"
      sizes="xs:200px lg:50vw"
      provider="ipx"
      alt="alt texte"
      copyright="copyright"
      width="1000"
      height="900"
      crop
    />
  </VStory>
</template>

<style lang="scss" module>
.root {
}
</style>
