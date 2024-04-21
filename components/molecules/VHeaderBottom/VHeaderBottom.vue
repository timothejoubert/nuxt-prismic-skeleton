<script setup lang="ts">
import type { PropType } from 'vue'
import type { RichTextField } from '@prismicio/types'

defineProps({
  title: String,
  content: [String, Array] as PropType<RichTextField | string>,
  altContent: [String, Array] as PropType<RichTextField | string>,
  contentClass: String,
  loading: Boolean,
})
</script>

<template>
  <div :class="$style.root">
    <h3 v-if="title" class="text-over-title-s">
      {{ title }}
      <VLoadingDots v-if="loading" />
    </h3>
    <slot />
    <div :class="$style.line"></div>
    <VText :class="[$style.content, $style['content--main'], contentClass || 'text-body-s']" :content="content" />
    <VText :class="[$style.content, $style['content--alt']]" class="text-body-s" :content="altContent" />
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
  display: grid;
  gap: rem(16);
  grid-template-columns: 1fr;
  margin-bottom: rem(16);

  @include media('>=md') {
    grid-template-columns: 1fr 1fr;
  }
}

.line {
  position: relative;
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgba(color(white), 0.3);

  &::after {
    position: absolute;
    background-color: color(white);
    content: '';
    inset: 0;
    opacity: 0.6;
    scale: var(--loading-percent, 0) 1;
    transform-origin: left;
    transition: scale 0.2s;
  }
}

.content {
  &--main {
    max-width: 46ch;
    min-height: rem(80);
  }

  & *:not(strong) {
    opacity: 0.7;
  }

  @include media('>=lg') {
    &--alt {
      justify-self: flex-end;
    }
  }
}
</style>
