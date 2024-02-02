<script lang="ts" setup>
import type { LinkToMediaField } from '@prismicio/client'
import type { VVideoProps } from '~/composants/molecules/VMedia/VVideo.vue'

export interface VMediaProps {
  media?: LinkToMediaField
  src?: string
  embedUrl?: string
  videoProps?: VVideoProps
  imageProps?: unknown
}

const props = defineProps<VMediaProps>()

console.log(props.media)
</script>

<template>
  <div :class="$style.root"></div>

  <VVideo :media="media" :src="src" v-bind="videoProps" />
</template>

<style lang="scss" module>
.root {
}
</style>
