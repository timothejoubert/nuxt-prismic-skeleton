<script lang="ts" setup>
import type { HomePageDocument } from '~/prismicio-types'
import type { PageProps } from '~/types/app'
import {anchor} from '~/constants/anchor'

const props = defineProps<PageProps<HomePageDocument>>()
const pageData = computed(() => props.prismicDocument.data)
</script>

<template>
    <VDefaultHeader :title="pageData.title" :media="pageData.image" :anchor-id="anchor.HOME_PAGE_TAG_LINE" />
    <VText :id="anchor.HOME_PAGE_TAG_LINE" tag="h2" :content="pageData.content" class="text-h4" :class="$style.content" />
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
    left: 0;
    right: calc(var(--gutter) * -1);
    height: 1px;
    bottom: 0;
    background-color: color-mix(in srgb, color(black) 30%, transparent);
  }

  @include media('>=md') {
    grid-column: 1 / span 11;
  }
}

.content {
  grid-column: 1 / -1;
  @include property-fluid(padding-top, (xs: 32, xl: 121));
  @include property-fluid(padding-bottom, (xs: 32, xl: 150));

  @include media('>=md') {
    @include line(right);

    position: relative;
    grid-column: 1 / span 11;
    width: calc(100% + var(--gutter));

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
