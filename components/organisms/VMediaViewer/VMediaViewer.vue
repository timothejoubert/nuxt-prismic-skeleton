<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'

const { documents, selectedIndex: slideIndex, close, nextSlide, previousSlide, isOpen } = useMediaViewer()

useEventListener('keyup', onKeyPressed)

function onKeyPressed(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
  else if (event.key === 'ArrowLeft') previousSlide()
  else if (event.key === 'ArrowRight') nextSlide()
}

const copyrightContent = computed(() => {
  return documents.value?.[slideIndex.value]?.copyright
})

const description = computed(() => {
  return documents.value?.[slideIndex.value]?.description
})
</script>

<template>
  <div :class="[$style.root, description && $style['root--with-description']]">
    <VButton :class="$style.close" :outlined="false" icon-name="cross" theme="dark" @click="close" />
    <div v-if="documents?.length" :class="$style.carousel">
      <div v-for="(document, documentIndex) in documents" :key="documentIndex" :class="$style.slide">
        <VPrismicMedia
          :class="$style.media"
          :document="document"
          :image="{
            sizes: 'sm:100vw xs:100vw md:90vw lg:90vw vl:90vw xl:90vw xxl:90vw hd:90vw qhd:90vw',
          }"
          :video="{
            hideThumbnail: true,
            autoplay: slideIndex === documentIndex,
            interaction: false,
            playsinline: true,
          }"
        />
        <VText v-if="document.description" :class="$style.description" :content="document.description" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
$root-padding: rem(185);

.root {
  @include theme(dark);

  position: fixed;
  z-index: 101;
  display: flex;
  flex-direction: column;
  padding: var(--gutter);
  color: var(--theme-foreground-color);
  inset: 0;

  &::after {
    position: absolute;
    z-index: -1;
    background-color: var(--theme-background-color);
    content: '';
    inset: 0;
  }

  @include media('>=lg') {
    padding: rem(83) $root-padding rem(75);
  }
}

.close {
  --v-button-min-width: none;
  --v-button-padding-inline: 0;

  position: absolute;
  z-index: 2;
  top: 0;
  right: var(--gutter);

  @include media('>=lg') {
    top: rem(28);
  }
}

.carousel {
  --v-carousel-slide-width: calc(100vw - var(--gutter) * 2);
  --v-carousel-slide-margin-right: var(--gutter);
  --v-carousel-swiper-wrapper-height: 100%;

  overflow: hidden;
  height: 100%;
  align-items: center;

  @include media('>=lg') {
    --v-carousel-slide-width: calc(100vw - #{$root-padding} * 2);
    --v-carousel-slide-margin-right: #{$root-padding};
  }
}

.slide {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: rem(24);

  // style iframe for audio
  > iframe {
    width: 100%;
    height: auto;
    max-height: 100%;
  }
}

.media {
  display: flex;
  width: auto;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  align-items: center;
  object-fit: contain;
  -webkit-user-drag: none;
  user-select: none;

  .root--with-description & {
    &:not(#{&}--video) {
      max-height: calc(100% - #{rem(66)});
    }
  }

  :global(.plyr--video) {
    width: 100%;
  }

  @include media('>=lg') {
    .root--with-description & {
      &:not(#{&}--video) {
        max-height: calc(100% - #{rem(46)});
      }
    }
  }
}

.controls {
  z-index: 1;
  display: flex;
  align-self: center;
  justify-content: space-between;
  order: 4;
  margin-top: rem(20);

  @include media('>=lg') {
    position: absolute;
    z-index: initial;
    top: 50%;
    right: var(--gutter);
    left: var(--gutter);
    align-self: initial;
    order: initial;
    transform: translateY(-50%);
  }
}

.description {
  @include text-body-xs;
}

.copyright {
  position: absolute;
  right: rem(24);
  bottom: rem(24);
  display: flex;
  align-items: center;
  translate: 0 50%;
}
</style>
