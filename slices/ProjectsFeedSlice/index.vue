<script setup lang="ts">
import { type Content } from '@prismicio/client'
import { useNativeCarousel } from '~/composables/use-native-carousel'
import { DocumentType } from '~/constants/document-type'

const props = defineProps(getSliceComponentProps<Content.ProjectsFeedSliceSlice>())
const title = computed(() => props.slice.primary?.title)

const { data: listingResponse } = await usePrismicProjectDocuments()

const carousel = ref<HTMLElement | null>(null)
const { mouseMove, isCarouselEnable, progress } = useNativeCarousel(carousel)
</script>

<template>
  <section :class="$style.root" class="slice-container--fullwidth">
    <div class="container--fullwidth" :class="$style.head">
      <div v-if="title" class="text-h4" :class="$style.title">{{ title }}</div>
      <NuxtLink :to="{ name: DocumentType.PROJECT_LISTING }" :class="$style.link">
        <VButton :label="$t('see_all_project')" outlined icon-name="arrow-right" />
      </NuxtLink>
      <div v-show="isCarouselEnable" :class="$style.scroll" :style="{ '--progress': progress }"></div>
    </div>
    <div
      ref="carousel"
      :class="[$style.carousel, mouseMove && $style['carousel--is-dragging']]"
      class="container--fullwidth"
    >
      <VProjectCard v-for="project in listingResponse" :key="project.uid" :project="project" :class="$style.card">
        <NuxtImg
          v-if="project.data.main_media"
          :src="project.data.main_media.url"
          width="600"
          height="390"
          provider="imgix"
          placeholder="/images/placeholder.jpg"
          :class="$style.media"
          fit="cover"
          :modifiers="{ crop: 'edges' }"
          sizes="xs:100vw sm:100vw md:50vw lg:33vw vl:33vw xl:33vw xxl:33vw hd:33vw qhd:33vw"
        />
      </VProjectCard>
    </div>
  </section>
</template>

<style lang="scss" module>
.root {
  overflow: hidden;
}

.head {
  display: flex;
  align-items: center;
  margin-bottom: rem(40);
}

.title {
  //margin-bottom: rem(20);
  //opacity: 0.6;
  //text-transform: uppercase;
}

.link {
  justify-self: end;
  margin-left: rem(16);
  margin-right: auto;
}

.scroll {
  position: relative;
  overflow: hidden;
  width: rem(80);
  height: 2px;
  background-color: lightgray;
  border-radius: 1px;
  grid-column: 2;
  justify-self: end;

  &::after {
    position: absolute;
    background-color: rgba(color(black), 0.5);
    content: '';
    inset: 0;
    scale: var(--progress, 0) 1;
    transform-origin: left;
    transition: scale 0.1s;
  }
}

.carousel {
  display: flex;
  min-width: 100%;
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox 64 */
  touch-action: pan-x;

  &::-webkit-scrollbar {
    display: none;
  }
}

.card {
  --v-card-date-display: none;
  width: 40%;
  flex-shrink: 0;
  margin-right: rem(20);

  .carousel--is-dragging & {
    pointer-events: none;
  }
}

.media {
  width: 100%;
  border-radius: rem(22);
}
</style>
