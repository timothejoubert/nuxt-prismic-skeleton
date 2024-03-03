<script lang="ts" setup>
import type { ImageField, RichTextField } from '@prismicio/types'

export type VCardLayout = 'centered' | null

interface VCardProps {
  title: string
  titleClass?: string
  image: ImageField
  tags?: string[]
  date: string
  imageProps: { [key: string]: unknown }
  description: string | RichTextField
  layout?: VCardLayout
}

defineProps<VCardProps>()

const isEnter = ref(false)
</script>

<template>
  <div
    :class="[$style.root, typeof layout === 'string' && $style[`root--layout-${layout}`]]"
    @mouseenter="isEnter = true"
    @mouseleave="isEnter = false"
  >
    <div :class="$style.media">
      <!--      <v-pill v-if="date" :class="$style.date" :label="date" filled theme="light" size="xs" />-->
      <div v-if="date" :class="$style.date" />
      <VPicture v-if="image" :media-entity="image" width="390" height="600" v-bind="imageProps" />
      <VButton filled :class="$style.cta" icon-name="arrow-up-right" />
    </div>
    <div :class="$style.body">
      <div :class="$style.body__left">
        <VSplitWord v-if="title" :class="titleClass || 'text-over-title-m'" :play-animation="isEnter">{{
          title
        }}</VSplitWord>
        <div v-if="tags?.length" :class="$style.tags">
          <span v-for="tag in tags" :key="'tag-' + tag" class="text-body-s" :class="$style.tag">{{ tag }}</span>
        </div>
      </div>
      <VText v-if="description" :content="description" :class="$style.description" class="text-body-s" />
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}

.media {
  --v-image-border-radius: #{rem(22)};

  position: relative;

  &::after {
    position: absolute;
    z-index: 1;
    background-image: linear-gradient(transparent, rgba(color(white), 0.15));
    content: '';
    inset: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  @media (hover: hover) {
    .root:hover &::after {
      opacity: 0;
    }
  }
}

.date {
  position: absolute;
  z-index: 2;
  top: rem(12);
  left: rem(12);
  display: var(--v-card-date-display, flex);
}

.cta {
  position: absolute;
  z-index: 2;
  right: rem(22);
  bottom: rem(22);
}

.body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: rem(11);
  gap: rem(16);
}

.body__left {
  .root--layout-centered & {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
  }
}

.tags {
  margin-top: rem(4);
  opacity: 0.8;
}

.tag {
  position: relative;

  &:not(:last-child)::after {
    position: relative;
    content: '|';
    margin-inline: rem(6);
  }
}

.description {
  display: var(--v-card-description-display);
  width: 100%;

  @include media('>=md') {
    width: clamp(#{rem(360)}, 25%, #{rem(480)});
  }
}
</style>
