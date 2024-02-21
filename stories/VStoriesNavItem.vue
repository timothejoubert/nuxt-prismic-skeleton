<script setup lang="ts">
import type { PropType } from 'vue'
import { NuxtLink } from '#components'

export interface ItemLink {
  to: string
  label: string
}

export type Item = {
  [key: string]: Item | ItemLink
}

const props = defineProps({
  item: {
    type: Object as PropType<Item | ItemLink>,
    required: true,
  },
  label: {
    type: [String, Number],
  },
  open: Boolean,
})

const isOpen = ref(props.open)

const isLink = computed(() => typeof props.item.to === 'string')

// const hasChildren = computed(() => !isLink.value && Object.keys(props.item).length > 0)
</script>

<template>
  <NuxtLink v-if="isLink" :to="item.to" :class="$style.link">{{ item.label }}</NuxtLink>
  <div v-else :class="$style.folder">
    <button :class="$style.folder__name" @click="isOpen = !isOpen">
      <span>{{ label }}</span>
      <span> [{{ isOpen ? '−' : '+' }}]</span>
    </button>
    <ul v-if="isOpen">
      <li v-for="(childItem, key) in item" :key="key">
        <VStoriesNavItem :item="childItem" :label="key" />
      </li>
    </ul>
  </div>
</template>

<style module lang="scss">
.link:global(.router-link-exact-active) {
  background-color: yellow;
}

.folder__name {
  margin-bottom: 0.5em;
  white-space: nowrap;
}

.folder ul {
  padding-left: 1em;
  margin-bottom: 0.5em;
  margin-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
