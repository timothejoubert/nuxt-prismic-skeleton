<script lang="ts" setup>
import type { CustomPrismicMedia } from '~/types/media'

const relationLinkVideo = {
  link_type: 'Media',
  name: 'showreel-3D.mp4',
  kind: 'all',
  url: 'https://hugo-tomasi-v2.cdn.prismic.io/hugo-tomasi-v2/234967b8-d1ff-493e-a4c2-2a79c7c1080b_showreel-3D.mp4',
  size: '69961957',
} satisfies CustomPrismicMedia

const relationLinkImage = {
  id: 'Zb5MNBEAACcAm6t9',
  link_type: 'Media',
  name: 'french-fred-attraper-au-vol-5-1.jpg',
  kind: 'image',
  url: 'https://images.prismic.io/hugo-tomasi-v2/352e1a1b-5526-411c-8215-7dae5198c561_french-fred-attraper-au-vol-5-1.jpg?auto=format,compress?auto=compress,format',
  size: '796753',
  height: '828',
  width: '1200',
} satisfies CustomPrismicMedia

const imageField = {
  dimensions: { width: 1200, height: 828 },
  alt: null,
  copyright: null,
  url: 'https://images.prismic.io/hugo-tomasi-v2/352e1a1b-5526-411c-8215-7dae5198c561_french-fred-attraper-au-vol-5-1.jpg?auto=format,compress',
  id: 'Zb5MNBEAACcAm6t9',
  edit: { x: 0, y: 0, zoom: 1, background: 'transparent' },
}
</script>

<template>
  <div :class="$style.root">
    <div>
      <p>relationLinkVideo</p>
      <VMedia :media="relationLinkVideo" />
    </div>
    <div>
      <p>relationLinkImage</p>
      <VMedia :media="relationLinkImage" />
    </div>
    <div>
      <p>imageField</p>
      <VMedia :media="imageField" />
    </div>
    <div>
      <p>imageField width modifiers</p>
      <VMedia
        :media="imageField"
        :image-props="{ imgixParams: { ar: '50:10', fit: 'crop' }, widths: [200, 500, 1000] }"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
}
</style>
