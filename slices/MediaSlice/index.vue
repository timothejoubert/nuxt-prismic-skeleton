<script setup lang="ts">
import { type Content } from '@prismicio/client'

const props = defineProps(getSliceComponentProps<Content.MediaSliceSlice>())

const medias = props.slice.items

const title = props.slice.primary?.title
const content = props.slice.primary?.content
const isFullWidth = props.slice.primary?.full_width

const hasOneMedia = medias?.length === 1
</script>

<template>
  <section v-if="medias?.length" ref="root" :class="$style.root" class="slice-container">
    <div v-if="title" :content="title" :class="$style.title" class="text-body-m">{{ title }}</div>
    <VText v-if="content" :content="content" :class="$style.content" class="text-body-s" />
    <VPrismicImage
      v-if="isFullWidth && medias[0]?.image"
      :reference="medias[0].image"
      fit="crop"
      :class="[$style.image, $style['image--fulwidth']]"
      :modifiers="{ crop: 'edges' }"
    >
    </VPrismicImage>
    <!--      <VPictureSource :media="`(max-width: 540px)`" sizes="xs:100vw sm:100md md:100vw" width="375" height="300" />-->
    <!--      <VPictureSource sizes="lg:100vw xl:100vw xxl:100vw hd:100vw qhd:100vw" width="1278" height="447" />-->

    <template v-else-if="medias?.length">
      <VPrismicMedia
        v-for="(item, i) in medias"
        :key="(item.image?.link_type || item.image?.['id'] || 'media-') + i"
        :class="[$style.image, $style['image--default'], $style[`image--${hasOneMedia ? 'solo' : 'multiple'}`]]"
        :reference="item.image"
        :video="{
          embedPlatform: item.embed_platform,
          embedId: item.embed_id,
          src: item.internal_video?.url,
          loop: true,
        }"
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
  --v-prismic-media-border-radius: #{rem(6)};

  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--page-gutter) * 0.5);

  @include media('>=md') {
    grid-template-columns: 1fr 1fr;
  }
}

.title {
  grid-column: 1 / -1;
}

.content {
  margin-bottom: rem(14);
  grid-column: 1 / -1;
}

.image {
  --v-roadiz-image-width: 100%;
  width: 100%;

  &--solo {
    grid-column: 1 / -1;
    justify-self: center;

    @include media('>=md') {
      max-width: 75%;
    }
  }

  &--fulwidth {
    position: relative;
    display: block;
    width: calc(100% + var(--page-gutter) * 2);
    left: calc(var(--page-gutter) * -1);
    grid-column: 1 / -1;
    max-width: initial;

    img {
      max-width: initial;
    }
  }
}
</style>
