<script setup lang="ts">
import type { ImageField } from '@prismicio/types'

interface VHeaderTitle {
    title: string | null
    anchorId: string
    media?: ImageField
}

defineProps<VHeaderTitle>()
</script>

<template>
    <VArrowTitle
        v-if="title"
        :title="title"
        :class="$style.title"
        :href="`#${anchorId}`"
    />
    <VPrismicImage
        v-if="media"
        :reference="media"
        :modifiers="{
            crop: 'edges',
            fit: 'cover',
            width: '200',
            height: '500',
        }"
        :class="$style.media"
    />
</template>

<style lang="scss" module>
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
    background-color: color(line-primary)
  }

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
