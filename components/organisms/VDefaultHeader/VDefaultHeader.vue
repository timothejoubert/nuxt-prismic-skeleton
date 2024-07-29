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
  grid-column: 1 / -1;

  @include property-fluid(margin-top, (xs: 30, xl: 66));

  &::after {
    position: absolute;
    right: calc(var(--gutter) * -1);
    bottom: 0;
    left: 0;
    height: 1px;
    background-color: var(--line-primary);
    content: ''
  }

  @include media('>=md') {
    grid-column: 1 / span 11;
  }
}

.media {
  grid-column: 1 / -1;

  @include media('>=md') {
    width: calc(100% + var(--gutter));
    grid-column: -4 / -1;
  }
}
</style>
