<script setup lang="ts">
import type { PropType } from 'vue'
import type { ProjectPageDocument } from '~/prismicio-types'
import { DocumentType } from '~/constants/document-type'
import { useNativeCarousel } from '~/composables/use-native-carousel'
import { getDocumentRoutePath } from '~/utils/prismic/route-resolver'

defineProps({
  tag: String,
  title: String,
  projects: Array as PropType<ProjectPageDocument[]>,
})

const carousel = ref<HTMLElement | null>(null)
const { mouseMove, isCarouselEnable, progress } = useNativeCarousel(carousel)

const projectListingPath = computed(() => {
  return getDocumentRoutePath(DocumentType.PROJECT_LISTING)
})
</script>

<template>
  <component :is="tag || 'div'" :class="$style.root" class="slice-container--fullwidth">
    <div class="container--fullwidth" :class="$style.head">
      <div v-if="title" class="text-h4" :class="$style.title">{{ title }}</div>
      <NuxtLink :to="projectListingPath" :class="$style.link">
        <VButton :label="$t('see_all_project')" outlined icon-name="arrow-right" size="s" />
      </NuxtLink>
      <div v-show="isCarouselEnable" :class="$style.scroll" :style="{ '--progress': progress }"></div>
    </div>
    <div
      ref="carousel"
      :class="[$style.carousel, mouseMove && $style['carousel--is-dragging']]"
      class="container--fullwidth"
    >
      <VProjectCard v-for="project in projects" :key="project.uid" :project="project" :class="$style.card">
        <VPrismicImage
          :reference="project.data.main_media"
          width="600"
          height="390"
          :class="$style.media"
          fit="cover"
          :modifiers="{ crop: 'edges' }"
          sizes="xs:85vw sm:85vw md:50vw lg:50vw vl:50vw xl:50vw xxl:50vw hd:50vw qhd:50vw"
        />
      </VProjectCard>
    </div>
  </component>
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
    background-color: rgba(color(black), 0.9);
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

  width: 85%;
  flex-shrink: 0;
  margin-right: rem(20);

  .carousel--is-dragging & {
    pointer-events: none;
  }

  @include media('>=md') {
    width: calc(50% - var(--page-gutter) * 0.5 - rem(5));
  }
}

.media {
  width: 100%;
  border-radius: rem(22);
}
</style>
