<script lang="ts" setup>
import { getLinkToMediaFieldFilled } from '~/utils/prismic/prismic-link'
import type { VMediaProps } from '~/composants/molecules/VMedia/VMedia.vue'

export interface VideoAttribute {
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
}

export type VVideoProps = {
  cover?: boolean
  needInteraction?: boolean
  background?: boolean
  placeholder?: boolean
}

const props = defineProps<VMediaProps & VVideoProps>()

const filledMedia = computed(() => getLinkToMediaFieldFilled(props.media))
const src = computed(() => props.src || filledMedia.value?.url || props.embedUrl)
</script>

<template>
  <template v-if="src">
    <VBackgroundMedia v-if="background" :src="src" />
    <div v-else>Not background video</div>
  </template>
</template>

<style lang="scss" module>
.root {
  width: 100%;
}
</style>
