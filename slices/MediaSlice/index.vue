<script setup lang="ts">
import { type Content } from '@prismicio/client'

const props = defineProps(getSliceComponentProps<Content.MediaSliceSlice>())

const medias = props.slice.items

const title = props.slice.primary.title
const content = props.slice.primary.content
const isFullWidth = props.slice.variation === 'fullwidth'

const hasOneMedia = medias.length === 1

console.log('medias', medias)
</script>

<template>
  <section ref="root" :class="$style.root" class="slice-container">
    <div v-if="title" :content="title" :class="$style.title" class="text-body-m">{{ title }}</div>
    <VText v-if="content" :content="content" :class="$style.content" class="text-body-s" />
    <VPrismicImage
      v-if="isFullWidth && medias[0]?.media"
      :reference="medias[0].media"
      fit="crop"
      :class="[$style.image, $style['image--fulwidth']]"
      :modifiers="{ crop: 'edges' }"
    >
      <VPictureSource :media="`(max-width: 540px)`" sizes="xs:100vw sm:100md md:100vw" width="375" height="300" />
      <VPictureSource sizes="lg:100vw xl:100vw xxl:100vw hd:100vw qhd:100vw" width="1278" height="447" />
    </VPrismicImage>

    <template v-else>
      <VPrismicMedia
        v-for="(item, i) in medias"
        :key="item.media.link_type + i"
        :reference="item.media"
        :class="[$style.image, $style['image--default'], hasOneMedia && $style['image--solo']]"
        :video="{
          embedPlatform: item.embed_platform,
          embedId: item.embed_id,
        }"
        :thumbnail="item.thumbnail"
        :image="{
          fit: 'crop',
          modifiers: { crop: 'edge' },
          width: '812',
          height: '475',
        }"
      />
    </template>
  </section>
</template>

<style lang="scss" module>
.root {
  position: relative;
}

.title {
  margin-bottom: rem(6);
}

.content {
  margin-bottom: rem(14);
}

.image {
  --v-roadiz-image-width: 100%;

  &--default {
    border-radius: rem(18);
  }

  &--solo {
    margin-inline: auto;
    max-width: 60%;
  }

  &--fulwidth {
    display: block;
    width: calc(100% + var(--page-gutter) * 2);
    left: calc(var(--page-gutter) * -1);

    img {
      max-width: initial;
    }
  }
}
</style>
