<script setup lang="ts">
import type {KeyTextField} from "@prismicio/types";
import { createTextVNode} from "vue";
import {VArrow} from "#components";

interface VArrowTitle {
  title: string | KeyTextField
}

const props = defineProps<VArrowTitle>()

const words = computed(() => props.title?.split(' ') || [])
const arrowPosition = computed(() => words.value.length < 2 ? 0 : 1)

const $style = useCssModule()

const outputItems = computed(() => {
  return words.value.toSpliced(arrowPosition.value, 0, "custom-button").map(item => {
    if(item === 'custom-button') {
      return h(VArrow, { tag: 'button', class: $style.arrow, direction: 'bottom', size: 'lg' })
    } else {
      return createTextVNode(item)
    }

  })
})
</script>

<template>
  <h1 class="text-h1">
    <component :is="item" v-for="item in outputItems" :key="item" />
  </h1>
</template>

<style lang="scss" module>
.root {
  position: relative;
}

.arrow {
  height: 1lh;
  translate: 0 -25%;
}
</style>
