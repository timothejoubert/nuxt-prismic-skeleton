<script setup lang="ts">
import type { RichTextField } from '@prismicio/types'
// import VTransitionExpand from '~/components/atoms/VTransitionExpand/VTransitionExpand.vue'

export interface VSkillProps {
  title: string | null
  content: string | RichTextField
  sideTitle: string | null
  sideContent: string | RichTextField
}

defineProps<VSkillProps>()
const isOpened = ref(false)
const isHoveringHead = ref(false)

const id = `collapsable-${useId()}`
</script>

<template>
  <div :class="[$style.root, isOpened && $style['root--open']]">
    <div
      :class="$style.head"
      :aria-controls="id"
      :aria-expanded="isOpened"
      @click="isOpened = !isOpened"
      @mouseleave="isHoveringHead = false"
      @mouseenter="isHoveringHead = true"
    >
      <VButton theme="dark" filled size="l" :class="$style.button" outlined :play-animation="isHoveringHead">
        <template #icon="{ iconClass }">
          <div :class="[$style.icon, iconClass]"></div>
        </template>
      </VButton>
      <div v-if="title" :class="$style.title" class="text-h3">{{ title }}</div>
    </div>
    <div :id="id" :class="$style.body">
      <div :class="$style.body__inner">
        <VText :content="content" :class="$style.content" class="text-body-s" />
        <div v-if="sideTitle" :class="$style['side-title']" class="text-over-title-s">{{ sideTitle }}</div>
        <VText v-if="sideContent" :class="$style['side-content']" class="text-body-s" :content="sideContent" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
  gap: rem(10) rem(30);

  @include media('>=md') {
    flex-wrap: nowrap;
  }
}

.button {
  --v-button-min-width: #{rem(72)};
}

.icon {
  position: relative;
  width: rem(16);
  height: rem(16);

  &::before,
  &::after {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    content: '';
    transform-origin: center;
    transition:
      background-color 0.3s,
      rotate 0.2s,
      opacity 0.2s;
  }

  .root:not(.root--open) &::after {
    rotate: 90deg;
  }

  .root--open &::after {
    opacity: 0;
  }
}

.title {
  width: 100%;
  max-width: rem(550);
  text-transform: uppercase;

  @include media('>=md') {
    width: initial;
    max-width: initial;
  }
}

.body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s ease(out-quad);

  .root--open & {
    grid-template-rows: 1fr;
  }
}

.body__inner {
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr;
  grid-auto-flow: dense;

  @include media('>=md') {
    grid-template-columns: 2fr minmax(270px, 1fr);
    gap: rem(14) rem(40);
    max-width: 90ch;
  }
}

.content {
  max-width: 50ch;
  padding-top: rem(32);

  @include media('>=md') {
    grid-row: 1 / 4;
    margin-left: rem(104);
    margin-bottom: rem(32);
  }
}

.side-title {
  padding-top: rem(32);
}

.side-content {
  line-height: 1.4;
  opacity: 0.7;
}
</style>
