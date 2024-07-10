<script lang="ts" setup>
import type { HomePageDocument } from '~/prismicio-types'
import type { PageProps } from '~/types/app'

const props = defineProps<PageProps<HomePageDocument>>()
const homeItem = computed(() => props.prismicDocument.data)
</script>

<template>
  <div class="grid" :class="$style.root">
    <VArrowTitle :title="homeItem.title" :class="$style.title" />
    <VText tag="h2" :content="homeItem.content" class="text-h4" :class="$style.content" />
    <VPrismicImage
      :reference="homeItem.image"
      :modifiers="{
        crop: 'edges',
        fit: 'cover',
        width: '200',
        height: '500',
      }"
      :class="$style.media"
    />
  </div>
</template>
<style lang="scss" module>
.root {
  grid-auto-flow: dense;
}

.title {
  @include property-fluid(margin-top, (xs: 30, xl: 66));
  grid-column: 1 / -1;

  &::after {
    position: absolute;
    content: '';
    left: var(--gutter);
    right: var(--gutter);
    height: 1px;
    background-color: color-mix(in srgb, color(black) 30%, transparent);
  }

  @include media('>=md') {
    grid-column: 1 / span 11;
  }
}

.content {
  grid-column: 1 / -1;
  @include property-fluid(margin-top, (xs: 32, xl: 121));
  @include property-fluid(margin-bottom, (xs: 32, xl: 150));

  @include media('>=md') {
    grid-column: 1 / span 11;
  }
}

.media {
  grid-column: 1 / -1;

  @include media('>=md') {
    grid-column: -4 / -1;
    width: calc(100% + var(--gutter));
  }

}
</style>
