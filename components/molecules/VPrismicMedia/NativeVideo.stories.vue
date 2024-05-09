<script lang="ts" setup="">
const mediaProps = {
  reference: {
    link_type: 'Media',
    id: 'ZiUrkfPdc1huKqNv',
    name: 'electrochoc-anim-rebond.mp4',
    kind: 'video',
    url: 'https://hugo-tomasi-v2.cdn.prismic.io/hugo-tomasi-v2/ZiUrkfPdc1huKqNv_electrochoc-anim-rebond.mp4',
    size: '1305900',
  },
  video: {
    background: true,
  },
  image: {
    width: '812',
    height: '475',
    tag: 'img',
    sizes: 'xs:100vw sm:100md md:100vw lg:50vw xl:50vw xxl:50vw hd:50vw qhd:50vw',
  },
}
</script>

<template>
  <NuxtStoryVariant>
    <VPrismicMedia v-bind="mediaProps" />
  </NuxtStoryVariant>
</template>

<style lang="scss" module>
.root {
}
</style>
